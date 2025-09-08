import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://exim:exim24@cluster-namasteexim.kwpijax.mongodb.net/namasteexim?retryWrites=true&w=majority&appName=Cluster-namasteexim",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
      }
    );

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for development
  })
);
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
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
    user: process.env.SMTP_USER || "adityadevops6@gmail.com",
    pass: process.env.SMTP_PASS || "buqx lanq jljk kpvk",
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
      from: process.env.SMTP_USER || "adityadevops6@gmail.com",
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

// API Routes

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

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

    // Send email to Namaste EXIM
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>IP Address:</strong> ${ipAddress}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `;

    const adminEmailSent = await sendEmail(
      process.env.ADMIN_EMAIL || "adityadevops6@gmail.com",
      `New Contact Form: ${subject}`,
      adminEmailHtml
    );

    // Send confirmation email to user
    const userEmailHtml = `
      <h2>Thank you for contacting Namaste EXIM!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and our team will get back to you within 24 hours.</p>
      <p><strong>Your message:</strong> ${message}</p>
      <p>Best regards,<br>Namaste EXIM Team</p>
    `;

    const userEmailSent = await sendEmail(
      email,
      "Thank you for contacting Namaste EXIM",
      userEmailHtml
    );

    // Check if emails were sent successfully
    if (!adminEmailSent || !userEmailSent) {
      console.warn(
        "⚠️ Some emails failed to send, but form was saved to database"
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

    // Send email to Namaste EXIM
    const adminEmailHtml = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Requirements:</strong> ${requirements || "Not specified"}</p>
      <p><strong>IP Address:</strong> ${ipAddress}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `;

    const adminEmailSent = await sendEmail(
      process.env.ADMIN_EMAIL || "adityadevops6@gmail.com",
      `New Quote Request: ${product}`,
      adminEmailHtml
    );

    // Send confirmation email to user
    const userEmailHtml = `
      <h2>Thank you for your quote request!</h2>
      <p>Dear ${name},</p>
      <p>We have received your quote request for <strong>${product}</strong> and our team will get back to you within 24 hours with a detailed quote.</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p>Best regards,<br>Namaste EXIM Team</p>
    `;

    const userEmailSent = await sendEmail(
      email,
      "Quote Request Received - Namaste EXIM",
      userEmailHtml
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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📧 Email configured for: ${
      process.env.SMTP_USER || "adityadevops6@gmail.com"
    }`
  );
  console.log(`🗄️  Database: namasteexim`);
  console.log(`🌐 Frontend served from: ${path.join(__dirname, "dist")}`);
});
