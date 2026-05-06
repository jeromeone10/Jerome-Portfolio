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
    const { name, email, subject, message } = req.body;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jeromethree12@gmail.com', // Your Gmail address
            pass: 'dkzcnhtnalabshcq'    // Your Gmail App Password
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
