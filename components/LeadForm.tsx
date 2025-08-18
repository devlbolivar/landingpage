"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Toast } from './Toast';

type Mode = 'api' | 'tally';

export function LeadForm({ mode = 'api' }: { mode?: Mode }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
      const v = params.get(k);
      if (v) utmParams[k] = v;
    });
    setUtm(utmParams);
  }, []);

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'tally') return;
    setError(null);
    setLoading(true);
    const start = Date.now();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm, company: (formRef.current as any)?.company?.value || '' }),
      });
      const elapsed = Date.now() - start;
      const remaining = 800 - elapsed;
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Error al suscribirte');

      try {
        // analytics events (best-effort)
        (window as any).dataLayer?.push({ event: 'lead_submitted', email });
        (window as any).gtag?.('event', 'generate_lead', { email });
        (window as any).fbq?.('track', 'Lead');
      } catch {}

      setShowToast(true);
      setTimeout(() => {
        window.location.href = '/gracias';
      }, 400);
    } catch (err: any) {
      setError(err?.message || 'Error al suscribirte');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  }, [email, mode, utm]);

  if (mode === 'tally') {
    const q = new URLSearchParams(utm).toString();
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-soft">
        <iframe
          title="Formulario Tally"
          src={`https://tally.so/r/XXXX?${q}`}
          className="h-full w-full"
          allow="fullscreen; clipboard-write"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <form ref={formRef} onSubmit={onSubmit} className="rounded-2xl border border-gray-200 p-6 shadow-soft">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-2xl border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300"
          placeholder="tu@email.com"
          autoComplete="email"
          aria-invalid={!!error}
          aria-describedby={error ? 'email-error' : undefined}
        />
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
        {Object.entries(utm).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} readOnly />
        ))}
        <div className="mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Enviando…' : 'Descargar checklist gratis'}
          </Button>
        </div>
        {error ? (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </form>
      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        type={error ? 'error' : 'success'}
        message={error ? error : '¡Suscripción exitosa! Redirigiendo…'}
      />
    </div>
  );
}

