# Mirage Access System — Batán 3

Panel de control de accesos para el edificio Batán 3. Permite abrir las puertas del edificio desde el celular o cualquier navegador en la red local.

## Stack

- Vue 3 + Vite
- Bootstrap 5
- Tailwind CSS 4
- PWA (instalable, modo standalone)

## Desarrollo

```bash
npm install
npm run dev      # Servidor de desarrollo (accesible en la LAN)
npm run build    # Build de producción
npm run preview  # Vista previa del build
```

## Funcionalidad

- **Principal** — abre la puerta principal (p1)
- **Intermedia** — abre la puerta intermedia (p2)
- **Ambas** — abre ambas puertas simultáneamente

El estado del dispositivo Wemos se verifica cada 5 segundos. Los botones se deshabilitan si el dispositivo está offline.

## Backend

La app se conecta a `http://192.168.100.16:5003`:

| Endpoint        | Descripción                        |
|-----------------|------------------------------------|
| `GET /status`   | Devuelve `{ online: boolean }`     |
| `POST /open/p1` | Abre la puerta principal           |
| `POST /open/p2` | Abre la puerta intermedia          |
