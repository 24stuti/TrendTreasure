const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });

  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(404).json({ message: 'No products found in this category' });
  }
});

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, countInStock, image } = req.body;

  const product = new Product({
    name,
    price,
    description,
    category,
    countInStock,
    image
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne(req.params.id);

  if (product) {
    await Product.deleteOne(req.params.id);
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  deleteProduct
};