import { imageUploadUtils } from "../../config/cloudinary.js";
import Product from "../../models/product.model.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Error in handleImageUpload", error);
    res.status(400).json({
      success: false,
      message: "Unable to upload image",
    });
  }
};


//add a new product
export const handleAddNewProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(200).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log('Error in handleAddNewProduct', error);
    res.status(500).json({
      success: false,
      message: "Unable to add new product at a moment, try again later...",
    });
  }
};

//fetch all products

export const handleFetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log('Error in handleFetchAllProducts', error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch products at a moment, try again later...",
    });
  }
};

//edit a product
export const handleEditProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log('Error in handleEditProduct', error);
    res.status(500).json({
      success: false,
      message: "Unable to edit a product, try again later...",
    });
  }
};

//delete a product
export const handleDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log('Error in handleDeleteProduct', error);
    res.status(500).json({
      success: false,
      message: "Unable to delete a product, try again later...",
    });
  }
};