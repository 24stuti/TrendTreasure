import React from 'react';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
import Banner from './Banner'; // Assuming you have a Banner component
import Categories from './Categories'; // Assuming you have a Categories component
import './Home.css'; 
import { Link } from 'react-router-dom';
import './Categories.css'; // Example CSS file for styling

const categories = [
  'Indian Wear',
  'Western Wear',
  'Men',
  'Footwear',
  'Beauty',
  'Jewelry',
  'Kids',
];

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className="main-container">
        <div className="content-container">
          <section className="categories-section">
            <Categories />
          </section>
        </div>
      </div>
      <div className="market-container">
        {categories.map((category, index) => (
          <div key={index} className="market-card">
            <Link to={`/category/${category}`} className="category-link" target='_blank' style={{ textDecoration: 'none' }}>
                <h3>{category}</h3>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
