import React, { useEffect, useState, useRef } from "react";
import styles from "../business.module.css"; // Import the CSS module
import Nav from "../Busineshome";
import { FaSearch } from "react-icons/fa";
import $ from "jquery"; // Import jQuery for Summernote
import "summernote/dist/summernote-lite.css"; // Import Summernote CSS
import "summernote/dist/summernote-lite.js"; // Import Summernote JS
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Product() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postcode, setPostcode] = useState('');
  const [category, setCategory] = useState([]);
  const [Vender, setVender] = useState([]);
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [Jobs, SetJob] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(
    {
      Address: '',
      City: '',
      District: '',
      state: '',
      country: '',
      Postcode: ''
      // Lng: '',
      // Lat: ''
    }
  );
  const [newItem, setNewItem] = useState({
    name: '',
    email: '',
    Jobtype: '',
    description: '',
    Category: '',
    OfferedSalarymin: '',
    OfferedSalaryMAX: '',
    Experience: '',
    Qualification: '',
    Gender: '',
    Website: '',
    phone: '',
    StartDate: '',
    EndDate: '',
    Vendor: ''

  });

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    // Ensure the ref is not null and element exists
    if (editorRef.current) {
      $(editorRef.current).summernote({
        height: 200, // Set the height of the editor
        placeholder: "Enter product description...", // Placeholder text
        tabsize: 2,
        toolbar: [
          ["style", ["bold", "italic", "underline"]],
          ["font", ["strikethrough", "superscript", "subscript"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["insert", ["link", "picture", "video"]],
        ],
      });
    }

    // Cleanup Summernote on component unmount
    return () => {
      if (editorRef.current) {
        $(editorRef.current).summernote("destroy");
      }
    };
  }, [isLoginModalOpen]); // Reinitialize only when modal opens/closes

  //--------------------------------map location--------------------------
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded.");
      return;
    }

    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.setFields(['address_components', 'geometry']);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.address_components || !place.geometry) return;

        let cityName = '';
        let districtName = '';
        let postcodeValue = '';

        for (let component of place.address_components) {
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
            cityName = component.long_name;
          }
          if (component.types.includes('administrative_area_level_3')) {
            districtName = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            postcodeValue = component.long_name;
          }
        }

        setCity(cityName);
        setDistrict(districtName);
        setPostcode(postcodeValue);

        const location = place.geometry.location;
        setLat(location.lat());
        setLng(location.lng());
      });
    }
  }, []);

  // -----------------------------------------------Location----------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location]);
  //--------------------------post----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        name: newItem.name,
        description: $(editorRef.current).summernote('code'),
        email: newItem.email,
        Jobtype: newItem.Jobtype,
        Category: newItem.Category,
        OfferedSalarymin: newItem.OfferedSalarymin,
        OfferedSalaryMAX: newItem.OfferedSalaryMAX,
        Experience: newItem.Experience,
        Qualification: newItem.Qualification,
        Gender: newItem.Gender,
        Website: newItem.Website,
        phone: newItem.phone,
        StartDate: newItem.StartDate,
        EndDate: newItem.EndDate,
        Vendor: newItem.Vendor,
        Address: items.Address,
        City: items.City,
        District: items.District,
        state: items.state,
        country: items.country,
        Postcode: items.Postcode,
      })
    );

    try {
      const response = await axios.post('http://localhost:5000/job', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
      NotificationManager.success('job added successfully', 'Success');
      setIsLoginModalOpen(false);
      navigate('/businessjob');
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
  // -----------------------get vender----------------

  useEffect(() => {
    axios.get('http://localhost:5000/getAdminlogin')
      .then(response => {
        setVender(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    if (user) {
      setNewItem((prevItem) => ({ ...prevItem, Vendor: user.businessId }));
    }
  }, [user]);

  // ---------------------------------------------get job-------------------------------
  useEffect(() => {
    if (user?.name) {
      fetch(`http://localhost:5000/getbusinessjob?name=${user.businessId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            SetJob(data);
          } else {
            console.error("API response is not an array:", data);
            SetJob([]);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [user]);

  // ------------------edit----------------------------------------
  const handleEdit = (Jobs) => {
    setEditingItem(Jobs._id);
    navigate('/businessJobsEdit', { state: { Jobs } });
  };
  // -------------------------Remove----------------------------------
  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/JobsDelet/${id}`)
      .then(() => {
        SetJob(Jobs.filter(Jobs => Jobs._id !== id));
        NotificationManager.success('Delet Jobs successfully', 'Success');
        navigate('/businessjob');
      })
      .catch(error => {
        NotificationManager.error('Error Delet', 'Error');
        console.error('Error deleting item:', error);
      });
  };
  //  --------------------------search--------------------------
const filteredLogin = Jobs.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);
  return (
    <>
      <Nav />
      <NotificationContainer />
      <div className={styles.Product_business}>
        <div className={styles.Product_business_card}>
          <div className={styles.product_add}>
            <div>
              <input value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className={styles.product_search}>
                <FaSearch />
              </button>
            </div>
            <button
              className={styles.product_addbutton}
              onClick={openLoginModal}
            >
              Post Job
            </button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Job Title</th>
                  <th>Category</th>
                  <th>Job Type</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Publish</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogin.map((job, index) => (
                  <tr key={job._id}>
                    <td>{index + 1}</td>
                    <td>{job.name}</td>
                    <td>{job.Category}</td>
                    <td>{job.Jobtype}</td>
                    <td>{job.City}</td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td>{job.publish ? "Yes" : "No"}</td>
                    <td> <FaEdit onClick={() => { handleEdit(job) }} style={{ cursor: 'pointer' }} />&nbsp;  &nbsp;  &nbsp;  <MdDelete onClick={() => handleRemove(job._id)} style={{ cursor: 'pointer' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isLoginModalOpen && (
          <div
            className={styles.login_modal_overlay}
            onClick={closeLoginModal}
          >
            <div
              className={styles.login_modal}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Add Job</h2>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.papu_form}>
                    <div>
                      <label>Job Title</label>
                      <br />
                      <input type="text" placeholder=" Name"
                        value={newItem.name}  // Make sure this is correctly bound
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                    </div>
                    <div>
                      <label>Job Category</label>
                      <br />
                      <select value={newItem.Category} onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })} >
                        <option value="">Select Type</option>
                        {category.map((category) => (
                          <option key={category.name} value={category.name}>  {category.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label>vender</label><br />
                      <select value={newItem.Vendor} onChange={(e) => setNewItem({ ...newItem, Vendor: e.target.value })} >
                        {user ? (
                          <option value={user.businessId}>{user.name}</option>
                        ) : (
                          <option value={Vender.businessId}>{Vender.name}</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label>Job Type</label>
                      <br />
                      <select
                        value={newItem.Jobtype}
                        onChange={(e) => setNewItem({ ...newItem, Jobtype: e.target.value })}>
                       <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                        {/* Add other options here */}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Description</label>
                    <br />
                    <textarea ref={editorRef} value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea> {/* Summernote */}
                  </div>
                  <div className={styles.papu_form}>
                    <div>
                      <label>Offered Salary (MIN)</label><br />
                      <input type="text" value={newItem.OfferedSalarymin}
                        onChange={(e) => setNewItem({ ...newItem, OfferedSalarymin: e.target.value })} />
                    </div>
                    <div>
                      <label>Offered Salary (MAX)</label><br />
                      <input type="text" value={newItem.OfferedSalaryMAX}
                        onChange={(e) => setNewItem({ ...newItem, OfferedSalaryMAX: e.target.value })} />
                    </div>
                    <div>
                      <label>Experience (optional)</label><br />
                      <input type="text" value={newItem.Experience}
                        onChange={(e) => setNewItem({ ...newItem, Experience: e.target.value })} />
                    </div>
                    <div>
                      <label>Qualification (optional)</label><br />
                      <input type="text" value={newItem.Qualification}
                        onChange={(e) => setNewItem({ ...newItem, Qualification: e.target.value })} />
                    </div>
                    <div>
                      <label>Gender *</label><br />
                      <input type="text" value={newItem.Gender}
                        onChange={(e) => setNewItem({ ...newItem, Gender: e.target.value })} />
                    </div>
                    <div>
                      <label>Email Address (optional)</label><br />
                      <input type="email" placeholder="email"
                        value={newItem.email}
                        onChange={(e) => setNewItem({ ...newItem, email: e.target.value })} />
                    </div>
                    <div>
                      <label>phone (optional)</label><br />
                      <input type="text" placeholder="phone"
                        value={newItem.phone}
                        onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })} />
                    </div>
                    <div>
                      <label>Website (optional)</label><br />
                      <input type="text" placeholder="website"
                        value={newItem.Website}
                        onChange={(e) => setNewItem({ ...newItem, Website: e.target.value })} />
                    </div>
                    <div>
                      <label>Full Address *</label><br />
                      <input ref={inputRef} value={items.Address} onChange={(e) => setItems({ ...items, Address: e.target.value })} type="text" className={styles.autocomplete} placeholder="Enter a location" />
                    </div>
                    <div>
                      <label>City</label><br />
                      <input type="text" value={items.City} onChange={(e) => setItems({ ...items, City: e.target.value })} />
                    </div>
                    <div>
                      <label>District</label><br />
                      <input type="text" value={items.District} onChange={(e) => setItems({ ...items, District: e.target.value })} />
                    </div>
                    <div>
                      <label>Country</label><br />
                      <input type="text" value={items.country} onChange={(e) => setItems({ ...items, country: e.target.value })} />
                    </div>
                    <div>
                      <label>State</label><br />
                      <input type="text" value={items.state} onChange={(e) => setItems({ ...items, state: e.target.value })} />
                    </div>
                    <div>
                      <label>Pincode</label><br />
                      <input type="text" value={items.Postcode} onChange={(e) => setItems({ ...items, Postcode: e.target.value })} />
                    </div>
                    {/* <div>
                      <label>Latitude</label><br />
                      <input type="text" value={items.Lat} onChange={(e) => setItems({ ...items, Lat: e.target.value })}  />
                    </div>
                    <div>
                      <label>Longitude</label><br />
                      <input type="text" value={items.Lng} onChange={(e) => setItems({ ...items, Lng: e.target.value })}  />
                    </div> */}
                    <div>
                      <label>Start Date</label><br />
                      <input type="date" value={newItem.StartDate}
                        onChange={(e) => setNewItem({ ...newItem, StartDate: e.target.value })} />
                    </div>
                    <div>
                      <label>End Date</label><br />
                      <input type="date" value={newItem.EndDate}
                        onChange={(e) => setNewItem({ ...newItem, EndDate: e.target.value })} />
                    </div>
                  </div>
                  <button className={styles.save}>Save</button>
                </form>
              </div>
              <button
                onClick={closeLoginModal}
                className={styles.close_button}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
