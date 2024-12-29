import React, { useState,useEffect } from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Admin Navbar
import Leftbar from "../Manu"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Category() {
  const [category, setItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [activeTab, setActiveTab] = useState(1); // Track the active tab
  const [newItem, setNewItem] = useState({
    name: '',
    type: ''
  });
    
  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

// ---------------------category-----------------//

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.type) {
      alert('Please fill out both fields');
      return; 
    }

    console.log('Category Data:', newItem);

    // Send the data directly as JSON (not FormData)
    axios.post(`${apiUrl}/category`, newItem)
      .then(response => {
        console.log('Server response:', response);  
    
        NotificationManager.success('Category added successfully', 'Success');
        setNewItem({ name: '', type: '' });  
        // navigate('/Category');  
      })
      .catch(error => {
        console.error('Error posting data:', error);
      
        NotificationManager.error('Error adding category', 'Error');
      });
  };

  // ----------------sub category---------------

  const handleSubCategorySubmit = (e) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.type) {
      alert('Please fill out both fields');
      return; 
    }


    console.log('Category Data:', newItem);

    axios.post(`${apiUrl}/subcategory`, newItem)
      .then(response => {
        console.log('Server response:', response);  
       
        setNewItem({ name: '', type: '' });  
      
        NotificationManager.success('Category added successfully', 'Success');
      })
      .catch(error => {
        console.error('Error posting data:', error);
        
        NotificationManager.error('Error adding category', 'Error');
      });
  };
// ------------------------get category----------------------
  useEffect(() => {
    axios.get(`${apiUrl}/getcatgory`)
      .then(response => {
        setItems(response.data); // Set the items in state
        console.log(response.data); // Log the data to check the imagePath
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
  
      <div className={styleadmin.display}>
        <Leftbar />
        <div className={styleadmin.rightpanel}>
          <Navbar /> 
          <NotificationContainer />
    
          <div className={styleadmin.tabs}>
            <button
              className={`${styleadmin.tab_button} ${styleadmin.activeTab === 1 ? 'active' : ''}`}
              onClick={() => handleTabChange(1)}
            >
              Category
            </button>
            <button
              className={`${styleadmin.tab_button}  ${styleadmin.activeTab === 2 ? 'active' : ''}`}
              onClick={() => handleTabChange(2)}
            >
              SubCategory
            </button>
          </div>

          {/* Tab Content */}
          <div className={styleadmin.tab_content}>
            {/* Category Tab */}
            {activeTab === 1 && (
              <div className={styleadmin.admin_category_box}>
                <form onSubmit={handleCategorySubmit}>
                  <h2>Add Category</h2>
                  <label>Category Name</label><br />
                  <input 
                    type="text"
                    placeholder="Category Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  /><br />

                  {/* <label> Type</label><br /> */}
                  <select 
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    <option value="Job">Job</option>
                    <option value="Business">Business</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Propety">Propety</option>
                  </select><br />

                  <button type="submit">Save</button>
                </form>
              </div>
            )}
                {activeTab === 2 && (
              <div className={styleadmin.admin_category_box}>
                <form onSubmit={handleSubCategorySubmit}>
                  <h2>Add SubCategory</h2>
                  <label>SubCategory Name</label><br />
                  <input 
                    type="text"
                    placeholder="Category Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  /><br />

                  <label>Category Type</label><br />
                  <select 
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    {category.map((category) => (
                    <option value={category.name}>{category.name}</option>
                    // <option value="type2">Type 2</option>
                    ))}
                  </select><br />

                  <button type="submit">Save</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
   
  );
}
