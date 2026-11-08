import { successResponse } from '../utils/apiResponse.js';
import { config } from '../config/env.js';

export const getHealthStatus = (req, res) => {
  const memoryUsage = process.memoryUsage();

  const healthData = {
    service: 'FarmSoko-Api',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.env,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
    }
  };

  return successResponse(res, {
    statusCode: 200,
    message: 'FarmSoko-Api is operational',
    data: healthData
  });
};

