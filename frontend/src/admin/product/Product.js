import React,{useState,useEffect} from "react";
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


export default function Productlist(){
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  // ------------------------get property----------------------
useEffect(() => {
  axios.get(`${apiUrl}/getproduct`)
    .then(response => {
      setProduct(response.data); 
      console.log(response.data); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

// ------------------edit----------------------------------------
const handleEdit = (product) => {
  setEditingItem(product._id); 
  navigate('/AdminProductEdit', { state: { product} });  
};

// -------------------------Remove----------------------------------
const handleRemove = (id) => {
  axios.delete(`${apiUrl}/itemsDelet/${id}`)
    .then(() => {
      setProduct(Product.filter(product => product._id !== id)); 
     NotificationManager.success('Delet Product successfully', 'Success');
      navigate('/Productlist');  
    })
    .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
      console.error('Error deleting item:', error);
    });
};
//  --------------------------search--------------------------
const filteredLogin = Product.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);

    return(
        <>
        
        <div className={styleadmin.display}>
         <Leftbar />
        <div >
        <Navbar />
               <NotificationContainer />
        <h1 style={{textAlign:'center'}}>Product <span style={{color:"red"}}>list</span></h1>
        <div className={styleadmin.add_search_box}>
        <div className={styleadmin.categorylist_search}>
            <input placeholder="Search....." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/><button><FaSearch /></button>
          
        </div>
        <div className={styleadmin.categorylist_add}>
            <a href="/Product"><button>Create New</button></a> 
        </div>
        </div>
        
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Vendor Name</th>
               <th>category</th>
               <th>Qty</th>
               <th>Price</th>
               <th>Action</th>
             </tr>
             {filteredLogin.map((product,index) => (
            <tr>
             <td>{index+1}</td>
              <td>{product.name}</td>
              <td>{product.order}</td>
              <td>{product.Category}</td>
              <td>{product.Qty}</td>
              <td>{product.price}</td>
             <td><FaEdit onClick={()=>{handleEdit(product)}} style={{cursor:'pointer'}}/>&nbsp;  &nbsp;  &nbsp;  <MdDelete onClick={() => handleRemove(product._id)} style={{cursor:'pointer'}}/></td>
              </tr>
   ))}
            </table>
        </div>
        </div>
        </div>
        </>
    )
}