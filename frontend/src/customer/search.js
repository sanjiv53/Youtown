import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import axios from 'axios';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaRegBuilding, FaRupeeSign } from "react-icons/fa";

export default function Search() {
  const [Business, setBusiness] = useState([]);
  const [Product, setProduct] = useState([]);
  const [Job, setJob] = useState([]);
  const [Property, setProperty] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);

  const filteredLogin = Business.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredproduct = Product.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredjob = Job.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredproperty = Property.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // ------------------------get  business----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getbusinessfrontend')
      .then(response => {
        setBusiness(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // ------------------------get product----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getproductfrontend')
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // ------------------------get job----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getjobfrontend')
      .then(response => {
        setJob(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ------------------------get property----------------------
  useEffect(() => {
    axios.get('http://localhost:5000/getpropertyfrontend')
      .then(response => {
        setProperty(response.data);
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
  //-----------------------------------product details---------------------------
  const handleProductDetails = (product) => {
    setEditingItem(product._id);
    navigate('/productdetails', { state: { product } });
  };
  //-----------------------------------property details---------------------------
  const handlePropertyDetails = (property) => {
    setEditingItem(property._id);
    navigate('/propertydetails', { state: { property } });
  };
  //-----------------------------------job details---------------------------
  const handleJobDetails = (job) => {
    setEditingItem(job._id);
    navigate('/jobdetails', { state: { job } });
  };
  return (
    <>
      <Nav />
      <div className={styletwo.search}>

        <div className={styletwo.business}>
          {filteredLogin.map((Business) => (
            <div className={styletwo.businessbox}>
              <div>
                <img src={`http://localhost:5000/image/${Business.logo}`} />
              </div>
              <div className={styletwo.businessdetails}>
                <a onClick={() => { handleDetails(Business) }} style={{ cursor: 'pointer' }}> <h3>{Business.name}</h3></a>
                <h4><IoIosTime style={{ color: 'red' }} />&nbsp;{Business.open}-{Business.close}</h4>
                <h4><FaLocationDot style={{ color: 'red' }} />&nbsp;{Business.City}</h4>
                <h4><FaPhone style={{ color: 'red' }} />&nbsp; {Business.phone1}</h4>
              </div>
            </div>
          ))}

          {/*----Product box-------- */}
          <div className={styletwo.product}>
            {filteredproduct.map((product) => (
              <div className={styletwo.productbox}>
                <div>
                  <img src={`http://localhost:5000/image/${product.imagePath}`} />
                </div>
                <div className={styletwo.productdetails}>
                  <a onClick={() => { handleProductDetails(product) }} style={{ cursor: 'pointer' }}><h3>{product.name}</h3></a>
                  <h4><FaPhone style={{ color: 'red' }} /> {product.Vendor?.phone1}</h4>
                  <h4><FaLocationDot style={{ color: 'red' }} />  {product.Vendor?.City}</h4>
                  <button><FaRupeeSign />{product.price}</button>
                </div>
              </div>
            ))}
          </div>

          {/*----Job box-------- */}
          <div className={styletwo.Job}>
            {filteredjob.map((job) => (
              <div className={styletwo.Jobbox} style={{ marginBottom: '15px' }}>
                <div >
                  <img src={`http://localhost:5000/image/${job.Vendor.logo}`} className={styletwo.img} />
                </div>
                <div className={styletwo.jobimg}>
                  <img src={`http://localhost:5000/image/${job.Vendor.logo}`} />
                </div>
                <div className={styletwo.Jobdetails}>
                  <a onClick={() => { handleJobDetails(job) }}> <h3>{job.name}</h3></a>
                  <h4><FaLocationDot style={{ color: 'red' }} /> {job.City}</h4>
                  <h4><FaPhone style={{ color: 'red' }} /> {job.phone1},{job.phone2}</h4>
                  <h4><MdEmail style={{ color: 'red' }} /> {job.email}</h4>
                  <h4><FaRegBuilding style={{ color: 'red' }} /> {job.Vendor.Businessname}</h4>
                  <h2><FaRupeeSign style={{ color: 'red' }} /> {job.OfferedSalarymin}-{job.OfferedSalaryMAX}</h2>
                </div>
              </div>
            ))}
          </div>

          {/*----property box-------- */}
          <div className={styletwo.Property}>
            {filteredproperty.map((property) => (
              <div className={styletwo.Propertybox}>
                <div >
                  <img src={`http://localhost:5000/image/${property.imagePath}`} className={styletwo.img} />
                </div>
                <div className={styletwo.Propertydetails}>
                  <a onClick={() => { handlePropertyDetails(property) }}>  <h3>{property.name}</h3></a>
                  <h4><FaLocationDot style={{ color: 'red' }} /> {property.Vendor.City}</h4>
                  <h4><FaPhone style={{ color: 'red' }} /> {property.Vendor.phone1}</h4>
                  <h4><MdEmail style={{ color: 'red' }} /> {property.Vendor.email}</h4>

                  <h4><FaRupeeSign style={{ color: 'red' }} />{property.price}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Fooder />
    </>
  );

};


