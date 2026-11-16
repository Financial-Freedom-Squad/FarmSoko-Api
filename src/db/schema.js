import { pgTable, varchar, text, numeric, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['farmer', 'buyer', 'admin']);
export const productStatusEnum = pgEnum('product_status', ['in_stock', 'out_of_stock']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'completed', 'cancelled']);

// Users Table (Farmers, Buyers, Admins)
export const users = pgTable('users', {
  id: varchar('id', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('buyer').notNull(),
  phone: varchar('phone', { length: 32 }),
  location: varchar('location', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Categories Table
export const categories = pgTable('categories', {
  id: varchar('id', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Products / Produce Listings Table
export const products = pgTable('products', {
  id: varchar('id', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  categoryId: varchar('category_id', { length: 64 }).references(() => categories.id).notNull(),
  farmerId: varchar('farmer_id', { length: 64 }).references(() => users.id).notNull(),
  description: text('description'),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('KES').notNull(),
  unit: varchar('unit', { length: 50 }).notNull(), // e.g., '90kg bag', 'kg', 'crate', 'bunch'
  quantityAvailable: integer('quantity_available').default(0).notNull(),
  status: productStatusEnum('status').default('in_stock').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Orders Table
export const orders = pgTable('orders', {
  id: varchar('id', { length: 64 }).primaryKey(),
  buyerId: varchar('buyer_id', { length: 64 }).references(() => users.id).notNull(),
  totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('KES').notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  deliveryAddress: text('delivery_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: varchar('id', { length: 64 }).primaryKey(),
  orderId: varchar('order_id', { length: 64 }).references(() => orders.id).notNull(),
  productId: varchar('product_id', { length: 64 }).references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull()
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  orders: many(orders)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products)
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id]
  }),
  farmer: one(users, {
    fields: [products.farmerId],
    references: [users.id]
  }),
  orderItems: many(orderItems)
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id]
  }),
  items: many(orderItems)
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id]
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id]
  })
}));

