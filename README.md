# Namaste EXIM - Agricultural Export Platform

A comprehensive agricultural export platform built with React, TypeScript, and Node.js, featuring interactive maps, contact forms, and backend integration.

## 🚀 Features

- **Interactive Google Maps** integration for global market visualization
- **Responsive Design** with Tailwind CSS and Framer Motion animations
- **Backend API** with MongoDB integration and email functionality
- **Contact Form** with automatic email notifications
- **Quote Request System** with database storage
- **Team Management** with local image assets
- **Product Catalog** with dynamic image loading

## 🛠️ Tech Stack

### Frontend

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Toastr for notifications

### Backend

- Node.js + Express
- MongoDB with Mongoose
- Nodemailer for email functionality
- Helmet for security
- Morgan for logging
- Rate limiting for API protection

## 📁 Project Structure

```
namasteexim-main/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── data/               # Static data and product info
│   ├── utils/              # Utility functions
│   └── assets/             # Images and static assets
├── backend/                # Node.js backend server
├── public/                 # Public assets
└── .env                    # Environment variables
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Gmail account with App Password

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd namasteexim-main

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Setup

#### Frontend (.env)

```bash

```

#### Backend (.env in backend folder)

```bash

PORT=5000
```

### 3. Add Required Images

Place these images in `src/assets/images/`:

- `Export-import.jpg` - Hero section background
- `middle-east-bg.jpg` - Global markets background
- `anaya-meshram.jpg` - Team member photo
- `ankit-meshram.jpg` - Team member photo
- `deepali-meshram.jpg` - Team member photo

Product images (matching product IDs):

- `basmati-1121.jpg`
- `jasmine-rice.jpg`
- `white-rice.jpg`
- `pure-jaggery.jpg`
- `jaggery-powder.jpg`
- `cashew-w180.jpg`
- `cashew-w210.jpg`
- `green-cardamom.jpg`
- `black-pepper.jpg`
- `wheat.jpg`
- `lentils.jpg`
- `fragrance-candles.jpg`

### 4. Start Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## 🌐 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render)

```bash
cd backend
npm run build
# Deploy with environment variables
```

## 📧 Email Configuration

1. Enable 2FA on your Gmail account
2. Generate an App Password
3. Update `SMTP_PASS` in backend `.env`

## 🗄️ Database Collections

- **contacts** - Contact form submissions
- **quotes** - Quote requests
- **logs** - User activity logs

## 🔧 API Endpoints

- `POST /api/contact` - Contact form submission
- `POST /api/quote` - Quote request submission
- `GET /api/health` - Health check

## 📱 Features Implemented

✅ **Frontend**

- Hero section with Export-import.jpg background
- Global markets focused on Middle East only
- Team page with local image integration
- Contact form with backend integration
- Toastr notifications
- Responsive design improvements

✅ **Backend**

- MongoDB connection with provided credentials
- Contact form API with email notifications
- Quote request API with email notifications
- IP address and user agent logging
- Rate limiting and security headers
- Automatic confirmation emails

✅ **Database**

- Contact form storage
- Quote request storage
- User activity logging

## 🚨 Important Notes

1. **Gmail App Password**: Required for email functionality
2. **MongoDB Atlas**: Ensure IP whitelist includes deployment servers
3. **Environment Variables**: Never commit .env files
4. **Image Assets**: All images must be in correct folders with exact names

## 📞 Support

For technical support or questions:

- Email: namasteeximventures@gmail.com
- Backend Health: http://localhost:5000/api/health
- Production URL: https://www.namasteeximventures.com

## 🔒 Security Features

- Helmet.js security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation and sanitization
- MongoDB injection protection

---

**Built with ❤️ for Namaste EXIM Ventures**
