import React,{useState,useEffect}  from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { FaEdit,FaSearch  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Propertylist(){

  const [Property, setProperty] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
  // ------------------------get property----------------------
useEffect(() => {
  axios.get(`${apiUrl}/getproperty`)
    .then(response => {
      setProperty(response.data); 
      console.log(response.data); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
// ------------------edit-----------------------
const handleEdit = (property) => {
  setEditingItem(property._id); 
  navigate('/adminPropertyEdit', { state: { property} });  
};

// -------------------------Remove----------------------------------
const handleRemove = (id) => {
  axios.delete(`${apiUrl}/PropertyDelet/${id}`)
    .then(() => {
      setProperty(Property.filter(property => property._id !== id)); 
     NotificationManager.success('Delet property successfully', 'Success');
      navigate('/propertylist');  
    })
    .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
      console.error('Error deleting item:', error);
    });
};
//  --------------------------search--------------------------
const filteredLogin = Property.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);
    return(
        <>
        
        <div className={styleadmin.display}>
         <Leftbar />
        <div >
        <Navbar />
        <h1 style={{textAlign:'center'}}>Property <span style={{color:"red"}}> list</span></h1>
         <div className={styleadmin.add_search_box}>
        <div className={styleadmin.categorylist_search}>
            <input placeholder="Search....."value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/><button><FaSearch /></button>
        </div>
        <div className={styleadmin.categorylist_add}>
       <a href="/adminproperty"><button>Create New</button></a> 
        </div>
        </div>
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Vendor Name</th>
               <th>category</th>
               <th>Size/Area</th>
               <th>Price</th>
               <th>Action</th>
             </tr>
           { filteredLogin.map((property,index) => (
                      <tr>
                       <td>{index+1}</td>
                        <td>{property.name}</td>
                        <td>{property.Vendor}</td>
                        <td>{property.Category}</td>
                        <td>{property.size}</td>
                        <td>{property.price}</td>
                       <td><FaEdit onClick={()=>{handleEdit(property)}} style={{cursor:'pointer'}}/>&nbsp;  &nbsp;  &nbsp;  <MdDelete onClick={() => handleRemove(property._id)} style={{cursor:'pointer'}}/></td>
                        </tr>
             ))}
  
            </table>
        </div>
        </div>
        </div>
        </>
    )
}