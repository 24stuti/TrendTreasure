import React from 'react';
import './Categories.css';
import { faN } from '@fortawesome/free-solid-svg-icons';

const categories = [
  { name: 'Indian Wear', image: '/images/indian-wear.png' },
  { name: 'Western Wear', image: '/images/western-wear.png' },
  { name: 'Men', image: '/images/men.png' },
  { name: 'Kids', image: '/images/kids.png' },
  { name: 'Footwear', image: '/images/footwear.jpg' },
  { name: 'Beauty', image: '/images/beauty.jpg' },
  { name: 'Jwellery', image: '/images/jwellery.png' },
  { name: 'Electronics', image: '/images/electronics.jpg' },
];

const Categories = () => {
  return (
    <>
    <h1>Shop By Categories </h1>
    <section className="categories">
      {categories.map((category, index) => (
        <div className="category" key={index}>
          <img src={category.image} alt={category.name} />
          <h3>{category.name}</h3>
        </div>
      ))}
    </section>
    </>
  );
};

export default Categories;
