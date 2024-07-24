const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const User = require('../models/User')
const compressImage = require('../utils/compressImage');

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
  const { categoryName } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find({ category: categoryName }).skip(skip).limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, countInStock, image } = req.body;
  const compressedImage = await compressImage(Buffer.from(image, 'base64'));

  const product = new Product({
    name,
    price,
    description,
    category,
    countInStock,
    image:compressedImage
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

// @desc    add product to wishlist
// @access  private

const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (user.wishlist.includes(product._id)) {
    res.status(400);
    throw new Error('Product already in wishlist');
  }

  user.wishlist.push(product._id);
  await user.save();

  res.status(200).json({ message: 'Product added to wishlist' });
});


// @desc    remove product from wishlist
// @access  private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  user.wishlist = user.wishlist.filter(id => id.toString() !== productId);

  await user.save();

  res.status(200).json({ message: 'Product removed from wishlist' });
});

// @desc    remove product from wishlist
// @access  private
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user.wishlist);
});

// @desc search products as per query provided
//@access public
const searchProducts = asyncHandler(async (req, res) => {
  const query = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find({ name: { $regex: query, $options: 'i' } })
                                  .skip(skip)
                                  .limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
})

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  searchProducts
};