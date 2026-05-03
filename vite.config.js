import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — standard React setup.
// The base '/' means assets are served from root when deployed.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
