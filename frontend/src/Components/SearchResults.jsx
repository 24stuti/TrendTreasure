import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import Loader from './Loader';

const SearchResults = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchProducts();
  }, [products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="search-results-container">
        <ProductList products={products} />
      </div>
    </>
  );
};

export default SearchResults;
