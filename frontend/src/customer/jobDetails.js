import React, { useEffect, useState } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { FaLocationDot, FaPhone, FaUserTie, FaMoneyBillWave } from "react-icons/fa6";
import { FaTransgenderAlt, FaBuilding, FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import Slider from "react-slick";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function JobDetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const itemToEdit= location.state?.job || {};
  const [resumeFile, setresumeFile] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const profileUrl = "https://example.com/jobdetails";
  const profileTitle = "Check out this profile!";
  const [category, setCategory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    Intrested: '',
    Jobtype: '',
    description: '',
    Experience: '',
    Qualification: '',
    Gender: '',
    Position: '',
    phone: '',
    phone1: '',
    Address: '',
    Vendor:''

  });
  const openApplyModal = () => {
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const Lat = itemToEdit?.Vendor?.Lat || 0; // Default to 0 or another fallback value
const Lng = itemToEdit?.Vendor?.Lng || 0;



  // Replace 'YOUR_API_KEY' with your actual Google Maps API Key
  const apiKey = 'AIzaSyCz2meywgHm9S7PXA29clmCAQa-JDWoRtA';
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${Lat},${Lng}&zoom=14`;


  // Slick Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
  };

  // Handle file change (for image upload)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the file
  };
  const handleFileUserChange = (e) => {
    setresumeFile(e.target.files[0]); // Store the file
 
  };
   useEffect(() => {
      if (itemToEdit) {
        setNewItem((prevItem) => ({ ...prevItem, Vendor: itemToEdit.Vendor._id }));
      }
    }, [itemToEdit]);
  //--------------------------post----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', resumeFile);  
    formData.append('Image',file );
    formData.append(
      'data',
      JSON.stringify({
        name: newItem.name,
        description: newItem.description,
        Intrested: newItem.Intrested,
        Jobtype: newItem.Jobtype,
        Experience: newItem.Experience,
        Qualification: newItem.Qualification,
        Gender: newItem.Gender,
        Position: newItem.Position,
        phone: newItem.phone,
        phone1: newItem.phone1,
        Address: newItem.Address,
        Vendor:newItem.Vendor

      })
    );

    try {
      const response = await axios.post('http://localhost:5000/jobapply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
      NotificationManager.success('Job successfully', 'Success');
      setIsApplyModalOpen(false);
      // navigate('/jobdetails');
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
      <div>
        <h1 style={{ textAlign: 'center' }}>View <span style={{ color: 'red' }}> Details</span></h1>
        <div className={styletwo.product_about_details}>
          <div>
            <div className={styletwo.product_details_img}>
              {/* React Slick Slider */}
              <Slider {...settings}>
                <div>
                  <img src={`http://localhost:5000/image/${itemToEdit.Vendor.logo}`} alt="Product 1" />
                </div>
                <div>
                  <img src={`http://localhost:5000/image/${itemToEdit.Vendor.logo}`} alt="Product 2" />
                </div>
                <div>
                  <img src={`http://localhost:5000/image/${itemToEdit.Vendor.logo}`} alt="Product 3" />
                </div>
                <div>
                  <img src={`http://localhost:5000/image/${itemToEdit.Vendor.logo}`} alt="Product 3" />
                </div>
              </Slider>
            </div>
          </div>
          <div className={styletwo.product_about}>

            <h3>{itemToEdit.name}</h3>
            <p ><FaLocationDot style={{ color: 'red' }} />{itemToEdit.City}</p>
            <p><TbWorldWww style={{ color: 'red' }} />{itemToEdit.Website}  </p>
            <b> ₹{itemToEdit.OfferedSalarymin} - ₹{itemToEdit.OfferedSalaryMAX}/ Month</b>&nbsp;
            &nbsp;  &nbsp;  &nbsp;  &nbsp;<b >Application ends: {new Date(itemToEdit.EndDate).toLocaleDateString()}</b><br />
            <button onClick={openApplyModal}>Apply Now</button>
          </div>
        </div>

        <h1 style={{ textAlign: 'center' }}>ABOUT <span style={{ color: 'red' }}> US</span></h1>
        <div className={styletwo.map_details}>

          <div className={styletwo.job_details}>
            <h3>Job Description:</h3>
            <p dangerouslySetInnerHTML={{ __html: itemToEdit.description }}></p>
            <h3>Share Link</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(profileTitle + " " + profileUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', fontSize: '24px' }}>
                <FaWhatsapp />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1877F2', fontSize: '24px' }}>
                <FaFacebook />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0077B5', fontSize: '24px' }} >
                <FaLinkedin />
              </a>
            </div>
            {/* //---------------------------------------map---------------------------------------- */}
            <div className={styletwo.map_details_map} style={{ marginTop: '20px' }}>
              <h3>Location</h3>
              <iframe
                src={mapSrc}
                width="600"
                height="450"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className={styletwo.job_pass}>
            <h4>Job Information</h4>
            <div>
              <img src={`http://localhost:5000/image/${itemToEdit.Vendor.logo}`} alt="Contact" />
            </div>
            <div>

              <h4><MdDateRange style={{ color: 'red' }} /> Date Posted</h4>
              <p>{new Date(itemToEdit.StartDate).toLocaleDateString()}-{new Date(itemToEdit.EndDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h4><FaLocationDot style={{ color: 'red' }} /> Location</h4>
              <p>{itemToEdit.Address}</p>
            </div>
            <div>
              <h4><FaUserTie style={{ color: 'red' }} />Job Title</h4>
              <p>{itemToEdit.name}</p>
            </div>
            <div>
              <h4><IoIosTime style={{ color: 'red' }} /> Experience</h4>
              <p>{itemToEdit.Experience}</p>
            </div>
            <div>
              <h4><PiBagSimpleFill style={{ color: 'red' }} /> Qualification</h4>
              <p>{itemToEdit.Qualification}</p>
            </div>
            <div>
              <h4><FaTransgenderAlt style={{ color: 'red' }} /> Gender</h4>
              <p>{itemToEdit.Gender}</p>
            </div>
            <div>
              <h4><FaMoneyBillWave style={{ color: 'red' }} /> Salary</h4>
              <p>₹{itemToEdit.OfferedSalarymin} - ₹{itemToEdit.OfferedSalaryMAX}/ Month</p>
            </div>
          </div>

          <div className={styletwo.product_poss}>
            <h4>Company Information</h4>

            <div>
              <img src={`http://localhost:5000/image/${itemToEdit.Vendor.logo}`} alt="Contact" />
            </div>
            <div>
              <h4><FaBuilding style={{ color: 'red' }} /> company</h4>
              <p>{itemToEdit.Vendor.Businessname}</p>
            </div>
            <div>
              <h4><MdEmail style={{ color: 'red' }} /> Email</h4>
              <p>{itemToEdit.Vendor.email}</p>
            </div>
            <div>
              <h4><FaPhone style={{ color: 'red' }} /> Phone</h4>
              <p>{itemToEdit.Vendor.phone1},<br />{itemToEdit.Vendor.phone2}</p>
            </div>
            <div>
              <h4><FaLocationDot style={{ color: 'red' }} /> Location</h4>
              <p>{itemToEdit.Vendor.Address}</p>
            </div>
            <div>
              <h4><TbWorldWww style={{ color: 'red' }} /> Website</h4>
              <p>{itemToEdit.Vendor.Website}</p>
            </div>
          </div>
        </div>

        {isApplyModalOpen && (
          <div className={styletwo.login_modal_overlay} onClick={closeApplyModal}>
            <div className={styletwo.login_modal} onClick={(e) => e.stopPropagation()}>

              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100px' }} />} {/* Preview selected image */}<br />
                    <label>Image</label><br />
                    <input type="file" onChange={handleFileChange} /> <br />
                    <p>User Logo :- Max file size is 1MB, Minimum dimension: 136 x 136 And Suitable files are .jpg & .png</p>
                  </div>
                  <div className={styletwo.papu_form}>

                    <div>
                      <label> Name</label><br />
                      <input value={newItem.name}  // Make sure this is correctly bound
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                         
                    </div>
                    <div>
                      <label>Intrested In</label><br />
                      <select value={newItem.Intrested} onChange={(e) => setNewItem({ ...newItem, Intrested: e.target.value })} >
                        <option value="">Select Type</option>
                        {category.map((category) => (
                          <option key={category.name} value={category.name}>  {category.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label>Job Type</label><br />
                      <select value={newItem.Jobtype}
                        onChange={(e) => setNewItem({ ...newItem, Jobtype: e.target.value })}>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>
                    <div>
                      <label>Experience</label><br />
                      <input type="text" value={newItem.Experience}
                        onChange={(e) => setNewItem({ ...newItem, Experience: e.target.value })} />
                    </div>
                    <div>
                      <label>Qualification</label><br />
                      <input type="text" value={newItem.Qualification}
                        onChange={(e) => setNewItem({ ...newItem, Qualification: e.target.value })} />
                    </div>
                    <div>
                      <label>Job Position</label><br />
                      <input value={newItem.Position}
                        onChange={(e) => setNewItem({ ...newItem, Position: e.target.value })} />
                    </div>
                    <div>
                      <label>Gender *</label><br />
                      <input type="text" value={newItem.Gender}
                        onChange={(e) => setNewItem({ ...newItem, Gender: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label>Covering Letter</label><br />
                    <textarea value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea>
                  </div>
                  <div className={styletwo.papu_form}>
                    <div>
                      <label>Phone 1</label><br />
                      <input type="text" placeholder="phone"
                        value={newItem.phone}
                        onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })} />
                    </div>
                    <div>
                      <label>Phone 2</label><br />
                      <input type="text" placeholder="phone"
                        value={newItem.phone1}
                        onChange={(e) => setNewItem({ ...newItem, phone1: e.target.value })} />
                    </div>
                    <div>
                      <label>Full Address</label><br />
                      <textarea style={{ height: '100px' }} value={newItem.Address} onChange={(e) => setNewItem({ ...newItem, Address: e.target.value })} type="text" placeholder="Enter a location" ></textarea>
                    </div>
                  </div>
                  <div>
                    <label>Resume</label><br />
                    <input type="file" style={{ width: '100%' }}   accept=".pdf,.pptx" onChange={handleFileUserChange} />
                  </div>
                  <button className={styletwo.save}>Save</button>
                </form>
              </div>
              <button onClick={closeApplyModal} className={styletwo.close_button}>Close</button>
            </div>
          </div>
        )}

      </div>
      <Fooder />
    </>
  );
}
