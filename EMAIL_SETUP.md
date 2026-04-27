# Email Notification Setup Guide

## Overview
The Smart Complaint Management System now sends email notifications to muhammadnadeem2848@gmail.com whenever a new complaint is submitted.

## Configuration

### Step 1: Create Gmail App Password
Since Gmail requires enhanced security, you need to create an **App Password** (not your regular Gmail password):

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Google will generate a 16-character password
4. Copy this password (spaces are automatically removed)

### Step 2: Update `.env` File
Create or edit `backend/.env` and update:

```
SMTP_EMAIL=muhammadnadeem2848@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=muhammadnadeem2848@gmail.com
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

Replace `xxxx xxxx xxxx xxxx` with the 16-character App Password from Step 1. The backend strips spaces automatically, so the value can include spaces if copied directly from Gmail.

### Step 3: Test Email Feature

1. Start the backend: `npm run dev` (in backend folder)
2. Start the frontend: `npm run dev` (in frontend folder)
3. Navigate to http://localhost:5173
4. Register or login with demo account:
   - Email: admin@scms.local
   - Password: Admin@123
5. Submit a complaint
6. Check if email is received at muhammadnadeem2848@gmail.com

## Email Features

✅ **Automatic Email Notifications**: When a complaint is submitted
✅ **Rich HTML Email**: Professional formatted email with:
   - Complaint title and description
   - Category and priority level
   - User information
   - Complaint ID and timestamp

✅ **Silent Failures**: If email fails, the complaint is still created successfully (no user-facing errors)

## Troubleshooting

### Issue: "Email sending failed"
- **Check 1**: Verify Gmail App Password is correct in .env
- **Check 2**: Ensure 2-Factor Authentication is enabled on Gmail account
- **Check 3**: Check backend console for detailed error messages

### Issue: Emails not arriving
- Check spam/promotions folder
- Verify SMTP_EMAIL and SMTP_PASSWORD are correctly set
- Restart backend server after updating .env

### Issue: Port already in use
```powershell
# Kill process on port 5000
taskkill /PID <PID> /F

# Or find and kill all node processes
taskkill /F /IM node.exe
```

## Architecture

### Backend Flow
1. User submits complaint via frontend
2. Backend `POST /api/complaints` receives request
3. Complaint is saved to `backend/data/complaints.json`
4. Email service sends notification to muhammadnadeem2848@gmail.com
5. Response returned to frontend with success message

### Email Service
- **File**: `backend/services/emailService.js`
- **Provider**: Gmail via Nodemailer
- **Authentication**: App Password (secure)
- **Async Operation**: Non-blocking (doesn't delay API response)

## Features Implemented

✅ Professional signup/login UI with gradient theme
✅ Error handling with user-friendly messages
✅ Loading spinners for async operations
✅ Mobile-responsive sidebar toggle (hidden on desktop)
✅ Email notifications for new complaints
✅ Complete backend functionality
✅ Proper error states on all pages

## Demo Credentials

**Admin Account:**
- Email: admin@scms.local
- Password: Admin@123

**Test User Account:**
- Create a new account via signup page

## Next Steps

1. Configure SMTP_PASSWORD in .env with your Gmail App Password
2. Restart backend server
3. Test by submitting a complaint
4. Verify email is received

