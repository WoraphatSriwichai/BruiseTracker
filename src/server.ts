import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createTable } from './dbconnect';
import client from './db';
import { generateAccessToken, generateRefreshToken, verifyToken } from './jwt';
import { hashPassword, verifyPassword } from './hash';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Ensure the database table is created when the application runs
const initializeDatabase = async () => {
  await createTable();
};

initializeDatabase().catch(err => {
  console.error('Error initializing database:', err);
});

// Rate limiter middleware for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many login attempts, please try again after 15 minutes' });
  }
});

// Middleware to authenticate and extract user ID from token
interface AuthenticatedRequest extends express.Request {
  user?: { id: string; username: string };
}

const authenticateToken = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const user = verifyToken(token) as { id: string; username: string };
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

// User profile route
app.get('/user/profile', authenticateToken, async (req, res) => {
  const userId = (req as AuthenticatedRequest).user?.id;

  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Error fetching user profile', details: (err as Error).message });
  }
});

// User profile update route
app.put('/user/profile', authenticateToken, async (req, res) => {
  const userId = (req as AuthenticatedRequest).user?.id;
  const { name, email, phone, country } = req.body;

  try {
    await client.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, country = $4 WHERE id = $5',
      [name, email, phone, country, userId]
    );
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ error: 'Error updating user profile', details: (err as Error).message });
  }
});

// User registration route
app.post('/register', async (req, res) => {
  const { username, email, password, organization } = req.body; // Include organization
  const hashedPassword = await hashPassword(password);

  try {
    const result = await client.query(
      'INSERT INTO users (username, email, password, organization) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, organization]
    );
    const user = result.rows[0];
    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });
    res.status(201).json({ accessToken, refreshToken });

    await client.query(
      'INSERT INTO histories (operation_type, time_stamp, user_id) VALUES ($1, $2, $3)',
      ['Sign Up', new Date(), user.id]
    );

  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error registering user', details: (err as Error).message });
  }
});

// User login route
app.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await verifyPassword(password, user.password))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });

    // Save login action to histories table
    await client.query(
      'INSERT INTO histories (operation_type, time_stamp, user_id) VALUES ($1, $2, $3)',
      ['Login', new Date(), user.id]
    );

    res.json({ accessToken, refreshToken, username: user.username, organization: user.organization });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Error logging in', details: (err as Error).message });
  }
});

// Change password route
app.post('/change-password', authenticateToken, async (req, res) => {
  const userId = (req as AuthenticatedRequest).user?.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user || !(await verifyPassword(currentPassword, user.password))) {
      res.status(401).json({ error: 'Invalid current password' });
      return;
    }

    const hashedNewPassword = await hashPassword(newPassword);
    await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Error changing password', details: (err as Error).message });
  }
});

// Fetch all user histories route
app.get('/user/history', authenticateToken, async (req, res) => {
  try {
    const result = await client.query(
      `SELECT h.operation_type, h.time_stamp, u.username, u.organization
       FROM histories h
       JOIN users u ON h.user_id = u.id
       ORDER BY h.time_stamp DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user history:', err);
    res.status(500).json({ error: 'Error fetching user history', details: (err as Error).message });
  }
});

// Save user action route
app.post('/user/action', authenticateToken, async (req, res) => {
  const userId = (req as AuthenticatedRequest).user?.id;
  const { operationType } = req.body;

  try {
    await client.query(
      'INSERT INTO histories (operation_type, time_stamp, user_id) VALUES ($1, $2, $3)',
      [operationType, new Date(), userId]
    );
    res.status(201).json({ message: 'Action saved successfully' });
  } catch (err) {
    console.error('Error saving user action:', err);
    res.status(500).json({ error: 'Error saving user action', details: (err as Error).message });
  }
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});