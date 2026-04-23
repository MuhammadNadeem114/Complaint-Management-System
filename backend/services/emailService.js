const nodemailer = require('nodemailer');

// Use test account for development/testing
// For Gmail in production: Use App Password (not regular password)
// Setup: https://myaccount.google.com/apppasswords
let transporter;

async function initializeTransporter() {
  // If SMTP_PASSWORD is set and looks like an app password, use Gmail
  if (process.env.SMTP_PASSWORD && process.env.SMTP_PASSWORD !== 'your_app_password_here') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL || 'muhammadnadeem2848@gmail.com',
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Use Ethereal test account for development
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('Using Ethereal Email Test Account (Development Mode)');
    console.log('View test email preview URLs in console');
  }
  return transporter;
}

// Remove the top-level call
// initializeTransporter().then((t) => {
//   t.verify((error, success) => {
//     if (error) {
//       console.error('Email transporter verification failed:', error.message);
//     } else {
//       console.log('✓ Email transporter is ready to send messages');
//     }
//   });
// });

const sendComplaintEmail = async (complaint, userName, userEmail) => {
  try {
    if (!transporter) {
      await initializeTransporter();
      transporter.verify((error, success) => {
        if (error) {
          console.error('Email transporter verification failed:', error.message);
        } else {
          console.log('✓ Email transporter is ready to send messages');
        }
      });
    }
    const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_EMAIL || process.env.ADMIN_EMAIL || 'muhammadnadeem2848@gmail.com';
    const subject = `New Complaint: ${complaint.title}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 10px;">
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #3b82f6; margin-top: 0;">New Complaint Received</h2>
          
          <div style="border-left: 4px solid #3b82f6; padding-left: 15px; margin: 20px 0;">
            <p><strong>From:</strong> ${userName} (${userEmail})</p>
            <p><strong>Title:</strong> ${complaint.title}</p>
            <p><strong>Category:</strong> ${complaint.category}</p>
            <p><strong>Priority:</strong> <span style="color: ${complaint.priority === 'High' ? '#dc2626' : complaint.priority === 'Medium' ? '#f59e0b' : '#10b981'}; font-weight: bold;">${complaint.priority}</span></p>
            <p><strong>Status:</strong> ${complaint.status}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #374151;">Description:</h4>
            <p style="color: #555; line-height: 1.6; margin: 0;">${complaint.description}</p>
          </div>
          
          <div style="background: #eff6ff; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #0369a1; font-size: 13px;">
              <strong>Complaint ID:</strong> ${complaint._id}<br>
              <strong>Submitted at:</strong> ${new Date(complaint.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Smart Complaint Management System - Automated Email</p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL || 'muhammadnadeem2848@gmail.com',
      to: adminEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`✓ Email sent for complaint: ${complaint._id}`);
    if (transporter.options.host === 'smtp.ethereal.email') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    return true;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    return false;
  }
};

module.exports = { sendComplaintEmail };
