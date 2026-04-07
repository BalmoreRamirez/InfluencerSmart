# InfluencerSmart

Ambiente de desarrollo inicial para un proyecto escalable con Next.js (App Router), TypeScript, ESLint y Tailwind CSS.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estructura de carpetas

```txt
src/
	app/
		(public)/
		(auth)/
		(dashboard)/
		api/
		providers/
		favicon.ico
		globals.css
		layout.tsx
		page.tsx
	features/
	entities/
	widgets/
	shared/
		components/
			ui/
			layout/
		hooks/
		lib/
		types/
		constants/
		services/
		styles/
	config/
	tests/
```

## Convencion recomendada

- `features/`: logica por caso de uso (ej. `campaigns`, `influencers`, `billing`).
- `entities/`: modelos de dominio reutilizables.
- `widgets/`: bloques de UI compuestos para pantallas.
- `shared/`: utilidades y componentes transversales.
- `config/`: configuraciones de app y variables centralizadas.
- `tests/`: pruebas unitarias/integracion.

## Ejecutar localmente

1. Instala dependencias (ya instaladas al crear el proyecto):
```bash
npm install
```
2. Inicia el servidor de desarrollo:
```bash
npm run dev
```
3. Abre `http://localhost:3000`.

## Credenciales de prueba

Estas credenciales son para entorno de simulacion (UI), sin autenticacion real en backend.

- Perfil Influencer:
	- Email: influencer@influencersmart.dev
	- Password: Influencer123!
	- Ruta de perfil: /influencer/perfil

- Perfil Empresa:
	- Email: empresa@influencersmart.dev
	- Password: Empresa123!
	- Ruta de perfil: /empresa/perfil
