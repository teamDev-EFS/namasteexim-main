# 📧 SMTP Email Configuration Guide for Namaste EXIM

This guide will help you configure email functionality for your contact forms and quote requests.

## 🚀 Quick Setup

### Step 1: Create Environment File

1. Copy `environment-variables.txt` to `.env`
2. Update the email configuration values
3. Never commit `.env` file to version control

```bash
# Copy the template
cp environment-variables.txt .env

# Edit the file with your actual values
nano .env  # or use any text editor
```

## 📧 Email Provider Options

### 1. Gmail (Recommended - Free & Reliable)

#### Setup Process:

1. **Enable 2-Factor Authentication**:

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"

2. **Generate App Password**:

   - Go to Google Account → Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Select "Mail" and generate password
   - Copy the 16-character password

3. **Update .env file**:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@namasteexim.com
FRONTEND_EMAIL=info@namasteexim.com
```

#### Gmail SMTP Settings:

- **Host**: smtp.gmail.com
- **Port**: 587 (TLS) or 465 (SSL)
- **Security**: STARTTLS
- **Authentication**: Required

---

### 2. Outlook/Hotmail (Microsoft)

#### Setup Process:

1. **Enable App Passwords**:

   - Go to [Microsoft Account Security](https://account.microsoft.com/security)
   - Enable "Two-step verification"
   - Go to "App passwords" and create new password

2. **Update .env file**:

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-app-password
```

#### Outlook SMTP Settings:

- **Host**: smtp-mail.outlook.com
- **Port**: 587
- **Security**: STARTTLS
- **Authentication**: Required

---

### 3. Yahoo Mail

#### Setup Process:

1. **Enable App Passwords**:

   - Go to Yahoo Account Security
   - Enable "Two-step verification"
   - Generate "App password" for Mail

2. **Update .env file**:

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

#### Yahoo SMTP Settings:

- **Host**: smtp.mail.yahoo.com
- **Port**: 587
- **Security**: STARTTLS
- **Authentication**: Required

---

### 4. Custom SMTP Server

If you have your own email server or hosting provider:

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
```

## 🔧 Testing Email Configuration

### Test Script

Create a test file to verify your email setup:

```javascript
// test-email.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const testEmail = async () => {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email from Namaste EXIM",
      html: "<h2>Email Configuration Test</h2><p>If you receive this email, your SMTP configuration is working correctly!</p>",
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

testEmail();
```

Run the test:

```bash
node test-email.js
```

## 🛠️ Common SMTP Providers

### Popular Email Services:

| Provider | SMTP Host             | Port | Security |
| -------- | --------------------- | ---- | -------- |
| Gmail    | smtp.gmail.com        | 587  | STARTTLS |
| Outlook  | smtp-mail.outlook.com | 587  | STARTTLS |
| Yahoo    | smtp.mail.yahoo.com   | 587  | STARTTLS |
| iCloud   | smtp.mail.me.com      | 587  | STARTTLS |
| Zoho     | smtp.zoho.com         | 587  | STARTTLS |

### Business Email Providers:

| Provider   | SMTP Host                | Port | Security |
| ---------- | ------------------------ | ---- | -------- |
| GoDaddy    | smtpout.secureserver.net | 465  | SSL      |
| Namecheap  | mail.privateemail.com    | 587  | STARTTLS |
| Bluehost   | mail.yourdomain.com      | 587  | STARTTLS |
| SiteGround | mail.yourdomain.com      | 587  | STARTTLS |

## 🔒 Security Best Practices

### 1. Use App Passwords

- Never use your main email password
- Generate app-specific passwords
- Rotate passwords regularly

### 2. Environment Variables

- Store credentials in `.env` file
- Never commit `.env` to version control
- Use different credentials for development/production

### 3. Rate Limiting

- Implement rate limiting for email sending
- Monitor email usage
- Set up alerts for unusual activity

## 🐛 Troubleshooting

### Common Issues:

#### 1. "Authentication Failed"

**Solutions:**

- Verify username and password
- Check if 2FA is enabled (use app password)
- Ensure account is not locked

#### 2. "Connection Timeout"

**Solutions:**

- Check SMTP host and port
- Verify firewall settings
- Try different port (587 vs 465)

#### 3. "Invalid Credentials"

**Solutions:**

- Double-check email address
- Verify app password is correct
- Check if account has SMTP access enabled

#### 4. "SSL/TLS Error"

**Solutions:**

- Try port 587 with STARTTLS
- Try port 465 with SSL
- Check if provider supports the security method

### Debug Mode:

Enable debug mode in your server.js:

```javascript
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  debug: true, // Enable debug mode
  logger: true, // Log to console
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

## 📊 Email Monitoring

### Track Email Delivery:

1. **Log all email attempts**
2. **Monitor bounce rates**
3. **Set up email delivery alerts**
4. **Track user engagement**

### Example Logging:

```javascript
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Email failed to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};
```

## 🚀 Production Deployment

### For Hostinger:

1. **Upload `.env` file** to your server
2. **Set correct file permissions** (600 for .env)
3. **Test email functionality** after deployment
4. **Monitor logs** for any issues

### File Permissions:

```bash
# Set secure permissions for .env file
chmod 600 .env

# Verify permissions
ls -la .env
# Should show: -rw------- 1 user user
```

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your email provider's SMTP settings
3. Test with a simple email client first
4. Check server logs for detailed error messages

---

**Note**: Always test your email configuration in a development environment before deploying to production!
