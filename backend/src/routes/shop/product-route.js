import express from 'express';
import { getFilteredProducts } from '../../controllers/shop/product-controller.js';

const router = express.Router();

router.get("/getProducts", getFilteredProducts);

export default router;