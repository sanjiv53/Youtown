import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Nav from './Navbar';   // Assuming Navbar is in a separate file
import Home from './customer/Home';
import Details from './customer/Details';
import JobDetails from './customer/jobDetails';
import Business from './customer/Business';
import Directory from './customer/Directory';
import Sale from './customer/Sale';
import Property from './customer/Property';
import Job from './customer/Job';
import Category from './customer/Category';
import Sign from './customer/Sign';
import SignBusiness from './customer/SignBusiness';
import ProductDetails from './customer/product_details';
import PropertyDetails from './customer/property_details';
import DirectoryDetails from './customer/Directory_details';
import Terms from './customer/TermsandCondition';
import SearchAll from './customer/search';

import Businesshome from './business/Busineshome' ;
import Businessprofile from './business/profile';
import BusinessProduct from './business/product/product';
import BusinessJob from './business/job/job';
import Businessproperty from './business/property/property';
import AppliedBusiness from './business/Applied Candidates';
import PlanBusiness from './business/upgrade plan';
import BusinessProductAdd from './business/product/productAdd';
import BusinessProductEdit from './business/product/productEdit';
import BusinessPropertyEdit from './business/property/propertyEdit';
import BusinessJobEdit from './business/job/jobEdit';
import Dashborad from './business/Dashboard';
import PhonePePayment from './business/Paymeant';
import PaymentResponse from './business/paymeantResponse';

import Admin from './admin/Dashboard';
import CategoryAdmin from './admin/Category/Category';
import Categorylist from './admin/Category/Categorylist';
import Productlist from './admin/product/Product';
import Propertylist from './admin/property/property';
import ProductAdd from './admin/product/productadd';
import AdminBusiness from './admin/business/business';
import BusinessAdd from './admin/business/Businessadd';
import DirectoryAdmin from './admin/Directory/DirectoryAdmin';
import DirectoryAdd from './admin/Directory/Directoryadd';
import AdminDetails from './admin/login/Adminse';
import AdminLogin from './admin/login/AdminLogin';
import AdminSign from './admin/login/AdminSign';
import AdminProperty from './admin/property/propertyAdd';
import AdminProductEdit from'./admin/product/Product_Edit';
import AdminPropertyEdit from './admin/property/Property_Edit';
import AdminBusinessEdit from './admin/business/Business_Edit';
import AdminDirectoryEdit from './admin/Directory/DirectoryEdit';
import AdminLoginEdit from './admin/login/adminloginEdit';
import AdmincategoryEdit from './admin/Category/CategoryEdit';
import AdminsubcategoryEdit from './admin/Category/subcategoryEdit';

function App() {
  return (
    <>
    <Router> {/* This is the single Router for your entire app */}
      {/* Nav is inside the Router */}
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/propertydetails" element={<PropertyDetails />} />
        <Route path="/jobdetails" element={<JobDetails />} />
        <Route path="/Directorydetails" element={<DirectoryDetails />} />
        <Route path="/business" element={<Business />} />
        <Route path="/Directory" element={<Directory />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/property" element={<Property />} />
        <Route path="/job" element={<Job />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/SignBusiness" element={<SignBusiness />} />
        <Route path='/Terms' element={<Terms />}/>
        <Route path='/search-results' element={<SearchAll/>} />
        {/* Add other routes as needed */}
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path='/Adminhome' element={<Admin />}/>
        <Route path="/categoryadmin" element={< CategoryAdmin />} />
        <Route path='/categorylist' element={<Categorylist />}/>
        <Route path='/Productlist' element={<Productlist />}/>
        <Route path='/propertylist' element={<Propertylist/>}/>
        <Route path='/Product' element={<ProductAdd />}/>
        <Route path='/adminbusiness' element={<AdminBusiness />}/>
        <Route path='/adminbusinessAdd' element={<BusinessAdd />}/>
        <Route path='/adminDirectory' element={<DirectoryAdmin />}/>
        <Route path='/adminDirectoryAdd' element={<DirectoryAdd />}/>
        <Route path='/Admindetails' element={<AdminDetails />}/>
        <Route path ='/Adminsign' element={<AdminSign />}/>
        <Route path='/adminproperty' element={<AdminProperty />}/>
        <Route path='/AdminProductEdit' element={<AdminProductEdit />}/>
        <Route path='/adminPropertyEdit' element={<AdminPropertyEdit />}/>
        <Route path='/adminBusinessEdit' element={< AdminBusinessEdit />}/>
        <Route path='/adminDirectoryEdit' element={<AdminDirectoryEdit />}/>
        <Route path='/adminLoginEdit' element={<AdminLoginEdit />}/>
        <Route path='/adminCategoryEdit' element={<AdmincategoryEdit />}/>
        <Route path='/adminSubCategoryEdit' element={<AdminsubcategoryEdit />}/>
        {/* --------BUSINES----------- */}
        <Route path='/businesshome' element={<Businesshome />}/>
        <Route path='/businessprofile' element={<Businessprofile />}/>
        <Route path='/businessproduct' element={<BusinessProduct />} />
        <Route path='/businessjob' element={<BusinessJob />}/>
        <Route path='/businessproperty' element={<Businessproperty />} />
        <Route path='/businessapplied' element={<AppliedBusiness />} />
        <Route path='/businessplan' element={<PlanBusiness />} />
        <Route path='/businessproductadd' element={<BusinessProductAdd />} />
        <Route path='/businessproductEdit' element={<BusinessProductEdit />} />
        <Route path='/businesspropertyEdit' element={<BusinessPropertyEdit />} />
        <Route path='/businessJobsEdit' element={<BusinessJobEdit/>} />
        <Route path='/dashboard' element={<Dashborad />} />
        <Route path="/phonepe" element={<PhonePePayment />} />
        <Route path="/payment-response" element={<PaymentResponse />} />
      </Routes>

    
    </Router>
    
</>

  );
}

export default App;
