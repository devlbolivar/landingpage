import { NextRequest, NextResponse } from 'next/server';
import { addToBrevoList, addToMailerLiteGroup, inMemoryStore } from '@/lib/email';
import { getValidatedEnv } from '@/lib/env';
import { isValidEmail, sanitizeUtmParams } from '@/lib/validators';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const origin = req.headers.get('origin') || '';
  const host = req.headers.get('host') || '';
  if (origin && !origin.includes(host)) {
    return NextResponse.json({ error: 'CORS blocked' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, utm, company } = (body as any) || {};

  if (typeof company === 'string' && company.trim().length > 0) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }

  const utmSanitized = sanitizeUtmParams(utm);

  const env = getValidatedEnv();
  try {
    if (env.EMAIL_PROVIDER === 'brevo') {
      await addToBrevoList({ email, listId: env.BREVO_LIST_ID!, apiKey: env.BREVO_API_KEY!, utm: utmSanitized });
    } else if (env.EMAIL_PROVIDER === 'mailerlite') {
      await addToMailerLiteGroup({ email, groupId: env.MAILERLITE_GROUP_ID!, apiKey: env.MAILERLITE_API_KEY!, utm: utmSanitized });
    } else {
      inMemoryStore.push({ email, utm: utmSanitized, createdAt: new Date().toISOString() });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error al suscribir' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

