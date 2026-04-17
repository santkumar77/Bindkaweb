export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { access_token } = req.body;
  try {
    const response = await fetch(
      `https://100067.connect.garena.com/oauth/logout?access_token=${encodeURIComponent(access_token)}`
    );
    const text = await response.text();
    if (text.includes('"result":0')) res.json({ success: true });
    else res.json({ success: false, error: 'Revoke failed: ' + text });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
