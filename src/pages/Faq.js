import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { Button } from "react-bootstrap";
import style from './home.css'

const Faq = () => {
  return (
    <div style={{ background: "var(--background)" }}>
      <div style={{ marginLeft: "9%", paddingTop: "10%" }}>
        {" "}
        <p style={{ color: "var(--background2)", fontSize: "0.8rem" }}>
          LEARN HOW TO GET STARTED
        </p>
        <h1 style={{ color: "white", fontWeight: "380", fontFamily: "Fright" }}>
          Frequently asked questions
        </h1>
        <p style={{ color: "white", marginTop: "2%", marginBottom: "5%" }}>
          Join Stacks community now to get free updates and also alot of
          freebies are waiting <br></br> for you or{" "}
          <span style={{ color: "var(--background2)" }}> CONTACT SUPPORT</span>
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 70%",
          padding: "5%",
          paddingTop:"1%",
          paddingLeft: "10%",
        }}
      >
        <div>
          <div style={{ display: "flex" }}>
            <svg
              style={{ marginRight: "5%" }}
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_44_36231)">
                <path
                  d="M14.5039 6.368L7.99991 2.652L1.49591 6.368L0.503906 4.632L7.50391 0.632C7.81191 0.456 8.18891 0.456 8.49591 0.632L15.4959 4.632L14.5039 6.368Z"
                  fill="#FCFCFD"
                />
                <path
                  d="M4 13.5V15.5H12V13.5C12 13.5 11 11.5 8 11.5C5 11.5 4 13.5 4 13.5Z"
                  fill="white"
                />
                <path
                  d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_44_36231">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p style={{ color: "white" }}>GENERAL</p>
          </div>
          <div style={{ display: "flex" }}>
            <svg
              style={{ marginRight: "5%" }}
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_44_36238)">
                <path
                  d="M0 2.5V16.5L5 11.5H14C15.105 11.5 16 10.605 16 9.5V2.5C16 1.395 15.105 0.5 14 0.5H2C0.895 0.5 0 1.395 0 2.5Z"
                  fill="#D2A163"
                />
              </g>
              <defs>
                <clipPath id="clip0_44_36238">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p style={{ color: "var(--background2)" }}>SUPPORT</p>
          </div>

          <div style={{ display: "flex" }}>
            <svg
              style={{ marginRight: "5%" }}
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 7.6V7.5C13 4.7 10.8 2.5 8 2.5C5.5 2.5 3.4 4.3 3.1 6.8C1.3 7.4 0 9 0 11C0 13.5 2 15.5 4.5 15.5C6.2 15.5 10.4 15.5 12 15.5C14.2 15.5 16 13.7 16 11.5C16 9.6 14.7 8.1 13 7.6ZM9 10.5V13.5H7V10.5H4L8 6.5L12 10.5H9Z"
                fill="#D2A163"
              />
            </svg>

            <p style={{ color: "var(--background2)" }}>HOSTING</p>
          </div>

          <div style={{ display: "flex" }}>
            <svg
              style={{ marginRight: "5%" }}
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_44_36248)">
                <path
                  d="M15.7001 7.79961L13.0001 5.09961L11.6001 6.49961L13.6001 8.49961L11.6001 10.4996L13.0001 11.8996L15.7001 9.19961C16.1001 8.79961 16.1001 8.19961 15.7001 7.79961Z"
                  fill="#D2A163"
                />
                <path
                  d="M3 5.09961L0.3 7.79961C-0.1 8.19961 -0.1 8.79961 0.3 9.19961L3 11.8996L4.4 10.4996L2.4 8.49961L4.4 6.49961L3 5.09961Z"
                  fill="#D2A163"
                />
                <path d="M10 1.5H6V15.5H10V1.5Z" fill="#D2A163" />
              </g>
              <defs>
                <clipPath id="clip0_44_36248">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p style={{ color: "var(--background2)" }}>PRODUCT</p>
          </div>
        </div>
        <div style={{paddingBottom:"20%"}}>
          <hr style={{ color: "white" }}></hr>

          <Accordion>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{ background: 'var(--background)', color: 'white' ,display:"flex",justifyContent:"space-between",paddingLeft:"20px"}} className="dropdown-icon"
                >
                  HOW DO I CREATE AN ACCOUNT ON [YOUR COMPANY NAME]?{" "}
                  <span ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 10.2929C15.8166 9.90237 15.1834 9.90237 14.7929 10.2929L12 13.0858L9.20711 10.2929C8.81658 9.90237 8.18342 9.90237 7.79289 10.2929C7.40237 10.6834 7.40237 11.3166 7.79289 11.7071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L16.2071 11.7071C16.5976 11.3166 16.5976 10.6834 16.2071 10.2929Z" fill="#D2A163"/>
</svg></span>
                </AccordionItemButton>
              </AccordionItemHeading>
              
              <AccordionItemPanel
                style={{
                  background: "var(--background)",
                  color: "var(--background2)",
                }}
              >
                
                <p>
                To create an account, click on the "Login / Create Account" button on the top right of the homepage. Fill out the registration form with your name, email, and password, then agree to the terms and conditions before clicking the "Sign Up" button.
                </p>
                <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}
              >
                LEARN MORE
              </Button>{" "}
              </AccordionItemPanel>
            </AccordionItem>
            <hr style={{ color: "white" }}></hr>

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{ background: "var(--background)", color: "white",display:"flex",justifyContent:"space-between",paddingLeft:"20px" }} className="dropdown-icon"
                >
                  WHAT ARE THE REQUIREMENTS FOR MINTING A WHISKEY NFT?{" "}
                  <span ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 10.2929C15.8166 9.90237 15.1834 9.90237 14.7929 10.2929L12 13.0858L9.20711 10.2929C8.81658 9.90237 8.18342 9.90237 7.79289 10.2929C7.40237 10.6834 7.40237 11.3166 7.79289 11.7071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L16.2071 11.7071C16.5976 11.3166 16.5976 10.6834 16.2071 10.2929Z" fill="#D2A163"/>
</svg></span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel
                style={{
                  background: "var(--background)",
                  color: "var(--background2)",
                }}
              >
                <p>
                To create an account, click on the "Login / Create Account" button on the top right of the homepage. Fill out the registration form with your name, email, and password, then agree to the terms and conditions before clicking the "Sign Up" button.
                </p>
                <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}
              >
                LEARN MORE
              </Button>{" "}
              </AccordionItemPanel>
            </AccordionItem>
            <hr style={{ color: "white" }}></hr>

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{ background: "var(--background)", color: "white",display:"flex",justifyContent:"space-between",paddingLeft:"20px" }} className="dropdown-icon"
                >
                  HOW DO I CONNECT MY WALLET TO THE PLATFORM?{" "}
                  <span ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 10.2929C15.8166 9.90237 15.1834 9.90237 14.7929 10.2929L12 13.0858L9.20711 10.2929C8.81658 9.90237 8.18342 9.90237 7.79289 10.2929C7.40237 10.6834 7.40237 11.3166 7.79289 11.7071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L16.2071 11.7071C16.5976 11.3166 16.5976 10.6834 16.2071 10.2929Z" fill="#D2A163"/>
</svg></span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel
                style={{
                  background: "var(--background)",
                  color: "var(--background2)",
                }}
              >
                <p>
                  Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                  occaecat ut occaecat consequat est minim minim esse tempor
                  laborum consequat esse adipisicing eu reprehenderit enim.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <hr style={{ color: "white" }}></hr>

            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{ background: "var(--background)", color: "white",display:"flex",justifyContent:"space-between",paddingLeft:"20px" }} className="dropdown-icon"
                >
                 WHAT IS THE PROCESS FOR VALUING A RARE WHISKEY BOTTLE?{" "}
                 <span ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 10.2929C15.8166 9.90237 15.1834 9.90237 14.7929 10.2929L12 13.0858L9.20711 10.2929C8.81658 9.90237 8.18342 9.90237 7.79289 10.2929C7.40237 10.6834 7.40237 11.3166 7.79289 11.7071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L16.2071 11.7071C16.5976 11.3166 16.5976 10.6834 16.2071 10.2929Z" fill="#D2A163"/>
</svg></span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel
                style={{
                  background: "var(--background)",
                  color: "var(--background2)",
                }}
              >
                <p>
                To create an account, click on the "Login / Create Account" button on the top right of the homepage. Fill out the registration form with your name, email, and password, then agree to the terms and conditions before clicking the "Sign Up" button.
                </p>
                <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}
              >
                LEARN MORE
              </Button>{" "}
              </AccordionItemPanel>
            </AccordionItem>
<hr style={{ color: "white" }}></hr>

<AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton
                  style={{ background: "var(--background)", color: "white",display:"flex",justifyContent:"space-between",paddingLeft:"20px" }} className="dropdown-icon"
                >
                  HOW  [YOUR COMPANY NAME] WORKS?{" "}
                  <span ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 10.2929C15.8166 9.90237 15.1834 9.90237 14.7929 10.2929L12 13.0858L9.20711 10.2929C8.81658 9.90237 8.18342 9.90237 7.79289 10.2929C7.40237 10.6834 7.40237 11.3166 7.79289 11.7071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L16.2071 11.7071C16.5976 11.3166 16.5976 10.6834 16.2071 10.2929Z" fill="#D2A163"/>
</svg></span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel
                style={{
                  background: "var(--background)",
                  color: "var(--background2)",
                }}
              >
                <p>
                To create an account, click on the "Login / Create Account" button on the top right of the homepage. Fill out the registration form with your name, email, and password, then agree to the terms and conditions before clicking the "Sign Up" button.
                </p>
                <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}
              >
                LEARN MORE
              </Button>{" "}
              </AccordionItemPanel>
            </AccordionItem>
            
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
