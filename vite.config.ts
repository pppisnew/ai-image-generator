import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

function imageProxyPlugin(): Plugin {
  return {
    name: 'image-proxy',
    configureServer(server) {
      server.middlewares.use('/api/proxy-image', async (req, res) => {
        const url = new URL(req.url || '', 'http://localhost').searchParams.get('url');
        if (!url) {
          res.statusCode = 400;
          res.end('Missing url parameter');
          return;
        }

        try {
          const response = await fetch(url);
          const buffer = await response.arrayBuffer();
          res.statusCode = response.status;
          res.setHeader('Content-Type', response.headers.get('Content-Type') || 'image/png');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(Buffer.from(buffer));
        } catch (error) {
          res.statusCode = 502;
          res.end('Proxy error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), imageProxyPlugin()],
  server: {
    proxy: {
      '/api/zhipu': {
        target: 'https://open.bigmodel.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zhipu/, '/api/paas/v4'),
      },
    },
  },
})