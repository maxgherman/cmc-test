import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

//@ts-ignore
export const magic = new Magic(import.meta.env.VITE_APP_MAGIC_PUBLISHABLE_KEY || '', {
  extensions: [new OAuthExtension()],
});
