const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts);
router.route('/addProduct').post(protect, admin, addProduct);
router.route('/:id').get(getProductById);
router.route('/deleteProduct/:id').delete(protect, admin, deleteProduct);
router.route('/category/:category').get(getProductsByCategory);

module.exports = router;
