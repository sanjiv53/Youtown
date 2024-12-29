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
import {  FaUser, FaUserGraduate, FaMoneyBill, FaAddressCard,FaRegBuilding } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdDateRange,MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";

export default function Jobedit() {
    const [user, setUser] = useState(null);
    const editorRef = useRef(null);
    const location = useLocation();
    const itemToEdit = location.state?.Jobs  || {};
    const [Vender, setVender] = useState([]);
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);

    const [newItem, setNewItem] = useState({
        name: itemToEdit.name || '',
        description: itemToEdit.description || '',
        Jobtype: itemToEdit. Jobtype || '',
        Category: itemToEdit.Category || '',
        Vendor: itemToEdit.Vendor || '',
        OfferedSalarymin:itemToEdit.OfferedSalarymin|| '',
        OfferedSalaryMAX:itemToEdit.OfferedSalaryMAX|| '',
        Experience:itemToEdit.  Experience|| '',
        Qualification:itemToEdit.  Qualification|| '',
        Gender:itemToEdit.Gender|| '',
        Website:itemToEdit. Website|| '',
        phone:itemToEdit.phone|| '',
        StartDate:itemToEdit.   StartDate|| '',
        EndDate:itemToEdit.  EndDate|| '',
        Address:itemToEdit. Address || '',
        City:itemToEdit. City || '',
        District:itemToEdit. District||  '',
        state:itemToEdit.state||  '',
        country:itemToEdit. country||  '',
        Postcode:itemToEdit.Postcode||  ''

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

        const formData = new FormData();
        formData.append(
          'data',
          JSON.stringify({
            name: newItem.name,
            description: $(editorRef.current).summernote('code'),
            email: newItem.email,
            Jobtype: newItem.Jobtype,
            Category: newItem.Category,
            OfferedSalarymin: newItem.OfferedSalarymin,
            OfferedSalaryMAX: newItem.OfferedSalaryMAX,
            Experience: newItem.Experience,
            Qualification: newItem.Qualification,
            Gender: newItem.Gender,
            Website: newItem.Website,
            phone: newItem.phone,
            StartDate: newItem.StartDate,
            EndDate: newItem.EndDate,
            Vendor: newItem.Vendor,
            Address: newItem.Address,
            City: newItem.City,
            District: newItem.District,
            state: newItem.state,
            country: newItem.country,
            Postcode: newItem.Postcode,
          })
        );
    
        const editingItemId = itemToEdit._id;
        // Send formData to the backend
        axios.put(`http://localhost:5000/jobEdit/${editingItemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Server response:', response);
                setFile(null);
                navigate('/businessjob');
                NotificationManager.success('Edit Job successfully', 'Success');
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
        axios.get('http://localhost:5000/getcatgory')
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
            <Nav />
            <NotificationContainer />
            <div className={styles.information}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 style={{ textAlign: 'center' }}>Job Edit</h1>
                    <div className={styles.formGrid}>
                        <div>
                            <label>Job Title</label><br />
                            <button className={styles.userProfileIcon}><FaUser /></button>
                            <input placeholder="Product Name" value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                        </div>
                        <div>
                            <label>Job Category</label><br />
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
                            <label>Job Type</label><br />
                            <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                            <select
                                value={newItem.Jobtype}
                                onChange={(e) => setNewItem({ ...newItem, Jobtype: e.target.value })}
                            >
                               <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>

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
                           <label>Offered Salary (MIN)</label><br />
                            <button className={styles.userProfileIcon}><FaMoneyBill /></button>
                            <input type="text" value={newItem.OfferedSalarymin}
                        onChange={(e) => setNewItem({ ...newItem, OfferedSalarymin: e.target.value })} />
                        </div>
                        <div>
                            <label>Offered Salary (MIN)</label><br />
                            <button className={styles.userProfileIcon}><FaMoneyBill /></button>
                            <input value={newItem.OfferedSalarymin}
                                onChange={(e) => setNewItem({ ...newItem, OfferedSalarymin: e.target.value })} />
                        </div>
                        <div>
                            <label>Experience (optional)</label><br />
                            <button className={styles.userProfileIcon}><MdDateRange /></button>
                            <input value={newItem.Experience}
                                onChange={(e) => setNewItem({ ...newItem,    Experience: e.target.value })} />
                        </div>
                        <div>
                            <label>Qualification (optional)</label><br />
                            <button className={styles.userProfileIcon}><FaUserGraduate /></button>
                            <input value={newItem.Qualification}
                                onChange={(e) => setNewItem({ ...newItem,Qualification: e.target.value })} />
                        </div>
                        <div>
                            <label>Gender *</label><br />
                            <button className={styles.userProfileIcon}><FaUser /></button>
                            <input value={newItem.Gender}
                                onChange={(e) => setNewItem({ ...newItem,Gender: e.target.value })} />
                        </div>
                        <div>
                            <label>Email Address (optional)</label><br />
                            <button className={styles.userProfileIcon}><MdEmail /></button>
                            <input value={newItem.email}
                                onChange={(e) => setNewItem({ ...newItem,email: e.target.value })} />
                        </div>
                        <div>
                            <label>phone (optional)</label><br />
                            <button className={styles.userProfileIcon}><IoCall /></button>
                            <input value={newItem. phone}
                                onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })} />
                        </div>
                        <div>
                            <label>Website (optional)</label><br />
                            <button className={styles.userProfileIcon}><CgWebsite /></button>
                            <input value={newItem.Website}
                                onChange={(e) => setNewItem({ ...newItem,Website: e.target.value })} />
                        </div>
                        <div>
                            <label>Full Address *</label><br />
                            <button className={styles.userProfileIcon}><FaAddressCard /></button>
                            <input value={newItem.Address}
                                onChange={(e) => setNewItem({ ...newItem,Address: e.target.value })} />
                        </div>
                        <div>
                            <label>City</label><br />
                            <button className={styles.userProfileIcon}><FaRegBuilding /></button>
                            <input value={newItem.City}
                                onChange={(e) => setNewItem({ ...newItem,City: e.target.value })} />
                        </div>
                        <div>
                            <label>District</label><br />
                            <button className={styles.userProfileIcon}><FaRegBuilding /></button>
                            <input value={newItem.District}
                                onChange={(e) => setNewItem({ ...newItem,District: e.target.value })} />
                        </div>
                        <div>
                            <label>Country</label><br />
                            <button className={styles.userProfileIcon}><FaRegBuilding /></button>
                            <input value={newItem.country}
                                onChange={(e) => setNewItem({ ...newItem,country: e.target.value })} />
                        </div>
                        <div>
                            <label>State</label><br />
                            <button className={styles.userProfileIcon}><FaRegBuilding /></button>
                            <input value={newItem.state}
                                onChange={(e) => setNewItem({ ...newItem,state: e.target.value })} />
                        </div>
                        <div>
                            <label>Pincode</label><br />
                            <button className={styles.userProfileIcon}><FaAddressCard /></button>
                            <input value={newItem.Postcode}
                                onChange={(e) => setNewItem({ ...newItem,Postcode: e.target.value })} />
                        </div>
                        <div>
                            <label>Start Date</label><br />
                            <button className={styles.userProfileIcon}><MdDateRange /></button>
                            <input type="Date" value={newItem.StartDate}
                                onChange={(e) => setNewItem({ ...newItem,StartDate: e.target.value })} />
                        </div>
                        <div>
                            <label>End Date</label><br />
                            <button className={styles.userProfileIcon}><MdDateRange /></button>
                            <input  type="Date" value={newItem.EndDate}
                                onChange={(e) => setNewItem({ ...newItem,EndDate: e.target.value })} />
                        </div>
                    </div>
                    <button className={styles.save}>Save Changes</button>
                </form>
            </div>
        </>
    )
}