import React, { useState }  from "react";
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


 export default function Sign(){
    const [items, setItems] = useState([]);
    const [showPassword, setShowPassword] = useState(false); 
    const [newItem, setNewItem] = useState({ name: '',email:'',phone:'', password: '' });
    const navigate = useNavigate();

      // Toggle password visibility
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      // -------------login-------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/usersign', newItem)
      .then(response => {
        setItems([...items, response.data]); // Add new item to list
        setNewItem({ name: '',email:'',phone:'', password: ''}); // Reset form
        NotificationManager.success('sign successful', 'Success');
        navigate('/');
      })
      .catch(error => {
        NotificationManager.error('Error sign', 'Error');
        console.error('Error posting data:', error);
      });
  };
    return(
        <>
        <Nav /> 
           <NotificationContainer />
        <div className={styletwo.sign_box}>
            <form  onSubmit={handleSubmit}>
                <h1>Create User Account</h1>
                <label>Name&nbsp;&nbsp;&nbsp; </label>
                <input type="text"placeholder="Your Name"value={newItem.name}
                   onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}/><br/>
                <label>Phone&nbsp;&nbsp;&nbsp; </label>
                 <input type="text" placeholder="Phone" value={newItem.phone}
                   onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}/><br/>
                <label>Email ID&nbsp;&nbsp; </label>
                 <input type="email" placeholder="Email"value={newItem.email}
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