/// <reference types="vite/client" />
declare module '*.vue';

interface ImportMetaEnv {
  readonly [string]: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}