/* eslint-disable indent */
import { emailOptions } from '../../types/interfaces';

const orderConfirmationEmail = function (emailDetails: emailOptions) {
  const receiver = emailDetails.email;
  const orderId = emailDetails._id;
  const customerName = emailDetails.contact;
  const paid = emailDetails.toPay;
  const address = emailDetails.address;
  const items = emailDetails.items;
  const message = emailDetails.message;
  const deliveryFee = emailDetails.deliveryFee;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #4CAF50;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
      }
      .content {
        padding: 20px;
      }
      .order-summary {
        margin-bottom: 20px;
      }
      .order-summary h2 {
        margin-bottom: 10px;
        color: #333333;
      }
      .order-summary table {
        width: 100%;
        border-collapse: collapse;
      }
      .order-summary table th, .order-summary table td {
        border: 1px solid #dddddd;
        padding: 8px;
        text-align: left;
      }
      .order-summary table th {
        background-color: #f2f2f2;
      }
      .customer-details {
        margin-bottom: 20px;
      }
      .customer-details h2 {
        margin-bottom: 10px;
        color: #333333;
      }
      .footer {
        background-color: #f2f2f2;
        color: #777777;
        text-align: center;
        padding: 10px;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Confirmation</h1>
      </div>
      <div class="content">
        <p>Dear ${customerName},</p>
        <p>Thank you for your order ${orderId}! We are pleased to confirm your purchase. Below are the details of your order:</p>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price * item.quantity}</td>
                </tr>
              `).join('')}
              ${deliveryFee > 0 ?
                `<tr>
                  <td>Delivery fee</td>
                  <td>1</td>
                  <td>$${deliveryFee}</td>
                  </tr>
                </tr>`
              : ''}
            </tbody>
            <tfoot>
              <tr>
                <th colspan="2">Total</th>
                <th>$${paid}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="customer-details">
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${receiver}</p>
          <p><strong>Address:</strong> ${address}</p>
          ${ message ? `<p><strong>Additional message:</strong> ${message}</p>` : ''}
        </div>

        <p>If you have any questions or need further assistance, please feel free to contact our customer service team.</p>
        <p>Thank you for shopping with us!</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Lens Shop. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`;
  const text = `Thank you for your order! We are pleased to confirm your purchase. Below are the details of your order:`;
  
  return {
    html: html,
    text: text,
    subject: `Your order ${orderId} has been placed!`,
  };
};

export default orderConfirmationEmail;