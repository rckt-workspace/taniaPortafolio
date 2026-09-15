# ⚡ Despliegue rápido (5 minutos)

## Requisitos previos

- Node.js >= 18
- Cuenta Cloudflare (gratis)
- API key OpenRouter

---

## 1️⃣ Instalar Wrangler (1 min)

```bash
npm install -g wrangler
wrangler --version  # Verifica que está instalado
```

---

## 2️⃣ Autenticarse en Cloudflare (1 min)

```bash
wrangler login
```

Se abrirá navegador → autorizar → volver a terminal

---

## 3️⃣ Guardar API key (1 min)

```bash
cd openrouter-worker
wrangler secret put OPENROUTER_API_KEY
```

Pega tu API key (de https://openrouter.ai/keys) cuando se pida. Presiona Enter.

---

## 4️⃣ Desplegar (1 min)

```bash
wrangler deploy
```

Anota la URL que aparece:
```
✓ Uploaded tania-portfolio-assistant
https://tania-portfolio-assistant.workers.dev
```

**Tu URL:** `https://tania-portfolio-assistant.workers.dev`

---

## 5️⃣ Configurar Render (1 min)

1. Ir a https://render.com/dashboard
2. Seleccionar sitio `tania-portafolio`
3. **Settings → Environment**
4. Agregar variable:
   - **Key:** `VITE_CHAT_API_URL`
   - **Value:** `https://tania-portfolio-assistant.workers.dev/chat`
   (cambia el nombre del Worker si es diferente)

5. **Deployments → Trigger Deploy**

---

## ✅ Listo

El asistente debería estar funcionando en ~2 minutos después del redeploy.

---

## 🧪 Verificar que funciona

### Test rápido del Worker

```bash
curl https://tania-portfolio-assistant.workers.dev/health
```

Debería responder: `{"status":"ok"}`

### Test en el navegador

1. Ir a tu sitio en Render
2. Ver botón flotante en esquina inferior derecha
3. Haz clic
4. Escribe: "¿Quién es Tania?"
5. Verifica que responde sobre Tania

---

## ❌ Algo salió mal?

| Problema | Solución |
|----------|----------|
| Error "401" | API key incorrecta. Prueba: `wrangler secret put OPENROUTER_API_KEY` |
| Botón no aparece | `VITE_CHAT_API_URL` no en Render. Verifica y redeploy. |
| "No responde" | Cloudflare en caché. Espera 30 segundos y recarga. |

---

## 🔐 Restringir CORS (después, en producción)

Una vez que todo funciona:

```bash
wrangler secret put ALLOWED_ORIGIN
```

Pega tu URL de Render (ej: `https://tania-portafolio-xxx.onrender.com`)

---

**Tiempo total:** ~5 minutos ⚡
