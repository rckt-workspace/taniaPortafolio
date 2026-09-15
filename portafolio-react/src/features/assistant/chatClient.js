/**
 * Cliente centralizado para comunicación con el Worker
 */

import { getTaniaContextInfo } from './birthDateUtils';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || null;
const REQUEST_TIMEOUT = 30000;

/**
 * Realiza una solicitud de chat al Worker
 * @param {Array} messages - Historial de mensajes
 * @param {AbortSignal} signal - Signal para cancelar la solicitud
 * @returns {Promise<{role: string, content: string}>}
 */
export async function sendChatMessage(messages, signal) {
  if (!CHAT_API_URL) {
    throw new Error(
      'VITE_CHAT_API_URL no está configurado. El asistente no está disponible.'
    );
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const combinedSignal = signal
      ? AbortSignal.race([signal, controller.signal])
      : controller.signal;

    // Agregar información de contexto sobre Tania (edad y cumpleaños)
    const taniaContextMessage = {
      role: 'system',
      content: `Información sobre Tania: ${getTaniaContextInfo()}`,
    };

    // Incluir contexto al inicio del historial si no está ya presente
    const messagesWithContext =
      messages.length > 0 && messages[0].role === 'system'
        ? messages
        : [taniaContextMessage, ...messages];

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: messagesWithContext }),
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

/**
 * Valida si el cliente está correctamente configurado
 */
export function isChatClientConfigured() {
  return !!CHAT_API_URL;
}

/**
 * Obtiene la URL del API (para debugging)
 */
export function getChatAPIUrl() {
  return CHAT_API_URL;
}
