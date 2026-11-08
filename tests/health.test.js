import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { config } from '../src/config/env.js';

describe('Health and Status API Endpoints', () => {
  test('GET / returns API welcome information', async () => {
    const response = await request(app).get('/');

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.match(response.body.message, /FarmSoko/i);
    assert.ok(response.body.data.endpoints);
  });

  test(`GET ${config.apiPrefix}/health returns healthy status`, async () => {
    const response = await request(app).get(`${config.apiPrefix}/health`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.status, 'healthy');
    assert.equal(response.body.data.service, 'FarmSoko-Api');
    assert.ok(response.body.data.uptimeSeconds !== undefined);
  });

  test('GET /unknown-route returns 404 with standard error format', async () => {
    const response = await request(app).get('/unknown-route');

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
    assert.match(response.body.message, /Cannot find route/i);
  });
});

