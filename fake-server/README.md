# Fake Chat Server (Socket.IO)

Servidor fake para pruebas de chat en tiempo real con salas aisladas por usuario/contacto.

## Caracteristicas

- Aislamiento por sala (`roomId`) para que los mensajes no se crucen entre usuarios.
- Historial en memoria por sala (`chat_history`).
- Recepcion de mensajes (`chat_message`) con ACK.
- Respuesta automatica fake para simular conversacion.

## Ejecutar

```bash
npm run chat:server
```

El script carga variables desde `.env` automaticamente.

Variables opcionales:

- `CHAT_SOCKET_PORT` (default: `4001`)
- `NEXT_PUBLIC_CHAT_SOCKET_URL` en la app Next (default: `http://localhost:4001`)

Ejemplo en `.env`:

```dotenv
CHAT_SOCKET_PORT=4002
NEXT_PUBLIC_CHAT_SOCKET_URL=http://localhost:4002
```

## Error EADDRINUSE

Si ves `EADDRINUSE`, significa que ya hay otro proceso usando el puerto `4001`.

```bash
lsof -i :4001 -P -n
kill -9 <PID>
```

Tambien puedes arrancar en otro puerto:

```bash
CHAT_SOCKET_PORT=4002 npm run chat:server
NEXT_PUBLIC_CHAT_SOCKET_URL=http://localhost:4002 npm run dev
```

## Endpoint de health

- `GET /health`

