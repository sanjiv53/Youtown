import React, { useState, useEffect } from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import imgone from './img/pexels-mirrographer-1194025.jpg';
import { TbWorldWww } from "react-icons/tb";
import { FaLocationDot, FaMosque } from "react-icons/fa6";
import { FaRegKeyboard, FaSearch, FaRupeeSign } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Job() {

    const [Job, setJob] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryLocation, setSearchQueryLocation] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    // ------------------------get job----------------------
    useEffect(() => {
        axios.get(`${apiUrl}/getjobfrontend`)
            .then(response => {
                setJob(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    //-----------------------------------job details---------------------------
    const handleJobDetails = (job) => {
        setEditingItem(job._id);
        navigate('/jobdetails', { state: { job } });
    };
    //  --------------------------search--------------------------
    const filteredBusinesses = Job.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(searchQueryLocation.toLowerCase()))
    );
    return (
        <>
            <Nav />
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

            {/* ------------job----------------- */}
            <div className={styletwo.job_page}>
            {filteredBusinesses.map((job)=>(
                <div className={styletwo.job_page_name}>
                    <div className={styletwo.job_page_img}>
                        <div>
                            <img src={`${apiUrl}/image/${job.Vendor.logo}`} />
                        </div>
                        <div className={styletwo.job_page_img_details}>
                        <a onClick={()=>{handleJobDetails(job)}}>  <h3>HIRING  <button>{job.name}</button></h3></a>
                        <a onClick={()=>{handleJobDetails(job)}}><h3>{job.name}</h3></a>
                            <p><FaLocationDot style={{ color: 'red' }} /> {job.Address}</p>
                            <p><TbWorldWww style={{ color: 'red' }} /> {job.Website}</p>
                            <h2><FaRupeeSign />{job.OfferedSalarymin}-<FaRupeeSign />{job.OfferedSalaryMAX}</h2>
                        </div>

                    </div>
                    <div className={styletwo.jobdetails}>
                        <div className={styletwo.job_page_role}>
                            <button>{job.name}</button>
                            <button>{job.Jobtype}</button>
                            <button>{job.Experience}  </button>
                        </div>
                        <div className={styletwo.job_page_apply}>
                        <a onClick={()=>{handleJobDetails(job)}}><button>Apply Job</button></a>
                            <a onClick={()=>{handleJobDetails(job)}}><button>Job Details</button></a>
                        </div>
                    </div>
                </div>
                 ))}
                
                
            </div>
            {/* ---------------job end----------- */}
            <Fooder />
        </>
    )
}