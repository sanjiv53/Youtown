import React,{useEffect,useState} from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { FaEdit,FaSearch  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';

export default function Productlist(){
  const [Directory, setDirectory] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
  // ------------------------get property----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getdirectory')
      .then(response => {
        setDirectory(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
 // ----------------------------dirctory Edit------------------------------
  const handleEdit = (Directory) => {
    setEditingItem(Directory._id);
    navigate('/adminDirectoryEdit', { state: { Directory } });
  };
//------------------------------------dirctory remove------------------------
const handleRemove = (id) => {
  axios.delete(`http://localhost:5000/directoryDelet/${id}`)
    .then(() => {
      setDirectory(Directory.filter(Directory => Directory._id !== id));
      NotificationManager.success('Delet Product successfully', 'Success');
      navigate('/Productlist');
    })
    .catch(error => {
      NotificationManager.error('Error Delet', 'Error');
      console.error('Error deleting item:', error);
    });
};
//  --------------------------search--------------------------
const filteredLogin = Directory.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);
    return(
        <>
        
        <div className={styleadmin.display}>
         <Leftbar />
        <div >
        <Navbar />
             <NotificationContainer />
        <h1 style={{textAlign:'center'}}>Directory<span style={{color:"red"}}>List</span></h1>
        <div className={styleadmin.add_search_box}>
        <div className={styleadmin.categorylist_search}>
            <input placeholder="Search....."value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/><button><FaSearch /></button>
          
        </div>
        <div className={styleadmin.categorylist_add}>
            <a href="/adminDirectoryAdd"><button>Create New</button></a> 
        </div>
        </div>
        
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Name</th>
               <th>category</th>
               <th>Address</th>
               <th>City</th>
               <th>Zip</th>
               <th>Action</th>
             </tr>
             {filteredLogin.map((Directory,index) => (
            <tr>
              <td>{index+1}</td>
              <td>{Directory.name}</td>
              <td>{Directory.Category}</td>
              <td>{Directory.Address}</td>
              <td>{Directory.City}</td>
              <td>{Directory.Postcode}</td>
              <td><FaEdit onClick={() => { handleEdit(Directory) }} style={{ cursor: 'pointer' }}/>&nbsp;   <MdDelete onClick={() => {  handleRemove(Directory._id) }} style={{ cursor: 'pointer' }}/></td>
              </tr>
               ))} 
            </table>
        </div>
        </div>
        </div>
        </>
    )
}