import express from 'express'
import { handleAddNewProduct, handleDeleteProduct, handleEditProduct, handleFetchAllProducts, handleImageUpload } from '../../controllers/admin/products-controller.js';
import { upload } from '../../config/cloudinary.js';

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/addNewProduct', handleAddNewProduct);
router.put('/editProduct/:id', handleEditProduct);
router.delete('/deleteProduct/:id', handleDeleteProduct);
router.get('/fetchAllProducts', handleFetchAllProducts);


export default router;
// vndvjnd