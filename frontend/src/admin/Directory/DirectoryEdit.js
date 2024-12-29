import React, { useEffect, useState, useRef } from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Product() {
  
    const [category, setCategory] = useState([]);
    const inputRef = useRef(null);
    const editorRef = useRef(null);
    const location = useLocation();
    const itemToEdit = location.state?. Directory  || {};
    const [file, setFile] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [items, setItems] = useState(
         {
                  Address:itemToEdit. Address||'',
                  City:itemToEdit.City||'',
                  District:itemToEdit.District||'',
                  state:itemToEdit.state||'',
                  country:itemToEdit.country||'',
                  Postcode:itemToEdit.Postcode||'',
                  Lng:itemToEdit.Lng||'',
                  Lat:itemToEdit.Lat||''
              }
          );
          const [newItem, setNewItem] = useState({
              name:itemToEdit.name|| '',
              email:itemToEdit.email||'',
              password:itemToEdit.password||'',
              description:itemToEdit.description ||'',
              Category:itemToEdit.Category|| '', 
              open:itemToEdit.open|| '',
              close:itemToEdit.close|| '',
              UserName:itemToEdit. UserName|| '',
              phone1:itemToEdit.phone1||'',
              phone2:itemToEdit.phone2||'',
            
          });
 const navigate = useNavigate();

    // Handle file change (for image upload)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store the file
    };

  

    const existingImage =itemToEdit.logo || ''; 
    
    //--------------------------post----------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const description = $(editorRef.current).summernote('code'); 
        
        // Create FormData to include files and other data
        const formData = new FormData();
       
     formData.append(
            'data',
            JSON.stringify({
                name: newItem.name,
                description,
                email:newItem.email,
                Category: newItem.Category,
                open: newItem.open,
                close: newItem.close,
                phone1: newItem.phone1,
                phone2: newItem.phone2,
                Address: items.Address,
                City: items.City,
                District: items.District,
                state: items.state,
                country: items.country,
                Postcode: items.Postcode,
                Lat: items.Lat,
                Lng: items.Lng,
            })
            
        );
        if (file) {
            formData.append('logo', file);
          }
        
        const editingItemId = itemToEdit._id;
        try {
            const response = await axios.put(`${apiUrl}/directoryEdit/${editingItemId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Response:', response.data);
            NotificationManager.success('directory Edit successfully', 'Success');
            navigate('/adminDirectory'); 
            
             
        } catch (error) {
            console.error('Error:', error);
            NotificationManager.error('Failed to add business', 'Error');
        }
    };
//    -------------------------------------------summernote-----------------------------------
    useEffect(() => {
        if (editorRef.current) {
            $(editorRef.current).summernote({
                height: 200,  
                placeholder: 'Enter product description...',  
                tabsize: 2,
                toolbar: [
                    ['style', ['bold', 'italic', 'underline']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link', 'picture', 'video']],
                ],
            });
        }

        // Clean up the editor on unmount
        return () => {
            if (editorRef.current) {
                $(editorRef.current).summernote('destroy');
            }
        };
    }, []);
// --------------------------------location-----------------------------------------------------------
    useEffect(() => {
        if (window.google && window.google.maps) {
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
          autocomplete.setFields(["address_components", "geometry", "formatted_address"]);
    
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            let cityName = "";
            let districtName = "";
            let postcodeValue = "";
    
            for (let component of place.address_components) {
              if (component.types.includes("locality") || component.types.includes("administrative_area_level_2")) {
                cityName = component.long_name;
              }
              if (component.types.includes("administrative_area_level_3")) {
                districtName = component.long_name;
              }
              if (component.types.includes("postal_code")) {
                postcodeValue = component.long_name;
              }
            }
    
            const location = place.geometry?.location;
    
            setItems({
              Address: place.formatted_address || "",
              City: cityName,
              District: districtName,
              Postcode: postcodeValue,
              Lat: location ? location.lat() : null,
              Lng: location ? location.lng() : null,
            });
          });
        }
      }, []);

// ------------------------get category----------------------
useEffect(() => {
    axios.get(`${apiUrl}/getcatgory`)
      .then(response => {
        setCategory(response.data); 
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
//   ------------------------------------two submit---------------------
  const handleCombinedSubmit = (e) => {
    e.preventDefault(); 
    
    handleSubmit(e); 
  };

    return (
        <>
            <div className={styleadmin.display}>
                <Leftbar />
                <div className={styleadmin.rightpanel}>
                    <Navbar /> {/* Admin Navbar */}
                    <div className={styleadmin.business_add_box}>
                        <NotificationContainer />
                        <form onSubmit={handleCombinedSubmit}>
                            <h2 style={{ textAlign: 'center' }}>Edit Directory</h2><br />
                            <div className={styleadmin.business_box}>
                                <div>
                                    <label>Directory Name</label><br />
                                    <input
                                        placeholder=" Name"
                                        value={newItem.name}  // Make sure this is correctly bound
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                {existingImage && !file && (
                                         <img  src={`${apiUrl}/image/${existingImage}`}  alt="Existing image" width="100"  onError={(e) => {  e.target.onerror = null;  e.target.src = ''; }}  />
                                       )}
                                    {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '40px', height: '40px' }} />} {/* Preview selected image */}<br />
                                    <label>Directory Image</label><br />
                                    <input type="file" onChange={handleFileChange} />
                                </div>
                                <div>
                                    <label>
                                        Email</label><br />
                                    <input type="email"
                                        placeholder="email"
                                        value={newItem.email}
                                        onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label>Category</label><br />
                                    <select value={newItem.Category} onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })} >
                                    <option value="">Select Type</option>
                                     {category.map((category) => (
                                       <option key={category.name} value={category.name}>  {category.name}</option> ))}
                                   </select>
                                </div>
                                <div>
                                    <label>Open Time</label><br />
                                    <input type="time"
                                        placeholder="Open Time"
                                        value={newItem.open}
                                        onChange={(e) => setNewItem({ ...newItem, open: e.target.value })}
                                    />
                                    <br />
                                </div>
                                <div>
                                    <label>Close Time</label><br />
                                    <input type="time"
                                        placeholder="Close Time"
                                        value={newItem.close}
                                        onChange={(e) => setNewItem({ ...newItem, close: e.target.value })}
                                    />
                                    <br />
                                </div>

                            </div>
                            <label> Description</label><br />
                            <textarea
                                ref={editorRef}
                                value={newItem.description} // Summernote uses a different method to handle description
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            ></textarea> {/* Summernote editor */}
       
                            <div className={styleadmin.business_box}>
                                
                                <div>
                                    <label>Phone 1</label><br />
                                    <input type="text"
                                        placeholder="phone"
                                        value={newItem.phone1}
                                        onChange={(e) => setNewItem({ ...newItem, phone1: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label>Phone 2</label><br />
                                    <input type="text"
                                        placeholder="Phone"
                                        value={newItem.phone2}
                                        onChange={(e) => setNewItem({ ...newItem, phone2: e.target.value })}
                                    />

                                </div>
                                <div>
                                    <label>Address</label><br />

                                    <input ref={inputRef} value={items.Address} onChange={(e) => setItems({ ...items, Address: e.target.value })} type="text" className={styleadmin.autocomplete} placeholder="Enter a location" />
                                </div>
                                <div>
                                    <label>City</label><br />

                                    <input type="text" value={items.City} onChange={(e)=>setItems({...items,City:e.target.value})}readOnly />
                                </div>
                                <div>
                                    <label>District</label><br />

                                    <input type="text" value={items.District} onChange={(e)=> setItems({...items,District:e.target.value})} readOnly />
                                </div>
                                <div>
                                    <label>State</label><br />

                                    <input type="text" value={items.state||"Tamil Nadu"} onChange={(e)=> setItems({...items,state:e.target.value})} readOnly />
                                </div>
                                <div>
                                    <label>Country</label><br />

                                    <input type="text" value={items.country||"India"} onChange={(e)=> setItems({...items,country:e.target.value})} readOnly />
                                </div>

                                <div>
                                    <label>Zip</label><br />

                                    <input type="text" value={items.Postcode} onChange={(e)=> setItems({...items,postcode:e.target.value})} readOnly />
                                </div>
                                <div>
                                    <label>Latitude</label><br />

                                    <input type="text" value={items.Lat} onChange={(e)=> setItems({...items,Lat:e.target.value})} readOnly />
                                </div>
                                <div>
                                    <label>Longitude</label><br />

                                    <input type="text" value={items.Lng} onChange={(e)=> setItems({...items,Lng:e.target.value})} readOnly />
                                </div>

                            </div>


                            {/* <button className="save">balck</button> */}
                            <button className={styleadmin.save}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
