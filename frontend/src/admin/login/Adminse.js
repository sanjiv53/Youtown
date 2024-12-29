import React,{useState,useEffect} from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { FaEdit,FaSearch  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Admin(){
  const [login, setlogin] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // ------------------------get property----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getLogin')
      .then(response => {
        setlogin(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
   // ----------------------------login Edit------------------------------
   const handleEdit = (login) => {
    setEditingItem(login._id);
    navigate('/adminLoginEdit', { state: { login } });
  };

//  --------------------------search--------------------------
const filteredLogin = login.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);

    return(
        <>
        
        <div className={ styleadmin.display}>
         <Leftbar />
        <div >
        <Navbar />
            <NotificationContainer />
        <h1 style={{textAlign:'center',fontSize:'35px'}}>category <span style={{color:"red"}}>list</span></h1>
        <div className={styleadmin.add_search_box}>
        <div className={ styleadmin.categorylist_search}>
            <input placeholder="Search....."   value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/><button><FaSearch /></button>
        </div>
        <div className={styleadmin.categorylist_add}>
       <a href="/Adminsign"><button>Add user</button></a> 
        </div>
        </div>
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Email</th>
               <th>Date</th>
               <th>Role</th>
               <th>Action</th>
             </tr>
          {filteredLogin.map((login,index) => (
                          <tr key={login._id}>
                            <td>{index + 1}</td>
                            <td>{login.name}</td>
                            <td>{login.email}</td>
                            <td>{new Date(login.createdAt).toLocaleDateString()}</td>
                             <td>Admin</td>
                            <td><FaEdit onClick={() => { handleEdit(login) }} style={{ cursor: 'pointer' }} /> </td>
                          </tr>
                        ))}
            </table>
        </div>
        </div>
      
        </div>
        </>
    )
}