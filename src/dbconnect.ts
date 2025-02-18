import client from './db';

export const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      phone VARCHAR(15),
      country VARCHAR(50)
    );
  `;

  try {
    await client.query(createTableQuery);
    console.log('Table "users" created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};