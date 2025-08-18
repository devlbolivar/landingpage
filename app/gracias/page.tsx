import Link from 'next/link';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export default function GraciasPage() {
  return (
    <main className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            ¡Listo! Te enviamos la checklist a tu correo.
          </h1>
          <p className="mt-3 text-gray-600">
            Revisa la carpeta de Promociones/Spam.
          </p>
          <div className="mt-6">
            <Button asChild variant="primary">
              <Link href="/checklist.pdf" prefetch={false} target="_blank" rel="noopener noreferrer">
                Descargar ahora
              </Link>
            </Button>
          </div>
        </div>

        <section className="mt-16 rounded-2xl bg-gray-50 p-6 shadow-soft md:p-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h2 className="text-2xl font-semibold">Acceso anticipado al curso: 10 automatizaciones con IA</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• 3 lecciones listas hoy</li>
                <li>• 1 nueva por semana</li>
                <li>• Plantillas exportables</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <Link href="/api/checkout" prefetch={false}>
                    Quiero el acceso anticipado
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <a href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'} target="_blank" rel="noopener noreferrer">
                    ¿Dudas? WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="h-48 rounded-lg bg-gray-100" aria-hidden="true" />
              <p className="mt-3 text-sm text-gray-500">
                Vista previa del curso (placeholder)
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

