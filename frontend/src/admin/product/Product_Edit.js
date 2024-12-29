import React, { useEffect, useState, useRef } from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';


export default function ProductEdit() {
    const editorRef = useRef(null); 
    const location = useLocation();
    const itemToEdit = location.state?.product || {};
    const [subcategory, setsubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const [Vender, setVender] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [newItem, setNewItem] = useState({
       name:itemToEdit.name || '',
       description:itemToEdit.description ||'',
       order:itemToEdit.order || '', 
        Category:itemToEdit.Category|| '', 
        subCategory:itemToEdit.subCategory ||'', 
        Qty:itemToEdit.Qty|| '',
        price:itemToEdit.price || '',
        Vendor:itemToEdit.Vendor ||'',
    });


    // Handle file change (for image upload)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };
    const existingImage =itemToEdit.imagePath || ''; 
    
    // Handle form submission
 const handleSubmit = (e) => {
        e.preventDefault();

        // console.log('Form Data:', newItem);
       const description = $(editorRef.current).summernote('code');  
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('description', description);  
        formData.append('order', newItem.order);
        formData.append('Category', newItem.Category);
        formData.append('subCategory', newItem.subCategory);
        formData.append('Qty', newItem.Qty);
        formData.append('price', newItem.price);
        formData.append('Vendor', newItem.Vendor);
        if (file) {
            formData.append('image', file);
          }
        const editingItemId = itemToEdit._id;
        // Send formData to the backend
        axios.put(`${apiUrl}/productEdit/${editingItemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Server response:', response);  
                setFile(null);
                NotificationManager.success('Edit Product successfully', 'Success');
                navigate('/Productlist');  
              
            })
            .catch(error => {
                NotificationManager.error('Error Edit', 'Error');
                console.error('Error posting data:', error);
            });
    };

    // ---------------------------summer note------------------
    // Initialize Summernote
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

// ------------------------get subcategory----------------------
useEffect(() => {
    axios.get(`${apiUrl}/getsubcatgory`)
      .then(response => {
        setsubCategory(response.data);
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
                            <h2 style={{ textAlign: 'center' }}>Edit Product</h2><br />
                            <label>Product Name</label><br />
                            <input
                                placeholder="Product Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            />
                            <br />
                            <label>Product Description</label><br />
                            <textarea
                                ref={editorRef}
                                value={newItem.description} 
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            ></textarea>
                       {existingImage && !file && (
                          <img  src={`http://localhost:5000/image/${existingImage}`}  alt="Existing image" width="100"  onError={(e) => {  e.target.onerror = null;  e.target.src = ''; }}  />
                             )}
                            {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{width:'40px', height:'40px'}} />} Preview selected image<br />
                            <label>Product Image</label><br />
                            <input type="file" onChange={handleFileChange} /> <br />

                            <label>Video</label><br />
                            <input type="file" /><br />

                            <label>Order Type</label><br />
                            <select
                                value={newItem.order}
                                onChange={(e) => setNewItem({ ...newItem, order: e.target.value })}
                            >
                               <option value="Meet Up">Meet Up</option>
                                <option value="Both">Both</option>
                                <option value="Courier">Courier</option>
                                {/* Add other options here */}
                            </select><br />

                            <div className={styleadmin.product_category}>
                                <div>
                                    <label>Category</label><br />
                                    <select
                                        value={newItem.Category}
                                        onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })}
                                    > <option value="">Select Type</option>
                                         {category.map((category) => (
                                              <option value={category.name}>{category.name}</option>
                                              ))}
                                    </select>
                                </div>
                                <div>
                                    <label>SubCategory</label><br />
                                    <select
                                        value={newItem.subCategory}
                                        onChange={(e) => setNewItem({ ...newItem, subCategory: e.target.value })}
                                    >
                                         <option value="">Select Type</option>
                                        {subcategory.map((subcategory) => (
                                              <option value={subcategory.name}>{subcategory.name}</option>
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

                            <label>Qty</label><br />
                            <input
                                value={newItem.Qty}
                                onChange={(e) => setNewItem({ ...newItem, Qty: e.target.value })}
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
