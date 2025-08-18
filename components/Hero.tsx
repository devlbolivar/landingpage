import Image from 'next/image';
import { Container } from './Container';
import { Button } from './Button';

export function Hero() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Automatiza tu negocio con IA y recupera 5+ horas a la semana.
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Descarga la checklist gratuita con 3 automatizaciones listas para poner a trabajar hoy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <a href="#form">Quiero mis 3 automatizaciones</a>
              </Button>
              <Button asChild variant="ghost">
                <a href="/checklist.pdf" target="_blank" rel="noopener noreferrer">Ver ejemplo</a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-500">Sin spam. Te podrás dar de baja con un clic.</p>
          </div>
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
            <div className="aspect-[4/3] w-full rounded-xl bg-gray-100" aria-label="Mockup del PDF" />
            <p className="mt-3 text-center text-sm text-gray-500">Checklist PDF (mockup)</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

