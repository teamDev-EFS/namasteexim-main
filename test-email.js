// Test Email Configuration Script
// Run this to test your SMTP settings before deployment

import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const testEmail = async () => {
  console.log("🧪 Testing email configuration...\n");

  // Check if .env file exists
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.error("❌ Error: .env file not found or incomplete");
    console.log("📝 Please create .env file from environment-variables.txt");
    console.log("📧 See SMTP_EMAIL_SETUP_GUIDE.md for detailed instructions");
    process.exit(1);
  }

  console.log("📧 SMTP Configuration:");
  console.log(`   Host: ${process.env.SMTP_HOST}`);
  console.log(`   Port: ${process.env.SMTP_PORT}`);
  console.log(`   User: ${process.env.SMTP_USER}`);
  console.log(`   Admin Email: ${process.env.ADMIN_EMAIL}\n`);

  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Verify connection
    console.log("🔍 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!\n");

    // Send test email
    console.log("📤 Sending test email...");
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "🧪 Test Email from Namaste EXIM",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">✅ Email Configuration Test Successful!</h2>
          <p>Congratulations! Your SMTP configuration is working correctly.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Configuration Details:</h3>
            <ul style="color: #374151;">
              <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
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
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 14px;">
            This is an automated test email from Namaste EXIM contact system.
          </p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📬 Sent to: ${process.env.ADMIN_EMAIL}\n`);

    console.log("🎉 Email configuration is working perfectly!");
    console.log("🚀 You can now deploy your application to Hostinger.");
  } catch (error) {
    console.error("❌ Email test failed:");
    console.error(`   Error: ${error.message}\n`);

    console.log("🔧 Troubleshooting tips:");
    console.log("   1. Check your SMTP credentials in .env file");
    console.log("   2. Verify your email provider supports SMTP");
    console.log("   3. For Gmail, make sure you're using an App Password");
    console.log("   4. Check if 2FA is enabled on your email account");
    console.log("   5. Verify the SMTP host and port are correct\n");

    console.log("📚 For detailed help, see SMTP_EMAIL_SETUP_GUIDE.md");
    process.exit(1);
  }
};

// Run the test
testEmail().catch(console.error);
