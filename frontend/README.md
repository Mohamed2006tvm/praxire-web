# Praxire Website — Frontend

The official Praxire Technologies website frontend, built with React, Vite, and Tailwind CSS v4.

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first CSS
- **Framer Motion** — Animations
- **React Router v7** — Client-side routing
- **Axios** — API requests

## Getting Started

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/   # Reusable UI components (Header, Footer, ChatWidget, SEO, etc.)
├── data/         # Service data & translations for localization
├── lib/          # API client, language context, and translations
├── pages/        # Route-level page components
│   └── admin/    # Admin dashboard (protected)
├── assets/       # Static assets bundled by Vite
├── App.jsx       # Route definitions
├── Layout.jsx    # Global layout wrapper
├── main.jsx      # Entry point
└── globals.css   # Design tokens and global styles
```
