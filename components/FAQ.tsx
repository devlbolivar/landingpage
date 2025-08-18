const faqs = [
  { q: '¿Necesito pagar?', a: 'No. La checklist es gratis.' },
  { q: '¿Y si quiero el curso?', a: 'Acceso anticipado con 10 automatizaciones paso a paso.' },
  { q: '¿Sirve si no soy técnico?', a: 'Sí, guías simples y videos.' },
  { q: '¿Cómo recibiré el PDF?', a: 'Por email inmediato tras suscribirte.' },
];

export function FAQ() {
  return (
    <div className="mx-auto max-w-3xl">
      <dl className="space-y-6">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-2xl border border-gray-200 p-6">
            <dt className="text-lg font-semibold">{item.q}</dt>
            <dd className="mt-2 text-gray-700">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

