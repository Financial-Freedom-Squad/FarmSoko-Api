import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authRateLimiter } from '../middlewares/rateLimiter.middleware.js';

const authRouter = Router();

authRouter.post('/register', authRateLimiter, register);
authRouter.post('/login', authRateLimiter, login);
authRouter.get('/profile', authenticate, getProfile);

export default authRouter;

