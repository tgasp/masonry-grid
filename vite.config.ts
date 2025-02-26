/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig as defineVitestConfig } from 'vitest/config'

const viteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    },
  },
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)
