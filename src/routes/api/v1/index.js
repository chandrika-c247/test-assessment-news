/** @format */
import express from 'express';
import ArticleRouter from './Article';

const router = express.Router();

router.use('/article', ArticleRouter);

export default router;
