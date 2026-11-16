import morgan from 'morgan';
import { config } from '../config/env.js';

export const requestLogger = () => {
  if (config.isTest) {
    return (req, res, next) => next();
  }

  const format = config.isDevelopment ? 'dev' : 'combined';
  return morgan(format);
};

