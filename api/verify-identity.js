export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, access_token, method, otp, secondary_password } = req.body;
  try {
    const body = { email, app_id: '100067', access_token };
    if (method === 'otp') body.otp = otp;
    else body.secondary_password = secondary_password;

    const params = new URLSearchParams(body);
    const response = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:verify_identity',
      {
        method: 'POST',
        headers: {
          'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      }
    );
    const data = await response.json();
    if (data.identity_token) res.json({ success: true, identity_token: data.identity_token, data });
    else res.json({ success: false, error: data.msg || 'Identity verification failed', data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
