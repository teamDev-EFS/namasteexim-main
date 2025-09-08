// Domain Configuration for Namaste EXIM Ventures
// This file contains all domain-related settings

export const domainConfig = {
  // Primary domain (main website)
  primary: "www.namasteeximventures.com",

  // Fallback domain (backup website)
  fallback: "namasteeximventures.com",

  // All alias domains
  aliases: ["namasteexim.com", "www.namasteexim.com"],

  // All allowed origins for CORS
  allowedOrigins: [
    "https://www.namasteeximventures.com",
    "https://namasteeximventures.com",
    "https://www.namasteexim.com",
    "https://namasteexim.com",
  ],

  // SSL configuration
  ssl: {
    enabled: true,
    redirectHttp: true,
  },

  // Email configuration per domain
  email: {
    "www.namasteeximventures.com": {
      from: "namasteeximventures@gmail.com",
      admin: "namasteeximventures@gmail.com",
    },
    "namasteeximventures.com": {
      from: "namasteeximventures@gmail.com",
      admin: "namasteeximventures@gmail.com",
    },
    "www.namasteexim.com": {
      from: "noreply@namasteexim.com",
      admin: "namasteeximventures@gmail.com",
    },
    "namasteexim.com": {
      from: "noreply@namasteexim.com",
      admin: "namasteeximventures@gmail.com",
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
