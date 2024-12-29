import React, { useEffect, useState, useRef } from 'react';
import styles from './business.module.css';
import { FaUserEdit, FaUser, FaPhoneAlt, FaCity } from "react-icons/fa";
import { FaBuildingUser, FaLocationCrosshairs, FaTreeCity, FaLocationDot } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { MdAccessTimeFilled, MdLocationCity } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import Nav from './Busineshome';
import $ from "jquery";
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useLocation } from 'react-router-dom';

export default function ImageUploader() {
  const [user, setUser] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postcode, setPostcode] = useState('');
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const [category, setCategory] = useState([]);
  const location = useLocation();
  // const businessProfile = location.state?.user || {};
  const [file, setFile] = useState(null);
  const [Userfile, setUserFile] = useState(null);
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [newItem, setNewItem] = useState({});
  const [products, setProducts] = useState([]);
  const [existingImage, setExistingImage] = useState('');
  const [existingImagetwo, setExistingImagetwo] = useState('');
  const [businessProfileid, businessProfile] = useState('');
  // -----------------------------------------locaton--------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);

  useEffect(() => {
    if (user?.name) {
      fetch(`http://localhost:5000/getbusinessprofile?name=${user.businessId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          } else {
            console.error("API response is not a valid array or it's empty:", data);
            setProducts([]);  // Ensure products is always an array
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [user]);

  useEffect(() => {

    if (Array.isArray(products) && products.length > 0) {
      const product = products[0];


      setItems({
        Address: product.Address || '',
        City: product.City || '',
        District: product.District || '',
        state: product.state || '',
        country: product.country || '',
        Postcode: product.Postcode || '',
        Lng: product.Lng || '',
        Lat: product.Lat || ''
      });

      setNewItem({
        name: product.name || '',
        Businessname: product.Businessname || '',
        email: product.email || '',
        password: product.password || '',
        description: product.description || '',
        Category: product.Category || '',
        open: product.open || '',
        close: product.close || '',
        UserName: product.UserName || '',
        phone1: product.phone1 || '',
        phone2: product.phone2 || ''
      });
      setExistingImage(product.logo || '');
      setExistingImagetwo(product.userImage || '');
      businessProfile(product._id || '');
    }
  }, [products]);

  //----------------------------------------image---------------------------------------------------

  const [imageURL, setImageURL] = useState("https://placehold.jp/835x1053.png");
  const [imageTwoURL, setImageTwoURL] = useState("https://placehold.jp/835x1053.png");

  // Handles the logo upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURL(e.target.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handles the personal image upload
  const handleImageTwoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageTwoURL(e.target.result);
        setUserFile(file);
      };
      reader.readAsDataURL(file);
    }
  };





  //------------------------------------------summart note--------------------------------------
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

    return () => {
      if (editorRef.current) {
        $(editorRef.current).summernote('destroy');
      }
    };
  }, []);


  //----------------------------------------------------Location--------------------------------------------------
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


  //--------------------------post----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const description = $(editorRef.current).summernote('code');
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        Businessname: newItem.Businessname,
        description,
        email: newItem.email,
        Category: newItem.Category,
        open: newItem.open,
        close: newItem.close,
        name: newItem.name,
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
    if (Userfile) {
      formData.append('userImage', Userfile);
    }
    const editingItemId = businessProfileid;
    try {
      const response = await axios.put(`http://localhost:5000/businessEdit/${editingItemId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
      NotificationManager.success('Business Edit successfully', 'Success');
      navigate('/businessprofile');


    } catch (error) {
      console.error('Error:', error);
      NotificationManager.error('Failed to add business', 'Error');
    }
  };
  
// ------------------------get category----------------------
useEffect(() => {
  axios.get('http://localhost:5000/getcatgory')
    .then(response => {
      setCategory(response.data); 
      console.log(response.data); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  return (
    <>
      <Nav />
      <NotificationContainer />
      <div className={styles.profile_container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            {/* Company Logo Upload */}
            <div className={styles.profil_box}>
              <h1>Company Logo</h1>
              <h3>Max file size is 1MB, Minimum dimension: 136 x 136 And Suitable files are .jpg & .png</h3>
              <div className={styles.avatarUpload}>
                <div className={styles.avatarEdit}>
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="imageUpload"><FaUserEdit className={styles.icon} /></label>
                </div>
                <div className={styles.avatarPreview}>
                  <div className={styles.avatarPreview}>
                    {existingImage && !file ? (
                      <div
                        id="imagePreview"
                        style={{
                          backgroundImage: `url(http://localhost:5000/image/${existingImage})`,
                        }}
                      ></div>
                    ) : (
                      <div
                        id="imagePreview"
                        style={{
                          backgroundImage: `url(${imageURL})`,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Image Upload */}
            <div className={styles.profil_box}>
              <h1>Personal image</h1>
              <h3>Max file size is 1MB, Minimum dimension: 136 x 136 And Suitable files are .jpg & .png</h3>
              <div className={styles.avatarUpload}>
                <div className={styles.avatarEdit}>
                  <input
                    type="file"
                    id="imageTwoUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageTwoUpload}
                  />
                  <label htmlFor="imageTwoUpload"><FaUserEdit className={styles.icon} /></label>
                </div>
                <div className={styles.avatarPreview}>

                  {existingImagetwo && !Userfile ? (
                    <div
                      id="imageTwoPreview"
                      style={{
                        backgroundImage: `url(http://localhost:5000/image/${existingImagetwo})`,
                      }}
                    ></div>
                  ) : (
                    <div
                      id="imageTwoPreview"
                      style={{
                        backgroundImage: `url(${imageTwoURL})`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information Form */}
          <div className={styles.information}>
            <div className={styles.form}>
              <div className={styles.formGrid}>
                <div>
                  <label>Personal Name</label><br />
                  <button className={styles.userProfileIcon}><FaUser /></button>
                  <input placeholder="Business Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                </div>

                <div>
                  <label>Company Name</label><br />
                  <button className={styles.userProfileIcon}><FaBuildingUser /></button>
                  <input placeholder="Business Name"
                    value={newItem.Businessname}
                    onChange={(e) => setNewItem({ ...newItem, Businessname: e.target.value })} />
                </div>

                <div>
                  <label>Category</label><br />
                  <button className={styles.userProfileIcon}><BiSolidCategory /></button>
                  <select value={newItem.Category} onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })} >
                  <option value="">Select Type</option>
                   {category.map((category) => (
                 <option key={category.name} value={category.name}>  {category.name}</option> ))}
                  </select>
                </div>
                <div>
                  <label>Open Time</label><br />
                  <button className={styles.userProfileIcon}><MdAccessTimeFilled /></button>
                  <input type="time" placeholder="Open Time"
                    value={newItem.open}
                    onChange={(e) => setNewItem({ ...newItem, open: e.target.value })} />
                </div>
                <div>
                  <label>Close Time</label><br />
                  <button className={styles.userProfileIcon}><MdAccessTimeFilled /></button>
                  <input type="time"
                    placeholder="Close Time"
                    value={newItem.close}
                    onChange={(e) => setNewItem({ ...newItem, close: e.target.value })} />
                </div>
              </div>

              <div>
                <label>Description</label>
                <textarea ref={editorRef} value={newItem.description} // Summernote uses a different method to handle description
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea>
              </div>

              <div className={styles.formGrid}>
                <div>
                  <label>Phone</label><br />
                  <button className={styles.userProfileIcon}><FaPhoneAlt /></button>
                  <input type="text"
                    placeholder="phone"
                    value={newItem.phone1}
                    onChange={(e) => setNewItem({ ...newItem, phone1: e.target.value })} />
                </div>
                <div>
                  <label>Phone2</label><br />
                  <button className={styles.userProfileIcon}><FaPhoneAlt /></button>
                  <input type="text"
                    placeholder="Phone"
                    value={newItem.phone2}
                    onChange={(e) => setNewItem({ ...newItem, phone2: e.target.value })} />
                </div>
                <div>
                  <label>Address</label><br />
                  <button className={styles.userProfileIcon}><FaLocationDot /></button>
                  <input ref={inputRef} value={items.Address} onChange={(e) => setItems({ ...items, Address: e.target.value })} type="text" className={styles.autocomplete} placeholder="Enter a location" />
                </div>
                <div>
                  <label>City</label><br />
                  <button className={styles.userProfileIcon}><FaCity /></button>
                  <input type="text" value={items.City} onChange={(e) => setItems({ ...items, City: e.target.value })} readOnly />
                </div>
                <div>
                  <label>District</label><br />
                  <button className={styles.userProfileIcon}><GiModernCity /></button>
                  <input type="text" value={items.District} onChange={(e) => setItems({ ...items, District: e.target.value })} readOnly />
                </div>
                <div>
                  <label>State</label><br />
                  <button className={styles.userProfileIcon}><MdLocationCity /></button>
                  <input type="text" value={items.state || "Tamil Nadu"} onChange={(e) => setItems({ ...items, state: e.target.value })} readOnly />
                </div>
                <div>
                  <label>Country</label><br />
                  <button className={styles.userProfileIcon}><MdLocationCity /></button>
                  <input type="text" value={items.country || "India"} onChange={(e) => setItems({ ...items, country: e.target.value })} readOnly />
                </div>

                <div>
                  <label>Zip</label><br />
                  <button className={styles.userProfileIcon}><FaTreeCity /></button>
                  <input type="text" value={items.Postcode} onChange={(e) => setItems({ ...items, postcode: e.target.value })} readOnly />
                </div>
                <div>
                  <label>Latitude</label><br />
                  <button className={styles.userProfileIcon}><FaLocationCrosshairs /></button>
                  <input type="text" value={items.Lat} onChange={(e) => setItems({ ...items, Lat: e.target.value })} readOnly />
                </div>
                <div>
                  <label>Longitude</label><br />
                  <button className={styles.userProfileIcon}><FaLocationCrosshairs /></button>
                  <input type="text" value={items.Lng} onChange={(e) => setItems({ ...items, Lng: e.target.value })} readOnly />
                </div>
              </div>

              <button className={styles.save}>Save Changes</button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}
