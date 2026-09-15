# Despliegue del Asistente Conversacional

Este documento explica cómo desplegar el Cloudflare Worker que actúa como gateway seguro hacia OpenRouter.

## Arquitectura general

```
Frontend (React/Vite)
  → solicita /chat al Worker
  → Cloudflare Worker (openrouter-worker/)
    → valida y limita requests
    → llama a OpenRouter con API key protegida
    → responde al frontend
```

**Importante:** La API key de OpenRouter NUNCA sale del Worker. El frontend solo conoce la URL pública del Worker.

---

## Requisitos previos

- Cuenta en [Cloudflare](https://cloudflare.com) (gratuita)
- Cuenta en [OpenRouter](https://openrouter.ai)
- API key de OpenRouter generada
- Node.js >= 18
- Wrangler CLI instalado globalmente

---

## Paso 1: Instalar Wrangler CLI

```bash
npm install -g wrangler
```

Verifica la instalación:

```bash
wrangler --version
```

---

## Paso 2: Autenticarse en Cloudflare

```bash
wrangler login
```

Se abrirá tu navegador para autorizar la aplicación CLI. Completa el flujo de autenticación.

---

## Paso 3: Configurar el Worker

### 3.1 Navega a la carpeta del Worker

```bash
cd openrouter-worker
```

### 3.2 Revisa `wrangler.toml`

El archivo ya contiene la configuración básica:

```toml
name = "tania-portfolio-assistant"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
ALLOWED_ORIGIN = "*"
OPENROUTER_MODEL = "google/gemini-2.5-flash-lite"
OPENROUTER_SITE_URL = "https://taniaportafolio.vercel.app"
OPENROUTER_SITE_NAME = "Tania Peláez Valverde Portfolio"
```

Puedes ajustar:
- `OPENROUTER_MODEL` - modelo a usar (consulta OpenRouter para opciones)
- `OPENROUTER_SITE_URL` - URL de tu portafolio
- `OPENROUTER_SITE_NAME` - nombre del sitio
- `ALLOWED_ORIGIN` - restringir CORS (inicialmente `*` para pruebas; después especifica el dominio de Render)

---

## Paso 4: Configurar la API key como secret

El secret debe guardarse de forma segura y no aparecer en archivos de configuración.

### 4.1 Crear o actualizar el secret

```bash
wrangler secret put OPENROUTER_API_KEY
```

El sistema te pedirá que pegues la API key. Hazlo:

1. Obtén tu API key de [OpenRouter Dashboard](https://openrouter.ai/keys)
2. Pégala en el prompt de Wrangler
3. Presiona Enter

**Importante:** No incluyas la API key en `wrangler.toml` ni en ningún archivo. Los secrets se almacenan de forma segura en Cloudflare.

### 4.2 Verificar el secret (sin ver el valor)

```bash
wrangler secret list
```

Debería listar `OPENROUTER_API_KEY` como "redacted".

---

## Paso 5: Desplegar el Worker

### Opción A: Desplegar en un subdominio de workers.dev

```bash
wrangler deploy
```

Cloudflare asignará automáticamente una URL como:
```
https://tania-portfolio-assistant.workers.dev
```

Anota esta URL — la necesitarás en el siguiente paso.

### Opción B: Desplegar en un dominio personalizado (opcional)

Si usas un dominio personalizado con Cloudflare:

1. Edita `wrangler.toml` y añade:
   ```toml
   route = "mi-dominio.com/chat/*"
   zone_id = "TU_ZONE_ID"
   ```

2. Obtén tu `zone_id` de Cloudflare Dashboard → Sitio → Overview (derecha, copiar Zone ID)

3. Despliega:
   ```bash
   wrangler deploy
   ```

---

## Paso 6: Probar el Worker

### Prueba básica (health check)

```bash
curl https://your-worker-url.workers.dev/health
```

Debería responder:
```json
{"status": "ok"}
```

### Prueba de chat

```bash
curl -X POST https://your-worker-url.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hola"}]}'
```

Debería responder con un objeto JSON:
```json
{
  "role": "assistant",
  "content": "Hola 👋 Soy el asistente..."
}
```

Si obtienes errores de autenticación, verifica que el secret se haya guardado correctamente.

---

## Paso 7: Configurar Render (Frontend)

### 7.1 Crear o localizar tu variable de entorno en Render

1. Ve a [Render Dashboard](https://render.com)
2. Selecciona tu Static Site (`tania-portafolio`)
3. Navega a **Settings** → **Environment**
4. Crea o actualiza una variable:
   - **Key:** `VITE_CHAT_API_URL`
   - **Value:** `https://your-worker-url.workers.dev/chat`

### 7.2 Re-desplegar el Static Site

1. Ve a **Deployments**
2. Haz clic en **Trigger Deploy** (redeploy)
3. Espera a que compile. El build debe incluir la nueva variable de entorno.

---

## Paso 8: Restricción de CORS (producción)

Una vez que el frontend está en producción, restringe CORS para mejorar seguridad:

### 8.1 Obten la URL de tu sitio en Render

Por ejemplo: `https://tania-portafolio-hqio.onrender.com`

### 8.2 Actualiza el secret `ALLOWED_ORIGIN`

```bash
wrangler secret put ALLOWED_ORIGIN
```

Pega la URL de tu sitio (sin `/` al final):
```
https://tania-portafolio-hqio.onrender.com
```

### 8.3 Redeploy del Worker

```bash
wrangler deploy
```

Ahora solo las solicitudes desde tu dominio serán aceptadas.

---

## Solución de problemas

### Error: "OPENROUTER_API_KEY not configured"

**Causa:** El secret no se guardó correctamente.

**Solución:**
```bash
wrangler secret put OPENROUTER_API_KEY
# Pega la API key cuando se solicite
wrangler deploy
```

---

### Error: "401 Unauthorized" desde el frontend

**Causa:** La API key no es válida o expiró.

**Solución:**
1. Verifica que tu API key es correcta en [OpenRouter](https://openrouter.ai/keys)
2. Actualiza el secret:
   ```bash
   wrangler secret put OPENROUTER_API_KEY
   ```
3. Redeploy:
   ```bash
   wrangler deploy
   ```

---

### Error: "CORS blocked"

**Causa:** El origen del request no coincide con `ALLOWED_ORIGIN`.

**Solución:**
- Para desarrollo local, usa `ALLOWED_ORIGIN = "*"` en `wrangler.toml`
- Para producción, asegúrate de que `ALLOWED_ORIGIN` sea exactamente la URL de tu sitio en Render (sin trailing slash)

---

### El asistente no aparece en el frontend

**Causa:** `VITE_CHAT_API_URL` no está configurada o es incorrecta.

**Solución:**
1. Verifica en Render → Settings → Environment que `VITE_CHAT_API_URL` está presente
2. Verifica que el valor sea exactamente tu URL del Worker (incluyendo `/chat`)
3. Re-despliega el Static Site en Render

---

## Monitoreo y logs

### Ver logs del Worker

```bash
wrangler tail
```

Esto abrirá un stream en vivo de logs. Haz solicitudes desde el frontend para ver qué sucede.

### Ver logs en Cloudflare Dashboard

1. Ve a Cloudflare Dashboard → Workers → tania-portfolio-assistant
2. Navega a **Logs**
3. Verás las últimas solicitudes y respuestas

---

## Actualizar el Worker

Si haces cambios al código del Worker:

1. Edita los archivos en `openrouter-worker/src/`
2. Redeploy:
   ```bash
   wrangler deploy
   ```

No necesitas actualizar el frontend a menos que cambien las rutas o formato de respuesta.

---

## Eliminar o deshabilitar el Worker

### Pausar (deshabilitar sin borrar)

```bash
wrangler deployments list
```

Puedes pausar desde el Dashboard, pero es más fácil simplemente no actualizar la variable `VITE_CHAT_API_URL` en Render.

### Eliminar completamente

```bash
wrangler delete tania-portfolio-assistant
```

Después, elimina el repositorio `openrouter-worker/` o simplemente no lo despliegues.

---

## Costos

- **Cloudflare Workers:** Gratis hasta 100,000 solicitudes/día
- **OpenRouter:** Pago por token según el modelo usado
  - Modelo recomendado (`google/gemini-2.5-flash-lite`): ~$0.00001 por token de entrada

Para estimar costos, consulta el [pricing de OpenRouter](https://openrouter.ai/pricing).

---

## Seguridad

✅ **Lo que está protegido:**
- API key nunca se expone al navegador
- Validación de requests en el servidor
- CORS restringido en producción
- Protección contra prompt injection
- Límites de tasa (máximo de solicitudes)

⚠️ **Monitorea:**
- Logs del Worker para solicitudes anómalas
- Uso de tokens en OpenRouter (cambios drásticos indican abuso)
- IP addresses que generan muchas solicitudes

---

## Referencias

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/cli-wrangler/)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
