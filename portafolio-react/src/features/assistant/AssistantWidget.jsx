import { useState, useRef, useEffect } from 'react';
import { useAssistantChat } from './useAssistantChat';
import styles from './AssistantWidget.module.css';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    '¡Hola! Soy Tania 👋\n\nSoy comunicadora social y periodista. Puedo contarte sobre mi experiencia, mis proyectos y el trabajo que he desarrollado en comunicación.\n\n¿En qué puedo ayudarte?',
};

const SUGGESTED_PROMPTS = [
  'Conoce mi experiencia',
  'Ver mis proyectos',
  'Mis habilidades',
  '¿Cómo contactarme?',
];

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [avatarFailed, setAvatarFailed] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
    cancelMessage,
  } = useAssistantChat();

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Abrir chat y mostrar mensaje inicial
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      // No agregar aquí; el mensaje inicial se muestra siempre
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Enviar mensaje
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  // Sugerencias iniciales
  const handleSuggestedPrompt = (prompt) => {
    sendMessage(prompt);
    setInputValue('');
  };

  // Mostrar sugerencias solo si:
  // - El chat está abierto
  // - No hay mensajes del usuario aún
  const showSuggestions =
    isOpen && messages.filter((m) => m.role === 'user').length === 0;

  return (
    <>
      {/* Botón flotante - Solo mostrar cuando el chat está cerrado */}
      {!isOpen && (
        <button
          className={styles.floatingButton}
          onClick={handleOpen}
          aria-label="Hablar con Tania"
          aria-expanded={isOpen}
          title="Habla con Tania ✦"
        >
          {!avatarFailed && (
            <img
              src="/tania-avatar.webp"
              alt="Avatar Tania"
              className={styles.avatarImage}
              onError={() => {
                setAvatarFailed(true);
              }}
            />
          )}
          {avatarFailed && (
            <span className={styles.avatarFallback}>
              TP
            </span>
          )}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.chatIcon}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Panel conversacional */}
      {isOpen && (
        <div
          className={styles.chatPanel}
          role="complementary"
          aria-label="Chat con Tania"
        >
          {/* Encabezado */}
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.headerTitleRow}>
                <h2 className={styles.headerTitle}>
                  Tania <span>✦</span>
                </h2>
                <span
                  className={`${styles.statusIndicator} ${styles.available}`}
                  title="Disponible"
                >
                  ●
                </span>
              </div>
              <p className={styles.headerSubtitle}>
                Tu comunicadora con propósito
              </p>
            </div>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>

          {/* Área de mensajes */}
          <div
            className={styles.messagesContainer}
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
          >
            {/* Mostrar siempre el mensaje inicial */}
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageBubble}>
                {INITIAL_MESSAGE.content}
              </div>
            </div>

            {/* Mostrar sugerencias si no hay mensajes del usuario */}
            {showSuggestions && (
              <div className={styles.suggestionsContainer}>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    className={styles.suggestionButton}
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Mensajes del historial */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage
                }`}
              >
                <div className={styles.messageBubble}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Indicador de cargando */}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.loadingBubble}>
                  <span className={styles.loadingText}>Tania está escribiendo</span>
                  <div className={styles.loadingDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            {/* Mostrar error */}
            {error && !isLoading && (
              <div className={styles.errorContainer}>
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>!</span>
                  <div>
                    <strong>Error</strong>
                    <p>{error}</p>
                  </div>
                </div>
                <button
                  className={styles.retryButton}
                  onClick={retryLastMessage}
                >
                  Reintentar
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Área de control */}
          <div className={styles.chatFooter}>
            {messages.length > 0 && (
              <button
                className={styles.clearButton}
                onClick={clearChat}
                aria-label="Limpiar conversación"
                title="Limpiar conversación"
              >
                Limpiar
              </button>
            )}

            {isLoading && (
              <button
                className={styles.cancelButton}
                onClick={cancelMessage}
                aria-label="Cancelar solicitud"
              >
                Cancelar
              </button>
            )}
          </div>

          {/* Formulario de entrada */}
          <form
            className={styles.chatForm}
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Escribe tu pregunta..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              aria-label="Campo de entrada para preguntas"
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={
                isLoading || !inputValue.trim()
              }
              aria-label="Enviar mensaje"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
