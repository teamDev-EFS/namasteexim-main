# Namaste EXIM - Hostinger Deployment Guide

This guide will help you deploy your full-stack React + Node.js application on Hostinger with email functionality and database integration.

## 🚀 Quick Start

### Prerequisites

- Hostinger hosting account with Node.js support
- MongoDB Atlas account (free tier available)
- Gmail account for email functionality

### 1. Environment Setup

1. **Create `.env` file** in the root directory:

```bash
# Copy the environment template
cp environment-variables.txt .env

# Edit with your actual values
nano .env  # or use any text editor
```

2. **Update the `.env` file** with your configuration:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb+srv://exim:exim24@cluster-namasteexim.kwpijax.mongodb.net/namasteexim?retryWrites=true&w=majority&appName=Cluster-namasteexim

# Email Configuration (SMTP) - Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=adityadevops6@gmail.com
SMTP_PASS=sarc cgtc gkmt chso

# Admin Email (where contact forms will be sent)
ADMIN_EMAIL=adityadevops6@gmail.com

# Frontend Email (for notifications)
FRONTEND_EMAIL=adityadevops6@gmail.com
```

**🚀 Quick Setup**: Run `quick-setup.bat` (Windows) or `quick-setup.sh` (Linux/Mac) to automatically configure your environment!

**📧 For detailed SMTP email setup, see `SMTP_EMAIL_SETUP_GUIDE.md`**

### 2. Email Configuration

#### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `SMTP_PASS`

#### Alternative Email Providers

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Update `SMTP_HOST` and `SMTP_PORT`

### 3. Database Setup

#### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create database user with read/write permissions
4. Whitelist your server IP (or use 0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI`

### 4. Build and Deploy

#### Local Build Test

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test locally
npm start
```

#### Hostinger Deployment

1. **Upload Files**:

   - Upload all files to your Hostinger public_html directory
   - Ensure `.env` file is uploaded (it's in .gitignore by default)

2. **Install Dependencies**:

   - SSH into your Hostinger account
   - Navigate to your domain directory
   - Run: `npm install --production`

3. **Start Application**:

   - Run: `npm start`
   - Or use PM2 for process management: `pm2 start server.js --name namasteexim`

4. **Configure Domain**:
   - Point your domain to the server
   - Ensure port 3000 is accessible (or configure reverse proxy)

### 5. PM2 Process Management (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start server.js --name namasteexim

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

# Monitor application
pm2 monit
```

### 6. Nginx Reverse Proxy (Optional but Recommended)

Create `/etc/nginx/sites-available/namasteexim`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/namasteexim /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. SSL Certificate (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🔧 Configuration Details

### API Endpoints

- `POST /api/contact` - Contact form submission
- `POST /api/quote` - Quote request submission
- `GET /api/health` - Health check

### Database Collections

- `contacts` - Contact form submissions
- `quotes` - Quote request submissions

### Email Templates

- **Admin Notification**: Sent to `ADMIN_EMAIL` when forms are submitted
- **User Confirmation**: Sent to user's email address

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**:

   - Check SMTP credentials
   - Verify Gmail App Password
   - Check firewall settings

2. **Database connection failed**:

   - Verify MongoDB URI
   - Check IP whitelist in MongoDB Atlas
   - Ensure network connectivity

3. **Build errors**:

   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify all dependencies are installed

4. **Port issues**:
   - Ensure port 3000 is open
   - Check if another process is using the port
   - Configure reverse proxy if needed

### Logs and Monitoring

```bash
# View PM2 logs
pm2 logs namasteexim

# View specific log file
pm2 logs namasteexim --lines 100

# Monitor resources
pm2 monit
```

## 📁 File Structure

```
namasteexim-main/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── dist/                  # Built frontend (generated)
├── src/                   # Frontend source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── ...
└── DEPLOYMENT_GUIDE.md   # This file
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **Rate Limiting**: Implemented to prevent spam
3. **Input Validation**: Server-side validation for all inputs
4. **HTTPS**: Use SSL certificate for production
5. **Database Security**: Use strong passwords and IP whitelisting

## 📞 Support

For deployment issues:

1. Check Hostinger documentation
2. Verify all environment variables
3. Check server logs for errors
4. Test API endpoints individually

## 🚀 Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Use CDN** for static assets
3. **Implement caching** for API responses
4. **Monitor database performance**
5. **Use PM2 cluster mode** for multiple processes

---

**Note**: This deployment guide assumes you have basic knowledge of Node.js, React, and server administration. For complex setups, consider consulting with a DevOps specialist.
