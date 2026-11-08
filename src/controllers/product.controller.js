import { productService } from '../services/product.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, status, sort, page, limit } = req.query;

    const result = await productService.getAllProducts({
      search,
      category,
      minPrice,
      maxPrice,
      status,
      sort,
      page,
      limit
    });

    return successResponse(res, {
      message: 'Products retrieved successfully',
      data: result.products,
      meta: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    return successResponse(res, {
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, categoryId, price } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.push('Product name is required');
    }
    if (!categoryId) {
      errors.push('Category ID is required');
    }
    if (price === undefined || Number.isNaN(Number(price)) || Number(price) < 0) {
      errors.push('Valid price is required');
    }

    if (errors.length > 0) {
      throw ApiError.badRequest('Validation failed', errors);
    }

    const newProduct = await productService.createProduct(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: 'Product listing created successfully',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await productService.updateProduct(id, req.body);

    return successResponse(res, {
      message: 'Product updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);

    return successResponse(res, {
      message: 'Product listing deleted successfully',
      data: deleted
    });
  } catch (error) {
    next(error);
  }
};
