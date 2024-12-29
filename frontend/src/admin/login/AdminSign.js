import React, { useState } from "react";
import styleadmin from '../admin.module.css';
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
    const [newItem, setNewItem] = useState({ name: '',email:'', password: '' });
    const navigate = useNavigate();

     // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // -------------login-------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/sign', newItem)
      .then(response => {
        setItems([...items, response.data]); // Add new item to list
        setNewItem({ name: '',email:'', password: ''}); // Reset form
        NotificationManager.success('sign successful', 'Success');
        navigate('/admin');
      })
      .catch(error => {
        NotificationManager.error('Error sign', 'Error');
        console.error('Error posting data:', error);
      });
  };
    return(
        <>
          <NotificationContainer />
        <div style={{padding:'20px'}}>
        <div className={styleadmin.loginmodal}>
        <form onSubmit={handleSubmit}>
                   <label>Name </label>
                  <input type="text" placeholder="name" value={newItem.name}
                   onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}/><br />
                  <label>Email </label>
                  <input type="email" placeholder="email" value={newItem.email}
                      onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}/><br />
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={styleadmin.password} value={newItem.password}
                    onChange={(e)=> setNewItem({...newItem,password:e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styleadmin.togglebuttonsign}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                
                  <button type="submit" className={styleadmin.button}>Login</button>
                  <h2>You don't have an account? <a href='/admin' style={{color: 'red'}}>Login Up</a></h2>
                </form>
           
              </div>
              </div>
        </>
    )
}