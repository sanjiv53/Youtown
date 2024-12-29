import React, { useState, useEffect } from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
export default function Productlist() {
  const [Business, setBusiness] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
  // ------------------------get  business----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getbusiness')
      .then(response => {
        setBusiness(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ----------------------------Business Edit------------------------------
  const handleEdit = (Business) => {
    setEditingItem(Business._id);
    navigate('/adminBusinessEdit', { state: { Business } });
  };

  // -------------------------Business  Remove----------------------------------
  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/businessDelet/${id}`)
      .then(() => {
        setBusiness(Business.filter(Business => Business._id !== id));
        NotificationManager.success('Delet Product successfully', 'Success');
        navigate('/adminbusiness');
      })
      .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
        console.error('Error deleting item:', error);
      });
  };
  
//  --------------------------search--------------------------
const filteredLogin = Business.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);
  return (
    <>

      <div className={styleadmin.display}>
        <Leftbar />
        <div >
          <Navbar />
          <NotificationContainer />
          <h1 style={{ textAlign: 'center' }}>Business <span style={{ color: "red" }}>list</span></h1>
          <div className={styleadmin.add_search_box}>
            <div className={styleadmin.categorylist_search}>
              <input placeholder="Search....."  value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/><button><FaSearch /></button>

            </div>
            <div className={styleadmin.categorylist_add}>
              <a href="/adminbusinessAdd"><button>Create New</button></a>
            </div>
          </div>

          <div className={styleadmin.categorylist}>

            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Business Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

              {filteredLogin.map((Business,index) => (
                <tr>
                  <td>{index+1}</td>
                  <td>{Business.name}</td>
                  <td>{Business.Businessname}</td>
                  <td>{Business.email}</td>
                  <td>{Business.phone1}</td>
                  <td>{Business.price}</td>
                  <td>{Business.price}</td>
                  <td><FaEdit onClick={() => { handleEdit(Business) }} style={{ cursor: 'pointer' }} /> <MdDelete onClick={() => handleRemove(Business._id)} style={{ cursor: 'pointer' }} /></td>
                </tr>
              ))}

            </table>
          </div>
        </div>
      </div>
    </>
  )
}