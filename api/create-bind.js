export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { verifier_token, access_token, email } = req.body;
  if (!verifier_token || !access_token || !email)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    // Cancel any pending request first
    const cancelParams = new URLSearchParams({ app_id: '100067', access_token });
    await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:cancel_request',
      {
        method: 'POST',
        headers: { 'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)' },
        body: cancelParams.toString()
      }
    );

    const params = new URLSearchParams({
      app_id: '100067', access_token, verifier_token, email,
      secondary_password: '91B4D142823F7D20C5F08DF69122DE43F35F057A988D9619F6D3138485C9A203'
    });

    const response = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:create_bind_request',
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
    if (data.result === 0) {
      res.json({ success: true, data });
    } else {
      res.json({ success: false, error: data.msg || 'Bind request failed', data });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
