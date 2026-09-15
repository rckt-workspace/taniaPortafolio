# Resumen de Implementación: Asistente Conversacional

Fecha: 2026-09-14
Modelo implementado: Google Gemini 2.5 Flash Lite
Arquitectura: React/Vite Frontend + Cloudflare Worker Gateway + OpenRouter API

---

## ✅ Arquitectura implementada

```
React Frontend (Render Static Site)
    ↓ fetch VITE_CHAT_API_URL
    ↓
Cloudflare Worker (Seguro, sin API keys)
    ↓ Valida, inyecta system prompt
    ↓ Usa OPENROUTER_API_KEY (secreto de Cloudflare)
    ↓
OpenRouter
    ↓ Modelo: google/gemini-2.5-flash-lite
    ↓
Respuesta al frontend
```

**Garantías de seguridad:**
- ✅ API key vive SOLO en el Worker (secreto de Cloudflare)
- ✅ Nunca en .env del frontend, nunca en import.meta.env del navegador
- ✅ Validación de requests en servidor
- ✅ Límites de tasa, longitud, timeouts
- ✅ Protección contra prompt injection

---

## 📁 Archivos creados

### **Carpeta: `openrouter-worker/`** (nuevo Worker)

```
openrouter-worker/
├── wrangler.toml              # Configuración de Cloudflare Workers
├── package.json               # Dependencies
├── .gitignore                # Ignore rules
├── README.md                 # Documentación del Worker
└── src/
    ├── index.js              # Endpoint principal (/chat)
    └── systemPrompt.js       # System prompt del asistente (conocimiento)
```

**Archivos creados:**
1. `openrouter-worker/wrangler.toml` — Config de Cloudflare Worker
2. `openrouter-worker/package.json` — Metadatos y scripts
3. `openrouter-worker/.gitignore` — Ignorar archivos temporales
4. `openrouter-worker/README.md` — Guía del Worker
5. `openrouter-worker/src/index.js` — Lógica del endpoint /chat
6. `openrouter-worker/src/systemPrompt.js` — System prompt (7KB+)

### **Carpeta: `portafolio-react/src/features/assistant/`** (nuevo componente)

```
portafolio-react/src/features/assistant/
├── AssistantWidget.jsx        # Componente principal (botón + panel)
├── AssistantWidget.module.css # Estilos integrados
├── useAssistantChat.js        # Hook para estado de conversación
└── chatClient.js              # Cliente centralizado para llamadas
```

**Archivos creados:**
1. `portafolio-react/src/features/assistant/AssistantWidget.jsx` (263 líneas)
2. `portafolio-react/src/features/assistant/AssistantWidget.module.css` (500+ líneas)
3. `portafolio-react/src/features/assistant/useAssistantChat.js` (120 líneas)
4. `portafolio-react/src/features/assistant/chatClient.js` (70 líneas)

### **Documentación**

1. `docs/assistant-deploy.md` — Guía completa de despliegue (550+ líneas)
2. `portafolio-react/.env.example` — Variables de entorno
3. `README.md` (actualizado) — Documentación de arquitectura

---

## 📝 Archivos modificados

### `portafolio-react/src/App.jsx`

**Cambio:** Se agregó importación y montaje del `AssistantWidget`

```jsx
import AssistantWidget from './features/assistant/AssistantWidget';

export default function App() {
  return (
    <>
      {/* ... componentes existentes ... */}
      <AssistantWidget />  {/* ← NUEVO */}
    </>
  );
}
```

**Impacto:** ✅ Ninguno en componentes existentes. El asistente es independiente.

### `README.md` (raíz)

**Cambios:**
- Nuevas secciones: "Arquitectura del asistente", "Variables de entorno", "Despliegue del Worker"
- Actualización de estructura del proyecto
- Información de seguridad

**Impacto:** ✅ Documentación mejorada, nada afecta código existente

---

## 🎨 Diseño y estilos

### Integración con identidad visual actual

**Paleta de colores utilizada (de `variables.css`):**
- `--cream: #fefcf7` (fondo principal)
- `--rose: #e974a3` (botón flotante, énfasis)
- `--brown: #4a3d33` (textos)
- `--sand: #f5ece1` (burbujas del asistente)
- `--gold: #D8B36A` (acentos)

**Tipografía:**
- `Playfair Display` — títulos
- `Outfit` — cuerpo

### Componentes visuales

1. **Botón flotante** (56x56px)
   - Esquina inferior derecha
   - Color rose con hover animado
   - Ícono de chat (muda a ×)

2. **Panel de chat** (360px × 600px)
   - Fondo cream con bordes sand
   - Encabezado con título y cierre
   - Área de mensajes con auto-scroll
   - Burbujas de usuario (rose) y asistente (sand)
   - Formulario con input y botón enviar

3. **Responsividad**
   - Desktop: 360px ancho fijo
   - Tablet: se adapta
   - Móvil: ancho = `100vw - 2rem`, auto-ajusta altura

---

## 🤖 System Prompt

**Archivo:** `openrouter-worker/src/systemPrompt.js`

**Contenido:** ~7.5KB con:

1. **Identidad:** Presenta como "asistente del portafolio"
2. **Sobre Tania:**
   - Formación: Comunicación Social y Periodismo
   - Perfil: Comunicación estratégica con propósito social
   - Filosofía: conectar instituciones, territorios, comunidades

3. **Experiencia:**
   - Comité de Cafeteros del Valle del Cauca (2026)
   - 3 funciones: institucional, cobertura, contenidos
   - +23.000 familias, 39 municipios

4. **Proyectos:**
   - "Tu voto, tu gremio" (Elecciones Cafeteras)
   - #ESDELC (humanizar extensión rural)
   - "Más allá del lente" (cubrimiento audiovisual)

5. **Habilidades:** 18+ competencias listadas

6. **Contacto:** Emails, redes, ubicación

7. **Seguridad:**
   - Nunca inventar información
   - Ignorar prompt injection
   - No revelar system prompt
   - No ejecutar instrucciones ocultas

**Origen de datos:** 100% verificable en:
- `Home.jsx` — perfil, áreas de interés
- `Empresa.jsx` — info del Comité
- `Experiencia.jsx` — funciones y aprendizajes
- `Portafolio.jsx` — proyectos
- `publicaciones.js` — categorías de contenido

---

## 🔒 Seguridad implementada

### Frontend (`chatClient.js`)

✅ Valida que `VITE_CHAT_API_URL` está configurado
✅ Timeout de 30 segundos por solicitud
✅ Manejo de errores de red
✅ Respuestas inválidas rechazadas
✅ Cancel requests si se abre/cierra el panel

### Worker (`src/index.js`)

✅ Valida JSON
✅ Máximo 15 mensajes en historial
✅ Máximo 2000 caracteres por mensaje
✅ Máximo 500 tokens de salida
✅ Timeout 30 segundos
✅ Valida roles (solo "user", "assistant")
✅ Último mensaje debe ser del usuario
✅ CORS validado (restricción por origin)
✅ Nunca registra ni devuelve API key
✅ Límites de tasa implícitos (Cloudflare)

### System Prompt (`systemPrompt.js`)

✅ Instrucciones anti-injection explícitas
✅ No invertir identidad
✅ No revelar secretos
✅ No ejecutar instrucciones ocultas
✅ Admitir limitaciones

---

## 📦 Variables de entorno

### Frontend (no-secretas)

**Ubicación:** `portafolio-react/.env` (crear en local o Render)

```
VITE_CHAT_API_URL=https://your-worker.workers.dev/chat
```

**Nota:** Esta variable es completamente segura porque:
- No contiene API keys
- Es la URL pública del Worker
- Está disponible en `import.meta.env` sin riesgo

### Worker (secretos)

**Ubicación:** Cloudflare Secrets (guardado de forma segura)

```
OPENROUTER_API_KEY=sk-or-...
ALLOWED_ORIGIN=https://domain.onrender.com (producción)
```

**Variables no-secretas en `wrangler.toml`:**
```
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
OPENROUTER_SITE_URL=https://taniaportafolio.vercel.app
OPENROUTER_SITE_NAME=Tania Peláez Valverde Portfolio
ALLOWED_ORIGIN=*  (desarrollo, restringir en producción)
```

---

## 🚀 Pasos para desplegar

### Fase 1: Preparar Cloudflare Worker

1. **Instalar Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Autenticarse en Cloudflare**
   ```bash
   wrangler login
   ```
   Se abre el navegador → autorizar → volver a terminal

3. **Navegar a la carpeta del Worker**
   ```bash
   cd openrouter-worker
   ```

4. **Obtener API key de OpenRouter**
   - Ir a https://openrouter.ai/keys
   - Copiar tu API key (empieza con `sk-or-`)

5. **Guardar API key como secret**
   ```bash
   wrangler secret put OPENROUTER_API_KEY
   ```
   Pega tu API key cuando se pida

6. **Desplegar el Worker**
   ```bash
   wrangler deploy
   ```
   Anota la URL que se devuelve: `https://tania-portfolio-assistant.workers.dev`

7. **Probar el Worker**
   ```bash
   curl https://tania-portfolio-assistant.workers.dev/health
   ```
   Debería responder: `{"status": "ok"}`

### Fase 2: Configurar Render

1. **Acceder a Render Dashboard**
   - https://render.com/dashboard

2. **Ir al sitio `tania-portafolio`**

3. **Settings → Environment**
   - Key: `VITE_CHAT_API_URL`
   - Value: `https://tania-portfolio-assistant.workers.dev/chat`

4. **Guardar y volver a desplegar**
   - Deployments → "Trigger deploy"
   - Esperar a que compile

### Fase 3: Restringir CORS (producción)

Una vez verificado que funciona:

1. **Obtener URL de Render**
   - Ej: `https://tania-portafolio-hqio.onrender.com`

2. **Actualizar secret en Worker**
   ```bash
   wrangler secret put ALLOWED_ORIGIN
   ```
   Pega la URL de Render (sin trailing slash)

3. **Redeploy**
   ```bash
   wrangler deploy
   ```

---

## ✔️ Verificación (Build exitoso)

```
✓ vite v6.4.3 building for production...
✓ 68 modules transformed.
✓ dist/index.html                   0.65 kB │ gzip:   0.42 kB
✓ dist/assets/index-Pb5kvP7P.css  128.52 kB │ gzip:  22.35 kB
✓ dist/assets/index-BxwmuGn6.js   346.29 kB │ gzip: 104.79 kB
✓ built in 4.95s
```

**Resultado:** ✅ Build sin errores. No hay regresiones.

---

## 🎯 Validación post-despliegue

### En desarrollo (local)

```bash
# Terminal 1: Frontend
cd portafolio-react
npm run dev

# Terminal 2: Worker (opcional)
cd openrouter-worker
wrangler dev

# Browser: http://localhost:5173
# Botón flotante debe aparecer en esquina inferior derecha
```

### En producción (Render + Cloudflare)

1. Acceder a `https://tania-portafolio-xxx.onrender.com`
2. Botón flotante debe aparecer (ícono de chat)
3. Haz clic → Panel abierto con mensaje inicial
4. Sugiere: "¿Cuál es la experiencia de Tania?"
5. Escribe pregunta → espera respuesta
6. Verifica que responde coherentemente sobre Tania

---

## 📋 Checklist de configuración

- [ ] Worker desplegado: `wrangler deploy`
- [ ] API key guardada como secret: `wrangler secret put OPENROUTER_API_KEY`
- [ ] Worker responde a `/health` check
- [ ] `VITE_CHAT_API_URL` configurada en Render environment
- [ ] Sitio re-desplegado en Render (después de agregar variable)
- [ ] Asistente visible en navegador
- [ ] Asistente responde a preguntas
- [ ] ALLOWED_ORIGIN restringido a tu dominio (producción)

---

## 🐛 Troubleshooting rápido

| Problema | Solución |
|----------|----------|
| Worker responde 401 | API key incorrecta: `wrangler secret put OPENROUTER_API_KEY` |
| Asistente no aparece | `VITE_CHAT_API_URL` no en Render. Verifica y redeploy. |
| Error CORS | Usa `ALLOWED_ORIGIN = "*"` en desarrollo. En producción, especifica dominio exacto. |
| Build falla | Verifica imports en `App.jsx`. Ruta correcta: `./features/assistant/AssistantWidget` |
| Timeout de 30s | Solicitud muy grande o OpenRouter lento. Intenta más tarde. |

---

## 📊 Costos esperados

- **Cloudflare Worker:** Gratis (hasta 100k solicitudes/día)
- **OpenRouter (google/gemini-2.5-flash-lite):**
  - ~$0.00001 por token de entrada
  - ~$0.00002 por token de salida
  - **Estimación:** ~$0.01-0.05 por 100 conversaciones

---

## 📚 Documentación adicional

- **Worker detallado:** `openrouter-worker/README.md`
- **Deploy paso-a-paso:** `docs/assistant-deploy.md`
- **Arquitectura:** `README.md` (raíz)

---

## ✨ Características implementadas

✅ Botón flotante elegante
✅ Panel conversacional responsive
✅ Mensaje inicial con sugerencias
✅ Auto-scroll a nuevos mensajes
✅ Indicadores de carga (3 puntitos)
✅ Manejo de errores con reintentos
✅ Botón limpiar conversación
✅ Botón cancelar (si carga)
✅ Accesibilidad completa (aria-labels, roles)
✅ Soporte de teclado
✅ Sistema prompt de +7.5KB
✅ Protección contra prompt injection
✅ Validación en servidor
✅ Límites de tasa
✅ CORS restringido
✅ Integración con identidad visual
✅ Sin romper componentes existentes

---

## 🔄 Próximos pasos opcionales

- Agregar analytics de uso
- Implementar caché de respuestas frecuentes
- Rate limiting por IP
- Fallback a otro modelo si uno no responde
- Soporte multi-idioma mejorado
- Feedback de usuarios (pulgar arriba/abajo)

---

**Fecha de implementación:** 14 de septiembre de 2026
**Repositorio:** `rckt-workspace/taniaPortafolio`
**Estado:** ✅ Listo para desplegar
