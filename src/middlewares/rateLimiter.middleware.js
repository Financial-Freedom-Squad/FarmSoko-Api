import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

export const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  skip: () => config.isTest
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // max 20 login/register attempts per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.'
  },
  skip: () => config.isTest
});

