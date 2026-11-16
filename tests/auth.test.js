import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { config } from '../src/config/env.js';

describe('Authentication & Security API Endpoints', () => {
  const testUser = {
    name: 'Wanjiku Mwangi',
    email: `wanjiku_${Date.now()}@farmsoko.com`,
    password: 'securePassword123',
    role: 'farmer',
    phone: '+254711223344',
    location: 'Nyeri, Kenya'
  };

  let authToken = '';

  test(`POST ${config.apiPrefix}/auth/register creates a new user and returns JWT`, async () => {
    const response = await request(app)
      .post(`${config.apiPrefix}/auth/register`)
      .send(testUser);

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.user.email, testUser.email);
    assert.equal(response.body.data.user.role, 'farmer');
    assert.equal(response.body.data.user.passwordHash, undefined); // Ensure password hash is not leaked
    assert.ok(response.body.data.token);

    authToken = response.body.data.token;
  });

  test(`POST ${config.apiPrefix}/auth/register fails if email already exists`, async () => {
    const response = await request(app)
      .post(`${config.apiPrefix}/auth/register`)
      .send(testUser);

    assert.equal(response.status, 409);
    assert.equal(response.body.success, false);
    assert.match(response.body.message, /already exists/i);
  });

  test(`POST ${config.apiPrefix}/auth/login successfully logs in user`, async () => {
    const response = await request(app)
      .post(`${config.apiPrefix}/auth/login`)
      .send({
        email: testUser.email,
        password: testUser.password
      });

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.data.token);
    assert.equal(response.body.data.user.name, testUser.name);
  });

  test(`POST ${config.apiPrefix}/auth/login fails with invalid password`, async () => {
    const response = await request(app)
      .post(`${config.apiPrefix}/auth/login`)
      .send({
        email: testUser.email,
        password: 'wrongPassword!'
      });

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });

  test(`GET ${config.apiPrefix}/auth/profile returns user profile with valid Bearer token`, async () => {
    const response = await request(app)
      .get(`${config.apiPrefix}/auth/profile`)
      .set('Authorization', `Bearer ${authToken}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.email, testUser.email);
    assert.equal(response.body.data.role, 'farmer');
  });

  test(`GET ${config.apiPrefix}/auth/profile rejects request without token`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/auth/profile`);

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });
});

