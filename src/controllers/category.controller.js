import { categoryService } from '../services/category.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(res, {
      message: 'Categories retrieved successfully',
      data: categories,
      meta: { total: categories.length }
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    return successResponse(res, {
      message: 'Category retrieved successfully',
      data: category
    });
  } catch (error) {
    next(error);
  }
};
