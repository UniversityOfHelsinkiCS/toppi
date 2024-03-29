import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { inStaging } from './src/config'

const base = inStaging ? '/toppi' : '/'

export default defineConfig(() => {
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [react()],
    base,
    server: {
      proxy: {
        '/api/': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
        '/private/api/': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      },
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 3000,
    },
    define: {
      'process.env': process.env,
    },
  }
})
