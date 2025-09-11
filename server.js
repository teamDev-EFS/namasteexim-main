import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import connectDB from "./backend/config/db.js";
import dotenv from "dotenv";
import {
  domainConfig,
  isAllowedOrigin,
  getDomainConfig,
} from "./domain-config.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "SMTP_USER",
  "SMTP_PASS",
  "ADMIN_EMAIL",
  "MONGODB_URI",
];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingEnvVars.join(", ")
  );
  console.error(
    "Please check your .env file and ensure all required variables are set."
  );
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Render deployment (handles X-Forwarded-For headers)
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
  })
);

// Configure CORS with domain configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Add environment variable origin if set
      const allOrigins = [...domainConfig.allowedOrigins];
      if (process.env.FRONTEND_URL) {
        allOrigins.push(process.env.FRONTEND_URL);
      }

      if (isAllowedOrigin(origin) || allOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`🚫 CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api", limiter);

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// Quote Request Schema
const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  product: { type: String, required: true },
  quantity: { type: String, required: true },
  requirements: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Quote = mongoose.model("Quote", quoteSchema);

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper function to get client IP
const getClientIP = (req) => {
  return (
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket?.remoteAddress ||
    "Unknown"
  );
};

// Helper function to send emails
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error);
    return false;
  }
};

// Input validation helper
const validateInput = (data, requiredFields) => {
  const errors = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  return errors;
};

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "dist")));

// API Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Validate required fields
    const validationErrors = validateInput(req.body, [
      "name",
      "email",
      "subject",
      "message",
    ]);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Get client details
    const ipAddress = getClientIP(req);
    const userAgent = req.get("User-Agent");

    // Save to database
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      subject,
      message,
      ipAddress,
      userAgent,
    });

    await contact.save();
    console.log("✅ Contact form saved to database");

    // Send email to admin
    const adminEmailSent = await sendEmail(
      process.env.ADMIN_EMAIL,
      `New Contact Form: ${subject}`,
      `New contact form submission from ${name} (${email}). Message: ${message}`
    );

    // Send confirmation email to user
    const userEmailSent = await sendEmail(
      email,
      "Thank you for contacting Namaste EXIM",
      `Dear ${name}, thank you for contacting us. We will get back to you within 24 hours.`
    );

    // Check if emails were sent successfully
    if (!adminEmailSent || !userEmailSent) {
      console.warn(
        "⚠️ Some emails failed to send, but contact form was saved to database"
      );
      res.status(200).json({
        success: true,
        message:
          "Contact form submitted successfully. We will get back to you within 24 hours. (Note: Email notifications may be delayed)",
      });
    } else {
      res.status(200).json({
        success: true,
        message:
          "Contact form submitted successfully. We will get back to you within 24 hours.",
      });
    }
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting contact form. Please try again.",
    });
  }
});

// Quote Request Endpoint
app.post("/api/quote", async (req, res) => {
  try {
    const { name, email, phone, company, product, quantity, requirements } =
      req.body;

    // Validate required fields
    const validationErrors = validateInput(req.body, [
      "name",
      "email",
      "product",
      "quantity",
    ]);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Get client details
    const ipAddress = getClientIP(req);
    const userAgent = req.get("User-Agent");

    // Save to database
    const quote = new Quote({
      name,
      email,
      phone,
      company,
      product,
      quantity,
      requirements,
      ipAddress,
      userAgent,
    });

    await quote.save();
    console.log("✅ Quote request saved to database");

    // Send email to admin
    const adminEmailSent = await sendEmail(
      process.env.ADMIN_EMAIL,
      `New Quote Request: ${product}`,
      `New quote request from ${name} (${email}) for ${product}. Quantity: ${quantity}. Requirements: ${
        requirements || "None specified"
      }`
    );

    // Send confirmation email to user
    const userEmailSent = await sendEmail(
      email,
      "Quote Request Received - Namaste EXIM",
      `Dear ${name}, thank you for your quote request for ${product}. We will prepare a detailed quote for you within 24 hours.`
    );

    // Check if emails were sent successfully
    if (!adminEmailSent || !userEmailSent) {
      console.warn(
        "⚠️ Some emails failed to send, but quote request was saved to database"
      );
      res.status(200).json({
        success: true,
        message:
          "Quote request submitted successfully. We will get back to you within 24 hours. (Note: Email notifications may be delayed)",
      });
    } else {
      res.status(200).json({
        success: true,
        message:
          "Quote request submitted successfully. We will get back to you within 24 hours.",
      });
    }
  } catch (error) {
    console.error("❌ Quote request error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting quote request. Please try again.",
    });
  }
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Add domain middleware
app.use((req, res, next) => {
  const host = req.get("host");
  const domainInfo = getDomainConfig(host);

  console.log(`🌐 Request from: ${host} (${domainInfo.type})`);

  // Set domain-specific headers
  res.setHeader("X-Domain", host);
  res.setHeader("X-Domain-Type", domainInfo.type);
  res.setHeader("X-Primary-Domain", domainConfig.primary);
  res.setHeader("X-Fallback-Domain", domainConfig.fallback);

  // Add domain info to request object
  req.domainInfo = domainInfo;

  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, "dist")}`);
  console.log(`🌐 Primary domain: ${domainConfig.primary}`);
  console.log(`🔄 Fallback domain: ${domainConfig.fallback}`);
  console.log(`🔗 Allowed domains: ${domainConfig.allowedOrigins.join(", ")}`);
  console.log(
    `📧 Email domains: ${Object.keys(domainConfig.email).join(", ")}`
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down gracefully");
  process.exit(0);
});
