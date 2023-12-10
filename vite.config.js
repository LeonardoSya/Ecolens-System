import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({
//       plugins: [
//         ["@babel/plugin-proposal-decorators", { "legacy": true }],
//         ["@babel/plugin-proposal-class-properties", { "loose": false }],
//       ]
//     })
//   ],
// })
export default defineConfig({
  plugins: [react()],
})


