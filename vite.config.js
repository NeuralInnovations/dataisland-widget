/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';
import { resolve } from 'path';

// if (!import.meta.env.VITE_API_URL || !import.meta.env.VITE_API_KEY) {
//   throw new Error(
//     'Missing environment variables. Please set VITE_API_URL and VITE_API_KEY.'
//   );
// }
const outDir = resolve(__dirname, 'dist');

export default defineConfig(() => {
  // if (!import.meta.env.VITE_API_URL || !import.meta.env.VITE_API_KEY) {
  //   throw new Error(
  //     'Missing environment variables. Please set VITE_API_URL and VITE_API_KEY.'
  //   );
  // }

  return {
    define: {
      'import.meta.env': {
        VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
        VITE_API_KEY: JSON.stringify(process.env.VITE_API_KEY),
      },
    },
    plugins: [
      env({
        prefix: 'VITE',
        mountedPath: 'import.meta.env',
      }),
    ],
    root: 'src',
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir,
      emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'ChatWidget',
        fileName: 'dataisland-widget',
        formats: ['es'],
      },
      rollupOptions: {
        external: /^lit/,
        output: {
          globals: {
            lit: 'lit',
          },
        },
      },
    },
  };
});
