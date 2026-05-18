import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 将绝对路径改为相对路径，防止 GitHub Pages 找不到静态资源文件
})
