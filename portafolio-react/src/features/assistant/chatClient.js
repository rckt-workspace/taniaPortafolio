/**
 * Cliente centralizado para comunicación con /api/chat
 */

const CHAT_API_ENDPOINT = '/api/chat';
const REQUEST_TIMEOUT = 30000;

/**
 * Realiza una solicitud de chat al servidor
 * @param {Array} messages - Historial de mensajes
 * @param {AbortSignal} signal - Signal para cancelar la solicitud
 * @returns {Promise<{role: string, content: string}>}
 */
export async function sendChatMessage(messages, signal) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const combinedSignal = signal
      ? AbortSignal.race([signal, controller.signal])
      : controller.signal;

    const response = await fetch(CHAT_API_ENDPOINT, {
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
