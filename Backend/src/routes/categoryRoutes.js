const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/Category');

// GET all categories
router.get('/fetchCategories', async (req, res) => {
  try {
    const categories = await ProductCategory.distinct('categoryName');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
