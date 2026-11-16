/**
 * Helper to create standard API responses
 * @param {import('express').Response} res
 * @param {object} options
 * @param {number} [options.statusCode=200]
 * @param {string} [options.message='Success']
 * @param {any} [options.data=null]
 * @param {object} [options.meta=null]
 */
export const successResponse = (res, { statusCode = 200, message = 'Success', data = null, meta = null } = {}) => {
  const responsePayload = {
    success: true,
    message,
    data
  };

  if (meta) {
    responsePayload.meta = meta;
  }

  return res.status(statusCode).json(responsePayload);
};

