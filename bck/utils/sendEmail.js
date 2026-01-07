const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use others like Outlook, SMTP, etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password
  },
});

async function sendLoginEmail(toEmail, userName) {
  const mailOptions = {
    from: `"Customer Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Login Alert - Your Account",
    html: `
      <h3>Hello ${userName},</h3>
      <p>You have successfully created account into DueMart.</p>
      <p>If this wasn't you, please secure your account immediately.</p>
      <br/>
      <small>Regards,<br/>Support Team</small>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendLoginEmail;
