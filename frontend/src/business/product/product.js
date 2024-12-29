import React, { useEffect, useState, useRef } from 'react';
import styles from '../business.module.css';  // Import the CSS module
import Nav from '../Busineshome';
import { FaEdit,FaSearch   } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';

import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS

export default function Product() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // -----------------------------------------locaton--------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);


  // ---------------------------------------------get product-------------------------------
  useEffect(() => {
    if (user?.name) {
      fetch(`${apiUrl}/getbusinessproduct?name=${user.businessId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error("API response is not an array:", data);
            setProducts([]);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [user]);
  // ------------------edit----------------------------------------
  const handleEdit = (product) => {
    setEditingItem(product._id); 
    navigate('/businessproductEdit', { state: { product} });  
  };
 // -------------------------Remove----------------------------------
const handleRemove = (id) => {
  axios.delete(`${apiUrl}/itemsDelet/${id}`)
    .then(() => {
      setProducts(Product.filter(product => product._id !== id)); 
     NotificationManager.success('Delet Product successfully', 'Success');
      navigate('/Productlist');  
    })
    .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
      console.error('Error deleting item:', error);
    });
}; 
  //  --------------------------search--------------------------
  const filteredLogin = products.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );
  return (
    <>
      <Nav />
        <NotificationContainer />
      <div className={styles.Product_business}>
        <div className={styles.Product_business_card}>
          <div className={styles.product_add}>
            <div>
              <input value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className={styles.product_search}><FaSearch /></button>
            </div>
            <a href='/businessproductadd'> <button className={styles.product_addbutton} onClick={openLoginModal}>Add Product</button></a>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Order Type</th>
                  <th>Date</th>
                  <th>Publish</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogin.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.Category}</td>
                    <td>{product.order}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td>{product.publish ? "Yes" : "No"}</td>
                    <td> <FaEdit onClick={()=>{handleEdit(product)}} style={{cursor:'pointer'}}/>&nbsp;  &nbsp;  &nbsp;  <MdDelete onClick={() => handleRemove(product._id)} style={{cursor:'pointer'}}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isLoginModalOpen && (
          <div className={styles.login_modal_overlay} onClick={closeLoginModal}>
            {/* Add Product Modal */}
          </div>
        )}
      </div>
    </>
  );
}
