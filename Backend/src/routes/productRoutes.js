const express = require('express');
const {
  getProducts,
  getProductById,
  getProductsByCategory,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/category/:category').get(getProductsByCategory);

module.exports = router;
