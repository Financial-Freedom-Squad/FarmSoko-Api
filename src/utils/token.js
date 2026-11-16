import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

/**
 * Generate a signed JWT
 * @param {object} payload
 * @returns {string}
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

/**
 * Verify and decode a JWT
 * @param {string} token
 * @returns {object}
 */
export const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

