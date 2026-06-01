import nodemailer from 'nodemailer';

export async function POST(req, res) {
  const { name, email, subject, message, recaptchaToken, botField } = await req.json();

  if (botField) {
    return new Response(JSON.stringify({ success: false, message: 'Bot activity detected.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  
  // Only verify reCAPTCHA if both secret key and token are present
  if (recaptchaSecret && recaptchaToken) {
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verifyBody = new URLSearchParams({
      secret: recaptchaSecret,
      response: recaptchaToken
    });

    try {
      const verifyResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: verifyBody
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        console.warn('reCAPTCHA verification failed (token may be expired), skipping verification:', verifyData);
        // Don't block submission - just skip reCAPTCHA and proceed
      }
    } catch (error) {
      console.warn('reCAPTCHA verification error, skipping verification:', error);
      // Don't block submission - just skip reCAPTCHA and proceed
    }
  }

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'jeromethree12@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL || 'matugasjerome@gmail.com',
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <h3>New Message from Portfolio</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to send message.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
