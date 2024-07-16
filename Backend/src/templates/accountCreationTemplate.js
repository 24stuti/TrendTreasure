const accountCreationTemplate = (userName) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
              <div style="text-align: center;">
                <img src="your-brand-logo-url" alt="Brand Logo" style="max-width: 150px; margin-bottom: 20px;">
              </div>
              <h1 style="color: #333333;">Account Created Successfully!</h1>
              <p>Hi ${userName},</p>
              <p>Thank you for creating an account with us. We are thrilled to have you on board.</p>
              <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
              <p>Thank you,</p>
              <p>The trend Treasure Team</p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://trend-treasure-front.vercel.app/login" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">Visit Our Website</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  module.exports = accountCreationTemplate;
  