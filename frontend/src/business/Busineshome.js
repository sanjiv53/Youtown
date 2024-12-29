import React, { useState,useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { FaTimes, FaUserTie, FaUserEdit, FaMoneyCheckAlt,FaUserAlt } from "react-icons/fa";
import { MdProductionQuantityLimits, MdHome } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { BsBank2 } from "react-icons/bs";
import styles from './business.module.css';  // Import the CSS module correctly
import Logo from './img/Y (2).png';
import {  useLocation, Link, useNavigate } from "react-router-dom";

export default function ToggleSidebar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [isOpen, setIsopen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  //--------------------------------------sileder-------------------------------------
  const toggleSidebar = () => {
    setIsopen(!isOpen);
  };

  //--------------------------------------------location--------------------------

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location]);

    // ----------------------------Business Edit------------------------------
    useEffect(() => {
      if (user?.name) {
        fetch(`${apiUrl}/getbusinessproduct?name=${user._id}`)
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
  
    const handleEditAndNavigate = () => {
      setEditingItem(user.name); 
      navigate('/businessproductEdit', { state: { user, products } }); 
    };

  return (
    <>
      <div className="container-fluid mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
          <div className="container-fluid p-2">
            <a className={`navbar-brand ${styles.textPrimary} mr-0`}>
              <img src={Logo} alt="Logo" className={styles.img} /> Y<span>O</span>U<span>T</span>O<span>W</span>N
            </a> 
        
            <div className="form-inline ml-auto">
            {user ? (<p><FaUserAlt style={{color:'red'}}/> &nbsp;Welcome, {user.name}</p>):(<p></p>)}        &nbsp;   &nbsp;   &nbsp;
              <div className={`btn btn-primary`} onClick={toggleSidebar}>
              <IoMenu />
              </div>
            </div>
          </div>
        </nav>

        <div className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
          <div className={styles.sdHeader}>
            <h4 className="mb-0">
              Y<span>O</span>U<span>T</span>O<span>W</span>N
            </h4>
            <div className="btn btn-primary" onClick={toggleSidebar}>
              <FaTimes />
            </div>
          </div>
          <div className={styles.sdBody}>
            <ul>
              <li><a href="/dashboard" className={styles.sdLink}><MdHome /> Dashboard</a></li>
              <li ><a href="/businessprofile" className={styles.sdLink}><FaUserTie /> Company Profile</a></li>
              <li><a href="/businessproduct" className={styles.sdLink}><MdProductionQuantityLimits /> Product</a></li>
              <li><a href="/businessjob"className={styles.sdLink}><PiBagSimpleFill /> Job</a></li>
              <li><a href="/businessproperty"className={styles.sdLink}><BsBank2 /> Property</a></li>
              <li><a  href="/businessapplied"className={styles.sdLink}><FaUserEdit /> Applied Candidates</a></li>
              <li><a href="/businessplan"className={styles.sdLink}><FaMoneyCheckAlt /> Upgrade Plan</a></li>
            </ul>
          </div>
        </div>

        <div className={`${styles.sidebarOverlay} ${isOpen ? styles.active : ''}`} onClick={toggleSidebar}></div>
      </div>
    </>
  );
}
