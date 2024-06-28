import React from 'react';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
import Banner from './Banner'; // Assuming you have a Banner component
import Categories from './Categories'; // Assuming you have a Categories component
import './Home.css'; 
import './Categories.css'; // Example CSS file for styling


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
      <Footer />
    </>
  );
};

export default Home;
