import { useState, useCallback, useRef } from 'react';
import { sendChatMessage, isChatClientConfigured } from './chatClient';

/**
 * Hook para gestionar el estado de la conversación del asistente
 */
export function useAssistantChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const isConfigured = isChatClientConfigured();

  /**
   * Envía un mensaje y obtiene respuesta del asistente
   */
  const sendMessage = useCallback(
    async (userMessage) => {
      if (!isConfigured) {
        setError('El asistente no está configurado correctamente.');
        return;
      }

      if (!userMessage || userMessage.trim().length === 0) {
        return;
      }

      // Limpiar errores previos
      setError(null);

      // Agregar mensaje del usuario
      const newUserMessage = {
        role: 'user',
        content: userMessage.trim(),
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);

      // Preparar historial para enviar (mantener últimos 12 mensajes para control de costo)
      const MAX_HISTORY = 12;
      const historyToSend = [...messages, newUserMessage].slice(-MAX_HISTORY);

      try {
        // Crear nuevo AbortController para esta solicitud
        abortControllerRef.current = new AbortController();

        const response = await sendChatMessage(
          historyToSend,
          abortControllerRef.current.signal
        );

        setMessages((prev) => [...prev, response]);
        setError(null);
      } catch (err) {
        const errorMessage = err.message || 'Ocurrió un error al procesar tu solicitud.';
        setError(errorMessage);
        console.error('Chat error:', err);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isConfigured]
  );

  /**
   * Cancela la solicitud actual
   */
  const cancelMessage = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  /**
   * Limpia la conversación
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    cancelMessage();
  }, [cancelMessage]);

  /**
   * Reintenta enviar el último mensaje
   */
  const retryLastMessage = useCallback(() => {
    if (messages.length === 0) return;

    // Encontrar el último mensaje del usuario
    let lastUserMessageIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUserMessageIndex = i;
        break;
      }
    }

    if (lastUserMessageIndex === -1) return;

    const userMessage = messages[lastUserMessageIndex].content;

    // Remover mensajes después del último mensaje del usuario
    setMessages((prev) => prev.slice(0, lastUserMessageIndex + 1));
    setError(null);

    // Reenviar el mensaje
    setTimeout(() => {
      sendMessage(userMessage);
    }, 0);
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
    cancelMessage,
    isConfigured,
  };
}
