const express = require('express');
const ProductController = require('../../controllers/product-controller');

const router = express.Router();

router.post('/product',ProductController.createProduct);
router.get('/all-products',ProductController.getAllProduct);
router.patch('/update_product/:id',ProductController.updateProduct);
router.delete('/delete-product/:id',ProductController.deleteProduct);
router.get('/product/:id',ProductController.getProductById);

module.exports = router;

