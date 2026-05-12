import rateLimit from 'express-rate-limit'

export const auditRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: 'Too many audit requests. Please try again later.',
    },
  },
})

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: 'Too many AI summary requests. Please try again later.',
    },
  },
})

export const leadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: 'Too many lead submissions. Please try again later.',
    },
  },
})
