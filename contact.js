

export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, type, message } = req.body;

  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }


  
  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Pavitra Foundation <onboarding@resend.dev>',
      to: ['arnavbhatnagarrr@gmail.com'],   
      subject: `New Contact: ${name} (${type || 'Unknown'})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <hr/>
        <small>Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small>
      `,
    }),
  });

  if (!resendRes.ok) {
    const errBody = await resendRes.text();
    console.error('Resend error:', errBody);
    return res.status(500).json({ error: 'Email failed. Please try again.' });
  }
  */


  console.log('📬 New contact submission:', {
    name,
    email,
    type,
    message,
    timestamp: new Date().toISOString(),
  });


  return res.status(200).json({ success: true, message: 'Submission received!' });
}
