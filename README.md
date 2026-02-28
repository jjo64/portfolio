# Josue Cueva — Portfolio

Portfolio personal construido con React + Vite + TypeScript + Tailwind CSS.

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — estilos
- **@phosphor-icons/react** — iconos
- **JetBrains Mono** + **Bebas Neue** — tipografías

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Build para producción
npm run build
```

## Estructura

```
src/
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx          # Hero con terminal animada
│   ├── Stack.tsx         # Grid de tecnologías
│   ├── Projects.tsx      # Tarjetas de proyectos
│   ├── Demos.tsx         # Demos interactivas (4 tabs)
│   ├── About.tsx         # Sobre mí
│   └── Contact.tsx       # Contacto
├── hooks/
│   ├── useCursor.ts      # Cursor personalizado
│   └── useInView.ts      # Animaciones al hacer scroll
├── data/
│   └── content.ts        # Todo el contenido en un lugar
└── index.css             # Estilos globales + Tailwind
```

## Personalización

Todo el contenido está centralizado en `src/data/content.ts`.
Cambiá nombre, links, proyectos y stack desde ahí sin tocar los componentes.

## Deploy en Vercel

```bash
npm run build
# subir la carpeta dist/ a Vercel, Netlify o cualquier static host
```

O conectar el repo de GitHub a Vercel para deploy automático.
