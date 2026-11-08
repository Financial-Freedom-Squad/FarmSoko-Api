import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { config } from '../src/config/env.js';

describe('Categories API Endpoints', () => {
  test(`GET ${config.apiPrefix}/categories returns all categories`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/categories`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
    assert.ok(response.body.data.length >= 5);
  });

  test(`GET ${config.apiPrefix}/categories/:id returns specific category`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/categories/cat_grains`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.id, 'cat_grains');
    assert.equal(response.body.data.name, 'Grains & Cereals');
  });

  test(`GET ${config.apiPrefix}/categories/:id with invalid ID returns 404`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/categories/non_existent_category`);

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
  });
});

describe('Products API Endpoints', () => {
  test(`GET ${config.apiPrefix}/products returns paginated products`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/products`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
    assert.ok(response.body.meta.total > 0);
    assert.equal(response.body.meta.page, 1);
  });

  test(`GET ${config.apiPrefix}/products with search filter`, async () => {
    const response = await request(app)
      .get(`${config.apiPrefix}/products`)
      .query({ search: 'Maize' });

    assert.equal(response.status, 200);
    assert.ok(response.body.data.some((p) => p.name.includes('Maize')));
  });

  test(`GET ${config.apiPrefix}/products/:id returns specific product`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/products/prod_001`);

    assert.equal(response.status, 200);
    assert.equal(response.body.data.id, 'prod_001');
    assert.equal(response.body.data.name, 'Yellow Maize (Dry Corn)');
  });

  test(`POST ${config.apiPrefix}/products creates new product`, async () => {
    const newProduce = {
      name: 'Organic Watermelons',
      categoryId: 'cat_fruits',
      price: 150,
      unit: 'piece',
      quantityAvailable: 60,
      description: 'Sweet, juicy organic watermelons',
      farmer: {
        name: 'Faith Chebet',
        location: 'Baringo',
        phone: '+254700112233'
      }
    };

    const response = await request(app)
      .post(`${config.apiPrefix}/products`)
      .send(newProduce);

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.name, 'Organic Watermelons');
    assert.equal(response.body.data.status, 'in_stock');
  });

  test(`POST ${config.apiPrefix}/products fails without required fields`, async () => {
    const response = await request(app)
      .post(`${config.apiPrefix}/products`)
      .send({});

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.ok(response.body.errors.length > 0);
  });
});
