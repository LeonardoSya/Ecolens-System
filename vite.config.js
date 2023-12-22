import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      // 代理规则
      '/api': {
        target: 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
})


