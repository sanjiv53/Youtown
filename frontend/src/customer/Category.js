import React from "react";
import styletwo from './App.module.css';
import Nav from './Navbar'; 
import Fooder from './Footer'; 
import business from './img/category/meeting.png';
import job from './img/category/job_3850285.png';
import product from './img/category/discount_10116079.png';
import property from './img/category/house_8858068.png';
import directory from './img/category/pamphlet.png';

export default function Category(){
    return(
        <>
        <Nav /> 
         <div className={styletwo.category}>
            <div className={styletwo.Categorybox}>
            <a href="/business"><img src={business}/>
                <h1>Business</h1></a>
            </div>
            <div className={styletwo.Categorybox}>
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
        <Fooder />
        </>
    )
}