import { NextResponse } from 'next/server';

export async function GET() {
  // Placeholder: redirect to external checkout or show coming soon
  return NextResponse.json({ ok: true, message: 'Checkout placeholder' });
}

