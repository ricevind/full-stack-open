interface ImportMetaEnv extends Readonly<Record<string, string | undefined | boolean>> {
  VITE_WHEATHER_API: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
