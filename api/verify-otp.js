export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { otp, email, access_token } = req.body;
  if (!otp || !email || !access_token) return res.status(400).json({ error: 'Missing fields' });

  try {
    const params = new URLSearchParams({ app_id: '100067', access_token, otp, email });

    const response = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:verify_otp',
      {
        method: 'POST',
        headers: {
          'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip'
        },
        body: params.toString()
      }
    );

    const data = await response.json();
    if (data.verifier_token) {
      res.json({ success: true, verifier_token: data.verifier_token, data });
    } else {
      res.json({ success: false, error: data.msg || 'Verification failed', data });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
