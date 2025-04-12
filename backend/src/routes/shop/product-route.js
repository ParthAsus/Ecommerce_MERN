import express from 'express';
import { getFilteredProducts, getProductDetailsById } from '../../controllers/shop/product-controller.js';

const router = express.Router();

router.get("/getProducts", getFilteredProducts);
router.get("/getProductDetails/:id", getProductDetailsById);

export default router;