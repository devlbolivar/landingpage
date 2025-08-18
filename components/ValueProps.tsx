import { CheckCircle, Hourglass, Code2 } from 'lucide-react';

const items = [
  { icon: Hourglass, title: 'Implementa en 15–45 minutos' },
  { icon: CheckCircle, title: 'Plantillas y rutas claras' },
  { icon: Code2, title: 'Sin saber programar' },
];

export function ValueProps() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map(({ icon: Icon, title }) => (
        <div key={title} className="rounded-2xl border border-gray-200 p-6 shadow-soft">
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">Soporte por email y comunidad. Empezar es sencillo y guiado.</p>
        </div>
      ))}
    </div>
  );
}

