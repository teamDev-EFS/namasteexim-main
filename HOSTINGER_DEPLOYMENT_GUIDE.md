# 🚀 Hostinger Deployment Guide - Namaste EXIM

## 📋 **Deployment Options**

### **Option 1: Full-Stack Deployment (Recommended)**

Deploy both frontend and backend on the same Hostinger account.

### **Option 2: Separate Deployment**

Deploy frontend on Hostinger and backend on a separate Node.js hosting service.

---

## 🎯 **Option 1: Full-Stack Deployment (Recommended)**

### **Prerequisites**

- Hostinger hosting account with **Node.js support**
- Domain name configured
- MongoDB Atlas account (free tier available)
- Gmail account for email functionality

### **Step 1: Prepare Your Project**

1. **Build the Frontend:**

```bash
npm run build
```

2. **Verify Build Output:**

- Check that `dist/` folder is created
- Ensure all assets are properly bundled

### **Step 2: Upload to Hostinger**

#### **Method A: File Manager (Easiest)**

1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to `public_html` directory**
4. **Upload all project files** (except `node_modules`)

#### **Method B: FTP/SFTP (Recommended for large files)**

1. **Get FTP credentials from Hostinger**
2. **Use FileZilla or similar FTP client**
3. **Upload entire project to `public_html`**

### **Step 3: Configure Environment Variables**

1. **Create `.env` file in root directory:**

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
SMTP_PASS=buqx lanq jljk kpvk

# Admin Email (where contact forms will be sent)
ADMIN_EMAIL=adityadevops6@gmail.com

# Frontend Email (for notifications)
FRONTEND_EMAIL=adityadevops6@gmail.com

# Domain Configuration
PRIMARY_DOMAIN=www.namasteexim.com
FALLBACK_DOMAIN=namasteeximventures.com
FRONTEND_URL=https://www.namasteexim.com
```

### **Step 4: Install Dependencies**

1. **SSH into your Hostinger account**
2. **Navigate to your domain directory:**

```bash
cd public_html
```

3. **Install dependencies:**

```bash
npm install --production
cd backend
npm install --production
cd ..
```

### **Step 5: Configure Node.js Application**

1. **In Hostinger Control Panel:**

   - Go to **Advanced** → **Node.js**
   - Set **Node.js version** to 18.x or higher
   - Set **Application root** to your domain folder
   - Set **Application startup file** to `server.js`
   - Set **Application URL** to your domain

2. **Configure Environment Variables in Hostinger:**
   - Go to **Advanced** → **Node.js** → **Environment Variables**
   - Add all variables from your `.env` file

### **Step 6: Start the Application**

1. **In Hostinger Node.js settings:**

   - Click **"Start"** to start your application
   - Check logs for any errors

2. **Test your application:**
   - Visit your domain
   - Test contact form
   - Test quote request form

---

## 🎯 **Option 2: Separate Deployment**

### **Frontend Deployment (Hostinger)**

1. **Build the frontend:**

```bash
npm run build
```

2. **Upload only the `dist/` folder contents to `public_html`**

3. **Configure API endpoints in your frontend code to point to your backend URL**

### **Backend Deployment (Alternative Services)**

#### **Option A: Railway**

1. **Connect your GitHub repository**
2. **Set environment variables**
3. **Deploy automatically**

#### **Option B: Render**

1. **Connect your GitHub repository**
2. **Configure build settings**
3. **Set environment variables**

#### **Option C: Heroku**

1. **Create Heroku app**
2. **Connect GitHub repository**
3. **Set environment variables**
4. **Deploy**

---

## 🔧 **Configuration Details**

### **Frontend Configuration**

Update `vite.config.ts` for production:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://www.namasteexim.com", // Primary domain
        changeOrigin: true,
      },
    },
  },
});
```

### **Backend Configuration**

Your backend is already production-ready with:

- ✅ Environment variable validation
- ✅ Input validation
- ✅ Error handling
- ✅ Security headers
- ✅ Rate limiting
- ✅ CORS configuration

### **Database Configuration**

1. **MongoDB Atlas:**
   - Whitelist your server IP address
   - Use connection string from environment variables
   - Ensure database user has proper permissions

### **Email Configuration**

1. **Gmail Setup:**
   - Enable 2-Factor Authentication
   - Generate App Password
   - Use App Password in `SMTP_PASS`

### **Domain Configuration**

Your application supports multiple domains with fallback:

1. **Primary Domain:** `www.namasteexim.com`
2. **Fallback Domain:** `namasteeximventures.com`
3. **Alias Domains:** `namasteexim.com`, `www.namasteeximventures.com`

**Domain Setup in Hostinger:**

1. **Add Domains:**

   - Go to **Domains** → **Add Domain**
   - Add `www.namasteexim.com` (primary)
   - Add `namasteeximventures.com` (fallback)
   - Add `namasteexim.com` (alias)
   - Add `www.namasteeximventures.com` (alias)

2. **DNS Configuration:**

   - Point all domains to the same server IP
   - Set A records for all domains
   - Configure CNAME records if needed

3. **SSL Certificates:**

   - Enable SSL for all domains
   - Use Let's Encrypt or your preferred SSL provider
   - Ensure HTTPS redirect is enabled

4. **Redirects (Optional):**
   - Set up redirects: `namasteexim.com` → `www.namasteexim.com`
   - Set up redirects: `www.namasteeximventures.com` → `namasteeximventures.com`

**CORS Configuration:**

- All domains are automatically allowed
- API requests work from any configured domain
- Fallback handling ensures service continuity

---

## 🚀 **Deployment Commands**

### **Quick Deployment Script**

Create `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Build frontend
echo "📦 Building frontend..."
npm run build

# Install production dependencies
echo "📥 Installing dependencies..."
npm install --production
cd backend
npm install --production
cd ..

echo "✅ Deployment ready!"
echo "📁 Upload the entire project to your Hostinger public_html directory"
echo "🔧 Configure Node.js settings in Hostinger control panel"
echo "🌐 Set environment variables in Hostinger"
echo "▶️ Start your Node.js application"
```

### **Windows Deployment Script**

Create `deploy.bat`:

```batch
@echo off
echo 🚀 Starting deployment...

echo 📦 Building frontend...
npm run build

echo 📥 Installing dependencies...
npm install --production
cd backend
npm install --production
cd ..

echo ✅ Deployment ready!
echo 📁 Upload the entire project to your Hostinger public_html directory
echo 🔧 Configure Node.js settings in Hostinger control panel
echo 🌐 Set environment variables in Hostinger
echo ▶️ Start your Node.js application

pause
```

---

## 🔍 **Testing After Deployment**

### **1. Frontend Tests**

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images and assets load properly
- [ ] Responsive design works on mobile

### **2. Backend Tests**

- [ ] Health check endpoint: `https://www.namasteexim.com/api/health`
- [ ] Health check endpoint: `https://namasteeximventures.com/api/health`
- [ ] Contact form submission works
- [ ] Quote request form works
- [ ] Email notifications are sent
- [ ] Database connections work
- [ ] CORS works for all domains
- [ ] Domain fallback handling works

### **3. Integration Tests**

- [ ] Contact form sends emails
- [ ] Quote requests are saved to database
- [ ] Error handling works properly
- [ ] Rate limiting functions correctly

---

## 🛠️ **Troubleshooting**

### **Common Issues**

1. **Application won't start:**

   - Check Node.js version (18.x or higher)
   - Verify all environment variables are set
   - Check application logs in Hostinger

2. **Database connection failed:**

   - Verify MongoDB URI is correct
   - Check IP whitelist in MongoDB Atlas
   - Ensure network connectivity

3. **Email not sending:**

   - Verify SMTP credentials
   - Check Gmail App Password
   - Test email configuration

4. **Frontend not loading:**
   - Check if `dist/` folder is uploaded
   - Verify file permissions
   - Check for JavaScript errors in browser console

### **Logs and Monitoring**

1. **Hostinger Logs:**

   - Go to **Advanced** → **Node.js** → **Logs**
   - Monitor application logs for errors

2. **Application Monitoring:**
   - Set up health check monitoring
   - Monitor database connections
   - Track email delivery rates

---

## 🔒 **Security Checklist**

- [ ] Environment variables are properly set
- [ ] No hardcoded credentials in code
- [ ] HTTPS is enabled (SSL certificate)
- [ ] Rate limiting is configured
- [ ] Input validation is working
- [ ] CORS is properly configured
- [ ] Security headers are enabled

---

## 📞 **Support**

### **Hostinger Support**

- **Documentation:** https://support.hostinger.com/
- **Node.js Guide:** https://support.hostinger.com/en/articles/1583299-how-to-set-up-node-js-applications
- **Live Chat:** Available in Hostinger control panel

### **Application Support**

- Check application logs for errors
- Verify all environment variables
- Test API endpoints individually
- Monitor database connections

---

## 🎉 **Post-Deployment**

### **1. Domain Configuration**

- Point your domain to the server
- Configure SSL certificate
- Set up redirects if needed

### **2. Performance Optimization**

- Enable Gzip compression
- Set up CDN for static assets
- Monitor application performance
- Optimize database queries

### **3. Backup Strategy**

- Regular database backups
- Code repository backups
- Environment variable backups

---

**🎯 Your Namaste EXIM application is now ready for production deployment on Hostinger!**
