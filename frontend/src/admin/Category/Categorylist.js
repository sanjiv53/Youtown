import React,{useEffect,useState} from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { FaEdit,FaSearch  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer } from 'react-notifications';

export default function Categorylist(){
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchcategoryQuery, setSearchcategoryQuery] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  // ------------------------get category----------------------
  useEffect(() => {
    axios.get(`${apiUrl}/getcatgory`)
      .then(response => {
        setCategory(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    // ------------------------get subcategory----------------------
    useEffect(() => {
      axios.get(`${apiUrl}/getsubcatgory`)
        .then(response => {
          setSubCategory(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
     // ----------------------------category Edit------------------------------
  const handleEdit = (Category) => {
    setEditingItem(Category._id);
    navigate('/adminCategoryEdit', { state: { Category } });
  };
       // ----------------------------subcategory Edit------------------------------
       const handleSubEdit = (Category) => {
        setEditingItem(Category._id);
        navigate('/adminSubCategoryEdit', { state: { Category } });
      };
  //------------------------------------category remove------------------------
const handleRemove = (id) => {
  axios.delete(`${apiUrl}/categoryDelet/${id}`)
    .then(() => {
      setCategory(Category.filter(Category => Category._id !== id));
      NotificationManager.success('Delet category successfully', 'Success');
      navigate('/categorylist');
    })
    .catch(error => {
      NotificationManager.error('Error Delet', 'Error');
      console.error('Error deleting item:', error);
    });
};
 //------------------------------------category remove------------------------
 const handleSubcategoryRemove = (id) => {
  axios.delete(`${apiUrl}/subcategoryDelet/${id}`)
    .then(() => {
      setSubCategory(Category.filter(Category => Category._id !== id));
      NotificationManager.success('Delet category successfully', 'Success');
      navigate('/categorylist');
    })
    .catch(error => {
      NotificationManager.error('Error Delet', 'Error');
      console.error('Error deleting item:', error);
    });
};
  //  --------------------------search--------------------------
const filteredLogin = Category.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
);
  //  --------------------------search--------------------------
  const filteredSubcategory = SubCategory.filter(item => 
    item.name.toLowerCase().includes(searchcategoryQuery.toLowerCase()) 
  );
    return(
        <>
        
        <div className={ styleadmin.display}>
         <Leftbar />
        <div >
        <Navbar />
          <NotificationContainer />
        <h1 style={{textAlign:'center',fontSize:'35px'}}>category <span style={{color:"red"}}>list</span></h1>
        <div className={styleadmin.add_search_box}>
        <div className={ styleadmin.categorylist_search}>
            <input placeholder="Search....."value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/><button><FaSearch /></button>
        </div>
        <div className={styleadmin.categorylist_add}>
       <a href="/categoryadmin"><button>Add category</button></a> 
        </div>
        </div>
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Category Name</th>
               <th>Type</th>
               <th>Action</th>
             </tr>
             {filteredLogin.map((Category,index) => (
            <tr>
              <td>{index+1}</td>
              <td>{Category.name}</td>
              <td>{Category.type}</td>
              <td><FaEdit onClick={() => { handleEdit(Category) }} style={{ cursor: 'pointer' }}/>&nbsp;   <MdDelete onClick={() => {  handleRemove(Category._id) }} style={{ cursor: 'pointer' }} /></td>
              </tr>
               ))} 
            </table>
        </div>

        <h1 style={{textAlign:'center',fontSize:'35px'}}>Subcategory <span style={{color:"red"}}>list</span></h1>
          
        <div className={styleadmin.categorylist_search}>
            <input placeholder="Search....." value={searchcategoryQuery}
                onChange={(e) => setSearchcategoryQuery(e.target.value)}/><button><FaSearch /></button>
        </div>
        
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Category Name</th>
               <th>Type</th>
               <th>Action</th>
             </tr>
             {filteredSubcategory.map((Category,index) => (
            <tr>
              <td>{index+1}</td>
              <td>{Category.name}</td>
              <td>{Category.type}</td>
              <td><FaEdit onClick={() => { handleSubEdit(Category) }} style={{ cursor: 'pointer' }}/>&nbsp;   <MdDelete onClick={() => {  handleSubcategoryRemove(Category._id) }} style={{ cursor: 'pointer' }} /></td>
              </tr>
               ))} 
  
            </table>
        </div>

        </div>
        </div>
        </>
    )
}