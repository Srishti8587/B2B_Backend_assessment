const express = require("express");
const ProductController = require("../../controllers/product-controller");
const VariantController = require("../../controllers/variant-controller");
const {
  ProductMiddlewares,
  VariantMiddlewares,
} = require("../../middlewares/index");

const router = express.Router();

router.post(
  "/product",
  ProductMiddlewares.validateCreateProduct,
  ProductController.createProduct
);

router.get("/all-products", ProductController.getAllProduct);
router.patch("/update_product/:id", ProductController.updateProduct);
router.delete("/delete_product/:id", ProductController.deleteProduct);
router.get("/product/:id", ProductController.getProductById);
router.get("/search",ProductController.searchProduct);

router.post(
  "/variant",
  VariantMiddlewares.validateCreateVariant,
  VariantController.createVariant
);
router.get("/all-variants", VariantController.getAllVariant);
router.get("/variant/:id", VariantController.getVariantById);
router.patch(
  "/update_variant/:id",
  VariantMiddlewares.validateUpdateVariant,
  VariantController.updateVariant
);
router.delete("/delete_variant/:id", VariantController.deleteVariant);

module.exports = router;
