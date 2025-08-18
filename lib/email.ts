type Utm = Record<string, string> | undefined;

export const inMemoryStore: Array<{ email: string; utm?: Utm; createdAt: string }> = [];

export async function addToBrevoList({
  email,
  listId,
  apiKey,
  utm,
}: {
  email: string;
  listId: string;
  apiKey: string;
  utm?: Utm;
}) {
  const url = 'https://api.brevo.com/v3/contacts';
  const attributes: Record<string, string> = {};
  if (utm && typeof utm === 'object') {
    if (utm['utm_source']) attributes['utm_source'] = utm['utm_source'];
    if (utm['utm_medium']) attributes['utm_medium'] = utm['utm_medium'];
    if (utm['utm_campaign']) attributes['utm_campaign'] = utm['utm_campaign'];
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      attributes,
      listIds: [Number(listId)],
      updateEnabled: true,
      emailBlacklisted: false,
      smsBlacklisted: false,
      tags: ['lead-ia'],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brevo error: ${res.status} ${text}`);
  }
}

export async function addToMailerLiteGroup({
  email,
  groupId,
  apiKey,
  utm,
}: {
  email: string;
  groupId: string;
  apiKey: string;
  utm?: Utm;
}) {
  const url = `https://connect.mailerlite.com/api/subscribers`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      status: 'active',
      fields: utm || {},
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    // If already exists, update
    if (res.status === 409 || text.toLowerCase().includes('already')) {
      const updateUrl = `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`;
      const up = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          groups: [groupId],
          fields: utm || {},
        }),
      });
      if (!up.ok) {
        const tt = await up.text();
        throw new Error(`MailerLite update error: ${up.status} ${tt}`);
      }
      return;
    }
    throw new Error(`MailerLite error: ${res.status} ${text}`);
  }
}

