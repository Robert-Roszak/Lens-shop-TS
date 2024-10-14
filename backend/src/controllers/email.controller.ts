import nodemailer from 'nodemailer';
import { RequestHandler } from 'express';

export const sendEmail: RequestHandler = async (req, res) => {
  try {
    const { mailOptions } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};