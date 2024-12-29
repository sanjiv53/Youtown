import React from "react";
import styleadmin from './admin.module.css';

export default function Forgotpassword(){
    return(
        <>
          <div style={{padding:'20px'}}>
        <div className={styleadmin.loginmodal}>
        <form >
                  <label>Email </label>
                  <input type="email" placeholder="email"      value={loginCredentials.email}
            onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}/><br />
                 
                  <button className={styleadmin.button}>Login</button>
                  <h2>You don't have an account? <a href='/Adminsign' style={{color: 'red'}}>Sign Up</a></h2>
                </form>
           
              </div>
              </div>
        </>
    )
}