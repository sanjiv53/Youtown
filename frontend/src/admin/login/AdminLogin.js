import React, { useState } from "react";
import styleadmin from '../admin.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Import Material-UI Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Login(){
   
     const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' }); 
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
     // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/login`, loginCredentials)  
      .then(response => {
        // alert( "Login successful");
        const userData = response.data.user;
   
         localStorage.setItem('user', JSON.stringify(userData));
         
        NotificationManager.success('Login successful', 'Success');
         navigate('/Adminhome', { state: { user: userData } }); 
      })
      .catch(error => {
     
        NotificationManager.error('Error login', 'Error');
        console.error('Login error:', error);
      });
  };

    return(
        <>
         <NotificationContainer />
        <div style={{padding:'20px'}}>
        <div className={styleadmin.loginmodal}>
        <form onSubmit={handleLogin}>
                  <label>Email </label>
                  <input type="email" placeholder="email"      value={loginCredentials.email}
            onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}/><br />
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={styleadmin.password} value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styleadmin.togglebutton}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                  <button className={styleadmin.button}>Login</button>
                  <h2>You don't have an account? <a href='/Adminsign' style={{color: 'red'}}>Sign Up</a></h2>
                </form>
           
              </div>
              </div>
        </>
    )
}