import React, { useEffect, useState, useRef } from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Property() {
    const editorRef = useRef(null); 
    const [Vender, setVender] = useState([]);
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        order: 'text1', 
        Category: 'category1', 
        Vendor: 'name', 
        size: '',
        price: ''
    });
    const navigate = useNavigate();

    // Handle file change (for image upload)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store the file
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

   const description = $(editorRef.current).summernote('code');  
   const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('description', description);  // Add Summernote description to formData
        formData.append('image', file);  // Append the file to the form data
        formData.append('order', newItem.order);
        formData.append('Category', newItem.Category);
        formData.append('Vendor', newItem.Vendor);
        formData.append('size', newItem.size);
        formData.append('price', newItem.price);

        // Send formData to the backend
        axios.post('http://localhost:5000/property', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Important for handling file uploads
            },
        })
            .then(response => {
                console.log('Server response:', response);  // Check the server response
                setItems([...items, response.data]);  // Add new item to the list
                setNewItem({ name: '', description: '', order:'' , Category: '', Vendor: '', size: '', price: '' });  // Reset form
                setFile(null);
                NotificationManager.success('Add Property successfully', 'Success');
                navigate('/adminproperty');  
               
            })
            .catch(error => {
                NotificationManager.error('Error Add', 'Error');
                console.error('Error posting data:', error);
            });
    };

    // ---------------------------summer note
    // Initialize Summernote
    useEffect(() => {
        if (editorRef.current) {
            $(editorRef.current).summernote({
                height: 200,  // Set the height of the editor
                placeholder: 'Enter product description...',  // Placeholder text
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
    axios.get('http://localhost:5000/getcatgory')
      .then(response => {
        setCategory(response.data); // Set the items in state
        console.log(response.data); // Log the data to check the imagePath
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

// ------------------------get Vender----------------------
useEffect(() => {
    axios.get('http://localhost:5000/getAdminlogin')
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
                            <h2 style={{ textAlign: 'center' }}>Add Property </h2><br />
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

                            {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{width:'40px', height:'40px'}} />} {/* Preview selected image */}<br />
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
                                {/* Add other options here */}
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
