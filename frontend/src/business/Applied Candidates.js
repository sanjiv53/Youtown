import React, { useEffect, useState, useRef } from "react";
import styles from './business.module.css'; 
import Nav from './Busineshome';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
export default function Applied(){
   const [Jobs, SetJob] = useState([]);
   const location = useLocation();
    const [user, setUser] = useState(null);
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
  // ---------------------------------------------get job-------------------------------
  useEffect(() => {
    if (user?.name) {
      fetch(`http://localhost:5000/getjobapplyfrontend?name=${user._id}`)
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
   // -------------------------Remove----------------------------------
   const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/Jobsapplydelet/${id}`)
      .then(() => {
        SetJob(Jobs.filter(Jobs => Jobs._id !== id));
        NotificationManager.success('Delet Jobs successfully', 'Success');
      
      })
      .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
        console.error('Error deleting item:', error);
      });
  };
    return(
        <>
          <Nav />
          <div>
            <h3>Showing {Jobs.length} Candidates</h3>
            <div className={styles.jobapply}>
            {Jobs.map((job, index) => (
            <div className={styles.jobapply_box}>
              <div>
                <img src={`http://localhost:5000/image/${job.Image}`}/>
                </div>
                <div className={styles.jobapply_box_details}>
               <h2>Name: <span>{job.name}</span></h2>
               <h2>Gender: <span>{job.Gender}</span></h2>
                <h2>Intrested: <span>{job.Intrested}</span></h2>
                <h2>Jobtype: <span>{job.Jobtype}</span></h2>
                <h2>Experience: <span>{job.Experience}</span></h2>
                <h2>Qualification: <span>{job.Qualification}</span></h2>
                <h2>Address: <span>{job.Address}</span></h2>
                <h2>phone: <span>{job.phone},{job.phone1}</span></h2>
               <a href={`http://localhost:5000/image/${job.resume}`}> <button>Resume <FaAddressCard /></button></a>
               &nbsp; &nbsp;<button  onClick={() => handleRemove(job._id)} style={{ cursor: 'pointer' }}>Delet <MdDelete /></button>
               </div>
           </div>
                ))}
                </div>
          </div>
        </>
    )
}