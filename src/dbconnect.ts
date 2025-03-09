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
      country VARCHAR(50),
      organization VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS histories (
      id SERIAL PRIMARY KEY,
      operation_type VARCHAR(100) NOT NULL,
      time_stamp TIMESTAMP NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `;

  try {
    await client.query(createTableQuery);
  } catch (err) {
    console.error('Error creating table:', err);
  }
};