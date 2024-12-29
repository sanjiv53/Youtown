import React, {useEffect, useState, useRef  }  from "react";
import styletwo from './App.module.css';
// Import Material-UI Icons
import Nav from './Navbar'; 
import Fooder from './Footer'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Import Material-UI Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS


 export default function SignBusiness(){
  const [items, setItems] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const editorRef = useRef(null);
  const [file, setFile] = useState(null); 
  const [Userfile, setUserFile] = useState(null);
  const [newItem, setNewItem] = useState({ name: '',email:'',phone1:'', password: '',  businessId:'' });
  
  const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    // -------------login-------------------
    const handleCombinedSubmit = async (e) => {
      e.preventDefault();
  
      let description = $(editorRef.current).summernote('code');
      if (!description || typeof description !== 'string') {
          description = ''; 
      }
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('userImage', Userfile);
      formData.append(
          'data',
          JSON.stringify({
              Businessname: newItem.Businessname,
              description,
              email: newItem.email,
              Category: newItem.Category,
              open: newItem.open,
              close: newItem.close,
              name: newItem.name,
              phone1: newItem.phone1,
              phone2: newItem.phone2,
              Address: items.Address,
              City: items.City,
              District: items.District,
              state: items.state,
              country: items.country,
              Postcode: items.Postcode,
              Lat: items.Lat,
              Lng: items.Lng,
          })
      );
  
      try {
          const businessResponse = await axios.post('http://localhost:5000/business', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
          });
  
          const businessId = businessResponse.data?.id; // Ensure the ID exists
          if (!businessId) {
              console.error('Error: businessId is missing from response:', businessResponse.data);
              NotificationManager.error('Failed to retrieve businessId', 'Error');
              return; // Stop execution if `businessId` is not available
          }
          console.log('Business Response:', businessResponse.data);
  
          const signupData = {
              name: newItem.name,
              email: newItem.email,
              phone1: newItem.phone1,
              password: newItem.password,
              businessId,
          };
          console.log('Signup Data:', signupData);
          const signupResponse = await axios.post('http://localhost:5000/Businesssign', signupData);
          console.log('Signup Response:', signupResponse.data);
  
          // Optionally update UI
          NotificationManager.success('Business added and user signed up successfully', 'Success');
          navigate('/'); // Navigate to business admin page
      } catch (error) {
          console.error('Error:', error);
          NotificationManager.error('Failed to add business or sign up user', 'Error');
      }
  };
  
    return(
        <>
        <Nav /> 
        <div className={styletwo.sign_box}>
          <NotificationContainer />
            <form  onSubmit={handleCombinedSubmit}>
                <h1>Create Business Account</h1>
                <label>Name&nbsp;&nbsp;&nbsp; </label>
                <input type="text"placeholder="Your Name"value={newItem.name}
                   onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}/><br/>
                <label>Phone&nbsp;&nbsp;&nbsp; </label>
                 <input type="text" placeholder="Phone" value={newItem.phone1}
                   onChange={(e) => setNewItem({ ...newItem, phone1: e.target.value })}/><br/>
                <label>Email ID&nbsp;&nbsp; </label>
                 <input type="email" placeholder="Email" value={newItem.email}
                      onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}/><br/>
                <label>Password </label>
                 <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                 className={styletwo.password_sign} value={newItem.password}
                 onChange={(e)=> setNewItem({...newItem,password:e.target.value})}/>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styletwo.toggle_sign_button}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button><br/>

                <button className={styletwo.Sign_button} >Sign in</button>
            </form>
        </div>
        <Fooder />
        </>
    )
 }