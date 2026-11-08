import { ApiError } from '../utils/apiError.js';

export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Cannot find route: ${req.method} ${req.originalUrl}`));
};

