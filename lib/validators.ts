const emailRegex =
  /^(?:(?:[a-zA-Z0-9_'^&\/+`{}~|-]+(?:\.[a-zA-Z0-9_'^&\/+`{}~|-]+)*)|(?:"(?:[^"\\]|\\.)*"))@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const email = value.trim();
  if (email.length < 5 || email.length > 254) return false;
  return emailRegex.test(email);
}

export function sanitizeUtmParams(utm: unknown): Record<string, string> | undefined {
  if (!utm || typeof utm !== 'object') return undefined;
  const allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
  const out: Record<string, string> = {};
  for (const key of allowed) {
    const v = (utm as any)[key];
    if (typeof v === 'string') {
      const val = v.trim();
      if (val && val.length <= 64) out[key] = val;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

