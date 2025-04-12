import Product from '../../models/product.model.js';

export const getFilteredProducts = async(req, res) => {
  try {
    const {category = [], brand = [], sortBy = "price-lowtohigh"} = req.query;
    let filters = {};
    if(category.length){
      filters.category = {$in: category.split(',')};
    };
    
    if(brand.length){
      filters.brand = {$in: brand.split(',')};
    };

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    };
    
    console.log(req.query);

    const products = await Product.find(filters).sort(sort);
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


export const getProductDetailsById = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({
        success: false,
        message: 'Product not Found!',
      });
    }else{
      return res.status(200).json({
        success: true,
        data: product
      });
    };
  } catch (error) {
    console.log('Error in product-controller -> getProductDetailsById', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
};