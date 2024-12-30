import React, { useState, useEffect } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { FaLocationDot, FaPhone, FaBuilding, } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";  // Import Slider from react-slick
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
  const location = useLocation();
  const [Business, setBusiness] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const itemToEdit = location.state?.Business || {};
  const { Lat, Lng } = itemToEdit;
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);

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
  // ------------------------get  business----------------------
  useEffect(() => {
    axios.get(`${apiUrl}/getbusinessfrontend`)
      .then(response => {
        setBusiness(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //-----------------------------------business details---------------------------
  const handleDetails = (Business) => {
    setEditingItem(Business._id);
    navigate('/details', { state: { Business } });
  };
  return (
    <>
      <Nav />
      <div>
        <h1 style={{ textAlign: 'center' }}>View <span style={{ color: 'red' }}> Details</span></h1>
        <div className={styletwo.product_about_details}>
          <div>
            <div className={styletwo.product_details_img}>
              {/* React Slick Slider */}
              <Slider {...settings}>
                <div>
                  <img src={`${apiUrl}/image/${itemToEdit.logo}`} alt="Product 1" />
                </div>
                <div>
                  <img src={`${apiUrl}/image/${itemToEdit.logo}`} alt="Product 2" />
                </div>
                <div>
                  <img src={`${apiUrl}/image/${itemToEdit.logo}`} alt="Product 3" />
                </div>
                <div>
                  <img src={`${apiUrl}/image/${itemToEdit.logo}`} alt="Product 3" />
                </div>
              </Slider>
            </div>
          </div>
          <div className={styletwo.product_about}>
            <h3>{itemToEdit.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: itemToEdit.description }}></p>
          </div>
        </div>

        <h1 style={{ textAlign: 'center' }}>ABOUT <span style={{ color: 'red' }}> US</span></h1>
        <div className={styletwo.map_details}>
          <div className={styletwo.map_details_map}>
            <iframe
              src={mapSrc}
              width="600"
              height="450"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>

      <h1 style={{ textAlign: 'center',fontSize:'30px' }}>Business <span style={{ color: 'red' }}> Open </span>Time</h1>
        <div className={styletwo.busines_open_time}>
          <div >
            <h4><IoTime style={{ color: 'red' }} />Monday:- &nbsp;&nbsp;&nbsp;  {itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Tuesday:- &nbsp;&nbsp;&nbsp; {itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Wednesday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Thursday:-&nbsp;&nbsp;  {itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Friday:- &nbsp;&nbsp; &nbsp; &nbsp;  {itemToEdit.open}AM - {itemToEdit.close}PM</h4>
          </div>
        </div>
          </div>
          <div className={styletwo.product_poss}>
            <h4>Company Information</h4>
            <div>
              <img src={`${apiUrl}/image/${itemToEdit.userImage}`} alt="Contact" />
            </div>
            <div>
              <h4><FaBuilding style={{ color: 'red' }} />{itemToEdit.Businessname}</h4>

            </div>
            <div>
              <h4><MdEmail style={{ color: 'red' }} />{itemToEdit.email}</h4>
            </div>
            <div>
              <h4><FaPhone style={{ color: 'red' }} />{itemToEdit.phone1},<br />{itemToEdit.phone2} </h4>
            </div>
            <div>
              <h4><FaLocationDot style={{ color: 'red' }} /> {itemToEdit.Address}</h4>

            </div>
            <div>
              <h4><TbWorldWww style={{ color: 'red' }} /> {itemToEdit.Website}</h4>

            </div>

          </div>
        </div>

      

        <h1 style={{ textAlign: 'center' }}>Featured <span style={{color:'red'}}> Businesses </span></h1>
        <div className={styletwo.business}>
          {Business.map((Business) => (
            <div className={styletwo.businessbox}>
              <div>
                <img src={`${apiUrl}/image/${Business.logo}`} />
              </div>
              <div className={styletwo.businessdetails}>
                <a onClick={() => { handleDetails(Business) }} style={{ cursor: 'pointer' }}> <h3>{Business.name}</h3></a>
                <h4><IoIosTime style={{ color: 'red' }} />&nbsp;{Business.open}-{Business.close}</h4>
                <h4><FaLocationDot style={{ color: 'red' }} />&nbsp;{Business.City}</h4>
                <h4><FaPhone style={{ color: 'red' }} />&nbsp; {Business.phone1}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Fooder />
    </>
  );
}
