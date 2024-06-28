//import Login from './Components/login';
/*import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './Components/Banner';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Profile from './Components/Profile';
import Admin from './Components/Admin';
import AddProducts from './Components/AddProducts';
import Cart from './Components/Cart';
//import ProductList from './Components/ProductList';

function App() {
  return (
      <>
        <Admin />
        <Cart />
        <Header />
        <Banner />
        <Categories />
        <Footer />
      </>
  
  );
}

export default App;

/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Indianwear from './Components/IndianWear';
import Westernwear from './Components/WesternWear';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import Admin from './Components/Admin';
// Import other category pages...

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} exact render={() => (
          <div className="app-container">
            <Home />
          </div>
        )} />
        <Route path="/Components/Admin" component={Admin} />
        <Route path="/category/:categoryName" component={ProductList} />
        <Route path="/Components/Indianwear" component={Indianwear} />
        <Route path="/Components/Westernwear" component={Westernwear} />
       
      </Routes>
    </Router>
  );
};
export default App;
*/
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import Admin from './Components/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} exact render={() => (
          <div className="app-container">
            <Home />
          </div>
        )} />
        <Route path="/category/:categoryName" component={ProductList} />
        <Route path="/admin" component={Admin} />
      </Routes>
    </Router>
  );
};

export default App;
