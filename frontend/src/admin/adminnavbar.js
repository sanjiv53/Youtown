
import {  useLocation, Link, useNavigate } from "react-router-dom";
import styleadmin from './admin.module.css';
import React, {useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaSearch, FaUserTie,FaFingerprint } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";

const Nav = () => {
  const [user, setUser] = useState(null);
  const location = useLocation(); // To get the user from state (if passed from Login)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location]);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // --------------loginout---------------------

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/admin"); // Redirect to login page
  };

  return (
    <>
    <div id={styleadmin.navBar}>
      <div>
        {/* <h3>ssssss</h3> */}
        </div>
      <div>
        <ul>
       {user ? (<li className={styleadmin.usericon} onClick={toggleDropdown}> <h3> <FaUser style={{color: 'red'}}/> Welcome, {user.name}</h3> 
        {isDropdownOpen && (
                <div  className={styleadmin.userdropdown}>
                  <ul>
                    <li >
                    <FaFingerprint  style={{color: 'red'}}/> Chenge Password
                      </li>
                    <li onClick={handleLogout} ><HiOutlineLogin style={{color: 'red'}} />  Login Out</li>
                  </ul>
                </div>
              )}
            </li>) : (
                <h3> <FaUser style={{color: 'red'}} />Welcome, </h3>
              )}
             
      </ul>
      </div>
    </div>
    </>
  );
};

export default Nav;
