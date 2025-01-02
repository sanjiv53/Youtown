import React , { useState, useEffect }from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import styletwo from './App.module.css';
import Nav from './Navbar'; 
import Fooder from './Footer';   
import imgone from './img/pexels-mirrographer-1194025.jpg';
import bannerone from './img/banner/1.jpg';
import bannertwo from './img/banner/2.jpg';
import bannerthree from './img/banner/3.jpg';
import bannerfover from './img/banner/4.jpg';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot,FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaRegBuilding,FaRupeeSign  } from "react-icons/fa";
import business from './img/category/meeting.png';
import job from './img/category/job_3850285.png';
import product from './img/category/discount_10116079.png';
import property from './img/category/house_8858068.png';
import directory from './img/category/pamphlet.png';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'; 

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const sliderImageUrl = [
    {
      url: bannerone// Using the imported image
    },
    {
      url:bannertwo
       
    },
    {
      url:bannerthree
    },
    {
      url:bannerfover
    }
  ];
 function Home(){
  const apiUrl = process.env.REACT_APP_API_URL;

   const [Business, setBusiness] = useState([]);
   const [Product, setProduct] = useState([]);
   const[Job,setJob]=useState([]);
   const[Property,setProperty]=useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();
   const [editingItem, setEditingItem] = useState(null);
   
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

 // ------------------------get property----------------------
 useEffect(() => {
  axios.get(`${apiUrl}/getpropertyfrontend`)
    .then(response => {
      setProperty(response.data); 
      console.log(response.data); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
  //  --------------------------search--------------------------
const filteredLogin = Business.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);

//-----------------------------------business details---------------------------
const handleDetails = (Business) => {
  setEditingItem(Business._id); 
  navigate('/details', { state: {Business} });  
};
//-----------------------------------product details---------------------------
const handleProductDetails = (product) => {
  setEditingItem(product._id); 
  navigate('/productdetails', { state: {product} });  
};
//-----------------------------------property details---------------------------
const handlePropertyDetails = (property) => {
  setEditingItem(property._id); 
  navigate('/propertydetails', { state: {property} });  
};
//-----------------------------------job details---------------------------
const handleJobDetails = (job) => {
  setEditingItem(job._id); 
  navigate('/jobdetails', { state: {job} });  
};
    return(
        <>
       <Nav /> 
      
        <div className={styletwo.category}>
            <div className={styletwo.Categorybox}>
            <a href="/business"><img src={business}/>
                <h1>Business</h1></a>
            </div>
            <div className={styletwo .Categorybox}>
            <a href="/job"> <img src={job}/>
                <h1>Job</h1></a>
            </div>
            <div className={styletwo.Categorybox}>
            <a href="/sale"><img src={product}/>
            <h1>Shoping</h1></a>
            </div>
            <div className={styletwo.Categorybox}>
            <a href="/property"><img src={property}/>
               <h1>Property</h1></a>
            </div>
            <div className={styletwo.Categorybox}>
            <a href="/Directory"> <img src={directory }/>
              <h1>Local Directory</h1></a> 
            </div>
        </div>
     
   
            {/*----Business box-------- */}
                 <h1 style={{textAlign:'center',margin:'10px'}}> Featured <span style={{color:'red'}}> Businesses </span></h1>
        <div className={styletwo.business}>
        {filteredLogin.map((Business,index) => (
            <div className={styletwo.businessbox}>
                <div>
                    <img src={`${apiUrl}/image/${Business.logo}`}/>
                </div>
                <div className={styletwo.businessdetails}>
                   <a onClick={()=>{handleDetails(Business)}} style={{cursor:'pointer'}}> <h3>{Business.name}</h3></a>
                    <h4><IoIosTime style={{color:'red'}}/>&nbsp;{Business.open}-{Business.close}</h4>
                    <h4><FaLocationDot style={{color:'red'}} />&nbsp;{Business.City}</h4>
                    <h4><FaPhone style={{color:'red'}} />&nbsp; {Business.phone1}</h4>
                </div>
            </div>
               ))}
        </div>
       {/*----Business box end-------- */}
         {/*----Product box-------- */}
         <h1 style={{textAlign:'center',margin:'10px'}}>Product <span style={{color:'red'}}> Sale </span></h1>
        <div className={styletwo.product}>
          {Product.map((product) => (
            <div className={styletwo.productbox}>
                <div>
                    <img src={`${apiUrl}/image/${product.imagePath}`}/>
                </div>
                <div className={styletwo.productdetails}>
                <a onClick={()=>{handleProductDetails(product)}} style={{cursor:'pointer'}}><h3>{product.name}</h3></a>
                    <h4><FaPhone style={{color:'red'}} /> {product.Vendor?.phone1}</h4>
                    <h4><FaLocationDot style={{color:'red'}} />  {product.Vendor?.City}</h4>
                    <button><FaRupeeSign />{product.price}</button>
                </div>
            </div>
              ))}
          </div>
          {/*----Product box end-------- */}
   
           {/*----job box-------- */}
           <h1 style={{textAlign:'center',margin:'10px'}}>Job <span style={{color:'red'}}> Vacancies </span></h1>
        <div className={styletwo.Job}>
          {Job.map((job)=>(
          
            <div className={styletwo.Jobbox}style={{ marginBottom: '15px' }}>
                <div >
                    <img src={`${apiUrl}/image/${job.Vendor.logo}`} className={styletwo.img}/>
                </div>
                <div className={styletwo.jobimg}>
                    <img src={`${apiUrl}/image/${job.Vendor.logo}`}/>
                </div>
                <div className={styletwo.Jobdetails}>
                <a onClick={()=>{handleJobDetails(job)}}> <h3>{job.name}</h3></a>
                    <h4><FaLocationDot style={{color:'red'}} /> {job.City}</h4>
                    <h4><FaPhone style={{color:'red'}} /> {job.phone1},{job.phone2}</h4>
                    <h4><MdEmail style={{color:'red'}}/> {job.email}</h4>
                    <h4><FaRegBuilding style={{color:'red'}}/> {job.Vendor.Businessname}</h4>
                    <h2><FaRupeeSign style={{color:'red'}}/> {job.OfferedSalarymin}-{job.OfferedSalaryMAX}</h2>
                </div>
            </div>
                  ))}
         </div>
           {/*----job box end-------- */}
           {/* ----------carousel banner------------ */}

   <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
          
            <div className={styletwo.slider} key={index}>
              <img src={imageUrl.url} alt="movie" />
            </div>
          
          );
        })}
      </Carousel>
          {/*----Local Property box-------- */}
          <h1 style={{textAlign:'center',margin:'10px'}}>Local <span style={{color:'red'}}>Property  </span></h1>
        <div className={styletwo.Property}>
          {Property.map((property)=>(
             <div className={styletwo.Propertybox}>
                <div >
                    <img src={`${apiUrl}/image/${property.imagePath}`} className={styletwo.img}/>
                </div>
                
                <div className={styletwo.Propertydetails}>
                <a onClick={()=>{handlePropertyDetails(property)}}>  <h3>{property.name}</h3></a>
                    <h4><FaLocationDot style={{color:'red'}} /> {property.Vendor.City}</h4>
                    <h4><FaPhone style={{color:'red'}} /> {property.Vendor.phone1}</h4>
                    <h4><MdEmail style={{color:'red'}}/> {property.Vendor.email}</h4>
                 
                    <h4><FaRupeeSign style={{color:'red'}}/>{property.price}</h4>
                </div>
            </div>
                  ))}
        </div>
        
          {/*----Local Property box end-------- */}
          <Fooder />
        </>
    )
       
   
}
export default Home;