import { successResponse } from '../utils/apiResponse.js';
import { config } from '../config/env.js';

export const getApiInfo = (req, res) => {
  return successResponse(res, {
    message: 'Welcome to FarmSoko RESTful API',
    data: {
      name: 'FarmSoko API',
      version: '1.0.0',
      description: 'RESTful API supporting the FarmSoko agricultural marketplace platform',
      orm: 'Drizzle ORM (PostgreSQL)',
      environment: config.env,
      endpoints: {
        health: `${config.apiPrefix}/health`,
        auth: {
          register: `POST ${config.apiPrefix}/auth/register`,
          login: `POST ${config.apiPrefix}/auth/login`,
          profile: `GET ${config.apiPrefix}/auth/profile`
        },
        categories: `${config.apiPrefix}/categories`,
        products: `${config.apiPrefix}/products`,
        orders: `${config.apiPrefix}/orders (upcoming)`
      }
    }
  });
};
