// Development server that runs both frontend and backend
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Starting Namaste EXIM Development Server...\n");

// Start backend server
console.log("📡 Starting backend server on port 5000...");
const backend = spawn("node", ["server.js"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
});

// Wait a moment for backend to start
setTimeout(() => {
  console.log("🎨 Starting frontend development server on port 3000...");

  // Start frontend development server
  const frontend = spawn("npm", ["run", "dev"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down development servers...");
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

  frontend.on("error", (err) => {
    console.error("❌ Frontend server error:", err);
  });
}, 2000);

backend.on("error", (err) => {
  console.error("❌ Backend server error:", err);
});

console.log("✅ Development servers starting...");
console.log("📧 Backend API: http://localhost:5000");
console.log("🎨 Frontend: http://localhost:3000");
console.log("📧 Email: adityadevops6@gmail.com");
console.log("\nPress Ctrl+C to stop both servers");
