import { defineConfig } from 'vite'
import { manifestPlugin } from '@journals/mf-contract/vite-plugin'

export default defineConfig({
  plugins: [manifestPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'remoteEntry',
    },
    rollupOptions: {},
  },
  server: { port: 3004 },
  preview: {
    port: 3004,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
})
