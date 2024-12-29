import React from "react";
import styleadmin from '../admin.module.css';
import Navbar from "../adminnavbar"; // Assuming Navbar is separate
import Leftbar from "../Manu";
import { FaEdit,FaSearch  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function Categorylist(){
    return(
        <>
        
        <div className={ styleadmin.display}>
         <Leftbar />
        <div >
        <Navbar />
        <h1 style={{textAlign:'center',fontSize:'35px'}}>category <span style={{color:"red"}}>list</span></h1>
        <div className={styleadmin.add_search_box}>
        <div className={ styleadmin.categorylist_search}>
            <input placeholder="Search....."/><button><FaSearch /></button>
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
            <tr>
              <td>1</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td><FaEdit />&nbsp;   <MdDelete /></td>
              </tr>
  
            </table>
        </div>

        <h1 style={{textAlign:'center',fontSize:'35px'}}>Subcategory <span style={{color:"red"}}>list</span></h1>
          
        <div className={styleadmin.categorylist_search}>
            <input placeholder="Search....."/><button><FaSearch /></button>
        </div>
        {/* <div className="categorylist_add">
        <button>Add subcategory</button>
        </div> */}
        <div className={styleadmin.categorylist}>
         
           <table>
             <tr>
               <th>ID</th>
               <th>Category Name</th>
               <th>Type</th>
               <th>Action</th>
             </tr>
            <tr>
              <td>1</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td><FaEdit />&nbsp;   <MdDelete /></td>
              </tr>
  
            </table>
        </div>

        </div>
        </div>
        </>
    )
}