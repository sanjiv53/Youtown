import React from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { FaLocationDot, FaPhone, FaBuilding, } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { IoTime } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";  // Import Slider from react-slick

export default function Details() {
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;
  const itemToEdit = location.state?.Business || {};
  const { Lat, Lng } = itemToEdit;

  // Replace 'YOUR_API_KEY' with your actual Google Maps API Key
  const apiKey = 'AIzaSyCz2meywgHm9S7PXA29clmCAQa-JDWoRtA';
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${Lat},${Lng}&zoom=14`;
  // Slick Slider settings
  const settings = {
    infinite: true,        // Enable infinite scrolling
    speed: 500,            // Transition speed
    slidesToShow: 1,       // Number of slides to show at once
    slidesToScroll: 1,     // Number of slides to scroll at a time
    autoplay: true,        // Auto slide
    autoplaySpeed: 3000,   // Auto slide speed
    dots: true,            // Show dots for navigation
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

        <h1 style={{ textAlign: 'center' }}>Business <span style={{ color: 'red' }}> Open </span>Time</h1>
        <div className={styletwo.busines_open_time}>
          <div >
            <h4><IoTime style={{ color: 'red' }} />Monday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Tuesday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Wednesday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Thursday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
            <h4><IoTime style={{ color: 'red' }} />Friday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
         </div>
        </div>

        <h1 style={{ textAlign: 'center' }}>Product <span style={{ color: 'red' }}> Sale </span></h1>
        <div className={styletwo.product} style={{ marginBottom: 10 }}>
          <div className={styletwo.productbox}>
            <div>
              <img src={imgone} alt="Sale Product 1" />
            </div>
            <div className={styletwo.productdetails}>
              <h3>Name</h3>
              <h4><IoIosTime style={{ color: 'red' }} /> Time</h4>
              <h4><FaLocationDot style={{ color: 'red' }} /> Location</h4>
              <button><FaRupeeSign />200</button>
            </div>
          </div>
          <div className={styletwo.productbox}>
            <div>
              <img src={imgone} alt="Sale Product 2" />
            </div>
            <div className={styletwo.productdetails}>
              <h3>Name</h3>
              <h4><IoIosTime style={{ color: 'red' }} /> Time</h4>
              <h4><FaLocationDot style={{ color: 'red' }} /> Location</h4>
              <button><FaRupeeSign />200</button>
            </div>
          </div>
        </div>

      </div>
      <Fooder />
    </>
  );
}
