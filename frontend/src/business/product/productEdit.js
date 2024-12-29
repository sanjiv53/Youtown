import React, { useEffect, useState, useRef } from "react";
import styles from '../business.module.css';
import { FaUserEdit, FaUser, FaPhoneAlt, FaMoneyBill } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import Nav from '../Busineshome';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from "jquery";
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default function Product() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const editorRef = useRef(null);
    const location = useLocation();
    const itemToEdit = location.state?.product || {};
    const [subcategory, setsubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [Vender, setVender] = useState([]);
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
    const navigate = useNavigate();
    const existingImage =itemToEdit.imagePath || ''; 
  // -----------------------------------------------Location----------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location]);

//   ----------------------------------------------summar Note-------------------------
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


    // Handle file change (for image upload)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

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

  

    //   ---------------------------------product ADD----------------------------------
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
                navigate('/businessproduct');  
              
            })
            .catch(error => {
                NotificationManager.error('Error Edit', 'Error');
                console.error('Error posting data:', error);
            });
    };

  
    return (
        <>
         <Nav />
         <NotificationContainer />
            <div className={styles.information}>
                <form  onSubmit={handleSubmit} className={styles.form}>
                    <h1 style={{ textAlign: 'center' }}>Product Edit</h1>
                    <div className={styles.formGrid}>
                        <div>
                            <label>Product Name</label><br />
                            <button className={styles.userProfileIcon}><FaUser /></button>
                            <input placeholder="Product Name" value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                        </div>
                        <div>
                            <label>Product image</label><br />
                            {existingImage && !file && (
                          <img  src={`http://localhost:5000/image/${existingImage}`}  alt="Existing image" width="100"  onError={(e) => {  e.target.onerror = null;  e.target.src = ''; }}  />
                             )}
                            {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '40px', height: '40px' }} />} {/* Preview selected image */}<br />
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        {/* <div>
                        <label>Product video</label><br />
                        <button className={styles.userProfileIcon}><FaUser /></button>
                        <input type="file"/>
                      </div> */}

                        <div>
                            <label>Category</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select value={newItem.Category}
                                onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })}>
                                <option value="">Select Type</option>
                                {category.map((category) => (
                                    <option value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label> Sub Category</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select value={newItem.subCategory}
                                onChange={(e) => setNewItem({ ...newItem, subCategory: e.target.value })}>
                                <option value="">Select Type</option>
                                {subcategory.map((subcategory) => (
                                    <option value={subcategory.name}>{subcategory.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>vender</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select value={newItem.Vendor}
                                onChange={(e) => setNewItem({ ...newItem, Vendor: e.target.value })}>
                                     {user ? (<option value={user.businessId}> {user.name}</option>) :(<option value={Vender.businessId}>{Vender.name}</option>)}
                              
                            </select>
                        </div>
                        <div>
                            <label>Order Type</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select value={newItem.order}
                                onChange={(e) => setNewItem({ ...newItem, order: e.target.value })}>
                                <option value="Meet Up">Meet Up</option>
                                <option value="Both">Both</option>
                                <option value="Courier">Courier</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea ref={editorRef}
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea>
                    </div>

                    <div className={styles.formGrid}>
                        <div>
                            <label>Qty</label><br />
                            <button className={styles.userProfileIcon}><MdOutlineProductionQuantityLimits /></button>
                            <input value={newItem.Qty}
                                onChange={(e) => setNewItem({ ...newItem, Qty: e.target.value })} />
                        </div>
                        <div>
                            <label>Price</label><br />
                            <button className={styles.userProfileIcon}><FaMoneyBill /></button>
                            <input value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                        </div>
                     </div>
                    <button className={styles.save}>Save Changes</button>
                </form>
            </div>
        </>
    )
}