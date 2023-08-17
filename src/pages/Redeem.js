import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Redeem.css";
const Redeem = () => {
  const [step, setStep] = useState("step1");
  return (
    <div style={{ background: "var(--background)" }}>
      <div
        style={{
          display: "grid",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div>
          <Button
            style={{
              color: "white",
              backgroundColor: "var(--background)",
              height: "2.5rem",
              marginTop: "0.8rem",
              marginRight: "1rem",
              borderColor: "var(--background)",
              borderRadius: "0%",
              paddingLeft: "3%",
              paddingRight: "3%",
              borderWidth: "0.1rem",
              fontSize: "0.7rem",
            }}
          >
            DASHBOARD
          </Button>{" "}
          <Button
            style={{
              color: "white",
              backgroundColor: "var(--background)",
              height: "2.5rem",
              marginTop: "0.8rem",
              marginRight: "1rem",
              borderColor: "var(--background)",
              borderRadius: "0%",
              paddingLeft: "3%",
              paddingRight: "3%",
              borderWidth: "0.1rem",
              fontSize: "0.7rem",
            }}
          >
            STORAGE
          </Button>{" "}
          <Button
            style={{
              color: "#CF9658",
              backgroundColor: "var(--background)",
              height: "2.5rem",
              marginTop: "0.8rem",
              marginRight: "1rem",
              borderColor: "var(--background2)",
              borderRadius: "0%",
              paddingLeft: "2%",
              paddingRight: "2%",
              borderWidth: "0.1rem",
              fontSize: "0.7rem",
            }}
          >
            REDEEM BOTTLE
          </Button>{" "}
        </div>
      </div>
      <hr style={{ color: "var(--background2)" }}></hr>

      <div>
        <h4
          style={{
            color: "white",
            fontFamily: "fright",
            textAlign: "center",
            paddingTop: "5%",
            fontSize:"48px"
          }}
        >
          Redeem Your Whiskey Bottle
        </h4>
        <p style={{ color: "var(--background2)", textAlign: "center" }}>
          Ready to enjoy your prized possession? Request a shipment of your
          NFT-backed whiskey bottle with ease.
        </p>
        <div
          style={{
            gap: "5%",
            display: "grid",
            gridTemplateColumns: "20% 20% 20% 20%",
            paddingLeft: "10%",
            paddingTop: "2%",
            paddingBottom: "2%",
          }}
        >
          <div
            className={step == "step1" && "borderClass"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <svg
              style={{ marginRight: "5%" }}
              width="54"
              height="54"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="#CF9658" />
              <path
                d="M30 24C30 23.4477 30.4477 23 31 23C31.5523 23 32 23.4477 32 24V31H35V25C35 24.4477 35.4477 24 36 24C36.5523 24 37 24.4477 37 25V31H40C40.5523 31 41 31.4477 41 32C41 32.5523 40.5523 33 40 33H37V39C37 39.5523 36.5523 40 36 40C35.4477 40 35 39.5523 35 39V33L32 33V40C32 40.5523 31.5523 41 31 41C30.4477 41 30 40.5523 30 40V33H24C23.4477 33 23 32.5523 23 32C23 31.4477 23.4477 31 24 31H30V24Z"
                fill="#FCFCFD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38.2169 26.43L26.2169 23.7633C25.5924 23.6245 25 24.0998 25 24.7395V39.2598C25 39.8996 25.5924 40.3748 26.2169 40.236L38.2169 37.5693C38.6745 37.4676 39 37.0618 39 36.5931V27.4062C39 26.9375 38.6745 26.5317 38.2169 26.43ZM26.6508 21.8109C24.7773 21.3946 23 22.8203 23 24.7395V39.2598C23 41.179 24.7773 42.6047 26.6508 42.1884L38.6508 39.5217C40.0234 39.2167 41 37.9992 41 36.5931V27.4062C41 26.0001 40.0234 24.7826 38.6508 24.4776L26.6508 21.8109Z"
                fill="#FCFCFD"
              />
            </svg>
            <p style={{ color: "white" }}>Select</p>
          </div>
          <div
            className={step == "step2" && "borderClass"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <svg
              style={{ marginRight: "5%" }}
              width="54"
              height="54"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="#CF9658" />
              <path
                d="M30 24C30 23.4477 30.4477 23 31 23C31.5523 23 32 23.4477 32 24V31H35V25C35 24.4477 35.4477 24 36 24C36.5523 24 37 24.4477 37 25V31H40C40.5523 31 41 31.4477 41 32C41 32.5523 40.5523 33 40 33H37V39C37 39.5523 36.5523 40 36 40C35.4477 40 35 39.5523 35 39V33L32 33V40C32 40.5523 31.5523 41 31 41C30.4477 41 30 40.5523 30 40V33H24C23.4477 33 23 32.5523 23 32C23 31.4477 23.4477 31 24 31H30V24Z"
                fill="#FCFCFD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38.2169 26.43L26.2169 23.7633C25.5924 23.6245 25 24.0998 25 24.7395V39.2598C25 39.8996 25.5924 40.3748 26.2169 40.236L38.2169 37.5693C38.6745 37.4676 39 37.0618 39 36.5931V27.4062C39 26.9375 38.6745 26.5317 38.2169 26.43ZM26.6508 21.8109C24.7773 21.3946 23 22.8203 23 24.7395V39.2598C23 41.179 24.7773 42.6047 26.6508 42.1884L38.6508 39.5217C40.0234 39.2167 41 37.9992 41 36.5931V27.4062C41 26.0001 40.0234 24.7826 38.6508 24.4776L26.6508 21.8109Z"
                fill="#FCFCFD"
              />
              </svg>
            

            
  {/* <svg
    style={{ marginRight: "5%" }}
    width="54"
    height="54"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="32" fill="#CF9658" />
    
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 15C17.5478 15 16.9089 15.0625 16.2438 15.1536C15.9331 15.1962 15.6962 15.4331 15.6536 15.7438C15.5625 16.4089 15.5 17.0478 15.5 17.5C15.5 17.9522 15.5625 18.5911 15.6536 19.2562C15.6962 19.5669 15.9331 19.8038 16.2438 19.8464C16.9089 19.9375 17.5478 20 18 20C18.4522 20 19.0911 19.9375 19.7562 19.8464C20.0669 19.8038 20.3038 19.5669 20.3464 19.2562C20.4375 18.5911 20.5 17.9522 20.5 17.5C20.5 17.0478 20.4375 16.4089 20.3464 15.7438C20.3038 15.4331 20.0669 15.1962 19.7562 15.1536C19.0911 15.0625 18.4522 15 18 15ZM15.9724 13.1721C14.7725 13.3364 13.8364 14.2725 13.6721 15.4724C13.5778 16.1606 13.5 16.9082 13.5 17.5C13.5 18.0918 13.5778 18.8394 13.6721 19.5276C13.8364 20.7275 14.7725 21.6636 15.9724 21.8279C16.6606 21.9222 17.4082 22 18 22C18.5918 22 19.3394 21.9222 20.0276 21.8279C21.2275 21.6636 22.1636 20.7275 22.3279 19.5276C22.4222 18.8394 22.5 18.0918 22.5 17.5C22.5 16.9082 22.4222 16.1606 22.3279 15.4724C22.1636 14.2725 21.2275 13.3364 20.0276 13.1721C19.3394 13.0778 18.5918 13 18 13C17.4082 13 16.6606 13.0778 15.9724 13.1721Z" fill="#FCFCFD"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15C6.54782 15 5.90893 15.0625 5.24381 15.1536C4.93308 15.1962 4.69615 15.4331 4.65359 15.7438C4.5625 16.4089 4.5 17.0478 4.5 17.5C4.5 17.9522 4.5625 18.5911 4.65359 19.2562C4.69615 19.5669 4.93308 19.8038 5.24381 19.8464C5.90893 19.9375 6.54782 20 7 20C7.45218 20 8.09107 19.9375 8.75619 19.8464C9.06692 19.8038 9.30385 19.5669 9.34641 19.2562C9.4375 18.5911 9.5 17.9522 9.5 17.5C9.5 17.0478 9.4375 16.4089 9.34641 15.7438C9.30385 15.4331 9.06692 15.1962 8.75619 15.1536C8.09107 15.0625 7.45218 15 7 15ZM4.97244 13.1721C3.77253 13.3364 2.83642 14.2725 2.67209 15.4724C2.57784 16.1606 2.5 16.9082 2.5 17.5C2.5 18.0918 2.57784 18.8394 2.67209 19.5276C2.83642 20.7275 3.77253 21.6636 4.97244 21.8279C5.66065 21.9222 6.40816 22 7 22C7.59184 22 8.33935 21.9222 9.02756 21.8279C10.2275 21.6636 11.1636 20.7275 11.3279 19.5276C11.4222 18.8394 11.5 18.0918 11.5 17.5C11.5 16.9082 11.4222 16.1606 11.3279 15.4724C11.1636 14.2725 10.2275 13.3364 9.02756 13.1721C8.33935 13.0778 7.59184 13 7 13C6.40816 13 5.66065 13.0778 4.97244 13.1721Z" fill="#FCFCFD"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 4C17.5478 4 16.9089 4.0625 16.2438 4.15359C15.9331 4.19615 15.6962 4.43308 15.6536 4.74381C15.5625 5.40893 15.5 6.04782 15.5 6.5C15.5 6.95218 15.5625 7.59107 15.6536 8.25619C15.6962 8.56692 15.9331 8.80385 16.2438 8.84641C16.9089 8.9375 17.5478 9 18 9C18.4522 9 19.0911 8.9375 19.7562 8.84641C20.0669 8.80385 20.3038 8.56692 20.3464 8.25619C20.4375 7.59107 20.5 6.95218 20.5 6.5C20.5 6.04782 20.4375 5.40893 20.3464 4.74381C20.3038 4.43308 20.0669 4.19615 19.7562 4.15359C19.0911 4.0625 18.4522 4 18 4ZM15.9724 2.17209C14.7725 2.33642 13.8364 3.27253 13.6721 4.47244C13.5778 5.16065 13.5 5.90816 13.5 6.5C13.5 7.09184 13.5778 7.83935 13.6721 8.52756C13.8364 9.72747 14.7725 10.6636 15.9724 10.8279C16.6606 10.9222 17.4082 11 18 11C18.5918 11 19.3394 10.9222 20.0276 10.8279C21.2275 10.6636 22.1636 9.72747 22.3279 8.52756C22.4222 7.83935 22.5 7.09184 22.5 6.5C22.5 5.90816 22.4222 5.16065 22.3279 4.47244C22.1636 3.27253 21.2275 2.33642 20.0276 2.17209C19.3394 2.07784 18.5918 2 18 2C17.4082 2 16.6606 2.07784 15.9724 2.17209Z" fill="#FCFCFD"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C6.54782 4 5.90893 4.0625 5.24381 4.15359C4.93308 4.19615 4.69615 4.43308 4.65359 4.74381C4.5625 5.40893 4.5 6.04782 4.5 6.5C4.5 6.95218 4.5625 7.59107 4.65359 8.25619C4.69615 8.56692 4.93308 8.80385 5.24381 8.84641C5.90893 8.9375 6.54782 9 7 9C7.45218 9 8.09107 8.9375 8.75619 8.84641C9.06692 8.80385 9.30385 8.56692 9.34641 8.25619C9.4375 7.59107 9.5 6.95218 9.5 6.5C9.5 6.04782 9.4375 5.40893 9.34641 4.74381C9.30385 4.43308 9.06692 4.19615 8.75619 4.15359C8.09107 4.0625 7.45218 4 7 4ZM4.97244 2.17209C3.77253 2.33642 2.83642 3.27253 2.67209 4.47244C2.57784 5.16065 2.5 5.90816 2.5 6.5C2.5 7.09184 2.57784 7.83935 2.67209 8.52756C2.83642 9.72747 3.77253 10.6636 4.97244 10.8279C5.66065 10.9222 6.40816 11 7 11C7.59184 11 8.33935 10.9222 9.02756 10.8279C10.2275 10.6636 11.1636 9.72747 11.3279 8.52756C11.4222 7.83935 11.5 7.09184 11.5 6.5C11.5 5.90816 11.4222 5.16065 11.3279 4.47244C11.1636 3.27253 10.2275 2.33642 9.02756 2.17209C8.33935 2.07784 7.59184 2 7 2C6.40816 2 5.66065 2.07784 4.97244 2.17209Z" fill="#F4F5F6"/>
  </svg> */}
  
            <p style={{ color: "white" }}>Confirm</p>
          </div>

          <div
            className={step == "step3" && "borderClass"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <svg
              style={{ marginRight: "5%" }}
              width="54"
              height="54"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="#CF9658" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40 25H24C23.4477 25 23 25.4477 23 26V38C23 38.5523 23.4477 39 24 39H40C40.5523 39 41 38.5523 41 38V26C41 25.4477 40.5523 25 40 25ZM24 23C22.3431 23 21 24.3431 21 26V38C21 39.6569 22.3431 41 24 41H40C41.6569 41 43 39.6569 43 38V26C43 24.3431 41.6569 23 40 23H24Z"
                fill="#FCFCFD"
              />
              <path
                d="M28 35.5C28 36.3284 27.3284 37 26.5 37C25.6716 37 25 36.3284 25 35.5C25 34.6716 25.6716 34 26.5 34C27.3284 34 28 34.6716 28 35.5Z"
                fill="#FCFCFD"
              />
              <path
                d="M33 35.5C33 36.3284 32.3284 37 31.5 37C30.6716 37 30 36.3284 30 35.5C30 34.6716 30.6716 34 31.5 34C32.3284 34 33 34.6716 33 35.5Z"
                fill="#FCFCFD"
              />
              <path d="M21 28H43V30H21V28Z" fill="#D2A163" />
            </svg>

            <p style={{ color: "white" }}>Pay</p>
          </div>
          <div
            className={step == "step4" && "borderClass"}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <svg
              style={{ marginRight: "5%" }}
              width="54"
              height="54"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="#CF9658" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.0228 38.3974L22.7474 35.1365C22.9124 34.3938 23.2858 33.7137 23.8237 33.1758L33.6717 23.3278C35.2338 21.7657 37.7664 21.7657 39.3285 23.3278L40.6717 24.671C42.2338 26.2331 42.2338 28.7657 40.6717 30.3278L30.8237 40.1758C30.2858 40.7137 29.6056 41.087 28.863 41.2521L25.6021 41.9767C23.4586 42.4531 21.5464 40.5409 22.0228 38.3974ZM24.6998 35.5703L23.9751 38.8312C23.8164 39.5457 24.4538 40.1831 25.1683 40.0243L28.4292 39.2997C28.7863 39.2203 29.1145 39.0446 29.3783 38.7921L25.2074 34.6212C24.9548 34.885 24.7791 35.2132 24.6998 35.5703ZM26.6213 33.2066L30.7929 37.3782L36.3787 31.7924L32.2071 27.6208L26.6213 33.2066ZM39.2575 28.9136L37.7929 30.3782L33.6213 26.2066L35.0859 24.742C35.8669 23.961 37.1333 23.961 37.9143 24.742L39.2575 26.0852C40.0385 26.8662 40.0385 28.1326 39.2575 28.9136Z"
                fill="#FCFCFD"
              />
            </svg>

            <p style={{ color: "white" }}>Review</p>
          </div>
        </div>
        {step === "step1" ? (
          <>
            <p style={{ color: "white", paddingLeft: "10%", marginTop: "1%",fontSize:"1.2rem"  }}>
              1. Select the NFT-backed whiskey bottle you want to redeem from
              your collection.
            </p>
            <div
              style={{
                paddingBottom: "5%",
                display: "grid",
                paddingTop: "5%",
                paddingLeft: "10%",
                gridTemplateColumns: "23% 23% 23% ",
                gap: "8%",
                gridRowGap: "10%",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderStyle: "solid",
                  borderWidth: "0.2rem",
                  borderColor: "var(--borderColor)",
                  padding: "1%",
                }}
              >
                <img
                  style={{ width: "100%" }}
                  width={100}
                  src="/images/productimg.png"
                />

                <div>
                  <div className="cardText">
                    <div>
                      <h4 style={{ color: "white" }}>
                        Macallan 30-Year01d Sherry oak NFT - $5,000
                      </h4>{" "}
                    </div>
                  </div>
                </div>
                <h4 style={{ color: "var(--background2)" }}>$900</h4>
              </div>
              <div
                style={{
                  height: "100%",
                  borderStyle: "solid",
                  borderWidth: "0.2rem",
                  borderColor: "var(--borderColor)",
                  padding: "1%",
                }}
              >
                <img
                  style={{ width: "100%" }}
                  width={100}
                  src="/images/productimg.png"
                />

                <div>
                  <div className="cardText">
                    <div>
                      <h4 style={{ color: "white" }}>
                        Macallan 30-Year01d Sherry oak NFT - $5,000
                      </h4>{" "}
                    </div>
                  </div>
                </div>
                <h4 style={{ color: "var(--background2)" }}>$900</h4>
              </div>
              <div
                style={{
                  height: "100%",
                  borderStyle: "solid",
                  borderWidth: "0.2rem",
                  borderColor: "var(--borderColor)",
                  padding: "1%",
                }}
              >
                <img
                  style={{ width: "100%" }}
                  width={100}
                  src="/images/productimg.png"
                />

                <div>
                  <div className="cardText">
                    <div>
                      <h4 style={{ color: "white" }}>
                        Macallan 30-Year01d Sherry oak NFT - $5,000
                      </h4>{" "}
                    </div>
                  </div>
                </div>
                <h4 style={{ color: "var(--background2)" }}>$900</h4>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "10%",
              }}
            >
              <Button
                onClick={() => setStep("step2")}
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
                  height: "2.5rem",
                  marginRight: "5rem",
                  borderColor: "var(--borderColor)",
                  borderRadius: "0%",
                  borderWidth: "0.1rem",
                }}
              >
                CONTINUE
              </Button>{" "}
            </div>
          </>
        ) : step === "step2" ? (
          // step 2
          <div>
            <p style={{ color: "white", paddingLeft: "10%", marginTop: "1%",fontSize:"1.2rem" }}>
              2. Confirm your shipping address and contact information
            </p>
            <p style={{ color: "white", paddingLeft: "10%", marginTop: "3%" }}>
              SHIPPING ADDRESS
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "60% 25%",
                gap: "10%",
                paddingBottom: "10%",
              }}
            >
              <form style={{ width: "80%", marginLeft: "10%" }}>
                <div
                  className="form-group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "35% 35% 35%",
                    gap: "5%",
                    marginLeft: "9%",
                    marginTop: "5%",
                  }}
                >
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      NAME
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      STREET
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      CITY
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                </div>
                <div
                  className="form-group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "25% 25% 25% 25%",
                    gap: "5%",
                    marginLeft: "9%",
                    marginTop: "5%",
                  }}
                >
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      STATE
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      ZIP CODE{" "}
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      COUNTRY
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      PHONE
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                </div>
                <p
                  style={{
                    color: "white",
                    paddingLeft: "10%",
                    marginTop: "7%",
                  }}
                >
                  CONTACT INFORMATION
                </p>
                <div
                  className="form-group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "35% 35% 35%",
                    gap: "5%",
                    marginLeft: "9%",
                    marginTop: "5%",
                  }}
                >
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      NAME
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      ADDRESS{" "}
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "white", fontSize: "0.8rem" }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      EMAIL
                    </label>
                    <input
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background)",
                      }}
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>
                </div>
              </form>
              <div
                style={{
                  height: "70%",
                  background: "var(--background3)",
                  padding: "5%",
                  borderStyle: "solid",
                  borderColor: "var(--background2)",
                  borderWidth: "0.1rem",
                }}
              >
                <h5 style={{ color: "white",fontSize:"1.8rem",fontWeight:"400"}}>Order Summary</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15%",
                  }}
                >
                  <p style={{ color: "var(--background2)" }}>PRICE</p>
                  <p style={{ color: "white" }}>$5000</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ color: "var(--background2)" }}>REDEMPTION FEE</p>
                  <p style={{ color: "white" }}>$5000</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ color: "var(--background2)" }}>TOTAL</p>
                  <p style={{ color: "white" }}>$5000</p>
                </div>
                <Button
                  onClick={() => setStep("step3")}
                  style={{
                    color: "black",
                    backgroundColor: "var(--background2)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--background2)",
                    borderRadius: "0%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    borderWidth: "0.1rem",
                    width: "100%",
                  }}
                >
                  CONTINUE
                </Button>{" "}
              </div>
            </div>
          </div>
        ) : step === "step3" ? (
          // step 3
          <div>
            <p style={{ color: "white", paddingLeft: "10%", marginTop: "1%",fontSize:"1.2rem" }}>
              3. Pay the redemption fee, which covers packing, bottling, and
              shipping costs
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "60% 25%",
                gap: "5%",
                paddingBottom: "5%",
                marginTop: "5%",
              }}
            >
              <div
                style={{
                  padding: "1%",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20%",
                  borderStyle: "solid",
                  borderColor: "var(--background2)",
                  borderWidth: "0.1rem",
                }}
              >
                <img style={{ width: "40%" }} src="/images/productimg.png" />
                <div>
                  <h4
                    style={{
                      color: "white",
                      fontFamily: "fright",
                      marginLeft: "10%",
                    }}
                  >
                    Macallan
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "70% 70%",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        borderWidth: "0.1rem",
                        borderStyle: "solid",
                        borderColor: "var(--background2)",
                        color: "var(--background2)",
                        textAlign: "center",
                        fontSize: "0.8rem",
                        marginLeft: "15%",
                      }}
                    >
                      30-Year-Old
                    </p>
                    <p
                      style={{
                        borderWidth: "0.1rem",
                        borderStyle: "solid",
                        borderColor: "var(--borderColor)",
                        color: "var(--background2)",
                        textAlign: "center",
                        fontSize: "0.8rem",
                        marginLeft: "2%",
                      }}
                    >
                      Sherry Oak
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  background: "var(--background3)",
                  padding: "5%",
                  borderStyle: "solid",
                  borderColor: "var(--background2)",
                  borderWidth: "0.1rem",
                }}
              >
                <h5 style={{ color: "white",fontSize:"1.8rem",fontWeight:"400" }}>Order Summary</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15%",
                  }}
                >
                  <p style={{ color: "var(--background2)" }}>PRICE</p>
                  <p style={{ color: "white" }}>$5000</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ color: "var(--background2)" }}>REDEMPTION FEE</p>
                  <p style={{ color: "white" }}>$5000</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ color: "var(--background2)" }}>TOTAL</p>
                  <p style={{ color: "white" }}>$5000</p>
                </div>
                <Button
                  onClick={() => setStep("step4")}
                  style={{
                    color: "black",
                    backgroundColor: "var(--background2)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--background2)",
                    borderRadius: "0%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    borderWidth: "0.1rem",
                    width: "100%",
                  }}
                >
                  CONTINUE
                </Button>{" "}
              </div>
            </div>
            <div
              style={{ width: "50%", paddingLeft: "10%", paddingBottom: "10%" }}
            >
              <h5 style={{ color: "white" }}>PAYMENT METHOD</h5>
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "30% 30% 30%",
                    gap: "5%",
                    marginTop: "5%",
                  }}
                >
                  <div
                    style={{
                      background: "#100804",
                      paddingTop: "15%",
                      paddingBottom: "15%",
                      paddingLeft: "8%",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="16" fill="#FCFCFD" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 11C17 10.4477 16.5523 10 16 10C15.4477 10 15 10.4477 15 11V15H11C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17H15V21C15 21.5523 15.4477 22 16 22C16.5523 22 17 21.5523 17 21V17H21C21.5523 17 22 16.5523 22 16C22 15.4477 21.5523 15 21 15H17V11Z"
                        fill="#D2A163"
                      />
                    </svg>

                    <h4
                      style={{
                        color: "white",
                        fontSize: "0.9rem",
                        marginTop: "3%",
                      }}
                    >
                      ADD PAYMENT METHOD
                    </h4>
                  </div>
                  <div
                    style={{
                      background: "#100804",
                      paddingTop: "15%",
                      paddingBottom: "15%",
                      paddingLeft: "8%",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 302"
                      id="paypal"
                    >
                      <path
                        fill="#27346A"
                        d="M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0 0 39.076 12.11L.136 259.077c-.774 4.87 2.997 9.28 7.933 9.28h57.736l14.5-91.971-.45 2.88c1.033-6.501 6.593-11.296 13.177-11.296h27.436c53.898 0 96.101-21.892 108.429-85.221.366-1.873.683-3.696.957-5.477-1.556-.824-1.556-.824 0 0 3.671-23.407-.025-39.34-12.686-53.765"
                      ></path>
                      <path
                        fill="#27346A"
                        d="M102.397 68.84a11.737 11.737 0 0 1 5.053-1.14h73.318c8.682 0 16.78.565 24.18 1.756a101.6 101.6 0 0 1 6.177 1.182 89.928 89.928 0 0 1 8.59 2.347c3.638 1.215 7.026 2.63 10.14 4.287 3.67-23.416-.026-39.34-12.687-53.765C203.226 7.625 178.046.816 145.823.816H52.295C45.71.816 40.108 5.61 39.076 12.11L.136 259.068c-.774 4.878 2.997 9.282 7.925 9.282h57.744L95.888 77.58a11.717 11.717 0 0 1 6.509-8.74z"
                      ></path>
                      <path
                        fill="#2790C3"
                        d="M228.897 82.749c-12.328 63.32-54.53 85.221-108.429 85.221H93.024c-6.584 0-12.145 4.795-13.168 11.296L61.817 293.621c-.674 4.262 2.622 8.124 6.934 8.124h48.67a11.71 11.71 0 0 0 11.563-9.88l.474-2.48 9.173-58.136.591-3.213a11.71 11.71 0 0 1 11.562-9.88h7.284c47.147 0 84.064-19.154 94.852-74.55 4.503-23.15 2.173-42.478-9.739-56.054-3.613-4.112-8.1-7.508-13.327-10.28-.283 1.79-.59 3.604-.957 5.477z"
                      ></path>
                      <path
                        fill="#1F264F"
                        d="M216.952 72.128a89.928 89.928 0 0 0-5.818-1.49 109.904 109.904 0 0 0-6.177-1.174c-7.408-1.199-15.5-1.765-24.19-1.765h-73.309a11.57 11.57 0 0 0-5.053 1.149 11.683 11.683 0 0 0-6.51 8.74l-15.582 98.798-.45 2.88c1.025-6.501 6.585-11.296 13.17-11.296h27.444c53.898 0 96.1-21.892 108.428-85.221.367-1.873.675-3.688.958-5.477-3.122-1.648-6.501-3.072-10.14-4.279a83.26 83.26 0 0 0-2.77-.865"
                      ></path>
                    </svg>
                    <h4
                      style={{
                        color: "white",
                        fontSize: "0.9rem",
                        marginTop: "10%",
                      }}
                    >
                      PAYPAL
                    </h4>
                  </div>
                  <div
                    style={{
                      background: "#100804",
                      paddingTop: "15%",
                      paddingBottom: "15%",
                      paddingLeft: "8%",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5ZM4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4Z"
                        fill="#FCFCFD"
                      />
                      <path
                        d="M8 15.5C8 16.3284 7.32843 17 6.5 17C5.67157 17 5 16.3284 5 15.5C5 14.6716 5.67157 14 6.5 14C7.32843 14 8 14.6716 8 15.5Z"
                        fill="#FCFCFD"
                      />
                      <path
                        d="M13 15.5C13 16.3284 12.3284 17 11.5 17C10.6716 17 10 16.3284 10 15.5C10 14.6716 10.6716 14 11.5 14C12.3284 14 13 14.6716 13 15.5Z"
                        fill="#FCFCFD"
                      />
                      <path d="M1 8H23V10H1V8Z" fill="#F4F5F6" />
                    </svg>

                    <h4
                      style={{
                        color: "white",
                        fontSize: "0.9rem",
                        marginTop: "10%",
                      }}
                    >
                      MASTERCARD<br></br> ENDED **9283
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // step 4
          <div>
          <p style={{ color: "white", paddingLeft: "10%", marginTop: "1%" ,marginBottom:"5%",fontSize:"1.2rem"}}>
            4. Review and submit your request. Our team will securely package and ship your whiskey bottle to the provided address.
          </p>
        
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60% 25%",
              gap: "5%",
              paddingBottom: "10%",
            }}
          >
            <form style={{ width: "70%", marginLeft: "15%" }}>
            <div className="form-group" style={{ borderStyle:"solid", borderWidth:"0.1rem",
                  borderColor: "var(--background2)",padding:"0%",width:"100%"}}>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"2%",fontSize:"0.8rem"}}>
                        <p style={{color:"white"}} >SHIPPING ADDRESS</p>
                        <p style={{color:"var(--background2)"}} >CHANGE</p>
                    </div>
         <textarea placeholder='Hello, I am having trouble accessing my account. Can you please help me resolve this issue? Thank you.'  style={{
                  borderWidth:"0.2rem",
                  color:"#BAB8B7",
                  borderColor: "var(--background)",
                  boxShadow:"none",
                  backgroundColor: "var(--background)" ,
                  marginLeft:"9%",
                  width:"90%",
                  resize: "none",
                  height:"120px"
                }}  className="form-control" id="exampleFormControlTextarea1" rows={5} defaultValue={"JAMES NEWMAN 2125 CHESTNUT ST SAN FRANCISCO, CA941234151 315 - 9111 JOHN.NEWMAN.AAYMARO@GMAIL.COM"} />
      </div>
      <div className="form-group" style={{marginTop:"5%", borderStyle:"solid", borderWidth:"0.1rem",
                  borderColor: "var(--background2)",padding:"0%",width:"100%"}}>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"2%",fontSize:"0.8rem"}}>
                        <p style={{color:"white"}} >PAYMENT INFORMATION</p>
                        <p style={{color:"var(--background2)"}} >CHANGE</p>
                    </div>
         <textarea placeholder='Hello, I am having trouble accessing my account. Can you please help me resolve this issue? Thank you.'  style={{
                  borderWidth:"0.2rem",
                  color:"#BAB8B7",
                  borderColor: "var(--background)",
                  boxShadow:"none",
                  backgroundColor: "var(--background)" ,
                  marginLeft:"9%",
                  width:"90%",
                  resize: "none",
                  height:"100px"
                  
                }}  className="form-control" id="exampleFormControlTextarea1" rows={1} defaultValue={"Mastercard Ended **9283"} />
      </div>
            </form>
            <div
              style={{
                height: "90%",
                background: "var(--background3)",
                padding: "5%",
                borderStyle: "solid",
                borderColor: "var(--background2)",
                borderWidth: "0.1rem",
              }}
            >
              <h5 style={{ color: "white" ,fontSize:"1.8rem",fontWeight:"400"}}>Order Summary</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15%",
                }}
              >
                <p style={{ color: "var(--background2)" }}>PRICE</p>
                <p style={{ color: "white" }}>$5000</p>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p style={{ color: "var(--background2)" }}>REDEMPTION FEE</p>
                <p style={{ color: "white" }}>$5000</p>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p style={{ color: "var(--background2)" }}>TOTAL</p>
                <p style={{ color: "white" }}>$5000</p>
              </div>
              <Button
                onClick={() => setStep("step3")}
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
                  height: "2.5rem",
                  marginTop: "2rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius: "0%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderWidth: "0.1rem",
                  width: "100%",
                }}
              >
                CONTINUE
              </Button>{" "}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Redeem;
