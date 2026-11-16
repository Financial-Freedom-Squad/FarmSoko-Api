import { authService } from '../services/auth.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, location } = req.body;
    const errors = [];

    if (!name || !name.trim()) errors.push('Name is required');
    if (!email || !email.includes('@')) errors.push('Valid email is required');
    if (!password || password.length < 6) errors.push('Password must be at least 6 characters long');

    if (errors.length > 0) {
      throw ApiError.badRequest('Validation failed', errors);
    }

    const result = await authService.register({ name, email, password, role, phone, location });

    return successResponse(res, {
      statusCode: 201,
      message: 'Account registered successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw ApiError.badRequest('Email and password are required');
    }

    const result = await authService.login({ email, password });

    return successResponse(res, {
      message: 'Logged in successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);

    return successResponse(res, {
      message: 'Profile retrieved successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

