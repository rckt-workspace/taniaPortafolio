# taniaPortafolio

Portafolio de Tania Peláez Valverde.

## Estructura

- `portafolio-react/` — sitio actual (Vite + React + React Router).
- `portafolio-v1-main/` — versión estática original en HTML/CSS/JS, conservada como referencia.

## Desarrollo local

```
cd portafolio-react
npm install
npm run dev
```

## Despliegue en Render

El repo incluye `render.yaml` en la raíz (Blueprint de Render):

1. En el dashboard de Render: **New → Blueprint** y conecta este repositorio (`rckt-workspace/taniaPortafolio`).
2. Render detecta `render.yaml` automáticamente y crea un Static Site que:
   - construye desde `portafolio-react/` (`npm install && npm run build`),
   - publica la carpeta `dist/`,
   - reescribe cualquier ruta (`/empresa`, `/experiencia`, `/portafolio`) hacia `index.html` para que React Router funcione al recargar o entrar por link directo.
3. Cada push a `main` vuelve a desplegar automáticamente.

Si prefieres configurarlo a mano en vez de usar el Blueprint (**New → Static Site**), usa estos valores:

| Campo | Valor |
|---|---|
| Root Directory | `portafolio-react` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Rewrite rule | `/*` → `/index.html` |
