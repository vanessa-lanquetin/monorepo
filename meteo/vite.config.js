import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin('all', { prefix: 'VUE_APP_' }),
    EnvironmentPlugin('all', { prefix: 'VITE_APP_' })
  ],
  server: {
    port: process.env.PORT ? +process.env.PORT : 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
