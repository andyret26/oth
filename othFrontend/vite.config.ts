import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    // Use a Vite plugin to configure the server
    name: 'custom-middleware',
    configureServer({ middlewares }) {
      middlewares.use((req, res, next) => {
        // Set the Permissions-Policy header to disable specific features
        res.setHeader('Permissions-Policy', 'accelerometer=(), camera=()');
        next();
      });
    },
  },],

})
