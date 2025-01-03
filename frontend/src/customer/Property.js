import React, { useState, useEffect } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar'; 
import Fooder from './Footer'; 
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot,FaMosque ,FaPhone } from "react-icons/fa6";
import { FaRegKeyboard,FaSearch ,FaRupeeSign,FaShower,FaRegBuilding} from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { LuChurch } from "react-icons/lu";
import { GiByzantinTemple } from "react-icons/gi";
import { TbBusStop } from "react-icons/tb";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sale(){
    const[Property,setProperty]=useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryLocation, setSearchQueryLocation] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    // ------------------------get property----------------------
 useEffect(() => {
    axios.get(`${apiUrl}/getpropertyfrontend`)
      .then(response => {
        setProperty(response.data); 
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
   //-----------------------------------property details---------------------------
const handlePropertyDetails = (property) => {
    setEditingItem(property._id); 
    navigate('/propertydetails', { state: {property} });  
  };
    //  --------------------------search--------------------------
    const filteredBusinesses = Property.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(searchQueryLocation.toLowerCase()))
    );
    return(
        <>
        <Nav /> 
        <div>
            {/* ------------search----------------- */}
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
        
        {/*-------------------- product---------------- */}
        <div className={styletwo.property_page}>
        { filteredBusinesses.map((property)=>(
           <div className={styletwo.property_page_box}>
                <div>
                <a onClick={()=>{handlePropertyDetails(property)}}>  <img src={`${apiUrl}/image/${property.imagePath}`}/></a>
                </div>
                <div className={styletwo.property_page_details}>
                    <h6> <CiHospital1 style={{marginRight:'10px'}}/> <FaMosque style={{marginRight:'10px'}}/> <LuChurch style={{marginRight:'10px'}}/> <GiByzantinTemple style={{marginRight:'10px'}}/> <FaShower style={{marginRight:'10px'}}/> <TbBusStop /></h6>
                    <a onClick={()=>{handlePropertyDetails(property)}}>  <h3>{property.name}</h3></a>
                    <p><FaPhone style={{color:'red'}}/> {property.Vendor.phone1}</p>
                    <p><FaLocationDot style={{color:'red'}} /> {property.Vendor.City}</p>
                    <p><FaRegBuilding style={{color:'red'}}/>{property.order}</p>
                    <a onClick={()=>{handlePropertyDetails(property)}}>   <b><FaRupeeSign />{property.price}</b></a>
                </div>
            </div>
              ))}
            
        </div>
           {/*-------------end product-----------  */}
      </div>
      <Fooder />
        </>
    )
}