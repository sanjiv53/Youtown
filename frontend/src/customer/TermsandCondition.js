import React from "react";
import styletwo from './App.module.css';
import Nav from './Navbar';
import Fooder from './Footer';
import { VscDebugBreakpointData } from "react-icons/vsc";

export default function Terms() {
    return (
        <>
            <Nav />
            <div className={styletwo.contition}>
                <div className={styletwo.contition_box}>

                    <h1>Terms <span style={{ color: "red" }}>and</span> Condition</h1>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> Acceptance of Terms By accessing or using the YourTown website ("the Website"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use the Website.</p>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> User Eligibility You must be at least 18 years old to use this Website. By using the Website, you represent and warrant that you are at least 18 years old.</p>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> User Registration To access certain features of the Website, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> Content Submission</p>
                    <li>Business Listings: Users may submit business listings to be displayed on the Website. By submitting a business listing, you agree that the information provided is accurate, and you have the authority to represent the business.</li>
                    <li>Business Listings: Users may submit business listings to be displayed on the Website. By submitting a business listing, you agree that the information provided is accurate, and you have the authority to represent the business.</li>
                    <li>Product Sales: Users may list products for sale on the Website. By listing a product, you agree to accurately represent the product and its condition.</li>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> Prohibited Activities You agree not to engage in any of the following activities:</p>
                    <li>Violating any applicable laws or regulations.</li>
                    <li>Posting false, misleading, or fraudulent content.</li>
                    <li>Engaging in any form of harassment or discriminatory conduct.</li>
                    <p> <VscDebugBreakpointData style={{ color: "red" }} /> Privacy Policy Our Privacy Policy, which outlines how we collect, use, and share your information, is incorporated by reference into these Terms and Conditions</p>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> Intellectual Property</p>
                    <li>The Website and its content are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our written consent.</li>
                    <li>User-generated content, such as business listings, job postings, and product listings, may be used by us for promotional purposes on the Website</li>
                </div>

                <div className={styletwo.contition_box}>

                    <h1>Shipping <span style={{ color: "red" }}>Policy</span> </h1>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> Youtown does not engage in the buying or selling of any products, and therefore, we do not deal with any shipping services. Our platform is dedicated to connecting Local Community. As a result, there are no shipping-related processes or services associated with our website.</p>
                    <p>If you have any inquiries or require further information, please feel free to reach out to our support team at info@youtown.in.
                    </p>
                    <p> Thank you for being a part of Youtown!</p>

                </div>

                <div className={styletwo.contition_box}>

                    <h1>Refund <span style={{ color: "red" }}>and </span>Cancellation </h1>
                    <p><VscDebugBreakpointData style={{ color: "red" }} /> Youtown is not involved in the buying or selling of any products. As a result, we do not facilitate transactions that require refunds or cancellations. Our platform serves as connecting local community. there are no refund or cancellation policies applicable.</p>
                    <p>If you have any questions or need assistance, please contact our support team at info@youtown.in.
                   We offer refund of subcription fee within the first 30 days of your purchase, if 30 days have passed since your purchase, you will not be offered a refund and/or exchange of any kind.

                    </p>
                    <p> Thank you for being a part of Youtown!</p>

                </div>

            </div>
            <Fooder />
        </>
    );
}