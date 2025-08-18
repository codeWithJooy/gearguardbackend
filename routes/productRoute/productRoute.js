const express = require('express');
const router = express.Router();
const upload = require('../../config/multerConfig');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct
} = require('../../controller/productsController/productController');

router.post(
  '/',
  upload.array("images",6),
  createProduct
);

router.get('/', getProducts);
router.get('/:id', getProduct);

router.put(
  '/:id',
  upload.array("images",6),
  updateProduct
);

module.exports = router;