import React from "react";
import styleadmin from './admin.module.css';
import logo from './img/logo-dark.png';
import { CiViewList } from "react-icons/ci";
import { IoMenu,IoHome,IoKeyOutline  } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TiBusinessCard } from "react-icons/ti";
import { BsBank2 } from "react-icons/bs";
import { FaFirstOrder } from "react-icons/fa";
import { BiDirections } from "react-icons/bi";
const Menu = () => {
  return (
    <div>
      <div className={ styleadmin.leftpanel}>
        <div>
            <img src={logo} />
            <ul>
                <li><a href="/Adminhome"><IoHome /> Home</a> </li>
                <li> <a href="/categorylist"><CiViewList /> Category</a> </li>
                <li> <a href="/Productlist"><MdProductionQuantityLimits /> Product </a></li>
                <li><a href="/propertylist"><BsBank2 /> property </a></li>
                <li><FaFirstOrder /> order </li>
                <li><a href="/adminbusiness"><TiBusinessCard /> Business</a></li>
                <li><a href="/adminDirectory"><BiDirections /> Directory</a></li>
                <li><a href="/Admindetails"><IoKeyOutline /> Admin</a></li>
            </ul>
        </div>
       </div>
    </div>
  );
};

export default Menu;
