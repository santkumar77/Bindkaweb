export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, access_token, method, otp, secondary_password } = req.body;
  try {
    // Step 1: verify identity
    const identBody = { email, app_id: '100067', access_token };
    if (method === 'otp') identBody.otp = otp;
    else identBody.secondary_password = secondary_password;

    const identRes = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:verify_identity',
      {
        method: 'POST',
        headers: {
          'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(identBody).toString()
      }
    );
    const identData = await identRes.json();
    if (!identData.identity_token)
      return res.json({ success: false, error: identData.msg || 'Identity failed', data: identData });

    // Step 2: create unbind request
    const unbindParams = new URLSearchParams({
      app_id: '100067', access_token, identity_token: identData.identity_token
    });
    const unbindRes = await fetch(
      'https://100067.connect.garena.com/game/account_security/bind:create_unbind_request',
      {
        method: 'POST',
        headers: { 'User-Agent': 'GarenaMSDK/4.0.19P9(Redmi Note 5 ;Android 9;en;US;)' },
        body: unbindParams.toString()
      }
    );
    const unbindData = await unbindRes.json();
    if (unbindData.result === 0) res.json({ success: true, data: unbindData });
    else res.json({ success: false, error: unbindData.msg || 'Unbind failed', data: unbindData });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
