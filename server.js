import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/send-mail', async (req, res) => {
    const { name, email, subject, message, recaptchaToken, botField } = req.body;

    if (botField) {
        return res.status(400).json({ success: false, message: 'Bot activity detected.' });
    }

    if (!recaptchaToken) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA token missing.' });
    }

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

        if (!verifyData.success || verifyData.score < 0.5 || verifyData.action !== 'contact') {
            console.error('reCAPTCHA verification failed:', verifyData);
            return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.' });
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({ success: false, message: 'Unable to verify reCAPTCHA.' });
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jeromethree12@gmail.com', // Your Gmail address
            pass: 'lykjcbmtszxrqcvk'    // Your Gmail App Password
        }
    });

    const mailOptions = {
        from: email,
        to: 'matugasjerome@gmail.com', // Where you want to receive emails
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
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Nodemailer error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
