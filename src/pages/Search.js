import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import HomeFilter from "../components/homeFilter";
import HomeCard from "../components/HomeCard";
import { API_URL } from "../constants/userConstants";
import { useEffect,useState } from "react";
import axios from "axios";
function Home() {
  let [datas,setdatas] = useState()
  let [usdPrice,setusdPrice] = useState()

  let getNft =(async()=>{
    let data = await axios.get(`${API_URL}/get-nft`)
    console.log(data,"nftdata")
    setdatas(data?.data?.draft)
 })
 const getusd = async()=>{
  let {data} = await axios.get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=F3HN9IGWSZ5NYWEJBEM4Q214H2Q1BESN67`)
  setusdPrice(data?.result?.maticusd)
 }
 useEffect(()=>{
  getNft()
  getusd()
 },[])

  return (
    <div >
      <div
         style={{
          paddingRight: "5rem",
          paddingLeft: "5rem",
          paddingTop: "5%",
          paddingBottom: "5%",
          height: "100%", // Ensure the container height takes available space
          background: "var(--background)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            style={{
              background: "var(---background)",
              border: "none",
              outline: "none",
              fontSize: "1.5rem",
              color:"white"
            }}
            
            type="text"
            placeholder="Type your keywords"
          />
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#CF9658" />
            <g clipPath="url(#clip0_44_30192)">
              <path
                d="M26.6659 26.6659L22.4365 22.4365"
                stroke="#FCFCFD"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.6663 23.9997C21.6119 23.9997 23.9997 21.6119 23.9997 18.6663C23.9997 15.7208 21.6119 13.333 18.6663 13.333C15.7208 13.333 13.333 15.7208 13.333 18.6663C13.333 21.6119 15.7208 23.9997 18.6663 23.9997Z"
                stroke="#FCFCFD"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_44_30192">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(12 12)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <hr
          style={{
            color: "var(--borderColor)",
            borderWidth: "10%",
            marginTop: "3%",
            marginBottom:"5%"
          }}
        ></hr>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1%",
          }}
        >
          <div
            style={{
              borderColor: "var(--borderColor)",
              borderWidth: "0.1rem",
              borderStyle: "solid",
              padding: "0.3rem",
            }}
          >
            <Dropdown as={ButtonGroup}>
              <Button
                style={{
                  backgroundColor: "var(--background)",
                  border: "none",
                  fontSize: "0.8rem",
                }}
              >
                RECENTLY ADDED&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              </Button>

              <Dropdown.Toggle
                split
                style={{
                  borderRadius: "0rem",
                  height: "2rem",
                  backgroundColor: "var(--background)",
                  borderColor: "var(--borderColor)",
                  color:"#CF9658",
                  
                }}
                id="dropdown-split-basic"
              
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            style={{
              display: "flex",
              color: "var(--background2)",
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: "1rem",
                background: "#46392E",
                padding: "0.3rem",
                color: "white",
              }}
            >
              ALL BOTTLES
            </p>
            <p style={{ margin: "1rem" }}>ART</p>
            <p style={{ margin: "1rem" }}>GAME</p>
            <p style={{ margin: "1rem" }}>PHOTOGRAPHY</p>
            <p style={{ margin: "1rem" }}>MUSIC</p>
            <p style={{ margin: "1rem" }}>VIDEO</p>
          </div>
        </div>

        {/* filter */}

        <div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
          <div style={{ width: "70%" }}>
            <div style={{ flexBasis: "18%" }}>
              <label
                htmlFor="customRange1"
                style={{ color: "var(--borderColor)" }}
                className="form-label"
              >
                PRICE RANGE
              </label>
              <br></br>
              <div className="slidecontainer">
              {/* backgroundSize:"50.5051% 100%" */}
                <input
                  style={{ width: "90%" }}
                  type="range"
                  className="slider"
                  min={1}
                  max={100}
                  defaultValue={50}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "white",
                  }}
                >
                  <p>0.01 ETH</p>
                  <p>10 ETH</p>
                </div>
              </div>{" "}
            </div>{" "}
            <div>
              <label
                htmlFor="customRange1"
                style={{ color: "var(--borderColor)" }}
                className="form-label"
              >
                LIKES
              </label>
              <div
                style={{
                  borderColor: "var(--borderColor)",
                  borderWidth: "0.1rem",
                  borderStyle: "solid",
                  padding: "0.3rem",
                }}
              >
                <Dropdown as={ButtonGroup}>
                  <Button
                    style={{
                      backgroundColor: "var(--background)",
                      border: "none",
                      fontSize: "0.8rem",
                      width:"110px",
                      marginRight:"90px"
                      
                    }}
                  >
                    MOST LIKED
                  </Button>

                  <Dropdown.Toggle
                    split
                    style={{
                      borderRadius: "0rem",
                      height: "2rem",
                      backgroundColor: "var(--background)",
                      borderColor: "var(--borderColor)",
                      
                      color:"#CF9658"
                      
                    }}
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>{" "}
            <div>
              <label
                htmlFor="customRange1"
                style={{ color: "var(--borderColor)",marginTop:"20px" }}
                className="form-label"
                
              >
                OPEN
              </label>
              <div
                style={{
                  borderColor: "var(--borderColor)",
                  borderWidth: "0.1rem",
                  borderStyle: "solid",
                  padding: "0.3rem",
                }}
              >
                <Dropdown as={ButtonGroup}>
                  <Button
                    style={{
                      backgroundColor: "var(--background)",
                      border: "none",
                      fontSize: "0.8rem",
                      marginRight:"125px"
                    }}
                  >
                    COLORS
                    
                  </Button>

                  <Dropdown.Toggle
                    split
                    style={{
                      borderRadius: "0rem",
                      height: "2rem",
                      backgroundColor: "var(--background)",
                      borderColor: "var(--borderColor)",
                      
                      color:"#CF9658"
                    }}
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div
                style={{
                  color: "white",
                  padding: "5%",
                  background: "var(--background3)",
                  borderStyle: "solid",
                  borderColor: "var(--borderColor)",
                  marginTop: "5%",
                  borderWidth: "0.1rem",
                }}
              >
                <span style={{ display: "flex" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                      stroke="#CF9658"
                      stroke-width="2"
                    />
                  </svg>
                  &nbsp;
                  <p style={{ color: "var(--background2)" }}>ALL COLORS</p>
                </span>
                <span style={{ display: "flex" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#211715" />
                  </svg>
                  &nbsp;<p>Black</p>
                </span>

                <span style={{ display: "flex" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="10" fill="#5F4529" />
                  </svg>
                  &nbsp;<p>Green</p>
                </span>
                <span style={{ display: "flex" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#A17545" />
                  </svg>
                  &nbsp;<p>Pink</p>
                </span>
                <span style={{ display: "flex" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#E9B781" />
                  </svg>
                  &nbsp;<p>Purple</p>
                </span>
              </div>
              <div style={{ marginTop: "5%" }}>
                <label
                  htmlFor="customRange1"
                  style={{ color: "var(--borderColor)" }}
                  className="form-label"
                >
                  CREATOR
                </label>
                <div
                  style={{
                    borderColor: "var(--borderColor)",
                    borderWidth: "0.1rem",
                    borderStyle: "solid",
                    padding: "0.3rem",
                  }}
                >
                  <Dropdown as={ButtonGroup}>
                    <Button
                      style={{
                        backgroundColor: "var(--background)",
                        border: "none",
                        fontSize: "0.8rem",
                      }}
                    >
                      VERIFIED ONLY 
                    </Button>

                    <Dropdown.Toggle
                      split
                      style={{
                        borderRadius: "0rem",
                        height: "2rem",
                        backgroundColor: "var(--background)",
                        borderColor: "var(--borderColor)",
                        marginLeft:"110px",
                        color:"#CF9658"
                      }}
                      id="dropdown-split-basic"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>{" "}
              <hr
                style={{
                  color: "var(--borderColor)",
                  borderWidth: "10%",
                  margin: "5%",
                }}
              ></hr>
              <div style={{ display: "flex", color: "white", marginTop: "5%" }}>
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
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                    fill="#F4F5F6"
                  />
                </svg>

                <p style={{ marginLeft: "5%" }}>Reset filter</p>
              </div>
            </div>{" "}
          </div>
          
          <div
             style={{
              paddingBottom: "2%",
              display: "grid",
              gridTemplateColumns: "30% 30% 30%",
              gridAutoRows: "min-content",
              // gridAutoRows: " minmax(350px,auto)",
              gap: "2%",
              gridRowGap:"20px",
              height: "100%",
              
            }}
          >
         {datas && datas.map((item)=>{
             return <HomeCard ipfs={item.ipfs} usdPrice={usdPrice}  name={item.distillery} imgpath={item.imgpath} idAuction={item.auctionid}
            collectionId={item.collectionId} token={item.token} imageType={item.type}
            />
           

         })}      
          </div>
        </div>
        
      <button  style={{border:"1px solid #CF9658",background:"none",color:"#CF9658",textAlign:"center",marginLeft:"600px",marginTop:"50px",marginBottom:"50px"}}>LOAD MORE</button>
      </div>
    </div>
  );
}

export default Home;
