# 🌐 Namaste EXIM Ventures - Production Deployment

## 🎯 **Production URLs (After Deployment)**

### **Frontend (Website)**

- **Primary:** `https://www.namasteeximventures.com`
- **Fallback:** `https://namasteeximventures.com`

### **Backend API (Same Domain)**

- **Health Check:** `https://www.namasteeximventures.com/api/health`
- **Contact Form:** `https://www.namasteeximventures.com/api/contact`
- **Quote Request:** `https://www.namasteeximventures.com/api/quote`

## 🚀 **How It Works in Production**

### **Full-Stack Deployment on Hostinger**

When you deploy to Hostinger, both frontend and backend run on the same domain:

1. **Frontend:** Served from `dist/` folder
2. **Backend:** Node.js server handles API routes
3. **Same Domain:** Everything runs on `www.namasteeximventures.com`

### **Request Flow:**

```
User visits: https://www.namasteeximventures.com
├── Frontend: Serves React app from dist/
└── API calls: https://www.namasteeximventures.com/api/*
    ├── /api/health → Backend health check
    ├── /api/contact → Contact form submission
    └── /api/quote → Quote request submission
```

## 🔧 **Hostinger Configuration**

### **Node.js Settings:**

- **Application Root:** `/public_html`
- **Startup File:** `server.js`
- **Application URL:** `https://www.namasteeximventures.com`
- **Port:** `5000` (internal)

### **Domain Setup:**

- **Primary:** `www.namasteeximventures.com` → Points to your server
- **Fallback:** `namasteeximventures.com` → Points to your server
- **Aliases:** `namasteexim.com`, `www.namasteexim.com` → Redirect to primary

## 📧 **Email Configuration (Production)**

### **SMTP Settings:**

- **Host:** `smtp.gmail.com`
- **Port:** `587`
- **User:** `namasteeximventures@gmail.com`
- **Password:** `zqpu zoes ccmd wfnp`

### **Email Flow:**

```
Contact Form Submission
├── Saves to MongoDB
├── Sends email to: namasteeximventures@gmail.com (admin)
└── Sends confirmation to: user@example.com (user)
```

## 🗄️ **Database (Production)**

### **MongoDB Atlas:**

- **Connection:** `mongodb+srv://licensing_db_user:mAMn03K28UnJa3CY@cluster-namasteexim.kwpijax.mongodb.net/`
- **Database:** `namasteexim`
- **Collections:** `contacts`, `quotes`

## 🧪 **Testing Production Deployment**

### **Use the Production Test Script:**

```bash
# Run this after deployment
test-production.bat
```

### **Manual Testing:**

1. **Frontend:** Visit `https://www.namasteeximventures.com`
2. **Health Check:** `https://www.namasteeximventures.com/api/health`
3. **Contact Form:** Submit a test message
4. **Quote Request:** Submit a test quote request
5. **Email:** Check if emails are received

## 🔍 **Production vs Development**

### **Development (Local):**

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- API: `http://localhost:5000/api/*`

### **Production (Hostinger):**

- Frontend: `https://www.namasteeximventures.com`
- Backend: `https://www.namasteeximventures.com` (same domain)
- API: `https://www.namasteeximventures.com/api/*`

## 🛠️ **Troubleshooting Production**

### **If Website Doesn't Load:**

1. Check DNS propagation
2. Verify SSL certificate
3. Check Hostinger Node.js status
4. Review application logs

### **If API Doesn't Work:**

1. Test health endpoint first
2. Check environment variables
3. Verify database connection
4. Check email configuration

### **If Emails Don't Send:**

1. Verify SMTP credentials
2. Check Gmail App Password
3. Test email configuration
4. Check spam folder

## 📊 **Monitoring Production**

### **Health Monitoring:**

- **Health Check:** `https://www.namasteeximventures.com/api/health`
- **Response:** `{"status":"OK","timestamp":"...","database":"Connected"}`

### **Log Monitoring:**

- Check Hostinger Node.js logs
- Monitor MongoDB Atlas logs
- Track email delivery rates

## 🔒 **Security (Production)**

### **HTTPS:**

- SSL certificate enabled
- All traffic encrypted
- Secure API endpoints

### **Environment Variables:**

- All credentials in environment variables
- No hardcoded secrets
- Secure database connections

### **Rate Limiting:**

- 100 requests per 15 minutes per IP
- Prevents abuse and spam

---

## 🎉 **Production Ready!**

**Your Namaste EXIM Ventures application will run on:**

- **Website:** `https://www.namasteeximventures.com`
- **API:** `https://www.namasteeximventures.com/api/*`
- **Email:** `namasteeximventures@gmail.com`
- **Database:** MongoDB Atlas (cloud)

**Everything runs on the same domain for seamless integration!**
