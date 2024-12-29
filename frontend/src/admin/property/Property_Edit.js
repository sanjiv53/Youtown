import React, { useEffect, useState, useRef } from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS
import axios from 'axios';
import {  useLocation,useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function PropertyEdit() {
    const editorRef = useRef(null); 
    const location = useLocation();
    const itemToEdit = location.state?.property || {};
     const [Vender, setVender] = useState([]);
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [newItem, setNewItem] = useState({
        name:itemToEdit.name || '',
       description:itemToEdit.description ||'',
       order:itemToEdit.order || '', 
        Category:itemToEdit.Category|| '', 
        Vendor:itemToEdit.Vendor ||'', 
        size:itemToEdit.size|| '',
        price:itemToEdit.price || ''
    });
    const navigate = useNavigate();

    // Handle file change (for image upload)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const existingImage =itemToEdit.imagePath || ''; 

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

   const description = $(editorRef.current).summernote('code');  
   const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('description', description);  
        formData.append('order', newItem.order);
        formData.append('Category', newItem.Category);
        formData.append('Vendor', newItem.Vendor);
        formData.append('size', newItem.size);
        formData.append('price', newItem.price);
        if (file) {
            formData.append('image', file);
          }
        const editingItemId = itemToEdit._id;
        // Send formData to the backend
        axios.put(`${apiUrl}/propertyEdit/${editingItemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Server response:', response);  
                setFile(null);
                 navigate('/propertylist');  
                 NotificationManager.success('Edit Property successfully', 'Success');
            })
            .catch(error => {
                NotificationManager.error('Error Edit', 'Error');
                console.error('Error posting data:', error);
            });
    };

    // ---------------------------summer note---------------
    
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
    }, []);

// ------------------------get category----------------------
useEffect(() => {
    axios.get(`${apiUrl}/getcatgory`)
      .then(response => {
        setCategory(response.data); 
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

// ------------------------get Vender----------------------
useEffect(() => {
    axios.get(`${apiUrl}/getAdminlogin`)
      .then(response => {
        setVender(response.data); 
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    return (
        <>
           <NotificationContainer />
            <div className={styleadmin.display}>
                <Leftbar />
                <div className={styleadmin.rightpanel}>
                    <Navbar /> {/* Admin Navbar */}
                    <div className={styleadmin.product_add_box}>

                        <form onSubmit={handleSubmit}>
                            <h2 style={{ textAlign: 'center' }}>Edit Property </h2><br />
                            <label>Property Name</label><br />
                            <input
                                placeholder="Product Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            />
                            <br />
                            <label>Property Description</label><br />
                            <textarea
                                ref={editorRef}
                                value={newItem.description} // Summernote uses a different method to handle description
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            ></textarea> {/* Summernote editor */}

                        {existingImage && !file && (
                          <img  src={`${apiUrl}/image/${existingImage}`}  alt="Existing image" width="100"  onError={(e) => {  e.target.onerror = null;  e.target.src = ''; }}  />
                             )}
                            {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{width:'40px', height:'40px'}} />} Preview selected image<br />
                            <label>Property Image</label><br />
                            <input type="file" onChange={handleFileChange} /> <br />

                            <label>Video</label><br />
                            <input type="file" /><br />

                            <label>Property Type</label><br />
                            <select
                                value={newItem.order}
                                onChange={(e) => setNewItem({ ...newItem, order: e.target.value })}
                            >
                               <option value="Office Space">Office Space</option>
                                <option value="Home Space">Home Space</option>
                                <option value="Other">Other</option>
                             
                            </select><br />

                            <div className={styleadmin.product_category}>
                                <div>
                                    <label>Category</label><br />
                                    <select
                                        value={newItem.Category}
                                        onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })}
                                    >
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
                                                 <option value="">Select Type</option>
                                        {Vender.map((Vender) => (
                                              <option value={Vender.businessId}>{Vender.name}</option>
                                              ))}
                                    </select>
                                </div>
                            </div>

                            <label>Size/Area</label><br />
                            <input
                                value={newItem.size}
                                onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
                            />
                            <br />

                            <label>Price</label><br />
                            <input
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            />
                            <br />

                            {/* <button className="save">balck</button> */}
                            <button className={styleadmin.save}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
