import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Public (unauthenticated) routes
router.use('/auth', authRoutes);
// Protected (authenticated) routes
router.use('/api', authenticateToken, apiRoutes);
export default router;
