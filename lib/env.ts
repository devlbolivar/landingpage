import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_WHATSAPP_LINK: z.string().url().optional(),
  EMAIL_PROVIDER: z.enum(['brevo', 'mailerlite', 'none']).default('none'),
  BREVO_API_KEY: z.string().optional(),
  BREVO_LIST_ID: z.string().optional(),
  MAILERLITE_API_KEY: z.string().optional(),
  MAILERLITE_GROUP_ID: z.string().optional(),
  GA_MEASUREMENT_ID: z.string().optional(),
  META_PIXEL_ID: z.string().optional(),
});

type Env = z.infer<typeof EnvSchema>;

export function getValidatedEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Error de variables de entorno: ${parsed.error.message}`);
  }
  const env = parsed.data;
  if (env.EMAIL_PROVIDER === 'brevo') {
    if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
      throw new Error('Faltan BREVO_API_KEY o BREVO_LIST_ID para EMAIL_PROVIDER=brevo');
    }
  }
  if (env.EMAIL_PROVIDER === 'mailerlite') {
    if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_GROUP_ID) {
      throw new Error('Faltan MAILERLITE_API_KEY o MAILERLITE_GROUP_ID para EMAIL_PROVIDER=mailerlite');
    }
  }
  return env;
}

