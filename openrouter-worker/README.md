# Tania Portfolio Assistant Worker

Gateway seguro de Cloudflare Worker que protege la API key de OpenRouter y actúa como intermediario entre el frontend y la API de OpenRouter.

## Propósito

Este Worker implementa un endpoint `/chat` que:

1. **Valida requests** del frontend
2. **Protege la API key** (nunca se expone al navegador)
3. **Limita abuso** (máx de mensajes, longitud, timeouts)
4. **Añade system prompt** en el servidor
5. **Llama a OpenRouter** de forma segura
6. **Devuelve respuestas** al frontend

## Estructura

```
openrouter-worker/
├── wrangler.toml          # Configuración de Cloudflare
├── package.json           # Dependencies (si las hay)
├── README.md             # Este archivo
└── src/
    ├── index.js          # Endpoint principal del Worker
    └── systemPrompt.js   # System prompt del asistente
```

## Configuración

### Variables de entorno (no-secretas)

En `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGIN = "*"  # Restricción CORS (usar "*" en dev, dominio específico en prod)
OPENROUTER_MODEL = "google/gemini-2.5-flash-lite"
OPENROUTER_SITE_URL = "https://taniaportafolio.vercel.app"
OPENROUTER_SITE_NAME = "Tania Peláez Valverde Portfolio"
```

### Secretos

Guardado de forma segura en Cloudflare:

```
OPENROUTER_API_KEY = "sk-or-..."  # Tu API key de OpenRouter
ALLOWED_ORIGIN = "https://domain.onrender.com"  # (opcional, para producción)
```

Para configurarlos:

```bash
wrangler secret put OPENROUTER_API_KEY
wrangler secret put ALLOWED_ORIGIN
```

## Desarrollo local

```bash
cd openrouter-worker

# Instalar dependencias (si las hay)
npm install

# Ejecutar en modo development
wrangler dev

# El Worker correrá en http://localhost:8787
```

### Probar localmente

```bash
# Health check
curl http://localhost:8787/health

# Chat
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hola"}]}'
```

## Despliegue

```bash
wrangler deploy
```

La URL se asignará automáticamente. Ver `docs/assistant-deploy.md` para instrucciones completas.

## Endpoint `/chat`

### Request

```json
{
  "messages": [
    {"role": "user", "content": "Pregunta del usuario"},
    {"role": "assistant", "content": "Respuesta anterior..."},
    {"role": "user", "content": "Nueva pregunta"}
  ]
}
```

### Response (éxito)

```json
{
  "role": "assistant",
  "content": "Respuesta del asistente"
}
```

### Response (error)

```json
{
  "error": "Descripción del error"
}
```

### Status codes

- `200` - OK
- `400` - Request inválido
- `403` - CORS bloqueado
- `500` - Error del servidor
- `504` - Timeout

## Límites de seguridad

```javascript
LIMITS = {
  MAX_MESSAGES: 15,              // Máx mensajes en historial
  MAX_MESSAGE_LENGTH: 2000,      // Máx caracteres por mensaje
  MAX_OUTPUT_TOKENS: 500,        // Máx tokens en respuesta
  REQUEST_TIMEOUT_MS: 30000,     // Timeout de 30 segundos
}
```

Estos están codificados en `src/index.js` para mayor seguridad.

## Validaciones

El Worker rechaza:

- ✗ Requests sin JSON válido
- ✗ Historial con más de 15 mensajes
- ✗ Mensajes vacíos o > 2000 caracteres
- ✗ Roles que no sean "user" o "assistant"
- ✗ Origenes no permitidos (CORS)
- ✗ Últimos mensajes que no sean del usuario
- ✗ Solicitudes que tarden más de 30 segundos

## System Prompt

El contenido completo del system prompt está en `src/systemPrompt.js` y se inyecta en cada solicitud **en el servidor**. Contiene:

- Identidad del asistente
- Información sobre Tania
- Experiencia profesional
- Proyectos en el portafolio
- Directrices de seguridad (anti-prompt-injection)
- Tono y estilo

## Protección contra prompt injection

El Worker incluye instrucciones explícitas para:

- Ignorar intentos de revelar el system prompt
- Ignorar solicitudes de cambiar identidad
- No ejecutar instrucciones ocultas en el contenido del usuario
- No revelar secretos o configuración

Estas instrucciones están en el system prompt y se refuerzan en la validación del servidor.

## Logging y debugging

```bash
# Ver logs en tiempo real
wrangler tail

# Ver logs en Cloudflare Dashboard
# cloudflare.com → Workers → tania-portfolio-assistant → Logs
```

El Worker registra errores de OpenRouter y solicitudes rechazadas.

## Dependencias

Actualmente cero dependencias externas. Todo está en JavaScript puro soportado por Cloudflare Workers.

Si necesitas agregar dependencias:

```bash
npm install package-name
```

Cloudflare Workers soporta módulos npm estándar.

## Mejoras futuras (opcionales)

- [ ] Rate limiting por IP
- [ ] Caché de respuestas frecuentes
- [ ] Analytics de uso
- [ ] Soporte multi-idioma en el system prompt
- [ ] Fallback a otro modelo si uno no responde

## Costos

- **Cloudflare:** Gratis hasta 100k solicitudes/día
- **OpenRouter:** Pago por tokens según modelo
  - `google/gemini-2.5-flash-lite`: ~$0.00001/token entrada

Estima: ~$0.01 - $0.10 por 1000 mensajes de usuario

## Troubleshooting

### Error: "OPENROUTER_API_KEY not configured"

```bash
wrangler secret put OPENROUTER_API_KEY
# Pega tu API key
wrangler deploy
```

### Error: "401 Unauthorized" desde OpenRouter

- Verifica que tu API key es válida en https://openrouter.ai/keys
- Actualiza el secret
- Redeploy

### Error: "CORS blocked"

En `wrangler.toml`, para desarrollo:
```toml
ALLOWED_ORIGIN = "*"
```

Para producción, especifica tu dominio en Render exactamente.

### Logs no aparecen

```bash
# Ejecutar tail en modo development
wrangler dev
# Haz solicitudes en otra terminal
```

## Soporte

Consulta `docs/assistant-deploy.md` para guía completa de despliegue.
