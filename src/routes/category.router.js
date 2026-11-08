import { Router } from 'express';
import { getAllCategories, getCategoryById } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);

export default categoryRouter;

