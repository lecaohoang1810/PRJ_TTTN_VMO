const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email) => {
  const verificationUrl = `http://localhost:8888/auth/verify-email?email=${email}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationUrl}">Verify Email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

// cron.schedule('* * * * *', async () => {
//   const notifications = await getUnsentNotifications();

//   const now = new Date();
//   for (const notification of notifications) {
//       const flashSale = await getFlashSaleById(notification.flashsale_id); // Hàm này cần được định nghĩa trong flashSaleModel

//       const flashSaleStartTime = new Date(flashSale.start_time);
//       const diffMinutes = (flashSaleStartTime - now) / 1000 / 60;

//       if (diffMinutes <= 15) {
//           const user = await getUserById(notification.user_id); // Hàm này cần được định nghĩa trong userModel
//           await sendEmail(user.email, 'FlashSale Notification', notification.message);
//           await markNotificationAsSent(notification.id);
//       }
//   }
// });
module.exports = {
  sendVerificationEmail
};
