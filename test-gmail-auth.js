// Gmail Authentication Test Script
// This will help diagnose Gmail authentication issues

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const testGmailAuth = async () => {
  console.log("🧪 Testing Gmail Authentication...\n");

  // Check environment variables
  console.log("📧 Current Configuration:");
  console.log(`   SMTP Host: ${process.env.SMTP_HOST || "smtp.gmail.com"}`);
  console.log(`   SMTP Port: ${process.env.SMTP_PORT || 587}`);
  console.log(
    `   SMTP User: ${process.env.SMTP_USER || "adityadevops6@gmail.com"}`
  );
  console.log(
    `   SMTP Pass: ${
      process.env.SMTP_PASS
        ? "***" + process.env.SMTP_PASS.slice(-4)
        : "NOT SET"
    }`
  );
  console.log(
    `   Admin Email: ${process.env.ADMIN_EMAIL || "adityadevops6@gmail.com"}\n`
  );

  // Check if .env file exists
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("❌ Error: .env file not found or incomplete");
    console.log("📝 Please create .env file from environment-variables.txt");
    console.log("📧 See GMAIL_SETUP_GUIDE.md for detailed instructions");
    process.exit(1);
  }

  // Create transporter with debug info
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Enable debug mode
    logger: true, // Log to console
  });

  try {
    console.log("🔍 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!\n");

    console.log("📤 Sending test email...");
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: "🧪 Gmail Authentication Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">✅ Gmail Authentication Successful!</h2>
          <p>Your Gmail SMTP configuration is working correctly.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Configuration Details:</h3>
            <ul style="color: #374151;">
              <li><strong>SMTP Host:</strong> ${
                process.env.SMTP_HOST || "smtp.gmail.com"
              }</li>
              <li><strong>SMTP Port:</strong> ${
                process.env.SMTP_PORT || 587
              }</li>
              <li><strong>From Email:</strong> ${process.env.SMTP_USER}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          
          <p style="color: #6b7280;">
            Your contact forms and quote requests will now send emails successfully!
          </p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(
      `📬 Sent to: ${process.env.ADMIN_EMAIL || process.env.SMTP_USER}\n`
    );

    console.log("🎉 Gmail authentication is working perfectly!");
    console.log("🚀 You can now use your contact forms and quote requests.");
  } catch (error) {
    console.error("❌ Gmail authentication failed:");
    console.error(`   Error: ${error.message}\n`);

    if (error.code === "EAUTH") {
      console.log("🔧 Gmail Authentication Error Solutions:");
      console.log(
        "   1. Make sure 2-Factor Authentication is enabled on your Gmail account"
      );
      console.log(
        "   2. Generate a new App Password (not your regular password)"
      );
      console.log("   3. Use the 16-character App Password in your .env file");
      console.log("   4. App Password format: 'xxxx xxxx xxxx xxxx'");
      console.log(
        "   5. Wait a few minutes for the App Password to activate\n"
      );

      console.log("📚 For detailed instructions, see GMAIL_SETUP_GUIDE.md");
    } else if (error.code === "ECONNECTION") {
      console.log("🔧 Connection Error Solutions:");
      console.log("   1. Check your internet connection");
      console.log("   2. Verify SMTP host and port are correct");
      console.log("   3. Check if firewall is blocking the connection");
    } else {
      console.log("🔧 General Error Solutions:");
      console.log("   1. Check your .env file configuration");
      console.log("   2. Verify email credentials are correct");
      console.log("   3. Try using a different email provider");
    }

    process.exit(1);
  }
};

// Run the test
testGmailAuth().catch(console.error);
