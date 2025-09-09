// API Configuration
// Handles different environments (development, production)

// Get API base URL from environment variables
const getApiBaseUrl = () => {
  // In production (Netlify), use relative paths for API calls
  // Netlify will proxy /api/* requests to the Render backend
  if (import.meta.env.PROD) {
    return ""; // Use relative paths in production
  }

  // In development, use the VITE_API_URL or fallback to localhost
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.warn("VITE_API_URL not found in environment variables");
    // Fallback to localhost for development
    return "http://localhost:5000";
  }

  return apiUrl;
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),

  // API endpoints
  ENDPOINTS: {
    HEALTH: "/api/health",
    CONTACT: "/api/contact",
    QUOTE: "/api/quote",
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get specific endpoint URLs
export const getApiEndpoints = () => ({
  health: getApiUrl(API_CONFIG.ENDPOINTS.HEALTH),
  contact: getApiUrl(API_CONFIG.ENDPOINTS.CONTACT),
  quote: getApiUrl(API_CONFIG.ENDPOINTS.QUOTE),
});

// Log current configuration (only in development)
if (import.meta.env.DEV) {
  console.log("🔧 API Configuration:", {
    baseUrl: API_CONFIG.BASE_URL,
    environment: import.meta.env.MODE,
    endpoints: getApiEndpoints(),
  });
}
