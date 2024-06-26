//import Login from './Components/login';
import './App.css';
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


