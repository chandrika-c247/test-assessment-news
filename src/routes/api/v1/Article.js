/** @format */

import express from "express";
import { ArticleController } from "../../../controllers/api/v1";
import { validatePostBody } from '../../../util';
const { Article } = require('../../../validators');

const router = express.Router();

router.post("/", validatePostBody(Article.addArticle), ArticleController.add);
router.get("/", ArticleController.list);
router.get("/:id", ArticleController.info);



export default router;