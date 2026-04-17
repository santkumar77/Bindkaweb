export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { access_token } = req.body;
  try {
    const params = new URLSearchParams({ app_id: '100067', access_token });
    const response = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:cancel_request',
      {
        method: 'POST',
        headers: { 'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)' },
        body: params.toString()
      }
    );
    const data = await response.json();
    if (data.result === 0) res.json({ success: true, data });
    else res.json({ success: false, error: data.msg || 'No active request', data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
