import express from 'express';
import { Login } from '../controllers/logincontroller';

const router = express.Router();

// Helper to wrap async route handlers and catch errors
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/login', asyncHandler(Login));

export default router;


