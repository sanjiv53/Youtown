import React, { useEffect, useState, useRef } from 'react';
import styles from '../business.module.css';  // Import the CSS module
import Nav from '../Busineshome';
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';


import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS

export default function Property() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [user, setUser] = useState(null);
  const [Propertys, SetProperty] = useState([]);
  const location = useLocation();
  const [Vender, setVender] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    order: '',
    Category: '',
    Vendor: user ? user.businessId : '',
    size: '',
    price: ''
  });


  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
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



  //-------------------------------------image---------------------------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //----------------------------------------------summar note-----------------------------------
  useEffect(() => {
    if (editorRef.current) {
      $(editorRef.current).summernote({
        height: 200,
        placeholder: 'Enter product description...',
        tabsize: 2,
        toolbar: [
          ['style', ['bold', 'italic', 'underline']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['insert', ['link', 'picture', 'video']],
        ],
      });
    }


    return () => {
      if (editorRef.current) {
        $(editorRef.current).summernote('destroy');
      }
    };
  }, [isLoginModalOpen]);

  // ------------------edit----------------------------------------
  const handleEdit = (Property) => {
    setEditingItem(Property._id);
    navigate('/businesspropertyEdit', { state: { Property } });
  };
  // -------------------------Remove----------------------------------
  const handleRemove = (id) => {
    axios.delete(`${apiUrl}//PropertyDelet/${id}`)
      .then(() => {
        SetProperty(Property.filter(Property => Property._id !== id));
        NotificationManager.success('Delet Property successfully', 'Success');
        navigate('/businessproperty');
      })
      .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
        console.error('Error deleting item:', error);
      });
  };
  // -------------------------------------post--------------------------

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const description = $(editorRef.current).summernote('code');
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('description', description);  
    formData.append('image', file);  
    formData.append('order', newItem.order);
    formData.append('Category', newItem.Category);
    formData.append('Vendor', newItem.Vendor);
    formData.append('size', newItem.size);
    formData.append('price', newItem.price);

    // Send formData to the backend
    axios.post(`${apiUrl}//property`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Important for handling file uploads
      },
    })
      .then(response => {
        console.log('Server response:', response);  
        setItems([...items, response.data]);  
        setNewItem({ name: '', description: '', order: '', Category: '', Vendor : '', size: '', price: '' });  // Reset form
        setFile(null);
        NotificationManager.success('Add Property successfully', 'Success');
        navigate('/businessproperty');

      })
      .catch(error => {
        NotificationManager.error('Error Add', 'Error');
        console.error('Error posting data:', error);
      });
  };



  // ------------------------get category----------------------
  useEffect(() => {
    axios.get(`${apiUrl}/getcatgory`)
      .then(response => {
        setCategory(response.data); 
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    if (user) {
      setNewItem((prevItem) => ({ ...prevItem, Vendor: user.businessId }));
    }
  }, [user]);
  // ---------------------------------------------get property-------------------------------
  useEffect(() => {
    if (user?.name) {
      fetch(`${apiUrl}//GETBusinessProperty?name=${user.businessId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            SetProperty(data);
          } else {
            console.error("API response is not an array:", data);
            SetProperty([]);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [user]);
    //  --------------------------search--------------------------
    const filteredLogin = Propertys.filter(item => 
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
            <button className={styles.product_addbutton} onClick={openLoginModal}>Add Property</button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Property Name</th>
                  <th>Category</th>
                  <th>Order Type</th>
                  <th>Date</th>
                  <th>Publish</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogin.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>
                    <td>{property.name}</td>
                    <td>{property.Category}</td>
                    <td>{property.order}</td>
                    <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                    <td>{property.publish ? "Yes" : "No"}</td>
                    <td> <FaEdit onClick={() => { handleEdit(property) }} style={{ cursor: 'pointer' }} />&nbsp;  &nbsp;  &nbsp;  <MdDelete onClick={() => handleRemove(property._id)} style={{ cursor: 'pointer' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isLoginModalOpen && (
          <div className={styles.login_modal_overlay} onClick={closeLoginModal}>
            <div className={styles.login_modal} onClick={(e) => e.stopPropagation()}>
              <h2>Add Product</h2>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.papu_form}>
                    <div>
                      <label>Property Name</label><br />
                      <input value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                    </div>
                    <div>
                      <label>Category</label><br />
                      <select value={newItem.Category}
                        onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })}>
                        <option value="">Select Type</option>
                        {category.map((category) => (
                          <option value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label>Vendor</label><br />
                      <select
                        value={newItem.Vendor}
                        onChange={(e) => setNewItem({ ...newItem, Vendor: e.target.value })}
                      >

                        {user ? (
                          <option value={user.businessId}>{user.name}</option>
                        ) : (
                          <option value={Vender.businessId}>{Vender.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Description</label><br />
                    <textarea ref={editorRef}
                      value={newItem.description} // Summernote uses a different method to handle description
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea> {/* Summernote editor */}
                  </div>
                  <div className={styles.papu_form}>
                    <div>
                      <label>Property Type</label><br />
                      <select value={newItem.order}
                        onChange={(e) => setNewItem({ ...newItem, order: e.target.value })} >
                        <option value="">Select Type</option>
                        <option value="Office Space">Office Space</option>
                        <option value="Home Space">Home Space</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label>Size/Area</label><br />
                      <input value={newItem.size}
                        onChange={(e) => setNewItem({ ...newItem, size: e.target.value })} />
                    </div>
                    <div>
                      <label>Price</label><br />
                      <input value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                    </div>
                    <div>
                      {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100px' }} />} {/* Preview selected image */}<br />
                      <label>Product Image</label><br />
                      <input type="file" onChange={handleFileChange} /> <br />
                    </div>
                  </div>
                  <button className={styles.save}>Save</button>
                </form>
              </div>
              <button onClick={closeLoginModal} className={styles.close_button}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
