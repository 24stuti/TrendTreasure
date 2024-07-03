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

router.route('/listProducts').get(getProducts);
router.route('/addProduct').post(protect, admin, addProduct);
router.route('/listProducts/:id').get(getProductById);
router.route('/deleteProduct/:id').delete(protect, admin, deleteProduct);
router.route('/category/:categoryName').get(getProductsByCategory);

module.exports = router;
