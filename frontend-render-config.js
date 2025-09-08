// Frontend Configuration for Render Backend
// Use this when frontend is on Hostinger and backend is on Render

export const API_CONFIG = {
  // Render backend URL
  BASE_URL: "https://namasteexim-main.onrender.com",

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

// Example usage:
// const healthUrl = getApiUrl(API_CONFIG.ENDPOINTS.HEALTH);
// const contactUrl = getApiUrl(API_CONFIG.ENDPOINTS.CONTACT);
// const quoteUrl = getApiUrl(API_CONFIG.ENDPOINTS.QUOTE);
