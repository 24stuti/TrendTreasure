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
import ProductList from './Components/ProductList';

function App() {
  return (
      <>
        <Admin />
        <Cart />
        <Header />
        <Banner />
        <Categories />
        <ProductList/>
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


// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} exact render={() => (
          <div className="app-container">
            <Home />
          </div>
        )} />
        <Route exact path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AlertProvider } from './Contexts/AlertContext';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Home from './Components/Home';
import Login from './Components/login'; // Ensure you have a Login component
import Admin from './Components/Admin';
import './App.css';
import Checkout from './Components/Checkout';
import Address from './Components/Address';
import OrderSummary from './Components/OrderSummary';
import Profile from './Components/Profile';
import CreateOrder from './Components/CreateOrder';
import ContactUs from './Components/ContactUs';
import FAQs from './Components/FAQs';
import Returns from './Components/Returns';
import TrackOrder from './Components/TrackOrder';


const App = () => {
  return (
    <Router>
   
      <AlertProvider>
        <Routes>
        <Route path="/" element={<Home />} exact render={() => (
          <div className="app-container">
            <Home />
          </div>
        )} />
          <Route path="/login" element={<Login />} /> {/* Add this line */}
          <Route path="/category/:categoryName" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/address" element={<Address/>}/>
          <Route path="/" element={<Profile/>} />       
          <Route path="/order/:id" element={<OrderSummary />} />
          <Route path="/create-order" element={<CreateOrder />}/>
          <Route path='/contact-us' element={<ContactUs/>}/>
          <Route path='/faqs' element={<FAQs/>}/>
          <Route path='/returns' element={<Returns/>}/>
          <Route path='/track-order' element={<TrackOrder/>}/>
        </Routes>
        </AlertProvider>
    </Router>
  );
};

export default App;
