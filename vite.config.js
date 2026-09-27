import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const lastUpdated = execSync('git log -1 --format=%cI').toString().trim()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  base: '/',
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated),
  },
})
