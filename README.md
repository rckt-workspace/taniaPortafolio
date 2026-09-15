# taniaPortafolio

Portafolio profesional de Tania Peláez Valverde con asistente conversacional integrado.

## Estructura

- `portafolio-react/` — sitio principal (Vite + React + React Router) con asistente integrado.
  - `src/features/assistant/` — componentes y lógica del asistente conversacional.
- `openrouter-worker/` — Cloudflare Worker que actúa como gateway seguro a OpenRouter (protege la API key).
- `docs/` — documentación adicional (deploy del Worker, etc.).

## Arquitectura del asistente

```
Frontend (React en Render)
  ↓ VITE_CHAT_API_URL (variable de entorno)
  ↓
Cloudflare Worker (openrouter-worker)
  ✓ Valida requests
  ✓ Inyecta system prompt
  ✓ Protege API key de OpenRouter
  ↓
OpenRouter API
  ↓
Respuesta al frontend
```

**Importante:** La API key de OpenRouter se almacena de forma segura en el Worker (secreto de Cloudflare). El frontend NUNCA la ve.

## Desarrollo local

### Frontend

```bash
cd portafolio-react
npm install
npm run dev
```

Abre http://localhost:5173

### Worker (opcional, para desarrollo local del asistente)

```bash
cd openrouter-worker
npm install
wrangler dev
```

El Worker correrá en http://localhost:8787

## Variables de entorno

### Frontend (`portafolio-react/.env`)

```
VITE_CHAT_API_URL=https://your-worker.workers.dev/chat
```

Ejemplo: `https://tania-portfolio-assistant.workers.dev/chat`

**Nota:** Esta variable NO contiene API keys. Es completamente segura estar en el navegador.

### Worker (Cloudflare secrets)

```
OPENROUTER_API_KEY=sk-or-...
ALLOWED_ORIGIN=https://taniaportafolio-xxx.onrender.com (producción)
```

Ver `docs/assistant-deploy.md` para instrucciones detalladas de configuración.

## Despliegue en Render

El repo incluye `render.yaml` (Blueprint de Render):

1. En Render Dashboard: **New → Blueprint** y conecta este repositorio.
2. Render crea un Static Site que:
   - Construye desde `portafolio-react/` con `npm install && npm run build`
   - Publica `dist/`
   - Reescribe rutas (`/empresa`, `/experiencia`, `/portafolio`) a `index.html` para React Router

3. **Agregar variable de entorno:**
   - Luego de crear el sitio, ve a **Settings → Environment**
   - Agrega: `VITE_CHAT_API_URL=https://your-worker.workers.dev/chat`
   - Haz redeploy

4. Cada push a `main` redeploya automáticamente.

Si prefieres configuración manual (**New → Static Site**):

| Campo | Valor |
|---|---|
| Root Directory | `portafolio-react` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Rewrite rule | `/*` → `/index.html` |
| Environment variable | `VITE_CHAT_API_URL` = tu URL del Worker |

## Despliegue del Worker

Ver `docs/assistant-deploy.md` para instrucciones completas:

1. Instalar Wrangler CLI
2. Autenticarse en Cloudflare
3. Configurar API key como secret
4. Desplegar con `wrangler deploy`
5. Copiar URL y actualizar `VITE_CHAT_API_URL` en Render

Resumen rápido:

```bash
cd openrouter-worker
npm install -g wrangler
wrangler login
wrangler secret put OPENROUTER_API_KEY  # Pega tu API key
wrangler deploy
# Copia la URL → Configura en Render → Redeploy
```

## Componentes del asistente

### Frontend

- `AssistantWidget.jsx` — Widget principal (botón flotante + panel de chat)
- `useAssistantChat.js` — Hook que maneja estado de conversación
- `chatClient.js` — Cliente centralizado para llamadas al Worker
- `AssistantWidget.module.css` — Estilos (usa paleta de colores del portafolio)

### Worker

- `src/index.js` — Endpoint `/chat` con validación y límites de seguridad
- `src/systemPrompt.js` — System prompt completo (conocimiento del asistente)
- `wrangler.toml` — Configuración de Cloudflare

## Build y validación

```bash
# Desde portafolio-react
npm install
npm run build

# Verificar que no hay errores de compilación
```

El build debe completarse sin errores. Si ocurren errores de importación, verifica que `AssistantWidget.jsx` y sus dependencias están en las rutas correctas.

## Características del asistente

✅ Botón flotante elegante en esquina inferior derecha
✅ Panel conversacional integrado con identidad visual del portafolio
✅ Colores: rose (#e974a3), brown (#4a3d33), sand (#f5ece1), gold (#D8B36A)
✅ Tipografía: Playfair Display (títulos), Outfit (cuerpo)
✅ Responsive (desktop, tablet, mobile)
✅ Mensaje inicial con sugerencias contextuales
✅ Indicadores de carga y errores
✅ Botón para limpiar conversación
✅ Botón para reintentar si hay error
✅ Auto-scroll al último mensaje
✅ Accesibilidad: aria-labels, teclado, roles semánticos
✅ Protección contra prompt injection
✅ Límites de tasa y validación en servidor

## Conocimiento del asistente

El asistente "conoce" todo sobre Tania a partir de:
- Información en Home.jsx, Empresa.jsx, Experiencia.jsx, Portafolio.jsx
- Datos en publicaciones.js
- Nada se inventa; todo es verificable en el portafolio

Responde sobre:
- Perfil y formación de Tania
- Experiencia en Comité de Cafeteros
- Funciones, responsabilidades y logros
- Proyectos: "Tu voto, tu gremio", #ESDELC, "Más allá del lente"
- Habilidades profesionales
- Cómo contactar a Tania

## Seguridad

🔒 **Lo que está protegido:**
- API key nunca llega al navegador (vive en el Worker)
- Validación de requests en servidor (no solo frontend)
- CORS restringido en producción
- Límites de mensajes, longitud, tokens
- Timeouts y protección contra prompt injection

⚠️ **Monitorear:**
- Logs del Worker para activity anómala
- Uso de tokens en OpenRouter (cambios bruscos = abuso)
- Rate de solicitudes

## Troubleshooting

**El asistente no aparece:**
- Verifica `VITE_CHAT_API_URL` en Render environment variables
- Verifica que la URL es correcta y accesible
- Redeploy el sitio

**Error "configuración incorrecta":**
- Verifica que el Worker está desplegado
- Verifica que el secret `OPENROUTER_API_KEY` está guardado
- Prueba: `curl https://your-worker.workers.dev/health`

**"Demasiadas solicitudes":**
- Espera un momento (rate limiting)
- Limpia la conversación
- Recarga la página

Ver `docs/assistant-deploy.md` para troubleshooting más detallado.
