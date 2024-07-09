import express from 'express';
import authRouter from './auth/auth.js';
import booksRouter from './products/books.js';
import coupangRouter from './products/coupang.js';
import adminRouter from './users.js';
import githubRouter from './github/issue.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', booksRouter);
router.use('/users', adminRouter);
router.use('/coupang-products', coupangRouter);
router.use('/github', githubRouter);

export default router;