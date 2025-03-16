import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  console.log("Request body: ", req.body);
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  console.log("User found: ", user.username);
  console.log("User password", user.password);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.error("Invalid password", username);
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, 
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '1h' }
  );
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
