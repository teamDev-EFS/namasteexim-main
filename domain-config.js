// Domain Configuration for Namaste EXIM
// This file contains all domain-related settings

export const domainConfig = {
  // Primary domain (main website)
  primary: "www.namasteexim.com",

  // Fallback domain (backup website)
  fallback: "namasteeximventures.com",

  // All alias domains
  aliases: ["namasteexim.com", "www.namasteeximventures.com"],

  // All allowed origins for CORS
  allowedOrigins: [
    "https://www.namasteexim.com",
    "https://namasteexim.com",
    "https://www.namasteeximventures.com",
    "https://namasteeximventures.com",
  ],

  // SSL configuration
  ssl: {
    enabled: true,
    redirectHttp: true,
  },

  // Email configuration per domain
  email: {
    "www.namasteexim.com": {
      from: "noreply@namasteexim.com",
      admin: "admin@namasteexim.com",
    },
    "namasteeximventures.com": {
      from: "noreply@namasteeximventures.com",
      admin: "admin@namasteeximventures.com",
    },
  },
};

// Helper functions
export const getDomainConfig = (hostname) => {
  if (hostname === domainConfig.primary) {
    return { type: "primary", domain: hostname };
  } else if (hostname === domainConfig.fallback) {
    return { type: "fallback", domain: hostname };
  } else if (domainConfig.aliases.includes(hostname)) {
    return { type: "alias", domain: hostname };
  }
  return { type: "unknown", domain: hostname };
};

export const isAllowedOrigin = (origin) => {
  return domainConfig.allowedOrigins.includes(origin);
};

export const getEmailConfig = (hostname) => {
  return (
    domainConfig.email[hostname] || domainConfig.email[domainConfig.primary]
  );
};

export default domainConfig;
