export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, access_token } = req.body;
  if (!email || !access_token) return res.status(400).json({ error: 'Missing fields' });

  try {
    const params = new URLSearchParams({
      email, locale: 'en_MA', region: 'IND',
      app_id: '100067', access_token
    });

    const response = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:send_otp',
      {
        method: 'POST',
        headers: {
          'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: params.toString()
      }
    );

    const data = await response.json();
    if (data.result === 0) {
      res.json({ success: true, data });
    } else {
      res.json({ success: false, error: data.msg || 'OTP send failed', data });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
