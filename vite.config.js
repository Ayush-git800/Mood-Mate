import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { formatGeminiContents, callGeminiApi } from './server/chatHandler.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'moodmate-api-server',
        configureServer(server) {
          // Health check endpoint
          server.middlewares.use('/api/health', (req, res) => {
            const serverApiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || env.GOOGLE_API_KEY;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'ok',
              hasApiKey: !!(serverApiKey && serverApiKey.trim()),
              provider: 'google_gemini',
              model: 'gemini-1.5-flash'
            }));
          });

          // Chat endpoint
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
            }

            let body = '';
            for await (const chunk of req) {
              body += chunk;
            }

            try {
              const parsed = JSON.parse(body || '{}');
              const { message, history = [], userName = 'Friend', currentMood = 'Thoughtful' } = parsed;

              if (!message || typeof message !== 'string' || !message.trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Message is required.' }));
              }

              // Determine API key: check server env first, then optional request header
              const serverApiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || env.GOOGLE_API_KEY;
              const headerApiKey = req.headers['x-gemini-key'];
              const apiKey = serverApiKey || headerApiKey;

              const contents = formatGeminiContents(history, message);

              const result = await callGeminiApi({
                apiKey,
                contents,
                userName,
                currentMood
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                ...result
              }));
            } catch (err) {
              const statusCode = err.status || 500;
              res.statusCode = statusCode;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: err.message || 'An error occurred while generating the AI response.',
                message: err.message || 'An error occurred while generating the AI response.',
                code: err.code || 'INTERNAL_ERROR'
              }));
            }
          });
        }
      }
    ],
    server: {
      port: 5173,
      open: false
    }
  };
});
