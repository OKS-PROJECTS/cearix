import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/cearix/' : '/',
  server: process.env.PORT
    ? { port: Number(process.env.PORT), strictPort: true }
    : undefined,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-404',
      closeBundle() {
        const i = resolve('dist/index.html')
        if (existsSync(i)) copyFileSync(i, resolve('dist/404.html'))
      },
    },
  ],
})
