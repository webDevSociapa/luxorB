// mail.js
import nodemailer from 'nodemailer';

// Email service setup
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Your SMTP server hostname
      port: 587, // Your SMTP server port
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'skk4326@gmail.com', // Your email address
        pass: 'didn zhht airq nzct', // Your email password
      },
    });
  }

  // Method to send email
  async sendMail(email, subject, text, html,attachments=[]) {
    try {
      const mailOptions = {
        from: '"LuxorPen.com" <export.enquiry@luxoroffice.com>', // sender address
        to: [...email,"export.enquiry@luxoroffice.com"], // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
        attachments: attachments, // array of attachment objects
      };

      let info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

export default new EmailService();
