import React, {useEffect, useState } from "react";
import styleadmin from './admin.module.css';
import Navbar from "./adminnavbar"; // Assuming Navbar is separate
import Leftbar from "./Manu";
// import { useLocation } from 'react-router-dom'; 

export default function Dashboard() {
 

  return (
    <>
      <div className={styleadmin.display}>
         <Leftbar />
        <div lassName={styleadmin.rightpanel}>
        <Navbar />
        <div>
       
        </div>
        </div>
    </div>
    </>
  );
}
