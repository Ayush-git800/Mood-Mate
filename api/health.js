export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const apiKey = process.env.GEMINI_API_KEY;
  res.status(200).json({
    status: 'ok',
    hasApiKey: !!(apiKey && apiKey.trim()),
    provider: 'google_gemini',
    model: 'gemini-3.8-flash'
  });
}
