const ProductService = require("../services/product-service");

const productService = new ProductService();

const createProduct = async (req, res) => {
  try {
    const new_product = await productService.createProduct(req.body);
    return res.status(201).json({
      data: new_product,
      success: true,
      message: "Successfully created product",
    });
  } catch (error) {
    console.log("Error in controllers while creating product");
    return res.status(404).json({
      data: {},
      success: false,
      message: "Not able to create product",
      err: error,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await productService.getAllproducts();
    return res.status(201).json({
      data: products,
      success: true,
      message: "Successfully got all products",
    });
  } catch (error) {
    console.log("Error in controllers while getting all product");
    return res.status(404).json({
      data: {},
      success: false,
      message: "Not able to get all product",
      err: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(201).json({
      data: product,
      success: true,
      message: "Successfully updated product",
    });
  } catch (error) {
    console.log("Error in controllers while updating all product");
    return res.status(404).json({
      data: {},
      success: false,
      message: "Not able to update product",
      err: error,
    });
  }
};


const deleteProduct = async (req,res) =>{
  try{
       const result = await productService.deleteProduct(req.params.id);
       return res.status(201).json({
        success: true,
        message: "Successfully deleted product",
      });
  }
  catch(error)
  {
    console.log("Error in controllers while delete product");
    return res.status(404).json({
      success: false,
      message: "Not able to delete product",
      err: error,
    });
  }
};

const getProductById =async (req,res) =>{
  try{
       const product = await productService.getProductById(req.params.id);
       return res.status(201).json({
        data : product,
        success: true,
        message: "Successfully got the product",
      });
  }
  catch(error)
  {
    console.log("Error in controllers while getting product by id");
    return res.status(404).json({
      success: false,
      message: "Not able to get product",
      err: error,
    });
  }
}

module.exports = { createProduct, getAllProduct,updateProduct, deleteProduct, getProductById };
