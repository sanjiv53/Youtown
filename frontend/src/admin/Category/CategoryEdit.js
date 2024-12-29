import React, { useState, useEffect } from "react";
import styleadmin from "../admin.module.css";
import Navbar from "../adminnavbar"; // Admin Navbar
import Leftbar from "../Manu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useLocation } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function Category() {
  const [category, setCategory] = useState([]); 
  const [activeTab, setActiveTab] = useState(1); 
  const location = useLocation();
  const itemToEdit = location.state?. Category  || {};
  const [newItem, setNewItem] = useState({  name:itemToEdit.name|| '', type:itemToEdit.type|| '' });
  const apiUrl = process.env.REACT_APP_API_URL; 
  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
    setNewItem({ name: "", type: "" }); // Reset form fields when switching tabs
  };

  // Handle Category Form Submission
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.type) {
      alert("Please fill out both fields");
      return;
    }
    const editingItemId = itemToEdit._id;
    axios
      .post(`${apiUrl}/CategoryEdit/${editingItemId}`, newItem)
      .then((response) => {
        console.log("Category added:", response.data);
        NotificationManager.success("Category added successfully", "Success");
        setNewItem({ name: "", type: "" }); // Reset form
        // navigate('/Category'); Uncomment if navigation is required
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        NotificationManager.error("Error adding category", "Error");
      });
  };

  

  // Fetch Categories on Component Mount
  useEffect(() => {
    axios
      .get(`${apiUrl}/getcatgory`)
      .then((response) => {
        setCategory(response.data);
        console.log("Fetched categories:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [apiUrl]);

  return (
    <div className={styleadmin.display}>
      <Leftbar />
      <div className={styleadmin.rightpanel}>
        <Navbar />
        <NotificationContainer />

        {/* Tabs */}
        <div className={styleadmin.tabs}>
          <button
            className={`${styleadmin.tab_button} ${activeTab === 1 ? styleadmin.active : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Category
          </button>
        
        </div>

        {/* Tab Content */}
        <div className={styleadmin.tab_content}>
         
            <div className={styleadmin.admin_category_box}>
              <form onSubmit={handleCategorySubmit}>
                <h2>Add Category</h2>
                <label>Category Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <br />
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="Job">Job</option>
                  <option value="Business">Business</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Property">Property</option>
                </select>
                <br />
                <button type="submit">Save</button>
              </form>
            </div>
     

        </div>
      </div>
    </div>
  );
}
