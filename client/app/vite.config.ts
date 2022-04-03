/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
  },
  
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@context': path.resolve(__dirname, './context'),
      '@utils': path.resolve(__dirname, './utils'),
    },
  },
})
