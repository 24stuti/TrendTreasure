import React from 'react';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
import Banner from './Banner'; // Assuming you have a Banner component
import Categories from './Categories'; // Assuming you have a Categories component
import './Home.css'; 

const Home = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="banner-container">
          <Banner />
        </div>
        <div className="content-container">
          <section className="categories-section">
            <div className="categories-container">
              <Categories />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
