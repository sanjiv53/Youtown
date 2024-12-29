import React, { useState, useEffect } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar'; 
import Fooder from './Footer'; 
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot,FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaRegKeyboard,FaSearch } from "react-icons/fa";
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Business(){
    const [Business, setBusiness] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryLocation, setSearchQueryLocation] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
        // ------------------------get  business----------------------
  useEffect(() => {
    axios.get(`${apiUrl}/getbusinessfrontend`)
      .then(response => {
        setBusiness(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
//-----------------------------------business details---------------------------
const handleDetails = (Business) => {
    setEditingItem(Business._id); 
    navigate('/details', { state: {Business} });  
  };
   //  --------------------------search--------------------------
   const filteredBusinesses = Business.filter(item =>
    (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.address && item.address.toLowerCase().includes(searchQueryLocation.toLowerCase()))
  );
   
return(
    <>
    <Nav /> 
    <div>
          {/* ------------------search ------------------- */}
        <div className={styletwo.searchbox}>
            <div className={styletwo.searchboxbusiness} >
            <div>
              <FaRegKeyboard className={styletwo.i} />
                <input value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."/>
            </div>
            <button><FaSearch /></button>
            </div>
        </div>
          {/* ------------------search end------------------- */}
          {/*----------------- business ------------------- */}
    <div className={styletwo.business}>
    {filteredBusinesses.map((Business) => (
            <div className={styletwo.businessbox}>
                <div>
                    <img src={`http://localhost:5000/image/${Business.logo}`}/>
                </div>
                <div className={styletwo.businessdetails}>
                <a onClick={()=>{handleDetails(Business)}} style={{cursor:'pointer'}}> <h3>{Business.name}</h3></a>
                    <h4><IoIosTime style={{color:'red'}}/> &nbsp;{Business.open}-{Business.close}</h4>
                    <h4><FaLocationDot style={{color:'red'}} /> &nbsp;{Business.City}</h4>
                    <h4><FaPhone style={{color:'red'}} /> &nbsp; {Business.phone1}</h4>
                </div>
            </div>
                ))}
          
        </div>
       {/*----------------- business end ------------------- */}
     {/* -----------banner----------- */}
     <div className={styletwo.banner_businees}>
        <div className={styletwo.banner_businees_img}>
        <img src={imgone}/>
        </div>
        <div className={styletwo.banner_businees_details}>
            <h1>How it works & features
            <br/> Around The Globe</h1>
            <p>Around The Town connects you with local businesses, 
                job opportunities, and freelance gigs in your area. Simply explore the app to discover whatís 
                available near youówhether it's finding a great place to eat, securing a new job, or offering your 
                freelance services.</p>  
          <div className={styletwo.banner_businees_icons}>
            <div  className={styletwo.banner_businees_i}>
            <TbWorld />   
            </div>
            <div className={styletwo.banner_businees_icons_details}>
                <h3>
                Find Businesses</h3>
                <p>Discover and connect with local businesses easily using Around The Town. From restaurants to services, find the best your area has to offer and support your communityóall in one app.</p>
             </div>
         </div>       

         <div className={styletwo.banner_businees_icons}>
            <div  className={styletwo.banner_businees_i}>
            <MdEmail />   
            </div>
            <div className={styletwo.banner_businees_icons_details}>
                <h3>
                Review Listings</h3>
                <p>Easily browse and review listings on Around The Town. See what others are saying about local businesses, jobs, and freelancers, and share your own experiences to help the community make informed choices.</p>
             </div>
         </div>       

         <div className={styletwo.banner_businees_icons}>
            <div  className={styletwo.banner_businees_i}>
            <FaPhone />   
            </div>
            <div className={styletwo.banner_businees_icons_details}>
                <h3>
                Make a Reservation</h3>
                <p>Secure the services of local freelancers, reserve products, or schedule interviews for job opportunities through Around The Town. Our app makes it easy to book the products you need, its create the good selling in your own town</p>
             </div>
         </div>       
        </div>
     </div>


     {/* -----------banner----------- */}
     <div className={styletwo.banner_businees}>
       <div className={styletwo.banner_businees_details}>
            <h1 style={{textAlign:'center'}}>Discover the Best <br/>Spots Right Around You</h1>
            <p>To empower local businesses by connecting them with talented professionals and job seekers. We aim to create opportunities that drive growth and build a vibrant, thriving community</p>  
         </div>
        <div className={styletwo.banner_businees_img}>
        <img src={imgone}/>
        </div>
       
     </div>
       
    </div>
    <Fooder />
    </>
)

}