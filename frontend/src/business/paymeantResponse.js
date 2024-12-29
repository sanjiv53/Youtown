import React from "react";
import { useLocation } from 'react-router-dom';
import styles from './business.module.css';  // Import the CSS module correctly

export default function PaymentResponse(){
    const query = new URLSearchParams(useLocation().search);
  const status = query.get('status');
    return(
         <>   <div>
         <h1>Payment Status</h1>
         <p>{status === 'success' ? 'Payment Successful' : 'Payment Failed'}</p>
       </div></>
    )
  
}