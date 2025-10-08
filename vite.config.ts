import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import oxlintPlugin from 'vite-plugin-oxlint';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    oxlintPlugin(),
    nitroV2Plugin({ preset: 'node-server' }),
  ],
  ssr: {
    noExternal: ['reshaped'],
  },
  build: {
    rollupOptions: {
      external: [
        'tanstack-start-injected-head-scripts:v',
        'tanstack-start-server-fn-manifest:v',
        /^node:/,
        'stream',
        'util',
      ],
    },
  },
});

export default config;
