import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const changeLog = execSync('git log -3 --format=%H%x09%cI%x09%s')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((entry) => {
    const [hash, date, ...messageParts] = entry.split('\t')

    return { hash, date, message: messageParts.join('\t') }
  })

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
    __CHANGE_LOG__: JSON.stringify(changeLog),
  },
})
