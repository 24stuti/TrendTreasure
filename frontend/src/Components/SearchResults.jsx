import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import axios from 'axios'
const config = require('../Config/Constant');

const SearchResults = () => {
  const location = useLocation();
  const { products: initialProducts, query, page: initialPage } = location.state || { products: [], query: '', page: 1 };
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(initialPage);

  const loadMore = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}products/search`, {
        params: { query, page: page + 1, limit: 12 },
      });
      setProducts(prevProducts => [...prevProducts, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching more search results:', error);
    }
  };

  return (
    <div className="search-results-container">
      <ProductList products={products} loadMore={loadMore} />
    </div>
  );
};

export default SearchResults;
