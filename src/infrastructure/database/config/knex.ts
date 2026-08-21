import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  client: process.env.DB_CLIENT || 'mysql', // 'mysql2' ou 'pg'
  connection: {
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: Number(process.env.DB_PORT || '3306') ,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'UgQpMCwzfgqQeITuVCCUzZlSWNeEhvCZ',
    database: process.env.DB_NAME || 'railway',
  },
  pool: { min: 2, max: 10 },
};

export const db = knex(dbConfig);