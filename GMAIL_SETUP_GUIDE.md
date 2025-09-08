# 📧 Gmail App Password Setup Guide

The error you're seeing indicates that Gmail is rejecting the authentication. This is because Gmail requires an "App Password" instead of your regular password when using SMTP.

## 🔧 Step-by-Step Gmail Setup

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification"
3. Follow the setup process to enable 2FA

### Step 2: Generate App Password

1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification" again
3. Scroll down to "App passwords"
4. Click "App passwords"
5. Select "Mail" from the dropdown
6. Click "Generate"
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Your .env File

Replace the current password in your `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=adityadevops6@gmail.com
SMTP_PASS=your-new-16-character-app-password
```

**Important**: Use the App Password, NOT your regular Gmail password!

## 🧪 Test Your Configuration

Run the email test:

```bash
npm run test:email
```

## 🔍 Troubleshooting

### If you still get authentication errors:

1. **Make sure 2FA is enabled** - App passwords only work with 2FA
2. **Use the App Password** - Not your regular password
3. **Check the format** - App password should be 16 characters with spaces
4. **Wait a few minutes** - Sometimes it takes time for the App Password to activate

### Alternative: Use a different email provider

If Gmail continues to give issues, you can use:

#### Outlook/Hotmail:

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-outlook-password
```

#### Yahoo:

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-yahoo-app-password
```

## 📱 Gmail App Password Format

The App Password should look like this:

- Format: `xxxx xxxx xxxx xxxx` (16 characters with spaces)
- Example: `abcd efgh ijkl mnop`

## ⚠️ Security Notes

- Never share your App Password
- Each App Password is unique
- You can revoke App Passwords anytime
- Use different App Passwords for different applications

## 🚀 Quick Fix

1. Generate a new Gmail App Password
2. Update your `.env` file with the new password
3. Restart your server
4. Test with `npm run test:email`

The error should be resolved once you use the correct App Password!
