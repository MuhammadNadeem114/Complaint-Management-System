const nodemailer = require('nodemailer');

// Use test account for development/testing
// For Gmail in production: Use App Password (not regular password)
// Setup: https://myaccount.google.com/apppasswords
let transporter;

const normalizePassword = (password = '') => password.replace(/\s+/g, '').trim();

async function initializeTransporter() {
  console.log('Initializing email transporter...');
  
  const smtpEmail = process.env.SMTP_EMAIL || 'muhammadnadeem2848@gmail.com';
  const smtpPass = normalizePassword(process.env.SMTP_PASSWORD);

  if (smtpPass && smtpPass.length >= 16) {
    console.log(`Configuring Gmail SMTP for: ${smtpEmail}`);
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPass,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    });
  } else {
    console.warn('No valid SMTP_PASSWORD found (must be 16+ chars). Falling back to Ethereal test account for development.');
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
    console.log('✓ Using Ethereal Email Test Account (Development Mode)');
    console.log('  User:', testAccount.user);
  }
  
  try {
    await transporter.verify();
    console.log('✓ Email transporter is ready to send messages');
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error.message);
    if (error.code === 'EAUTH') {
      console.error('  Authentication Error: Please check if your Gmail App Password is correct.');
      console.error('  Make sure 2FA is enabled and App Password is 16 characters.');
    }
  }
  
  return transporter;
}

const sendComplaintEmail = async (complaint, userName, userEmail) => {
  try {
    if (!transporter) {
      await initializeTransporter();
    }
    
    const smtpEmail = process.env.SMTP_EMAIL || 'muhammadnadeem2848@gmail.com';
    const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_EMAIL || process.env.ADMIN_EMAIL || 'muhammadnadeem2848@gmail.com';
    
    console.log(`Attempting to send complaint email from ${smtpEmail} to ${adminEmail}...`);
    
    const subject = `New Complaint: ${complaint.title}`;
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const apiUrl = (process.env.API_URL || 'http://localhost:5000').trim();
    const actionToken = process.env.EMAIL_ACTION_SECRET || 'replace-with-secret';

    if (apiUrl.includes('localhost') && process.env.NODE_ENV !== 'test') {
      console.warn('⚠️ API_URL is set to localhost. Email links will only work on the same machine. For mobile access, set API_URL to your device-accessible IP or public URL.');
    }

    const resolveUrl = `${clientUrl}/admin/dashboard?complaintId=${complaint._id}`;
    const directResolveUrl = `${apiUrl}/api/complaints/resolve/${complaint._id}?token=${actionToken}`;

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
          
          <div style="margin-top: 20px; color: #334155; font-size: 14px; line-height: 1.6;">
            <p>This email includes a mobile-friendly action button so you can resolve the complaint directly from your phone or any remote browser.</p>
          </div>

          <div style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
            <a href="${directResolveUrl}" style="text-decoration: none; display:inline-block; padding: 12px 22px; border-radius: 999px; background: #3b82f6; color: white; font-weight: 600;">Resolve complaint</a>
            <a href="${resolveUrl}" style="text-decoration: none; display:inline-block; padding: 12px 22px; border-radius: 999px; background: #94a3b8; color: white; font-weight: 600;">View in dashboard</a>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Smart Complaint Management System - Automated Email Notification</p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Smart Complaint System" <${smtpEmail}>`,
      to: adminEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`✓ Email sent successfully to ${adminEmail}. MessageId: ${info.messageId}`);
    if (transporter.options.host === 'smtp.ethereal.email') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    if (error.code === 'EAUTH') {
      console.error('  Authentication Error: Please check if your Gmail App Password is correct.');
    }
    return false;
  }
};

module.exports = { sendComplaintEmail, initializeTransporter };
