import React, { useEffect, useState } from 'react';
import styletwo from './App.module.css';
// Import Material-UI Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useLocation, useNavigate } from 'react-router-dom';  // No need for BrowserRouter in Navbar
import Logo from './img/logo-dark.png';
import { IoMdHome } from "react-icons/io";
import { FaSearch, FaUser, FaUserTie, FaUserCircle } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineLogin } from "react-icons/hi";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function Navbar() {
  const [user, setUser] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBusinessLoginModalOpen, setIsBusinessLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");



  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const openBusinessLoginModal = () => {
    setIsBusinessLoginModalOpen(true);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const BusinesscloseLoginModal = () => {
    setIsBusinessLoginModalOpen(false);
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --------------------------------USER LOGIN--------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/Userlogin", loginCredentials)
      .then((response) => {
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        NotificationManager.success("Login successful", "Success");
        navigate("/", { state: { user: userData } });
        closeLoginModal(); // Close the modal on success
      })
      .catch((error) => {
        NotificationManager.error("Error logging in", "Error");
        console.error("Login error:", error);
      });
  };

  //------------------------------BUSINEESS LOGIN------------------------
  const handleBusinessLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/Businesslogin", loginCredentials)
      .then((response) => {
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        NotificationManager.success("Login successful", "Success");
        navigate("/businessprofile", { state: { user: userData } });
        closeLoginModal(); // Close the modal on success
      })
      .catch((error) => {
        NotificationManager.error("Error logging in", "Error");
        console.error("Login error:", error);
      });
  };
  // ----------------------user name---------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Loaded user from storage:", parsedUser);
      setUser(parsedUser);
    }
    if (location.state && location.state.user) {
      console.log("Loaded user from location state:", location.state.user);
      setUser(location.state.user);
    }
  }, [location]);

  // --------------loginout---------------------

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    NotificationManager.success("Login Out successful", "Success");
    navigate("/");
  };
  // ---------------------------------search----------------------
  const handleSearchSubmit = (e) => {
    e.preventDefault();
   
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <nav className={styletwo.navbar}>
      <div className={styletwo.container}>
        <div className={styletwo.logo}>
          <img src={Logo} alt="Logo" />
        </div>
        <div className={styletwo.menuicon} onClick={handleShowNavbar} >
          <Hamburger />

        </div>

        {/* Navbar bottom */}
        <div className={styletwo.navbarbottom}>
          <div className={styletwo.navbarbottombar}>
            <ul>
              <li><Link to="/"><IoMdHome /></Link></li>
              <li onClick={openSearchModal}><FaSearch /></li>
              <li><Link to="/Category"><BiCategoryAlt /></Link></li>

              {user ? (
                <li className={styletwo.usericon} onClick={toggleDropdown}>
                  <FaUser />
                  {isDropdownOpen && (
                    <div className={styletwo.userdropdown}>
                      <ul>
                        <li ><FaUser style={{ color: 'red' }} />   {user.name}</li>
                        <li onClick={handleLogout} ><HiOutlineLogin style={{ color: 'red' }} /> Logout</li>
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li className={styletwo.usericon} onClick={toggleDropdown}>
                  <FaUser />
                  {isDropdownOpen && (
                    <div className={styletwo.userdropdown}>
                      <ul>
                        <li onClick={openLoginModal}> <FaUser style={{ color: "red" }} /> User Login</li>
                        <li onClick={openBusinessLoginModal}><FaUserTie style={{ color: "red" }} /> Business Login</li>
                      </ul>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Search modal */}
        {isSearchModalOpen && (
          <div className={styletwo.loginmodaloverlay} onClick={closeSearchModal}>
            <div className={styletwo.seacrhmodal} onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSearchSubmit}>
                <input placeholder="name"  value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} /><br />
                <button type="submit" className={styletwo.button}><FaSearch /></button>
              </form>
              <button onClick={closeSearchModal} className={styletwo.closebutton}>Close</button>
            </div>
          </div>
        )}
        {/* -----------------------display computer-------------------- */}
        <div className={`${styletwo.navelements} ${showNavbar ? styletwo.active : ""}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/business">Business</Link></li>
            <li><Link to="/Directory">Directory</Link></li>
            <li><Link to="/sale">Sale</Link></li>
            <li><Link to="/property">Property</Link></li>
            <li><Link to="/job">Job</Link></li>
            {user ? (<li className={styletwo.login} onClick={toggleDropdown}>
              <FaUserCircle style={{ fontSize: '25px' }} />
              {isDropdownOpen && (
                <div className={styletwo.logindropdown}>
                  <ul>
                    <li><FaUser style={{ color: 'red' }} />   {user.name}</li>
                    <li onClick={handleLogout}><HiOutlineLogin style={{ color: 'red' }} /> Logout</li>
                  </ul>
                </div>
              )}
            </li>
            ) : (
              <li className={styletwo.login} onClick={toggleDropdown}>
                <FaUserCircle style={{ fontSize: '25px' }} />
                {isDropdownOpen && (
                  <div className={styletwo.logindropdown}>
                    <ul>
                      <li onClick={openLoginModal}><FaUser style={{ color: 'red' }} /> User Login</li>
                      <li onClick={openBusinessLoginModal}><FaUserTie style={{ color: 'red' }} /> Business Login</li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
          {/* Login modal */}
          < NotificationContainer />
          {isLoginModalOpen && (
            <div className={styletwo.loginmodaloverlay} onClick={closeLoginModal}>
              <div className={styletwo.loginmodal} onClick={(e) => e.stopPropagation()}>
                <h2>User Login</h2>
                <form onSubmit={handleLogin}>
                  <label>Email </label>
                  <input type="email" placeholder="email" value={loginCredentials.email}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })} /><br />
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={styletwo.password} value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styletwo.togglebutton}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                  <button className={styletwo.button}>Login</button>
                  <h4>You don't have an account? <a href='/sign' style={{ color: 'red' }}>Sign Up</a></h4>
                </form>
                <button onClick={closeLoginModal} className={styletwo.closebutton}>Close</button>
              </div>
            </div>
          )}

          {/* Business login modal */}
          {isBusinessLoginModalOpen && (
            <div className={styletwo.loginmodaloverlay} onClick={BusinesscloseLoginModal}>
              <div className={styletwo.loginmodal} onClick={(e) => e.stopPropagation()}>
                <h2>Business Login</h2>
                <form onSubmit={handleBusinessLogin}>
                  <label>Email </label>
                  <input type="email" placeholder="email" value={loginCredentials.email}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })} /><br />
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={styletwo.password} value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styletwo.togglebusinessbutton}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                  <button className={styletwo.button}>Login</button>
                  <h4>You don't have an account? <a href='/SignBusiness' style={{ color: 'red' }}>Sign Up</a></h4>
                </form>
                <button onClick={BusinesscloseLoginModal} className={styletwo.closebutton}>Close</button>
              </div>
            </div>
          )}


        </div>
      </div>
    </nav>
  );
};

// Hamburger component for the mobile menu
const Hamburger = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="24" viewBox="0 0 52 24">
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect id="Rectangle_3" data-name="Rectangle 3" width="42" height="4" rx="2" transform="translate(304 47)" fill="#574c4c" />
      <rect id="Rectangle_5" data-name="Rectangle 5" width="42" height="4" rx="2" transform="translate(304 67)" fill="#574c4c" />
      <rect id="Rectangle_4" data-name="Rectangle 4" width="52" height="4" rx="2" transform="translate(294 57)" fill="#574c4c" />
    </g>
  </svg>
);

export default Navbar;
