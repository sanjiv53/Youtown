import React, { useState, useEffect } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { FaRegKeyboard, FaSearch, FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sale() {
    const [Product, setProduct] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryLocation, setSearchQueryLocation] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    // ------------------------get product----------------------
    useEffect(() => {
        axios.get(`${apiUrl}/getproductfrontend`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    //-----------------------------------product details---------------------------
    const handleProductDetails = (product) => {
        setEditingItem(product._id);
        navigate('/productdetails', { state: { product } });
    };
    //  --------------------------search--------------------------
    const filteredBusinesses = Product.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(searchQueryLocation.toLowerCase()))
    );

    const settings = {
        // dots: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                // When the screen width is less than 1024px (tablet and smaller screens)
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,  // Show 3 slides
                    slidesToScroll: 2 // Scroll 2 slides
                }
            },
            {
                // When the screen width is less than 768px (mobile screens)
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,  // Show 2 slides
                    slidesToScroll: 1  // Scroll 1 slide
                }
            },
            {
                // When the screen width is less than 480px (very small mobile screens)
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,  // Show 1 slide
                    slidesToScroll: 1  // Scroll 1 slide
                }
            }
        ]
    };
    return (
        <>
            <Nav />
            <div>
                {/* ------------search----------------- */}
                <div className={styletwo.searchbox}>
                    <div className={styletwo.searchboxbusiness} >
                        <div>
                             <FaRegKeyboard className={styletwo.i} />
                            <input value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
                       </div>
                        <button><FaSearch /></button>
                    </div>
                </div>
                {/* ------------------search end------------------- */}
                {/* --------------slider------------------- */}
                <div className={styletwo.slider_container}>
                    <Slider {...settings}>
                        {Product.map((product) => (
                            <div className={styletwo.product_box_page}>
                                <div>
                                    <img src={`${apiUrl}/image/${product.imagePath}`} />
                                </div>
                                <div className={styletwo.product_details_page}>
                                    <a onClick={() => { handleProductDetails(product) }} style={{ cursor: 'pointer' }}><h3>{product.name}</h3></a>
                                    <h4><FaPhone style={{ color: 'red' }} /> {product.Vendor?.phone1}</h4>
                                    <h4><FaLocationDot style={{ color: 'red' }} />  {product.Vendor?.City}</h4>
                                    <button><FaRupeeSign />{product.price}</button>
                                </div>
                            </div>
                        ))}
                       
                    </Slider>
                </div>
                {/* --------------slider end---------------------- */}
                {/*-------------------- product---------------- */}
                <div className={styletwo.product_page}>
                    {filteredBusinesses.map((product) => (
                        <div className={styletwo.product_box_page}>
                            <div>
                                <img src={`${apiUrl}/image/${product.imagePath}`} />
                            </div>
                            <div className={styletwo.product_details_page}>
                                <a onClick={() => { handleProductDetails(product) }} style={{ cursor: 'pointer' }}><h3>{product.name}</h3></a>
                                <h4><FaPhone style={{ color: 'red' }} /> {product.Vendor?.phone1}</h4>
                                <h4><FaLocationDot style={{ color: 'red' }} />  {product.Vendor?.City}</h4>
                                <button><FaRupeeSign />{product.price}</button>
                            </div>
                        </div>
                    ))}


                    {/*-------------end product-----------  */}
                </div>
            </div>
            <Fooder />
        </>
    )
}