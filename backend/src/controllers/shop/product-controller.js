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