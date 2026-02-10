/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_AUTH_BASE_URL?: string;
  readonly VITE_API_EXTERNAL_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

