import app from './app.js';
import { config } from './config/env.js';

const server = app.listen(config.port, () => {
  console.log(`===============================================`);
  console.log(`🌾 FarmSoko API server running`);
  console.log(`🚀 Mode: [${config.env}]`);
  console.log(`🔗 Local: http://localhost:${config.port}`);
  console.log(`🩺 Health: http://localhost:${config.port}${config.apiPrefix}/health`);
  console.log(`===============================================`);
});

// Graceful Shutdown helper
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down FarmSoko API...`);
  server.close(() => {
    console.log('HTTP server closed. Process terminating cleanly.');
    process.exit(0);
  });

  // Force close after 10s if connections linger
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

