import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// ponytail: dev-only stand-in for Vercel's /api runtime, real dev/prod deploys use Vercel directly
function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') return res.end()
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
        res.status = (code) => { res.statusCode = code; return res }
        res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)) }
        const handler = (await import('./api/contact.js')).default
        await handler(req, res)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), apiDevMiddleware()],
    server: { port: 5173, open: true },
  }
})
