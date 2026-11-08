import { Router } from 'express';
import healthRouter from './health.router.js';
import categoryRouter from './category.router.js';
import productRouter from './product.router.js';
import { getApiInfo } from '../controllers/info.controller.js';

const apiRouter = Router();

apiRouter.get('/', getApiInfo);
apiRouter.use('/health', healthRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);

export default apiRouter;
