import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['lib'], tsconfigPath: './tsconfig.app.json' }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'lunatic',
      fileName: 'lunatic',

      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@forward ./lib/styles/main.scss`,
      },
    },
  },
})
