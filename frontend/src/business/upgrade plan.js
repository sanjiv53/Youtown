import React from "react";
import styles from './business.module.css'; 
import Nav from './Busineshome';
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
export default function Applied(){
    return(
        <>
          <Nav />
          <div>
            <h5 style={{color:'red'}}>Choose Your Plan</h5>
            <h1>Save up to 50%</h1>
            <div className={styles.price_card}>
                <div className={styles.price_box}>
                    <div className={styles.price_box_one}>
                    <b  style={{color:'red'}}>free</b>
                    <p>free business listing</p>
                    <h1>₹0/Monthly</h1>
                    </div>
                    <div  className={styles.price_box_two}>
                    <h4><IoIosCheckmark style={{color:'red'}} />1 Business Listing</h4>
                    <h4 style={{color:'rgb(88, 87, 87)'}}><IoIosClose />Upto 5 Pictures</h4>
                    <h4 style={{color:'rgb(88, 87, 87)'}}><IoIosClose />Get Reviews</h4>
                    <h4 style={{color:'rgb(88, 87, 87)'}}><IoIosClose />Digital Marketing Support</h4>
                    <button>Purchase Now</button>
                    </div>
                </div>
                <div className={styles.price_box}>
                    <div className={styles.price_box_one}>
                    <b  style={{color:'red'}}>Basic</b>
                    <p><del>₹250</del> <span style={{color:'black'}} >save</span> 40%</p>
                    <h1>₹150/Monthly</h1>
                    </div>
                    <div  className={styles.price_box_two}>
                    <h4><IoIosCheckmark style={{color:'red'}} />1 Business Listing</h4>
                    <h4 ><IoIosCheckmark style={{color:'red'}} />Upto 5 Pictures</h4>
                    <h4 style={{color:'rgb(88, 87, 87)'}}><IoIosClose />Get Reviews</h4>
                    <h4 style={{color:'rgb(88, 87, 87)'}}><IoIosClose />Digital Marketing Support</h4>
                    <a href="/phonepe">  <button>Purchase Now</button></a>
                    </div>
                </div>
                <div className={styles.price_box}>
                    <div className={styles.price_box_one}>
                    <b  style={{color:'red'}}>Premium</b>
                    <p><del>₹3,000</del> <span style={{color:'black'}} >Save 50%</span></p>
                    <h1>₹1500/Monthly</h1>
                    </div>
                    <div  className={styles.price_box_two}>
                    <h4><IoIosCheckmark style={{color:'red'}} />1 Business Listing</h4>
                    <h4 ><IoIosCheckmark style={{color:'red'}} />Upto 10 Pictures</h4>
                    <h4 ><IoIosCheckmark style={{color:'red'}} />Get Reviews</h4>
                    <h4><IoIosCheckmark style={{color:'red'}} />Digital Marketing Support</h4>
                    <a href="/phonepe">  <button>Purchase Now</button></a>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}