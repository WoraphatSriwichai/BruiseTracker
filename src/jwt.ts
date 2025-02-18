import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Access token expires in 1 hour
  };
  
  export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, secretKey, { expiresIn: '7d' }); // Refresh token expires in 7 days
  };

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error('Invalid token');
  }
};