import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { config } from '../config/env.js';
import * as schema from './schema.js';

const { Pool } = pg;

export let pool = null;
export let db = null;

if (config.databaseUrl) {
  pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: config.isProduction ? { rejectUnauthorized: false } : false
  });

  db = drizzle(pool, { schema });
}

export const checkDatabaseConnection = async () => {
  if (!pool) {
    return { connected: false, message: 'DATABASE_URL is not configured' };
  }
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return { connected: true, message: 'Connected to PostgreSQL' };
  } catch (error) {
    return { connected: false, message: error.message };
  }
};

