const ProductService = require("../services/product-service");
const { ClientErrorCodes , ServerErrorCodes, SuccessCodes } = require('../utils/error-code');

const productService = new ProductService();

const createProduct = async (req, res) => {
  try {
    const new_product = await productService.createProduct(req.body);
    return res.status(  SuccessCodes.CREATED).json({
      data: new_product,
      success: true,
      message: "Successfully created product",
    });
  } catch (error) {
    console.log("Error in controllers while creating product");
    return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
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
    return res.status(SuccessCodes.OK).json({
      data: products,
      success: true,
      message: "Successfully got all products",
    });
  } catch (error) {
    console.log("Error in controllers while getting all product");
    return res.status(ServerErrorCodes.NOT_IMPLEMENTED).json({
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
    return res.status(SuccessCodes.OK).json({
      data: product,
      success: true,
      message: "Successfully updated product",
    });
  } catch (error) {
    console.log("Error in controllers while updating all product");
    return res.status(ServerErrorCodes.NOT_IMPLEMENTED).json({
      data: {},
      success: false,
      message: "Not able to update product",
      err: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    return res.status(SuccessCodes.OK).json({
      success: true,
      message: "Successfully deleted product",
    });
  } catch (error) {
    console.log("Error in controllers while delete product");
    return res.status(ServerErrorCodes.NOT_IMPLEMENTED).json({
      success: false,
      message: "Not able to delete product",
      err: error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(SuccessCodes.OK).json({
      data: product,
      success: true,
      message: "Successfully got the product",
    });
  } catch (error) {
    console.log("Error in controllers while getting product by id");
    return res.status(ServerErrorCodes.NOT_IMPLEMENTED).json({
      success: false,
      message: "Not able to get product",
      err: error,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const query_result = await productService.searchProduct(req.query.q);
    return res.status(SuccessCodes.OK).json({
      data: query_result,
      success: true,
      message: "Successfully search the query",
    });
  } catch (error) {
    console.log("Error in controllers while searching query");
    return res.status(ServerErrorCodes.NOT_IMPLEMENTED).json({
      success: false,
      message: "Not able to search the query",
      err: error,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProduct,
};
