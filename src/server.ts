import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { generateAccessToken, generateRefreshToken, verifyToken } from './jwt';
import { hashPassword, verifyPassword } from './hash';
import client from './db';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

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
    const { name, email, phone, country} = req.body;
  
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
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    const user = result.rows[0];
    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });
    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error registering user', details: (err as Error).message });
  }
});

// User login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await verifyPassword(password, user.password)) {
      const accessToken = generateAccessToken({ id: user.id, username: user.username });
      const refreshToken = generateRefreshToken({ id: user.id, username: user.username });
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
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

      if (user && await verifyPassword(currentPassword, user.password)) {
          const hashedNewPassword = await hashPassword(newPassword);
          await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);
          res.status(200).json({ message: 'Password changed successfully' });
      } else {
          res.status(401).json({ error: 'Invalid current password' });
      }
  } catch (err) {
      console.error('Error changing password:', err);
      res.status(500).json({ error: 'Error changing password', details: (err as Error).message });
  }
});


// Protected route
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      res.json({ message: 'Protected content', user: decoded });
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});