import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYSTEM_PROMPT } from './systemPrompt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50kb' }));

// Config
const config = {
  openrouterApiKey: process.env.OPENROUTER_API_KEY,
  openrouterBaseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  chatPrimaryLlm: process.env.CHAT_PRIMARY_LLM || 'google/gemini-2.5-flash-lite',
  chatFallbackLlm: process.env.CHAT_FALLBACK_LLM || 'openrouter/free',
  chatUseFallback: process.env.CHAT_USE_FALLBACK === 'true',
  chatTemperature: parseFloat(process.env.CHAT_TEMPERATURE) || 0.2,
  chatTopP: parseFloat(process.env.CHAT_TOP_P) || 0.8,
  chatMaxTokens: parseInt(process.env.CHAT_MAX_TOKENS, 10) || 450,
  chatTimeoutMs: parseInt(process.env.CHAT_TIMEOUT_MS, 10) || 45000,
};

// Limits
const LIMITS = {
  MAX_MESSAGE_LENGTH: 2000,
  MAX_MESSAGES: 20,
  REQUEST_TIMEOUT_MS: config.chatTimeoutMs,
};

/**
 * Valida un mensaje
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
 * Valida historial de mensajes
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
 * Llama a OpenRouter con fallback
 */
async function callOpenRouter(messages, model) {
  if (!config.openrouterApiKey) {
    throw new Error('OPENROUTER_API_KEY no configurado');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), LIMITS.REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${config.openrouterBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openrouterApiKey}`,
        'HTTP-Referer': 'https://taniaportafolio.onrender.com',
        'X-OpenRouter-Title': 'Tania Peláez Valverde Portfolio',
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
        temperature: config.chatTemperature,
        top_p: config.chatTopP,
        max_tokens: config.chatMaxTokens,
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
 * POST /api/chat
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // Validar estructura
    if (!messages) {
      return res.status(400).json({ error: 'El request debe contener "messages"' });
    }

    // Validar historial
    const historyValidation = validateMessageHistory(messages);
    if (!historyValidation.valid) {
      return res.status(400).json({ error: historyValidation.error });
    }

    // Validar último mensaje
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return res.status(400).json({ error: 'El último mensaje debe ser del usuario' });
    }

    const messageValidation = validateMessage(lastMessage.content);
    if (!messageValidation.valid) {
      return res.status(400).json({ error: messageValidation.error });
    }

    // Intentar modelo primario
    let responseContent;
    try {
      responseContent = await callOpenRouter(messages, config.chatPrimaryLlm);
    } catch (primaryError) {
      // Fallback si es recuperable
      if (
        config.chatUseFallback &&
        config.chatFallbackLlm &&
        (primaryError.message.includes('Timeout') ||
          primaryError.message.includes('5'))
      ) {
        console.warn(`Fallback a ${config.chatFallbackLlm}:`, primaryError.message);
        try {
          responseContent = await callOpenRouter(messages, config.chatFallbackLlm);
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError.message);
          return res.status(500).json({
            error: 'No se pudo procesar tu solicitud. Intenta más tarde.',
          });
        }
      } else {
        console.error('Primary model error:', primaryError.message);

        if (primaryError.message.includes('Timeout')) {
          return res.status(504).json({
            error: 'El servidor tardó demasiado. Por favor, intenta de nuevo.',
          });
        }

        if (primaryError.message.includes('401')) {
          return res.status(500).json({
            error: 'Configuración de autenticación incorrecta',
          });
        }

        return res.status(500).json({
          error: 'No se pudo procesar tu solicitud. Intenta más tarde.',
        });
      }
    }

    return res.json({
      role: 'assistant',
      content: responseContent,
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
});

/**
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * Servir React build
 */
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath, { maxAge: '1h' }));

/**
 * SPA fallback para React Router
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

/**
 * Iniciar servidor
 */
const hostname = '0.0.0.0';
app.listen(PORT, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${PORT}`);
  console.log(`📝 Chat API: POST /api/chat`);
  console.log(`❤️  Health check: GET /api/health`);
  console.log(`React app: http://localhost:${PORT}`);
});
