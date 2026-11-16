import { config } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    message,
    errors: err.errors || []
  };

  if (config.isDevelopment) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

