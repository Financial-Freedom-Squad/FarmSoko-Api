import { ApiError } from '../utils/apiError.js';

/**
 * Validates request payload against a schema validator function
 * @param {(body: any) => { error?: string, errors?: string[] }} validatorFn
 */
export const validateBody = (validatorFn) => {
  return (req, res, next) => {
    const result = validatorFn(req.body);
    if (result && (result.error || (result.errors && result.errors.length > 0))) {
      const errors = result.errors || [result.error];
      return next(ApiError.badRequest('Validation failed', errors));
    }
    next();
  };
};

