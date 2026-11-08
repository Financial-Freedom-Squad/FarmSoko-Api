import { ApiError } from '../utils/apiError.js';

const INITIAL_CATEGORIES = [
  {
    id: 'cat_grains',
    name: 'Grains & Cereals',
    slug: 'grains-and-cereals',
    description: 'Dry cereals, staple grains, and pulses including maize, wheat, rice, and beans',
    itemCount: 2
  },
  {
    id: 'cat_veg',
    name: 'Fresh Vegetables',
    slug: 'fresh-vegetables',
    description: 'Farm-fresh green vegetables, leafy greens, onions, and tomatoes',
    itemCount: 2
  },
  {
    id: 'cat_fruits',
    name: 'Fresh Fruits',
    slug: 'fresh-fruits',
    description: 'Naturally ripened tropical and temperate fruits',
    itemCount: 2
  },
  {
    id: 'cat_dairy',
    name: 'Dairy & Poultry',
    slug: 'dairy-and-poultry',
    description: 'Fresh cow milk, free-range kienyeji eggs, and poultry products',
    itemCount: 1
  },
  {
    id: 'cat_tubers',
    name: 'Roots & Tubers',
    slug: 'roots-and-tubers',
    description: 'Quality root crops such as potatoes, sweet potatoes, and cassava',
    itemCount: 1
  }
];

class CategoryService {
  constructor() {
    this.categories = [...INITIAL_CATEGORIES];
  }

  async getAllCategories() {
    return [...this.categories];
  }

  async getCategoryById(id) {
    const category = this.categories.find(
      (c) => c.id.toLowerCase() === id.toLowerCase() || c.slug === id.toLowerCase()
    );

    if (!category) {
      throw ApiError.notFound(`Category with identifier '${id}' not found`);
    }

    return category;
  }
}

export const categoryService = new CategoryService();

