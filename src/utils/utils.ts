
import { API_URL } from '../config';
import { emailOptions } from '../types/interfaces';
import orderConfirmationEmail from './emailTemplates/orderConfirmationEmailTemplate';

export const sendEmailNotification = async (emailDetails: emailOptions) => {
  const emailContent = determineEmailContent(emailDetails);
  
  const mailOptions = {
    from: process.env.EMAIL,
    to: emailDetails.email,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  };
  
  await fetch(`${API_URL}/send_email`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({mailOptions}),
  });
};

const determineEmailContent = function (emailDetails: emailOptions) {
  switch(emailDetails.emailTemplate) {
    case 'orderConfirmation':
      return orderConfirmationEmail(emailDetails);
    default:
      return orderConfirmationEmail(emailDetails);
  }
};