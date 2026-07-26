const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/send-message", async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            phone,
            queryReason,
            message,
        } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Query - ${queryReason}`,

            html: `
                <h2>New Contact Form Submission</h2>

                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Query Reason:</strong> ${queryReason}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});