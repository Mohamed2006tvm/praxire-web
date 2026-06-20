const rateLimit = require('express-rate-limit');

// ─── Global API Limiter ──────────────────────────────────
// Limit each IP to 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Authentication Limiter ──────────────────────────────
// Limit auth requests (login, register) to 20 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Form Submissions Limiter ────────────────────────────
// Limit form submissions (contacts, applications, newsletter) to 5 per hour
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions from this connection. Please try again in an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  globalLimiter,
  authLimiter,
  formLimiter,
};
