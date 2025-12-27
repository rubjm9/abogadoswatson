import { notFound } from 'next/navigation';

// Catch-all route para capturar todas las rutas no encontradas dentro de [locale]
export default function CatchAll() {
    notFound();
}

