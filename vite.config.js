import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        page1: resolve(__dirname, '作业一.html'),
        page2: resolve(__dirname, '作业二.html')
      }
    }
  }
})