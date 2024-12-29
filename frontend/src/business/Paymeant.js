import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './business.module.css';  // Import the CSS module correctly
import Nav from './Busineshome';
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCcAmazonPay,FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";

const PhonePePayment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    amount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/phonepe/payment', formData);
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error('Failed to initiate payment');
    }
  };

  return (
    <>
      <Nav />
    <div className={styles.paymeant}>
        <div className={styles.paymeant_box}>
      <h1> Payment</h1>
      <h3><FaCcAmazonPay /> <FaGooglePay /> <SiPhonepe /></h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      /><br/>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      /><br/>
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={handleChange}
      /><br/>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      /><br/>
      <button onClick={handlePayment}><FaMoneyBillWave /> Pay Now</button>
    </div>
    </div>
    </>
  );
};

export default PhonePePayment;
