import React, { useState } from 'react';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header.jsx';
import Footer from './Footer';

const config = require('../Config/Constant');

const Admin = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productInStock, setProductInStock] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const [categoryIdToDelete, setCategoryIdToDelete] = useState('');

    const [productIdToUpdate, setProductIdToUpdate] = useState('');
    const [updatedProductName, setUpdatedProductName] = useState('');
    const [updatedProductDescription, setUpdatedProductDescription] = useState('');
    const [updatedProductPrice, setUpdatedProductPrice] = useState('');
    const [updatedProductCategory, setUpdatedProductCategory] = useState('');
    const [updatedProductImage, setUpdatedProductImage] = useState('');
    const [updatedProductInStock, setUpdatedProductInStock] = useState(false);

    const [categoryIdToGetProducts, setCategoryIdToGetProducts] = useState('');

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleAddProduct = async () => {
        try {
            console.log(productImage);
            const response = await fetch(`${config.BASE_URL}products/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    category: productCategory,
                    image: productImage,
                    inStock: productInStock
                })
            });
            if (response.ok) {
                console.log("Product added successfully");
                // You may want to update state or show a success message
            } else {
                // Handle error
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    /* const handleAddCategory = async () => {
        try {
            const response = await fetch(`/api/categories/${categoryIdToPost}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    name: categoryName,
                    description: categoryDescription
                })
            });
            if (response.ok) {
                console.log("Category added successfully");
                // You may want to update state or show a success message
            } else {
                // Handle error
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const response = await fetch(`/api/categories/${categoryIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            if (response.ok) {
                // Category deleted successfully
                // You may want to update state or show a success message
            } else {
                // Handle error
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    productId: productIdToUpdate,
                    name: updatedProductName,
                    description: updatedProductDescription,
                    price: updatedProductPrice,
                    category: updatedProductCategory,
                    image: updatedProductImage,
                    inStock: updatedProductInStock
                })
            });
            if (response.ok) {
                console.log("Product updated successfully");
                // You may want to update state or show a success message
            } else {
                // Handle error
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    */

    const handleGetProductsByCategory = async () => {
        try {
            const response = await fetch(`/api/category/${categoryIdToGetProducts}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // Handle received products data
            } else {
                // Handle error
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error getting products by category:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="admin-container">
                <div className="crud-column">
                    <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <input type="text" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                    <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                    <input type="text" placeholder="Product Category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
                    <input type="file" onChange={(e) => handleImageUpload(e, setProductImage)} />
                    <label htmlFor="instock">In Stock: </label>
                    <input type="checkbox" id="instock" checked={productInStock} onChange={(e) => setProductInStock(e.target.checked)} />
                    <button onClick={handleAddProduct}><FontAwesomeIcon icon={faPlus} /> Add Product</button>
                </div>
                {/*  <div className="crud-column">
                    <input type="number" placeholder="Product ID to Update" value={productIdToUpdate} onChange={(e) => setProductIdToUpdate(e.target.value)} />
                    <input type="text" placeholder="Updated Product Name" value={updatedProductName} onChange={(e) => setUpdatedProductName(e.target.value)} />
                    <input type="text" placeholder="Updated Product Description" value={updatedProductDescription} onChange={(e) => setUpdatedProductDescription(e.target.value)} />
                    <input type="number" placeholder="Updated Product Price" value={updatedProductPrice} onChange={(e) => setUpdatedProductPrice(e.target.value)} />
                    <input type="text" placeholder="Updated Product Category" value={updatedProductCategory} onChange={(e) => setUpdatedProductCategory(e.target.value)} />
                    <input type="file" onChange={(e) => handleImageUpload(e, setUpdatedProductImage)} />
                    <label htmlFor="updatedinstock">Updated In Stock: </label>
                    <input type="checkbox" id="updatedinstock" checked={updatedProductInStock} onChange={(e) => setUpdatedProductInStock(e.target.checked)} />
                    <button onClick={handleUpdateProduct}><FontAwesomeIcon icon={faPlus} /> Update Product</button>
                </div>
                */}
            </div>
            <Footer />
        </>
    );
};

export default Admin;
