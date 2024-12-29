import React  , { useState, useEffect }from "react";
import styletwo from './App.module.css';
import Nav from './Navbar'; 
import Fooder from './Footer'; 
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot,FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaRegKeyboard,FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Directory(){
   const [Dirctory, setDirctory] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryLocation, setSearchQueryLocation] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
 // ------------------------get directory----------------------
 useEffect(() => {
    axios.get(`${apiUrl}/getdirectoryfrontend`)
      .then(response => {
        setDirctory(response.data); 
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
      //-----------------------------------job details---------------------------
      const handleDetails = (directory) => {
        setEditingItem(directory._id);
        navigate('/Directorydetails', { state: { directory } });
    };
    //  --------------------------search--------------------------
    const filteredBusinesses = Dirctory.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(searchQueryLocation.toLowerCase()))
    );

return(
    <>
    <Nav /> 
    <div>
          {/* ------------------search------------------- */}
        <div className={styletwo.searchbox}>
            <div className={styletwo.searchboxbusiness} >
              <div>
                <FaRegKeyboard className={styletwo.i} />
                 <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
            </div>
         
                     <button><FaSearch /></button>
            </div>
        </div>
          {/* ------------------search end------------------- */}
                 {/*----------------- directory ------------------- */}
      <div className={styletwo.directory}>
      {filteredBusinesses.map((directory)=>(
            <div className={styletwo.directory_box}>
                <div>
                    <img src={`${apiUrl}/image/${directory.logo}`}/>
                </div>
                <div className={styletwo.directory_details}>
                <a onClick={()=>{handleDetails(directory)}} style={{cursor:'pointer'}}>  <h3>{directory.name}</h3></a>
                    <h4><IoIosTime style={{color:'red'}}/> {directory.open}-{directory.close}</h4>
                    <h4><FaLocationDot style={{color:'red'}} /> {directory.Address}</h4>
                    <h4><FaPhone style={{color:'red'}} /> {directory.phone1},{directory.phone2}</h4>
                </div>
            </div>
      ))}
          
      </div>
       {/*----------------- directory end ------------------- */} 
    </div>
    <Fooder />
    </>
)

}