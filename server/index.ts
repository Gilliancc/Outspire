import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { thoughtsRouter } from './routes/thoughts';
import { weatherRouter } from './routes/weather';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const app = new Hono();

// Middleware
app.use('/*', cors());

// API Routes
app.route('/api/thoughts', thoughtsRouter);
app.route('/api/weather', weatherRouter);

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

// Serve static files from dist/
app.get('/*', async (c) => {
  // Skip API routes
  if (c.req.path.startsWith('/api')) {
    return c.notFound();
  }

  const filePath = path.join(distDir, c.req.path === '/' ? 'index.html' : c.req.path);

  try {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes: Record<string, string> = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.ico': 'image/x-icon',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        const content = fs.readFileSync(filePath);
        return c.newResponse(content, 200, { 'Content-Type': contentType });
      }
    }
  } catch {}

  // SPA fallback: serve index.html for client-side routing
  try {
    const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
    return c.html(html);
  } catch {
    return c.text('Not Found (run npm run build first)', 404);
  }
});

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🏮 Outspire running at http://localhost:${info.port}`);
});
