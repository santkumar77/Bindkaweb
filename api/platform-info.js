export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { access_token } = req.body;
  try {
    const url = `https://100067.connect.garena.com/bind/app/platform/info/get?access_token=${encodeURIComponent(access_token)}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)', 'Accept-Encoding': 'gzip' }
    });
    const data = await response.json();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
