import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the font payload out of the main chunk so the first paint is not
    // waiting on two variable families.
    cssCodeSplit: true,
  },
})
