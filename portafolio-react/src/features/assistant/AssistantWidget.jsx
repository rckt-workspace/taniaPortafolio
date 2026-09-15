import { useState, useRef, useEffect } from 'react';
import { useAssistantChat } from './useAssistantChat';
import { isTaniaBirthday, getTaniaAge } from './birthDateUtils';
import styles from './AssistantWidget.module.css';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    '¡Hola! Soy comunicadora social y periodista. Puedo contarte sobre mi experiencia, mis proyectos y el trabajo que he desarrollado en comunicación. ¿En qué puedo ayudarte?',
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
    isConfigured,
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
    if (inputValue.trim() && !isLoading && isConfigured) {
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
  // - Está configurado
  // - No hay mensajes del usuario aún
  const showSuggestions =
    isOpen && isConfigured && messages.filter((m) => m.role === 'user').length === 0;

  if (!isConfigured) {
    // Si no está configurado, mostrar un botón deshabilitado o nada
    return null;
  }

  const renderAvatar = () => (
    <img
      src="/tania-avatar.webp"
      alt="Tania"
      className={styles.avatarImage}
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'flex';
      }}
    />
  );

  const renderAvatarFallback = () => (
    <div className={styles.avatarFallback} style={{ display: 'none' }}>
      TP
    </div>
  );

  return (
    <>
      {/* Botón flotante */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.active : ''}`}
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        aria-expanded={isOpen}
      >
        <div className={styles.floatingButtonContent}>
          <div className={styles.avatarContainer}>
            {renderAvatar()}
            {renderAvatarFallback()}
          </div>
          {!isOpen && <span className={styles.buttonText}>Habla con Tania ✦</span>}
          {isOpen && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
      </button>

      {/* Panel conversacional */}
      {isOpen && (
        <div
          className={styles.chatPanel}
          role="complementary"
          aria-label="Asistente conversacional"
        >
          {/* Encabezado */}
          <div className={styles.chatHeader}>
            <div className={styles.headerAvatar}>
              {renderAvatar()}
              {renderAvatarFallback()}
            </div>
            <div className={styles.headerContent}>
              <div className={styles.headerTitleRow}>
                <div className={styles.titleWithBirthday}>
                  <h2 className={styles.headerTitle}>Tania ✦</h2>
                  {isTaniaBirthday() && (
                    <span className={styles.birthdayBadge}>🎂 {getTaniaAge()}</span>
                  )}
                </div>
                <div className={styles.statusIndicator}>
                  <span className={styles.statusDot}>●</span>
                  Disponible
                </div>
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
                <div className={styles.messageBubble}>
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
              disabled={isLoading || !isConfigured}
              aria-label="Campo de entrada para preguntas"
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={
                isLoading || !inputValue.trim() || !isConfigured
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
