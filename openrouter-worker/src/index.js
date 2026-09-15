import { SYSTEM_PROMPT } from './systemPrompt.js';

// Límites de seguridad
const LIMITS = {
  MAX_MESSAGES: 15,
  MAX_MESSAGE_LENGTH: 2000,
  MAX_OUTPUT_TOKENS: 500,
  REQUEST_TIMEOUT_MS: 30000,
};

/**
 * Respuesta de error estructurada
 */
function errorResponse(message, status = 400, allowedOrigin = '*') {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': allowedOrigin,
      },
    }
  );
}

/**
 * Respuesta de éxito estructurada
 */
function successResponse(data, allowedOrigin = '*') {
  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': allowedOrigin,
      },
    }
  );
}

/**
 * Valida y limpia el mensaje del usuario
 */
function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Mensaje inválido' };
  }

  const trimmed = message.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'El mensaje no puede estar vacío' };
  }

  if (trimmed.length > LIMITS.MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `El mensaje excede ${LIMITS.MAX_MESSAGE_LENGTH} caracteres`,
    };
  }

  return { valid: true, message: trimmed };
}

/**
 * Valida el historial de mensajes
 */
function validateMessageHistory(messages) {
  if (!Array.isArray(messages)) {
    return { valid: false, error: 'El historial debe ser un array' };
  }

  if (messages.length > LIMITS.MAX_MESSAGES) {
    return {
      valid: false,
      error: `Máximo ${LIMITS.MAX_MESSAGES} mensajes en el historial`,
    };
  }

  for (const msg of messages) {
    if (!msg.role || !msg.content) {
      return { valid: false, error: 'Formato de mensaje inválido' };
    }

    if (!['user', 'assistant'].includes(msg.role)) {
      return {
        valid: false,
        error: 'Rol de mensaje inválido: debe ser "user" o "assistant"',
      };
    }

    if (typeof msg.content !== 'string' || msg.content.length === 0) {
      return { valid: false, error: 'Contenido de mensaje vacío o inválido' };
    }

    if (msg.content.length > LIMITS.MAX_MESSAGE_LENGTH) {
      return {
        valid: false,
        error: `Contenido excede ${LIMITS.MAX_MESSAGE_LENGTH} caracteres`,
      };
    }
  }

  return { valid: true };
}

/**
 * Detecta el idioma del mensaje para contexto
 */
function detectLanguage(text) {
  const englishWords = /hello|hi|how|what|why|where|when|thank|help|yes|no/gi;
  const spanishWords = /hola|qué|cómo|por qué|dónde|cuándo|gracias|ayuda|sí|no/gi;

  const enCount = (text.match(englishWords) || []).length;
  const esCount = (text.match(spanishWords) || []).length;

  return esCount > enCount ? 'es' : 'en';
}

/**
 * Llama a OpenRouter API
 */
async function callOpenRouter(messages, env) {
  const apiKey = env.OPENROUTER_API_KEY;
  const model = env.OPENROUTER_MODEL;
  const siteUrl = env.OPENROUTER_SITE_URL;
  const siteName = env.OPENROUTER_SITE_NAME;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY no configurado');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    LIMITS.REQUEST_TIMEOUT_MS
  );

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': siteUrl,
        'X-OpenRouter-Title': siteName,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: 0.3,
        max_tokens: LIMITS.MAX_OUTPUT_TOKENS,
        top_p: 0.9,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `OpenRouter error: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenRouter');
    }

    return data.choices[0].message.content;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Timeout: OpenRouter took too long to respond');
    }

    throw error;
  }
}

/**
 * Valida si el origin está permitido
 */
function isOriginAllowed(origin, allowedOrigin) {
  if (allowedOrigin === '*') return true;
  return origin === allowedOrigin;
}

/**
 * Manejador de preflight CORS
 */
function handleCORS(request, origin, allowedOrigin) {
  if (request.method !== 'OPTIONS') {
    return null;
  }

  if (!isOriginAllowed(origin, allowedOrigin)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin === '*' ? '*' : origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Manejador principal de la solicitud /chat
 */
async function handleChat(request, env) {
  // Validar CORS
  const origin = request.headers.get('Origin');
  const allowedOrigin = env.ALLOWED_ORIGIN || '*';

  if (!isOriginAllowed(origin, allowedOrigin)) {
    return errorResponse('Origin no permitido', 403, allowedOrigin);
  }

  // Parsear JSON del request
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse('JSON inválido en el request', 400, allowedOrigin);
  }

  // Validar estructura del request
  if (!body.messages) {
    return errorResponse('El request debe contener "messages"', 400, allowedOrigin);
  }

  // Validar historial
  const historyValidation = validateMessageHistory(body.messages);
  if (!historyValidation.valid) {
    return errorResponse(historyValidation.error, 400, allowedOrigin);
  }

  // Validar último mensaje
  const lastMessage = body.messages[body.messages.length - 1];
  if (lastMessage.role !== 'user') {
    return errorResponse('El último mensaje debe ser del usuario', 400, allowedOrigin);
  }

  const messageValidation = validateMessage(lastMessage.content);
  if (!messageValidation.valid) {
    return errorResponse(messageValidation.error, 400, allowedOrigin);
  }

  // Llamar a OpenRouter
  try {
    const response = await callOpenRouter(body.messages, env);

    return successResponse(
      {
        role: 'assistant',
        content: response,
      },
      allowedOrigin === '*' ? '*' : origin
    );
  } catch (error) {
    console.error('OpenRouter error:', error.message);

    if (error.message.includes('Timeout')) {
      return errorResponse(
        'El servidor tardó demasiado. Por favor, intenta de nuevo.',
        504,
        allowedOrigin
      );
    }

    if (error.message.includes('401')) {
      return errorResponse('Configuración de autenticación incorrecta', 500, allowedOrigin);
    }

    return errorResponse(
      'No se pudo procesar tu solicitud. Intenta de nuevo más tarde.',
      500,
      allowedOrigin
    );
  }
}

/**
 * Punto de entrada del Worker
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = request.headers.get('Origin');
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';

    // Preflight CORS
    const corsResponse = handleCORS(request, origin, allowedOrigin);
    if (corsResponse) {
      return corsResponse;
    }

    // Ruta /chat
    if (path === '/chat' && request.method === 'POST') {
      return await handleChat(request, env);
    }

    // Health check
    if (path === '/health' && request.method === 'GET') {
      return new Response(
        JSON.stringify({ status: 'ok' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': allowedOrigin === '*' ? '*' : origin,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': allowedOrigin === '*' ? '*' : origin,
        },
      }
    );
  },
};
