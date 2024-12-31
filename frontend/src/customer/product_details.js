import React,{ useEffect, useState} from "react";
import styletwo from './App.module.css';
import Nav from './Navbar'; 
import Fooder from './Footer'; 
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { FaLocationDot, FaPhone,FaBuilding, } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { useNavigate,useLocation } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";  // Import Slider from react-slick

export default function Productdetails() {
 const navigate = useNavigate();
  const location = useLocation();
   const [Products, setProducts] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
  const itemToEdit = location.state?.product || {};
  const { Lat, Lng } = itemToEdit.Vendor;
  const apiUrl = process.env.REACT_APP_API_URL;
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

 // ---------------------------------------------get product-------------------------------
 useEffect(() => {
    if (itemToEdit?.Vendor) {
  
      fetch(`${apiUrl}/getbusinessproduct?name=${itemToEdit.Vendor._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check if `Vendor` and `City` exist here
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
    }
  }, [itemToEdit]);
  //-----------------------------------product details---------------------------
const handleProductDetails = (product) => {
  setEditingItem(product._id); 
  navigate('/productdetails', { state: {product} });  
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
                <img src={`${apiUrl}/image/${itemToEdit.imagePath}`} alt="Product 1" />
              </div>
              <div>
                <img src={`${apiUrl}/image/${itemToEdit.imagePath}`} alt="Product 2" />
              </div>
              <div>
                <img src={`${apiUrl}/image/${itemToEdit.imagePath}`} alt="Product 3" />
              </div>
              <div>
                <img src={`${apiUrl}/image/${itemToEdit.imagePath}`} alt="Product 3" />
              </div>
            </Slider>
          </div>
          </div>
          <div className={styletwo.product_about}>
            <h3>{itemToEdit.name}</h3>
            <h3  style={{ color: 'red' }}>&#8377; {itemToEdit.price}</h3>
            <p dangerouslySetInnerHTML={{ __html: itemToEdit.description }}></p>
            <h5>Seller Type: {itemToEdit.order}</h5>
            <h5 > Posted: {new Date(itemToEdit.createdAt).toLocaleDateString()}</h5>
           
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
              <img src={`${apiUrl}/image/${itemToEdit.Vendor.userImage}`} alt="Contact" />
            </div>
            <div>
              <h4><FaBuilding style={{ color: 'red' }} />{itemToEdit.Vendor.Businessname}</h4>
                        
            </div>
            <div>
              <h4><MdEmail style={{ color: 'red' }} />{itemToEdit.Vendor.email}</h4>
            </div>
            <div>
              <h4><FaPhone style={{ color: 'red' }} />{itemToEdit.Vendor.phone1},<br/>{itemToEdit.Vendor.phone2} </h4>
            </div>
            <div>
              <h4><FaLocationDot style={{ color: 'red' }} /> {itemToEdit.Vendor.Address}</h4>
              
            </div>
            <div>
              <h4><TbWorldWww style={{ color: 'red' }}/> {itemToEdit.Vendor.Website}</h4>
              
            </div>
            
          </div>
        </div>

   <h1 style={{ textAlign: 'center' }}>Product <span style={{ color: 'red' }}> Sale </span></h1>
   
        <div className={styletwo.product} style={{marginBottom:10}}>
        {Products.map((product) => (
          <div className={styletwo.productbox}>
            <div>
              <img src={`${apiUrl}/image/${product.imagePath}`} alt="Sale Product 1" />
            </div>
            <div className={styletwo.productdetails}>
            <a onClick={()=>{handleProductDetails(product)}} style={{cursor:'pointer'}}><h3>{product.name}</h3></a>
              <h4><FaPhone style={{color:'red'}} /> {product.Vendor?.phone1}</h4>
              <h4><FaLocationDot style={{ color: 'red' }} />{product.Vendor?.City}</h4>
              <button><FaRupeeSign />{product.price}</button>
            </div>
          </div>
        ))}
         
        </div>

      </div>
      <Fooder />
    </>
  );
}
