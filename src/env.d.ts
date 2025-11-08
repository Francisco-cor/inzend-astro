/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_GENERATIVE_AI_API_KEY: string;
  readonly RESEND_API_KEY: string
  readonly RESEND_TO: string
  readonly RESEND_FROM?: string
  // Solo variables PUBLIC_ están disponibles en el cliente (no uses esta en el cliente).
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
