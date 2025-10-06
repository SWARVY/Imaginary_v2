import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import oxlintPlugin from 'vite-plugin-oxlint';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    oxlintPlugin(),
  ],
  ssr: {
    noExternal: ['reshaped'],
  },
});

export default config;
