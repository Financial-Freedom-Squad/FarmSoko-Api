import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import apiRouter from './routes/api.router.js';
import { getApiInfo } from './controllers/info.controller.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl === '*' ? '*' : [config.clientUrl],
    credentials: true
  })
);

// Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use(requestLogger());

// Root endpoint
app.get('/', getApiInfo);

// API Routes
app.use(config.apiPrefix, apiRouter);

// Catch-all 404 Route
app.use(notFoundHandler);

// Centralized Error Handling
app.use(errorHandler);

export default app;

