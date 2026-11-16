import { ApiError } from '../utils/apiError.js';
import { categoryService } from './category.service.js';

const INITIAL_PRODUCTS = [
  {
    id: 'prod_001',
    name: 'Yellow Maize (Dry Corn)',
    slug: 'yellow-maize-dry-corn',
    categoryId: 'cat_grains',
    description: 'High-grade sun-dried yellow maize grain, ideal for milling or animal feed.',
    price: 3200,
    currency: 'KES',
    unit: '90kg bag',
    quantityAvailable: 150,
    status: 'in_stock',
    farmer: {
      id: 'farmer_01',
      name: 'John Kiprono',
      location: 'Eldoret, Uasin Gishu',
      phone: '+254712345678'
    },
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-10T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-10T08:00:00Z').toISOString()
  },
  {
    id: 'prod_002',
    name: 'Mwea Pishori Rice',
    slug: 'mwea-pishori-rice',
    categoryId: 'cat_grains',
    description: 'Pure aromatic long-grain Pishori rice freshly harvested from Mwea irrigation scheme.',
    price: 180,
    currency: 'KES',
    unit: '1kg',
    quantityAvailable: 500,
    status: 'in_stock',
    farmer: {
      id: 'farmer_02',
      name: 'Grace Wambui',
      location: 'Mwea, Kirinyaga',
      phone: '+254722334455'
    },
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-12T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-12T10:00:00Z').toISOString()
  },
  {
    id: 'prod_003',
    name: 'Fresh Anna F1 Tomatoes',
    slug: 'fresh-anna-f1-tomatoes',
    categoryId: 'cat_veg',
    description: 'Firm, ripe, greenhouse-grown Anna F1 tomatoes with long shelf life.',
    price: 2500,
    currency: 'KES',
    unit: 'crate (50kg)',
    quantityAvailable: 40,
    status: 'in_stock',
    farmer: {
      id: 'farmer_03',
      name: 'Peter Kariuki',
      location: 'Naivasha, Nakuru',
      phone: '+254733445566'
    },
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-14T09:30:00Z').toISOString(),
    updatedAt: new Date('2026-01-14T09:30:00Z').toISOString()
  },
  {
    id: 'prod_004',
    name: 'Sukuma Wiki (Collard Greens)',
    slug: 'sukuma-wiki-collard-greens',
    categoryId: 'cat_veg',
    description: 'Crisp organic dark green Sukuma Wiki harvested early morning.',
    price: 30,
    currency: 'KES',
    unit: 'bunch',
    quantityAvailable: 300,
    status: 'in_stock',
    farmer: {
      id: 'farmer_04',
      name: 'Alice Muthoni',
      location: 'Limuru, Kiambu',
      phone: '+254744556677'
    },
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-15T06:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T06:00:00Z').toISOString()
  },
  {
    id: 'prod_005',
    name: 'Export Grade Hass Avocados',
    slug: 'export-grade-hass-avocados',
    categoryId: 'cat_fruits',
    description: 'Rich, creamy Hass avocados ready for market or export. High oil content.',
    price: 450,
    currency: 'KES',
    unit: '4kg carton',
    quantityAvailable: 200,
    status: 'in_stock',
    farmer: {
      id: 'farmer_05',
      name: 'David Mwangi',
      location: 'Murang\'a',
      phone: '+254755667788'
    },
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-18T11:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-18T11:00:00Z').toISOString()
  },
  {
    id: 'prod_006',
    name: 'Fresh Cow Milk (Raw)',
    slug: 'fresh-cow-milk-raw',
    categoryId: 'cat_dairy',
    description: 'Pure whole raw cow milk from pasture-fed Friesian dairy cows.',
    price: 65,
    currency: 'KES',
    unit: 'liter',
    quantityAvailable: 120,
    status: 'in_stock',
    farmer: {
      id: 'farmer_01',
      name: 'John Kiprono',
      location: 'Eldoret, Uasin Gishu',
      phone: '+254712345678'
    },
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-20T05:30:00Z').toISOString(),
    updatedAt: new Date('2026-01-20T05:30:00Z').toISOString()
  },
  {
    id: 'prod_007',
    name: 'Shangi Irish Potatoes',
    slug: 'shangi-irish-potatoes',
    categoryId: 'cat_tubers',
    description: 'Freshly harvested large Shangi variety potatoes, clean and undamaged.',
    price: 3500,
    currency: 'KES',
    unit: '50kg bag',
    quantityAvailable: 80,
    status: 'in_stock',
    farmer: {
      id: 'farmer_06',
      name: 'Samuel Njoroge',
      location: 'Nyandarua (Kinangop)',
      phone: '+254766778899'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date('2026-01-21T07:15:00Z').toISOString(),
    updatedAt: new Date('2026-01-21T07:15:00Z').toISOString()
  }
];

class ProductService {
  constructor() {
    this.products = [...INITIAL_PRODUCTS];
  }

  async getAllProducts({
    search = '',
    category = '',
    minPrice,
    maxPrice,
    status = '',
    sort = 'latest',
    page = 1,
    limit = 10
  } = {}) {
    let filtered = [...this.products];

    // Filter by text search (name, description, farmer location)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.farmer.location.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (category.trim()) {
      const cat = category.trim().toLowerCase();
      filtered = filtered.filter(
        (p) => p.categoryId.toLowerCase() === cat || p.slug.includes(cat)
      );
    }

    // Filter by price range
    if (minPrice !== undefined && !Number.isNaN(Number(minPrice))) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    // Filter by status
    if (status.trim()) {
      filtered = filtered.filter((p) => p.status.toLowerCase() === status.trim().toLowerCase());
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const total = filtered.length;
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limitNum);

    return {
      products: paginatedProducts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    };
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id || p.slug === id);
    if (!product) {
      throw ApiError.notFound(`Product with identifier '${id}' not found`);
    }
    return product;
  }

  async createProduct(productData) {
    // Validate category exists
    if (productData.categoryId) {
      await categoryService.getCategoryById(productData.categoryId);
    }

    const id = `prod_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const slug = productData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProduct = {
      id,
      name: productData.name,
      slug: `${slug}-${id.substring(5)}`,
      categoryId: productData.categoryId,
      description: productData.description || '',
      price: Number(productData.price),
      currency: productData.currency || 'KES',
      unit: productData.unit || 'unit',
      quantityAvailable: Number(productData.quantityAvailable || 0),
      status: Number(productData.quantityAvailable) > 0 ? 'in_stock' : 'out_of_stock',
      farmer: {
        id: productData.farmer?.id || `farmer_${Math.random().toString(36).substring(2, 6)}`,
        name: productData.farmer?.name || 'Local Farmer',
        location: productData.farmer?.location || 'Unspecified',
        phone: productData.farmer?.phone || ''
      },
      imageUrl: productData.imageUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw ApiError.notFound(`Product with ID '${id}' not found`);
    }

    const currentProduct = this.products[productIndex];

    if (updateData.categoryId && updateData.categoryId !== currentProduct.categoryId) {
      await categoryService.getCategoryById(updateData.categoryId);
    }

    const updatedProduct = {
      ...currentProduct,
      ...updateData,
      id: currentProduct.id, // prevent ID overwrite
      price: updateData.price !== undefined ? Number(updateData.price) : currentProduct.price,
      quantityAvailable:
        updateData.quantityAvailable !== undefined
          ? Number(updateData.quantityAvailable)
          : currentProduct.quantityAvailable,
      updatedAt: new Date().toISOString()
    };

    // Update status if quantity changed
    if (updatedProduct.quantityAvailable <= 0) {
      updatedProduct.status = 'out_of_stock';
    } else if (updateData.status) {
      updatedProduct.status = updateData.status;
    } else {
      updatedProduct.status = 'in_stock';
    }

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw ApiError.notFound(`Product with ID '${id}' not found`);
    }

    const deleted = this.products.splice(productIndex, 1)[0];
    return deleted;
  }
}

export const productService = new ProductService();

