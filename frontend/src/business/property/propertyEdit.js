import React, { useEffect, useState, useRef } from "react";
import styles from '../business.module.css';  // Import the CSS module
import Nav from '../Busineshome';
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { FaUserEdit, FaUser, FaPhoneAlt, FaMoneyBill } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default function Propertyedit() {
    const [user, setUser] = useState(null);
    const editorRef = useRef(null);
    const location = useLocation();
    const itemToEdit = location.state?.Property || {};
    const [Vender, setVender] = useState([]);
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [newItem, setNewItem] = useState({
        name: itemToEdit.name || '',
        description: itemToEdit.description || '',
        order: itemToEdit.order || '',
        Category: itemToEdit.Category || '',
        Vendor: itemToEdit.Vendor || '',
        size: itemToEdit.size || '',
        price: itemToEdit.price || ''
    });
    const navigate = useNavigate();
    const existingImage = itemToEdit.imagePath || '';

    // Handle file change (for image upload)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


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

    // ------------------------------------------edit----------------------
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
        axios.put(`${apiUrl}//propertyEdit/${editingItemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Server response:', response);
                setFile(null);
                navigate('/businessproperty');
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
        axios.get(`${apiUrl}//getcatgory`)
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
            <Nav />
            <NotificationContainer />
            <div className={styles.information}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 style={{ textAlign: 'center' }}>Property Edit</h1>
                    <div className={styles.formGrid}>
                        <div>
                            <label>Property Name</label><br />
                            <button className={styles.userProfileIcon}><FaUser /></button>
                            <input placeholder="Product Name" value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                        </div>
                        <div>
                            <label>Property image</label><br />
                            {existingImage && !file && (
                                <img src={`${apiUrl}/image/${existingImage}`} alt="Existing image" width="100" onError={(e) => { e.target.onerror = null; e.target.src = ''; }} />
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
                            <label>vender</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select value={newItem.Vendor}
                                onChange={(e) => setNewItem({ ...newItem, Vendor: e.target.value })}>
                                {user ? (<option value={user.businessId}> {user.name}</option>) : (<option value={Vender.businessId}>{Vender.name}</option>)}

                            </select>
                        </div>
                        <div>
                            <label>Property Type</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select
                                value={newItem.order}
                                onChange={(e) => setNewItem({ ...newItem, order: e.target.value })}
                            >
                                <option value="Office Space">Office Space</option>
                                <option value="Home Space">Home Space</option>
                                <option value="Other">Other</option>

                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Property Description</label>
                        <textarea ref={editorRef}
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea>
                    </div>

                    <div className={styles.formGrid}>
                        <div>
                            <label>Size/Area</label><br />
                            <button className={styles.userProfileIcon}><MdOutlineProductionQuantityLimits /></button>
                            <input value={newItem.size}
                                onChange={(e) => setNewItem({ ...newItem, size: e.target.value })} />
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