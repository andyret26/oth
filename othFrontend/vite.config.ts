import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      // Use a Vite plugin to configure the server
      name: "custom-middleware",
      configureServer({ middlewares }) {
        middlewares.use((req, res, next) => {
          // Set the Permissions-Policy header to disable specific features
          res.setHeader("Permissions-Policy", "accelerometer=(), camera=()")
          next()
        })
      },
    },
  ],
  build: {
    // ...
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      // Make sure to include the hash option
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __APP_VERSION__: JSON.stringify(pkg.version),
  }
})
