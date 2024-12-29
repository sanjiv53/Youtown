import React, { useEffect, useState, useRef }   from "react";
import styles from './business.module.css';  // Import the CSS module correctly
import Nav from './Busineshome';
import axios from 'axios';
import { IoMdTime } from "react-icons/io";

import { useLocation,useNavigate } from 'react-router-dom';
export default function Businessdashboard(){
    const [user, setUser] = useState(null);
    const [Products, setProducts] = useState([]);
    const [Propertys, SetProperty] = useState([]);
      const [Jobs, SetJob] = useState([]);
    const location = useLocation();
   const [currentDate, setCurrentDate] = useState(new Date().toDateString());
   const apiUrl = process.env.REACT_APP_API_URL;
       
 // -----------------------------------------locaton--------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);
  // ---------------------------------------------get product-------------------------------
    useEffect(() => {
      if (user?.name) {
        fetch(`${apiUrl}/getbusinessproduct?name=${user.businessId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch products");
            }
            return response.json();
          })
          .then((data) => {
            if (Array.isArray(data)) {
              setProducts(data);
            } else {
              console.error("API response is not an array:", data);
              setProducts([]);
            }
          })
          .catch((error) => console.error("Error fetching products:", error));
      }
    }, [user]);
  // ---------------------------------------------get property-------------------------------
  useEffect(() => {
    if (user?.name) {
      fetch(`${apiUrl}/GETBusinessProperty?name=${user.businessId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            SetProperty(data);
          } else {
            console.error("API response is not an array:", data);
            SetProperty([]);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [user]);
 // ---------------------------------------------get job-------------------------------
  useEffect(() => {
    if (user?.name) {
      fetch(`${apiUrl}/getbusinessjob?name=${user.businessId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            SetJob(data);
          } else {
            console.error("API response is not an array:", data);
            SetJob([]);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [user]);
 

    return(
    <>
        <Nav />
    <div>
        <div  className={styles.dashborad}>
         <div className={styles.dashborad_box}>
           <h3>Product list</h3>
            <p>{Products.length}</p>
         </div>
         <div className={styles.dashborad_box}>
           <h3>Property list</h3>
           <p>{Propertys.length}</p>
         </div>
          <div className={styles.dashborad_box}>
             <h3>Job list</h3>
             <p>{Jobs.length}</p>
          </div>
         
       </div>
    <div className={styles.dashborad_data}>
    <table>
        <thead>
            <tr>
                <th>Data</th>
                <th>Product</th>
                <th>Property</th>
                <th>Job</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><p><IoMdTime /> {currentDate}</p></td>
                <td><p>{Products.length}</p></td>
                <td><p>{Propertys.length}</p></td>
                <td><p>{Jobs.length}</p></td>
            </tr>
        </tbody>
    </table>
    </div> 
   
    </div>
    </>
    );
}