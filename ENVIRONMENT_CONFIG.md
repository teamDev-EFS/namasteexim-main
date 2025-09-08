# 🔧 Environment Configuration Guide

## 📋 **Environment Files Created**

### **1. `.env.production`**

```bash
# Production Environment Variables
# This file is used when building for production

# Backend API URL for production
VITE_API_URL=https://namasteexim-main.onrender.com

# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDmzcwUN7T2d9VDQNQfG1QOWHDl0JFtY-U
```

### **2. `.env.development`**

```bash
# Development Environment Variables
# This file is used for local development

# Backend API URL for development (localhost)
VITE_API_URL=http://localhost:5000

# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDmzcwUN7T2d9VDQNQfG1QOWHDl0JFtY-U
```

## 🚀 **How It Works**

### **Development Mode:**

```bash
# Uses .env.development
npm run dev
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
```

### **Production Build:**

```bash
# Uses .env.production
npm run build
# Frontend: Built with Render backend URL
# Backend API: https://namasteexim-main.onrender.com
```

## 🔧 **API Configuration**

### **New API Config File: `src/config/api.js`**

```javascript
// Automatically detects environment and uses correct API URL
const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return apiUrl || "http://localhost:5000";
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    HEALTH: "/api/health",
    CONTACT: "/api/contact",
    QUOTE: "/api/quote",
  },
};
```

## 📱 **Usage in Frontend Components**

### **Import and Use:**

```javascript
import { getApiUrl, getApiEndpoints } from "../config/api";

// Get specific endpoint
const healthUrl = getApiUrl("/api/health");
const contactUrl = getApiUrl("/api/contact");

// Or get all endpoints
const endpoints = getApiEndpoints();
// endpoints.health, endpoints.contact, endpoints.quote
```

### **Example Usage:**

```javascript
// Contact form submission
const submitContact = async (formData) => {
  const response = await fetch(getApiUrl("/api/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
};
```

## 🎯 **Deployment Workflow**

### **1. Development:**

```bash
# Start backend
cd backend && node server.js

# Start frontend (uses localhost backend)
npm run dev
```

### **2. Production Build:**

```bash
# Build with production environment
npm run build
# or
build-production.bat
```

### **3. Deploy Frontend to Hostinger:**

- Upload `dist/` folder contents
- Frontend will automatically use Render backend

## 🔍 **Environment Detection**

### **Vite Environment Variables:**

- `import.meta.env.MODE` - Current mode (development/production)
- `import.meta.env.DEV` - True in development
- `import.meta.env.PROD` - True in production
- `import.meta.env.VITE_API_URL` - Your custom API URL

### **Automatic Configuration:**

```javascript
// The API config automatically detects environment
if (import.meta.env.DEV) {
  // Development: uses localhost:5000
  console.log("Development mode - using localhost backend");
} else {
  // Production: uses Render backend
  console.log("Production mode - using Render backend");
}
```

## 🧪 **Testing Different Environments**

### **Test Development:**

```bash
# Start local backend
cd backend && node server.js

# Start frontend (will use localhost:5000)
npm run dev
```

### **Test Production Build:**

```bash
# Build for production
npm run build

# Serve the built files (simulates production)
npx serve dist
```

## 📋 **Environment File Priority**

1. **`.env.production`** - Used when `NODE_ENV=production`
2. **`.env.development`** - Used when `NODE_ENV=development`
3. **`.env.local`** - Always loaded (for local overrides)
4. **`.env`** - Default fallback

## 🎉 **Benefits**

✅ **Automatic Environment Detection**
✅ **No Code Changes Needed for Deployment**
✅ **Secure Environment Variable Handling**
✅ **Easy Development and Production Switching**
✅ **Render Backend Integration**

---

**Your frontend will now automatically use the correct backend URL based on the environment!**
