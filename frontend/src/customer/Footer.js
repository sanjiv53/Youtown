import React, { useState, useEffect } from "react";
import styletwo from './App.module.css';
import imgone from './img/logo-dark.png';
import { FaLocationDot } from "react-icons/fa6";  
import { IoCall } from "react-icons/io5";  
import { TbWorldWww } from "react-icons/tb";
import play from './img/pngwing.com.png';
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
    // State to track if the user has scrolled down
    const [isScrolled, setIsScrolled] = useState(false);

    // Listen to scroll events
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {  // Show button after 200px scroll
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <div className={styletwo.fooder}>
                <div className={styletwo.fooder_boxone}>
                    <img src={imgone} alt="Logo"/>
                    <h2><FaLocationDot style={{ color: 'red' }}/>Aadhiyan Info Technologies,<br/> street, 24, Kottai 3rd St,<br/>  Aranthangi, Tamil Nadu 614616</h2>
                    <h2><IoCall style={{ color: 'red' }}/> +91 9363637576</h2>
                    <h2><TbWorldWww style={{ color: 'red' }}/> <a href="https://aadhiyanit.com/" style={{ color: 'black' }}>aadhiyanit@gmail.com</a></h2>
                </div>

                <div className={styletwo.fooder_boxone}>
                    <h3>Services</h3>
                    <h2><Link to="/business">Local Business</Link></h2>
                    <h2><Link to="/sale">For Sale</Link></h2>
                    <h2><Link to="/job">Jobs</Link></h2>
                    <h2><Link to="/Terms">Shipping Policy</Link></h2>
                    <h2><Link to="/Terms">Terms and Conditions</Link></h2>
                    <h2><Link to="/Terms">Refund and Cancellation</Link></h2>
                </div>

                <div className={styletwo.fooder_img_box}>
                <a href="https://play.google.com/store/apps/details?id=com.aadhiyaninfotech.youtown&pcampaignid=web_share" style={{ color: 'black' }}> <img src={play} alt="Play Image"/></a>
                    <div className={styletwo.icon}>
                        <a href="https://www.facebook.com/people/YouTown/100094239879735/"><FaFacebook /></a>
                        <a href="https://www.instagram.com/aadhiyan_infotech/#"><FaInstagramSquare /></a>
                        <a href="https://www.youtube.com/watch?v=qAOTDB66mys&t=7s"><FaYoutube /></a>
                        <a href="https://in.linkedin.com/company/aadhiyan-info-tech"><CiLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {isScrolled && (
                <button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    style={{
                        width:'50px',
                        height:'50px',
                        position: 'fixed',
                        bottom: '60px',
                        right: '20px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10%',
                        padding: '10px',
                        cursor: 'pointer',
                        fontSize: '20px'
                    }}
                >
                    ↑
                </button>
            )}
        </>
    );
}
