import Product from '../../models/product.model.js';

export const getFilteredProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products
    });
    
  } catch (error) {
    console.log('Error in product-controller -> getFilteredProducts', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
};