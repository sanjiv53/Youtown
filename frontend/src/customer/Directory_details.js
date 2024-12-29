import React, { useEffect, useState } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { FaLocationDot, FaPhone, FaBuilding, } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import Slider from "react-slick";
import axios from 'axios';

export default function Productdetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [Dirctory, setDirctory] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const itemToEdit = location.state?.directory || {};
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

    // ------------------------get directory----------------------
    useEffect(() => {
        axios.get('http://localhost:5000/getdirectoryfrontend')
            .then(response => {
                setDirctory(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    //-----------------------------------job details---------------------------
    const handleDetails = (directory) => {
        setEditingItem(directory._id);
        navigate('/Directorydetails', { state: { directory } });
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
                                    <img src={`http://localhost:5000/image/${itemToEdit.logo}`} alt="Product 1" />
                                </div>
                                <div>
                                    <img src={`http://localhost:5000/image/${itemToEdit.logo}`} alt="Product 2" />
                                </div>
                                <div>
                                    <img src={`http://localhost:5000/image/${itemToEdit.logo}`} alt="Product 3" />
                                </div>
                                <div>
                                    <img src={`http://localhost:5000/image/${itemToEdit.logo}`} alt="Product 3" />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className={styletwo.product_about}>
                        <h3>{itemToEdit.name}</h3>
                        {/* <h3  style={{ color: 'red' }}>&#8377; {itemToEdit.price}</h3> */}
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
                        <h1 style={{ textAlign: 'center' }}><span style={{ color: 'red' }}> Open </span>Time</h1>
                        <div className={styletwo.busines_open_time}>
                            <div >
                                <h4><IoTime style={{ color: 'red' }} />Monday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
                                <h4><IoTime style={{ color: 'red' }} />Tuesday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
                                <h4><IoTime style={{ color: 'red' }} />Wednesday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
                                <h4><IoTime style={{ color: 'red' }} />Thursday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
                                <h4><IoTime style={{ color: 'red' }} />Friday:-{itemToEdit.open}AM - {itemToEdit.close}PM</h4>

                            </div>
                        </div>
                    </div>
                    <div className={styletwo.product_poss}>
                        <h4>Information</h4>
                        <div>
                            <img src={`http://localhost:5000/image/${itemToEdit.logo}`} alt="Contact" />
                        </div>
                        <div>
                            <h4><FaBuilding style={{ color: 'red' }} />Name:{itemToEdit.name}</h4>

                        </div>
                        <div>
                            <h4><MdEmail style={{ color: 'red' }} />Email:{itemToEdit.email}</h4>
                        </div>
                        <div>
                            <h4><FaPhone style={{ color: 'red' }} />Phone:{itemToEdit.phone1},<br />{itemToEdit.phone2} </h4>
                        </div>

                        <div>
                            <h4><FaLocationDot style={{ color: 'red' }} />Address: {itemToEdit.Address}</h4>

                        </div>
                        <div>
                            <h4><IoTime style={{ color: 'red' }} />Time:{itemToEdit.open}AM - {itemToEdit.close}PM</h4>
                        </div>
                    </div>

                </div>

                <h1 style={{ textAlign: 'center' }}>Product <span style={{ color: 'red' }}> Sale </span></h1>

                <div className={styletwo.product} style={{ marginBottom: 10 }}>
                    {Dirctory.map((directory) => (
                        <div className={styletwo.productbox}>
                            <div>
                                <img src={`http://localhost:5000/image/${directory.logo}`} alt="Sale Product 1" />
                            </div>
                            <div className={styletwo.productdetails}>
                                <a onClick={() => { handleDetails(directory) }} style={{ cursor: 'pointer' }}>  <h3>{directory.name}</h3></a>
                                <h4><IoTime style={{ color: 'red' }} /> {directory.open}-{directory.close}</h4>
                                <h4><FaLocationDot style={{ color: 'red' }} /> {directory.Address}</h4>
                                <h4><FaPhone style={{ color: 'red' }} /> {directory.phone1},{directory.phone2}</h4>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
            <Fooder />
        </>
    );
}
