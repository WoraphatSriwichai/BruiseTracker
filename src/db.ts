import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

interface ConnectionError extends Error {
  stack?: string;
}

client.connect()
  .then((): void => console.log('Connected to PostgreSQL'))
  .catch((err: ConnectionError): void => console.error('Connection error', err.stack));

export default client;