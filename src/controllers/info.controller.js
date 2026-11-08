import { successResponse } from '../utils/apiResponse.js';
import { config } from '../config/env.js';

export const getApiInfo = (req, res) => {
  return successResponse(res, {
    message: 'Welcome to FarmSoko RESTful API',
    data: {
      name: 'FarmSoko API',
      version: '1.0.0',
      description: 'RESTful API supporting the FarmSoko agricultural marketplace platform',
      environment: config.env,
      endpoints: {
        health: `${config.apiPrefix}/health`,
        categories: `${config.apiPrefix}/categories`,
        products: `${config.apiPrefix}/products`,
        orders: `${config.apiPrefix}/orders (upcoming)`,
        users: `${config.apiPrefix}/users (upcoming)`
      }
    }
  });
};
