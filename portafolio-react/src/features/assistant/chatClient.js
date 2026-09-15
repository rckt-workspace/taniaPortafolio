/**
 * Cliente centralizado para comunicación con /api/chat
 */

const REQUEST_TIMEOUT = 30000;

/**
 * Obtiene la URL base del API
 */
function getChatApiUrl() {
  const baseUrl = import.meta.env.VITE_CHAT_API_URL;
  if (!baseUrl) {
    throw new Error('VITE_CHAT_API_URL no está configurado');
  }
  return baseUrl.replace(/\/$/, ''); // Remover trailing slash si existe
}

/**
 * Realiza una solicitud de chat al servidor
 * @param {Array} messages - Historial de mensajes
 * @param {AbortSignal} signal - Signal para cancelar la solicitud
 * @returns {Promise<{role: string, content: string}>}
 */
export async function sendChatMessage(messages, signal) {
  try {
    const baseUrl = getChatApiUrl();
    const endpoint = `${baseUrl}/api/chat`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const combinedSignal = signal
      ? AbortSignal.race([signal, controller.signal])
      : controller.signal;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Demasiadas solicitudes. Intenta más tarde.');
      }

      if (response.status >= 500) {
        throw new Error('El servidor está experimentando problemas. Intenta más tarde.');
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Error ${response.status}: No se pudo procesar tu solicitud.`
      );
    }

    const data = await response.json();

    if (!data.role || !data.content) {
      throw new Error('Respuesta inválida del servidor');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('La solicitud fue cancelada');
    }

    throw error;
  }
}
