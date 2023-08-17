import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import HomeCard from "../components/HomeCard";
import axios from "axios";
import { API_URL } from "../constants/userConstants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import moment from "moment/moment";
import { MARKET_ABI } from "../NFT_ABI";
import VideoComponent from "../components/VideoComponent";
import Web3 from "web3";
import SellerPrice from "../components/SellerPrice";
const web3 = new Web3(Web3.givenProvider);
function Home() {
  let [firstSectionToken,setfirstSectionToken] = useState()
  let [datas,setdatas] = useState()
  let [collectionDatas1,setCollectionDatas1] = useState()
  let [collectionDatas2,setCollectionDatas2] = useState()
  let [collectionDatas3,setCollectionDatas3] = useState()

  let [datas2,setdatas2] = useState()
  let [idAuction,setAuctionId] = useState()
  let [integer,setinteger] = useState(0)
  let [firstSectionBidPrice,setfirstSectionBidPrice] = useState(0)
  let [firstSectionUsd,setfirstSectionUsd] = useState(0)
  let [endtime,setEndTime] = useState( )
  let [endedOrnot,setEndedOrnot] = useState( )
  let [users,setusers] = useState( )
 let [usdPrice,setusdPrice] = useState()
 const [isShown, setIsShown] = useState(false);
 const [isShown2, setIsShown2] = useState(false);
 const [unix, setunix] = useState(false);

  const getusd = async()=>{
    let {data} = await axios.get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=F3HN9IGWSZ5NYWEJBEM4Q214H2Q1BESN67`)
    setfirstSectionUsd(data?.result?.maticusd*firstSectionBidPrice)
    setusdPrice(data?.result?.maticusd)
   }
 
  useEffect(()=>{
    getusd()
  },[firstSectionBidPrice])
  let user = []
  let datasImage1 = []
  let datasImage2 = []
  let datasImage3 = []

  // useEffect(()=>{
  //   datas &&datas.length&& datas.map((item)=>{
  //     item.type =="image" &&item.user._id==  datas[0].user._id && datasImage1.push(item)
  //   })
  //   datas &&datas.length&& datas.map((item)=>{
  //     item.type =="image" &&item.user._id==  datas[2].user._id && datasImage2.push(item)
  //   })
  //   datas &&datas.length&& datas.map((item)=>{
  //     item.type =="image" &&item.user._id==  datas[13].user._id && datasImage3.push(item)
  //   })
  //   setCollectionDatas1(datasImage1)
  //   setCollectionDatas2(datasImage2)
  //   setCollectionDatas3(datasImage3)
  // },[datas,datas2])

  useEffect(()=>{
    datas &&  datas.map((item)=>{
      item.user &&  user.push(item.user)
    })
 const uniqueAuthors = datas&& [...new Map(user.map(v => [v.address, v])).values()]
  setusers(uniqueAuthors)
  },[datas])

  const images = [
    {
      original: collectionDatas1 && collectionDatas1[0]?.imgpath,
      thumbnail:collectionDatas1 && collectionDatas1[0]?.imgpath,
    },
    {
      original: collectionDatas1 && collectionDatas1[1]?.imgpath,
      thumbnail:collectionDatas1 && collectionDatas1[1]?.imgpath,
    },
    {
      original: collectionDatas1 && collectionDatas1[2]?.imgpath,
      thumbnail:collectionDatas1 && collectionDatas1[2]?.imgpath,
    },
  ];
  const images2 = [
    {
      original: collectionDatas2 && collectionDatas2[2]?.imgpath,
      thumbnail:collectionDatas2 && collectionDatas2[2]?.imgpath,
    },
    {
      original: collectionDatas2 && collectionDatas2[1]?.imgpath,
      thumbnail:collectionDatas2 && collectionDatas2[1]?.imgpath,
    },
    {
      original: collectionDatas2 && collectionDatas2[0]?.imgpath,
      thumbnail:collectionDatas2 && collectionDatas2[0]?.imgpath,
    },
  ];
  const images3 = [
    {
      original: collectionDatas3 && collectionDatas3[0]?.imgpath,
      thumbnail:collectionDatas3 && collectionDatas3[0]?.imgpath,
    },
    {
      original: collectionDatas3 && collectionDatas3[1]?.imgpath,
      thumbnail:collectionDatas3 && collectionDatas3[1]?.imgpath,
    },
    {
      original: collectionDatas3 && collectionDatas3[2]?.imgpath,
      thumbnail:collectionDatas3 && collectionDatas3[2]?.imgpath,
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0909 7.76521C14.4968 7.3906 15.1294 7.4159 15.504 7.82172L18.7348 11.3217C19.0884 11.7047 19.0884 12.2952 18.7348 12.6782L15.504 16.1783C15.1294 16.5841 14.4968 16.6094 14.091 16.2348C13.6851 15.8602 13.6598 15.2276 14.0344 14.8217L15.716 13L6 13C5.44771 13 5 12.5523 5 12C5 11.4477 5.44771 11 6 11L15.716 11L14.0344 9.17829C13.6598 8.77247 13.6851 8.13981 14.0909 7.76521Z" fill="#D2A163"/>
</svg>
    ),
    prevArrow: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.90906 7.76521C9.50324 7.3906 8.87058 7.4159 8.49597 7.82172L5.2652 11.3217C4.9116 11.7047 4.9116 12.2952 5.26519 12.6782L8.49597 16.1783C8.87057 16.5841 9.50323 16.6094 9.90905 16.2348C10.3149 15.8602 10.3402 15.2276 9.96558 14.8217L8.28397 13L18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11L8.284 11L9.96557 9.17829C10.3402 8.77247 10.3149 8.13981 9.90906 7.76521Z" fill="#D2A163"/>
</svg>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  let getNft =(async()=>{
     let data = await axios.get(`${API_URL}/get-nft`)
     setdatas(data?.data?.draft)
     setdatas2(data?.data?.draft)

  })
  useEffect(()=>{
    setAuctionId(firstSectionToken?.auctionid)
  },[firstSectionToken])
  useEffect(()=>{
    getNft()
  },[])
  useEffect(()=>{
    if(datas2){
      datas2[integer]?setfirstSectionToken(datas2[integer]):setfirstSectionToken(datas2[integer-1]) 

    }
    // data?.data?.draft[integer]? setfirstSectionToken(data?.data?.draft[integer]):setfirstSectionToken(data?.data?.draft[integer-1])
  },[integer,datas2])
 
  let setTokenPlusHandler = (()=>{
    if(datas2.length>integer||integer !== datas2.length){
    
      setinteger(integer+1)
    }
  })
  let setTokenMinusHandler = (()=>{
    if(integer!==0){
      setinteger(integer-1)
    }
  })
  const getReserveAuction = async (marketContractAddress, auctionId) => {
    marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD"
    auctionId = idAuction; 
    // Contract instance
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    // Find gas limit
    let result = await contractInstance.methods
      .getReserveAuction(auctionId)
      .call();
       // console.log(moment.unix(result.endTime).format("HH:mm:ss"))
       
      setEndTime(moment.unix(result.endTime).fromNow())
      setunix(result.endTime)
      setEndedOrnot(moment.unix(result.endTime).isBefore(moment.now()));
      // setBidAccount(result.seller)
    return result;
  };
  const [time, setTime] = useState(new Date());

// SET TIME AUCTION 
const [hours,sethours] = useState()
const [minutes,setminutes] = useState()
const [seconds,setSeconds] = useState()
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, []);
useEffect(()=>{
  
  let date = moment.unix(unix);
  console.log(date);

  var now = new Date().getTime();
  // Time to the date
  var timeToDate = date - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(timeToDate / (1000 * 60 * 60 * 24));
  // var hours = Math.floor((timeToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeToDate % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeToDate % (1000 * 60)) / 1000);
   let hours =   moment.unix(unix).diff(moment.now(),'hour') // "7d"
   sethours(hours);
   setminutes(minutes)
   setSeconds(seconds)
// console.log(mins7.diff(date, "minutes") + "m"); // "7m"
// console.log(secs1.diff(date, "seconds") + "s"); // "1s"
console.log(`${hours}h ${minutes}m  ${seconds}s`)
},[unix,time])



  useEffect(()=>{
getReserveAuction()
  },[idAuction])
  useEffect(()=>{
    let datasFilter = []
    axios.get(`${API_URL}/bids`).then((data)=>{
    data &&data.data.map((item1)=>{
  let end = moment.unix(item1.endTime).isBefore(moment.now())
      if(end == false){
        datas2.map((item)=>{
         if(item.auctionid==item1.auctionId){
          datasFilter.push(item)

         }
          
        })
        setdatas2(datasFilter)
      }
    })
    
     }).catch((err)=>{
      console.log(err)
      // setAuctionEnded(true)

     })
  },[datas,idAuction])
  useEffect(()=>{
   
     let auctionId = idAuction
    let user = firstSectionToken?.user?.address
    let collectionId = firstSectionToken?.collectionId
    let token = firstSectionToken?.token
    if(idAuction&&collectionId&&user&&token){
      axios.get(`${API_URL}/bid/${auctionId}/${collectionId}/${token}`).then((data)=>{
        setfirstSectionBidPrice(data?.data?.[0].bidprice)
        // let end = moment.unix(data?.data?.[0].endTime).isBefore(moment.now())
        // let datasFilter = []
        // if(end == true){
        //   setinteger(integer.length<datas2.length?integer+1:integer-1)
        //   datas2.map((item)=>{
        //    if(item.auctionid!==data?.data?.[0].auctionId){
        //     datasFilter.push(item)

        //    }
            
        //   })
        //   setdatas2(datasFilter)
        // }

       }).catch((err)=>{
        console.log(err)
        // setAuctionEnded(true)

       })
    }
  
  },[idAuction])

  return (
    <div>
      <div
        style={{
          paddingTop: "5%",
          background: "var(--background)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--background2)",fontFamily:"Manrope !important" }}>
            CREATE, EXPLORE, & COLLECT DIGITAL ART NFTs.
          </p>
          <h1 style={{ color: "white", fontFamily: "Freight Big Pro",fontWeight:"700" }}>
            Discover, Invest, and Savor the World <br></br> of Rare Whiskey NFTs
          </h1>
          <Button
          onClick={()=>window.location.href="/discover"}
            style={{
              color: "white",
              fontSize: "12px",
              backgroundColor: "var(--background)",
              height: "2.5rem",
              marginTop: "1rem",
              marginRight: "1rem",
              borderColor: "var(--background2)",
              borderRadius: "0%",
              paddingLeft: "5%",
              paddingRight: "5%",
              borderWidth: "0.1rem",
              width: "20%",
              fontFamily:"Manrope !important",
            }}
          >
            START YOUR SEARCH
          </Button>{" "}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "46% 40%",
            padding: "5%",
            gap: "10%",
            paddingTop: "10%",
          }}
        >
          {firstSectionToken&& <VideoComponent firstSectionToken={firstSectionToken}/>
          }
          {/* {firstSectionToken&& firstSectionToken.type && firstSectionToken.type=="image" &&
            <img
            style={{ width: "90%", marginLeft: "10%",height:"600px",background:"black" }}
            src={`${firstSectionToken &&firstSectionToken.imgpath &&firstSectionToken.imgpath}
            `}
          /> }
          {firstSectionToken &&firstSectionToken.type && firstSectionToken.type=="video" &&
        <video controls loop style={{objectFit:"80%", width: "100%", marginLeft: "10%",height:"600px" }}
         >
        <source src={`${firstSectionToken && firstSectionToken &&firstSectionToken.imgpath}`} type="video/mp4"/>
   </video>  
           } */}
           {/* {
            datas2 &&datas2.map((item)=>(
              item.type=="video"&&
              <video controls loop style={{objectFit:"80%", width: "100%", marginLeft: "10%",height:"600px" }}
              >
             <source src={`${item && item &&item.imgpath}`} type="video/mp4"/>
        </video> 
            ))
           } */}

          <div>
            <h3 style={{ color: "white", fontFamily: "Freight Big Pro",fontSize:"48px",fontWeight:"300" }}>
               {firstSectionToken &&firstSectionToken.distillery &&firstSectionToken.distillery}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40% 40%",
                gap: "10%",
                marginTop: "5%",
              }}
            >
              <div style={{ display: "flex" }}>
                <img style={{borderRadius:"50%"}}
                 width={40} height={40} src={`${firstSectionToken?.user?.imgpath}`}/>
                <div>
                  <p
                    style={{
                      color: "var(--background2)",
                      fontSize: "0.7rem",
                      marginLeft: "10%",
                      marginBottom: "0%",
                    }}
                  >
                    Creator
                  </p>
                  <p
                    style={{ color: "white", marginLeft: "10%", width: "100%" }}
                  >
                    {firstSectionToken?.user?.name}
                   </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {/* <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="40" height="40" rx="20" fill="#5F4529" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 12C18.5478 12 16.7482 12.161 15.3037 12.3518C14.0037 12.5235 13.0235 13.5037 12.8518 14.8037C12.661 16.2482 12.5 18.0478 12.5 20C12.5 21.9522 12.661 23.7518 12.8518 25.1963C13.0235 26.4963 14.0037 27.4765 15.3037 27.6482C16.7482 27.839 18.5478 28 20.5 28C22.4522 28 24.2518 27.839 25.6963 27.6482C26.9963 27.4765 27.9765 26.4963 28.1482 25.1963C28.339 23.7518 28.5 21.9522 28.5 20C28.5 18.0478 28.339 16.2482 28.1482 14.8037C27.9765 13.5037 26.9963 12.5235 25.6963 12.3518C24.2518 12.161 22.4522 12 20.5 12ZM15.0418 10.369C12.845 10.6591 11.1591 12.345 10.869 14.5418C10.6695 16.0521 10.5 17.9413 10.5 20C10.5 22.0587 10.6695 23.9479 10.869 25.4582C11.1591 27.655 12.845 29.3409 15.0418 29.631C16.5521 29.8305 18.4413 30 20.5 30C22.5587 30 24.4479 29.8305 25.9582 29.631C28.155 29.3409 29.8409 27.655 30.131 25.4582C30.3305 23.9479 30.5 22.0587 30.5 20C30.5 17.9413 30.3305 16.0521 30.131 14.5418C29.8409 12.345 28.155 10.6591 25.9582 10.369C24.4479 10.1695 22.5587 10 20.5 10C18.4413 10 16.5521 10.1695 15.0418 10.369Z"
                    fill="#FCFCFD"
                  />
                </svg> */}
                {/* <div>
                  <p
                    style={{
                      color: "var(--background2)",
                      fontSize: "0.7rem",
                      marginLeft: "10%",
                      marginBottom: "0%",
                    }}
                  >
                    Instant price
                  </p>
                  <p
                    style={{ color: "white", marginLeft: "10%", width: "100%" }}
                  >
                    4.689 ETH
                  </p>
                </div> */}
              </div>
            </div>
            <div
              style={{
                background: "var(--background3)",
                padding: "5%",
                textAlign: "center",
                paddingTop: "5%",
              }}
            >
              <h4 style={{ color: "#FCFCFD", fontWeight: "300",fontSize:"20px",fontFamily:"Manrope" }}>CURRENT BID</h4>
              <h3 style={{ color: "white",fontSize:"48px",fontFamily:"Freight Big Pro" }}>
                {firstSectionBidPrice&&firstSectionBidPrice} <span>ETH</span>
              </h3>
              <h4 style={{ color: "var(--background2)" }}>${firstSectionUsd &&firstSectionUsd.toFixed(4)}</h4>
              <h5 style={{ color: "white" }}>{endedOrnot!==true? <span> AUCTION ENDING IN</span>:<span>AUCTION ENDED </span> }</h5>
              <div
                style={{
                  fontFamily: " Freight Big Pro",
                  // display: "grid",
                  // gridTemplateColumns: "23% 23% 23%",
                  gap: "5%",
                  marginTop: "5%",
                  // paddingLeft: "20%",
                }}
              >
                <div style={{textAlign:"center"}}>
                  {console.log(endtime)}
                  <div style={{display:"flex",justifyContent:"center"}}>
                  <h4 style={{ color: "white",marginLeft:"7%" }}>{hours && hours}<br></br><span style={{color:"var(--background2)"}}>HRS</span></h4>
                  <h4 style={{ color: "white",marginLeft:"7%" }}>{minutes && minutes}<br></br><span style={{color:"var(--background2)"}}>MINS</span></h4>
                  <h4 style={{ color: "white",marginLeft:"7%" }}>{seconds && seconds}<br></br><span style={{color:"var(--background2)"}}>SECS</span></h4>
                  </div>
                 
                  {/* <h4 style={{ color: "var(--background2)" }}>HRS</h4> */}
                </div>
                {/* <div>
                  <h4 style={{ color: "white" }}>24</h4>
                  <h4 style={{ color: "var(--background2)" }}>MINS</h4>
                </div>
                <div>
                  <h4 style={{ color: "white" }}>19</h4>
                  <h4 style={{ color: "var(--background2)" }}>SECS</h4>
                </div> */}
              </div>
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              
              <Button
              onClick={()=>{
                window.location.href = `/item-1/${firstSectionToken?.ipfs}/${firstSectionToken?.token}/${firstSectionToken?.collectionId}`
            }}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background)",
                  borderRadius: "0%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderWidth: "0.1rem",
                  width: "100%",
                  borderColor: "var(--borderColor)",

                }}
              >
                VIEW BOTTLE
              </Button>{" "}
              {/* <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--borderColor)",
                  borderRadius: "0%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderWidth: "0.1rem",
                  width: "100%",
                }}
              >
                VIEW BOTTLE
              </Button>{" "} */}
            </div>
            <div style={{ marginTop: "10%" }}>
              <svg
                     className={isShown?"hover":null}
                     onMouseEnter={() => setIsShown(true)}
                     onMouseLeave={() => setIsShown(false)}
        onClick={()=>setTokenMinusHandler()}

              style={{cursor:"pointer"}}
                  width="40"
                height="40"
                viewBox="0 0 30 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.90906 7.26521C9.50324 6.8906 8.87058 6.9159 8.49597 7.32172L5.2652 10.8217C4.9116 11.2047 4.9116 11.7952 5.26519 12.1782L8.49597 15.6783C8.87057 16.0841 9.50323 16.1094 9.90905 15.7348C10.3149 15.3602 10.3402 14.7276 9.96558 14.3217L8.28397 12.5L18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5L8.284 10.5L9.96557 8.67829C10.3402 8.27247 10.3149 7.63981 9.90906 7.26521Z"
                  fill="#D2A163"
                />
              </svg>
              <svg 
              className={isShown2?"hover":null}
                 onMouseEnter={() => setIsShown2(true)}
                 onMouseLeave={() => setIsShown2(false)}
              onClick={()=>setTokenPlusHandler()}
                style={{ marginLeft: "5%",cursor:"pointer" }}
 
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.0909 15.2652C22.4968 14.8906 23.1294 14.9159 23.504 15.3217L26.7348 18.8217C27.0884 19.2047 27.0884 19.7952 26.7348 20.1782L23.504 23.6783C23.1294 24.0841 22.4968 24.1094 22.091 23.7348C21.6851 23.3602 21.6598 22.7276 22.0344 22.3217L23.716 20.5L14 20.5C13.4477 20.5 13 20.0523 13 19.5C13 18.9477 13.4477 18.5 14 18.5L23.716 18.5L22.0344 16.6783C21.6598 16.2725 21.6851 15.6398 22.0909 15.2652Z"
                  fill="#D2A163"
                />
           
              </svg>
            </div>
          </div>
        </div>
        {/* section 2 */}
        <div
          style={{
            display: "grid",
            gap: "5%",
            gridTemplateColumns: "35% 55%",
            paddingBottom: "10%",
            paddingTop: "5%",
            padding: "5%",
          }}
        >
          <div>

          {datas&& datas.length&& datas[0] &&datas[0].type && datas[0].type=="image" &&
            <img alt={`${datas[0].distillery}`}
            style={{ width: "90%", marginLeft: "10%",height:"600px",background:"black" }}
            src={`${datas&& datas.length&&datas[0].imgpath}
            `}
          /> }
          {datas&& datas.length&&datas[0]&& datas[0].type && datas[0].type=="video" &&
        <video    autoPlay loop   alt={`${datas[0].distillery}`}       style={{objectFit:"80%", width: "100%", marginLeft: "10%",height:"500px" }}
          >
        <source src={`${datas&& datas.length&&datas[0].imgpath}`} type="video/mp4"/>
   </video>  
           }
                  {/* <img  height={420}  width={430}
 src={`${datas && datas[1]?.imgpath}`} /> */}

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5%",
                }}
              >
            <img
            style={{ width: "30px", marginLeft: "10%",height:"30px",background:"black" }}
            src={`${datas && datas[0]?.user?.imgpath}
            `}
          /> 
       
                <h4
                  style={{
                    color: "white",
                    marginLeft: "5%",
                    width: "100%",
                    fontSize: "1rem",
                  }}
                >
                  {`${datas && datas[0]?.distillery}`} <br></br>
                  <span style={{ fontSize: "0.7rem" }}>1 IN STOCK </span>{" "}
                </h4>

                {/* <p style={{ color: "var(--background2)", width: "40%" }}>
                  Highest bid <br></br>{" "}
                  <span
                    style={{
                      borderWidth: "0.1rem",
                      borderStyle: "solid",
                      borderColor: "var(--background2)",
                      color: "var(--background2)",
                      textAlign: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    1.125 ETH
                  </span>
                </p> */}
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "70% 50%" }}>
              <div
                style={{
                  borderWidth: "0.1rem",
                  borderRightColor: "var(--borderColor)",
                  borderStyle: "solid",
                  borderTop: "none",
                  borderLeft: "none",
                  borderBottom: "none",
                }}
              >
                <div style={{ marginTop: "5%" }}>
                  <div style={{ display: "flex" }}>
                  {datas&& datas.length&&datas[1]&& datas[1].type && datas[1].type=="image" &&
            <img height={136} width={130}
            style={{ background:"black" }}
            src={`${datas&& datas.length&&datas[1].imgpath}
            `}
          /> }
          {datas&& datas.length&& datas[1]&& datas[1].type && datas[1].type=="video" &&
        <video height={136} width={190} autoPlay loop style={{objectFit:"fill" }}
         >
        <source src={`${datas&& datas.length&&datas[1].imgpath}`} type="video/mp4"/>
   </video>  
           }
                    <div style={{ marginLeft: "3%", width: "100%" }}>
                      <h5 style={{ color: "white", marginBottom: "3%" }}>
                       {datas && datas[1]?.distillery}
                      </h5>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "10% 30% 30%",
                          gap: "5%",
                        }}
                      >
                <img style={{borderRadius:"50%"}} width={40} height={40} src={`${datas && datas[1]?.user?.imgpath}`} />
                        {/* <span
                          style={{
                            borderWidth: "0.1rem",
                            borderStyle: "solid",
                            marginTop: "5%",
                            borderColor: "var(--background2)",
                            color: "var(--background2)",
                            textAlign: "center",
                            fontSize: "0.6rem",
                            width: "100%",
                            height: "1.3rem",
                            padding: "1%",
                          }}
                        >
                          1.125 ETH
                        </span> */}
                        <p
                          style={{
                            marginTop: "5%",
                            color: "var(--background2)",
                            fontSize: "0.6rem",
                          }}
                        >
                         {datas && datas[1] && datas[1]?.user&& datas[1]?.user?.name}
                        </p>
                      </div>
                      <Button
              onClick={()=>{
 window.location.href = `/item-1/${datas && datas[1]?.ipfs}/${datas && datas[1]?.token}/${datas && datas[1]?.collectionId}`
                        }}
                        style={{
                          color: "white",
                          fontSize: "0.7rem",
                          backgroundColor: "var(--background)",
                          marginTop: "0.5rem",
                          marginBottom: "5%",
                          marginRight: "1rem",
                          borderColor: "var(--background2)",
                          borderRadius: "0%",
                          paddingLeft: "5%",
                          paddingRight: "5%",
                          borderWidth: "0.2rem",
                          width: "40%",
                        }}
                      >
                        VIEW {" "}
                      </Button>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <div style={{ display: "flex" }}>
                  {datas&& datas.length&& datas[2]&&  datas[2].type && datas[2].type=="image" &&
            <img height={136} width={130}
            style={{ background:"black" }}
            src={`${datas&& datas.length&&datas[2].imgpath}
            `}
          /> }
          {datas&& datas.length&& datas[2]&& datas[2].type && datas[2].type=="video" &&
        <video height={136} width={130} autoPlay loop style={{objectFit:"80%" }}
         >
        <source src={`${datas&& datas.length&&datas[2].imgpath}`} type="video/mp4"/>
   </video>  
           }
                   
                    <div style={{ marginLeft: "3%", width: "100%" }}>
                      <h5 style={{ color: "white", marginBottom: "3%" }}>
                      {datas && datas[2]?.distillery}                      </h5>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "10% 30% 30%",
                          gap: "5%",
                        }}
                      >
                <img style={{borderRadius:"50%"}} width={40} height={40} src={`${datas && datas[2]?.user?.imgpath}`} />
                        {/* <span
                          style={{
                            borderWidth: "0.1rem",
                            borderStyle: "solid",
                            marginTop: "5%",
                            borderColor: "var(--background2)",
                            color: "var(--background2)",
                            textAlign: "center",
                            fontSize: "0.6rem",
                            width: "100%",
                            height: "1.3rem",
                            padding: "1%",
                          }}
                        >
                          1.125 ETH
                        </span> */}
                        <p
                          style={{
                            marginTop: "5%",
                            color: "var(--background2)",
                            fontSize: "0.6rem",
                          }}
                        >
                         {datas && datas[2] && datas[2]?.user&& datas[2]?.user?.name}
                        </p>
                      </div>
                      <Button
 onClick={()=>{
 window.location.href = `/item-1/${datas && datas[2]?.ipfs}/${datas && datas[2]?.token}/${datas && datas[2]?.collectionId}`
                                                             }}
                        style={{
                          color: "white",
                          fontSize: "0.7rem",
                          backgroundColor: "var(--background)",
                          marginTop: "0.5rem",
                          marginBottom: "5%",
                          marginRight: "1rem",
                          borderColor: "var(--background2)",
                          borderRadius: "0%",
                          paddingLeft: "5%",
                          paddingRight: "5%",
                          borderWidth: "0.2rem",
                          width: "40%",
                        }}
                      >
                        VIEW {" "}
                      </Button>{" "}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <div style={{ display: "flex" }}>
                  {datas&& datas.length&& datas[3]&&  datas[3].type && datas[3].type=="image" &&
            <img height={136} width={180}
            style={{ background:"black" }}
            src={`${datas&& datas.length&&datas[3].imgpath}
            `}
          /> }
          {datas&& datas.length&&datas[3]&& datas[3].type && datas[3].type=="video" &&
        <video height={136} width={130} autoPlay loop style={{objectFit:"80%" }}
         >
        <source src={`${datas&& datas.length&&datas[3].imgpath}`} type="video/mp4"/>
   </video>  
           }                    <div style={{ marginLeft: "3%", width: "100%" }}>
                      <h5 style={{ color: "white", marginBottom: "3%" }}>
                       {datas && datas[4]?.distillery}
                      </h5>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "10% 30% 30%",
                          gap: "5%",
                        }}
                      >
                <img style={{borderRadius:"50%"}} width={40} height={40} src={`${datas && datas[17]?.user?.imgpath}`} />
                        {/* <span
                          style={{
                            borderWidth: "0.1rem",
                            borderStyle: "solid",
                            marginTop: "5%",
                            borderColor: "var(--background2)",
                            color: "var(--background2)",
                            textAlign: "center",
                            fontSize: "0.6rem",
                            width: "100%",
                            height: "1.3rem",
                            padding: "1%",
                          }}
                        >
                          1.125 ETH
                        </span> */}
                        <p
                          style={{
                            marginTop: "5%",
                            color: "var(--background2)",
                            fontSize: "0.6rem",
                          }}
                        >
                         {datas && datas[17] && datas[17]?.user&& datas[17]?.user?.name}
                        </p>
                      </div>
                      <Button
 onClick={()=>{
 window.location.href = `/item-1/${datas && datas[3]?.ipfs}/${datas && datas[3]?.token}/${datas && datas[3]?.collectionId}`
                                                             }}
                        style={{
                          color: "white",
                          fontSize: "0.7rem",
                          backgroundColor: "var(--background)",
                          marginTop: "0.5rem",
                          marginBottom: "5%",
                          marginRight: "1rem",
                          borderColor: "var(--background2)",
                          borderRadius: "0%",
                          paddingLeft: "5%",
                          paddingRight: "5%",
                          borderWidth: "0.2rem",
                          width: "40%",
                        }}
                      >
                        VIEW {" "}
                      </Button>{" "}
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
                <p
                  style={{
                    color: "var(--background2)",
                    marginLeft: "15%",
                    fontSize: "0.7rem",
                  }}
                >
                  Latest upload from creators 🔥
                </p>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "12%",
                    alignItems: "center",
                  }}
                >
                  <p style={{fontWeight:"500",border:"solid black 1px", background:"white",borderRadius:"50%",width:"2%",textAlign:"center",position:"absolute"}}>1</p>
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#E9B781"/>
</svg>


                  <div    onClick={()=>{
                window.location.href = `/item-1/${datas && datas[0]?.ipfs}/${datas && datas[0]?.token}/${datas && datas[0]?.collectionId}`
            }} style={{ marginLeft: "5%",cursor:"pointer" }}>
                    <h6 style={{ color: "white", marginTop: "5%" }}>
                      {datas && datas[0]?.distillery}
                    </h6>
                    {/* <p style={{ color: "white" }}>
                      2.456{" "}
                      <span style={{ color: "var(--background2)" }}>ETH</span>
                    </p> */}
                  </div>
                </div>
                <hr
                  style={{ color: "white", width: "80%", marginLeft: "10%" }}
                ></hr>
               <div
                  style={{
                    display: "flex",
                    marginLeft: "12%",
                    alignItems: "center",
                  }}
                >
                       <p style={{fontWeight:"500",border:"solid black 1px", background:"white",borderRadius:"50%",width:"2%",textAlign:"center",position:"absolute"}}>1</p>
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#E9B781"/>
</svg>
                  <div    onClick={()=>{
                window.location.href = `/item-1/${datas && datas[1]?.ipfs}/${datas && datas[1]?.token}/${datas && datas[1]?.collectionId}`
            }} style={{ marginLeft: "5%",cursor:"pointer" }}>
                    <h6 style={{ color: "white", marginTop: "5%" }}>
                    {datas && datas[1]?.distillery}
                    </h6>
                    {/* <p style={{ color: "white" }}>
                      2.456{" "}
                      <span style={{ color: "var(--background2)" }}>ETH</span>
                    </p> */}
                  </div>
                </div>
                <hr
                  style={{ color: "white", width: "80%", marginLeft: "10%" }}
                ></hr>
               <div
                  style={{
                    display: "flex",
                    marginLeft: "12%",
                    alignItems: "center",
                  }}
                >
                         <p style={{fontWeight:"500",border:"solid black 1px", background:"white",borderRadius:"50%",width:"2%",textAlign:"center",position:"absolute"}}>1</p>
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#E9B781"/>
</svg>
                  <div    onClick={()=>{
                window.location.href = `/item-1/${datas && datas[2]?.ipfs}/${datas && datas[2]?.token}/${datas && datas[2]?.collectionId}`
            }} style={{ marginLeft: "5%",cursor:"pointer" }}>                    <h6 style={{ color: "white", marginTop: "5%" }}>
                      {datas && datas[2]?.distillery}
                    </h6>
                    {/* <p style={{ color: "white" }}>
                      2.456{" "}
                      <span style={{ color: "var(--background2)" }}>ETH</span>
                    </p> */}
                  </div>
                </div>
                <hr
                  style={{ color: "white", width: "80%", marginLeft: "10%" }}
                ></hr>
              
              <div
                  style={{
                    display: "flex",
                    marginLeft: "12%",
                    alignItems: "center",
                  }}
                >
                        <p style={{fontWeight:"500",border:"solid black 1px", background:"white",borderRadius:"50%",width:"2%",textAlign:"center",position:"absolute"}}>1</p>
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#E9B781"/>
</svg>
                  <div    onClick={()=>{
                window.location.href = `/item-1/${datas && datas[3]?.ipfs}/${datas && datas[3]?.token}/${datas && datas[3]?.collectionId}`
            }} style={{ marginLeft: "5%",cursor:"pointer" }}>                    <h6 style={{ color: "white", marginTop: "5%" }}>
                      {datas && datas[3]?.distillery}
                    </h6>
                    {/* <p style={{ color: "white" }}>
                      2.456{" "}
                      <span style={{ color: "var(--background2)" }}>ETH</span>
                    </p> */}
                  </div>
                </div>
                <hr
                  style={{ color: "white", width: "80%", marginLeft: "10%" }}
                ></hr>
                 <p
 onClick={()=>window.location.href="/discover"}

                    style={{
                      borderWidth: "0.1rem",
                      borderStyle: "solid",
                      borderColor: "var(--background2)",
                      color: "var(--background2)",
                      textAlign: "center",
                      fontSize: "0.8rem",
                      width:"150px",
                      marginLeft:"40px",
                      padding:"5px",cursor:"pointer"
                    }}
                  >
                    DISCOVER MORE <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.39461 4.84331C9.66516 4.59357 10.0869 4.61044 10.3367 4.88099L12.4905 7.21429C12.7262 7.46967 12.7263 7.86329 12.4905 8.11867L10.3367 10.452C10.0869 10.7226 9.66517 10.7394 9.39462 10.4897C9.12407 10.24 9.1072 9.81821 9.35693 9.54766L10.478 8.33315L4.00065 8.33315C3.63246 8.33315 3.33398 8.03467 3.33398 7.66648C3.33398 7.29829 3.63246 6.99982 4.00065 6.99982L10.478 6.99982L9.35694 5.78536C9.1072 5.51482 9.12407 5.09305 9.39461 4.84331Z" fill="#CF9658"/>
</svg></span>
                  </p>


              
               
              </div>
            </div>
          </div>
        </div>
        {/* section 3  carousel  */}

        <div style={{ background: "black", padding: "5%",overflow:"hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ color: "var(--background2)", marginLeft: "5%",fontSize:"24px",fontWeight:"700" }}>
              Popular <br></br>
              <span
                style={{
                  color: "#FCFCFD",
                  fontSize: "48px",
                  fontFamily: "Freight Big Pro",
                  fontWeight:"700"
                }}
              >
                Sellers{" "}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.0118 16.8215C26.361 16.1706 25.3057 16.1706 24.6548 16.8215L20 21.4763L15.3452 16.8215C14.6943 16.1706 13.639 16.1706 12.9882 16.8215C12.3373 17.4724 12.3373 18.5276 12.9882 19.1785L18.8215 25.0118C19.4724 25.6627 20.5276 25.6627 21.1785 25.0118L27.0118 19.1785C27.6627 18.5276 27.6627 17.4724 27.0118 16.8215Z" fill="#FCFCFD"/>
</svg>
            </h4>
            <div>
              <h5 style={{color:"#46392E",fontSize:"13px"}}>TIMEFRAME</h5>
           
            <div
              style={{
                borderColor: "var(--borderColor)",
                borderWidth: "0.1rem",
                borderStyle: "solid",
                height: "2.6rem",
                backgroundColor: "var(--background)",
                width: "100%",
                marginRight: "6%",
                
              }}
            >
              
              
              <Dropdown as={ButtonGroup} style={{background:"black"}}>
                <Button
                  style={{
                    backgroundColor: "black",
                    border: "none",
                    fontSize: "0.8rem",
                    height:"35px"
                  }}
                >
                  TODAY
                </Button>
                &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Dropdown.Toggle
                  split
                  style={{
                    borderRadius: "0rem",
                    height: "2rem",
                    backgroundColor: "var(--background)",
                    borderColor: "var(--borderColor)",
                    margin:"3px"
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
            </div>
          </div>
          <Slider  style={{ padding: "2%", height: "50vh" }} {...settings}>

         {users &&users.map((item)=>
               <div className="slick-custom">
              <div style={{ padding: "5%" }}>
             <div style={{display:"flex",justifyContent:"space-between"}}>
             <svg
                  width="53"
                  style={{ marginRight: "5%" }}
                  height="24"
                  viewBox="0 0 53 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="53" height="24" rx="12" fill="#CF9658" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.6673 7.33333H13.334C12.9658 7.33333 12.6673 7.63181 12.6673 8V10.6667C12.6673 12.5076 14.1597 14 16.0007 14C17.8416 14 19.334 12.5076 19.334 10.6667V8C19.334 7.63181 19.0355 7.33333 18.6673 7.33333ZM13.334 6C12.2294 6 11.334 6.89543 11.334 8V10.6667C11.334 13.244 13.4233 15.3333 16.0007 15.3333C18.578 15.3333 20.6673 13.244 20.6673 10.6667V8C20.6673 6.89543 19.7719 6 18.6673 6H13.334Z"
                    fill="#FCFCFD"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.66602 9.3335C8.66602 8.22893 9.56145 7.3335 10.666 7.3335H12.666V12.6668H11.3327C9.85992 12.6668 8.66602 11.4729 8.66602 10.0002V9.3335ZM10.666 8.66683H11.3327V11.3335C10.5963 11.3335 9.99935 10.7365 9.99935 10.0002V9.3335C9.99935 8.96531 10.2978 8.66683 10.666 8.66683Z"
                    fill="#FCFCFD"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.3327 9.3335C23.3327 8.22893 22.4373 7.3335 21.3327 7.3335H19.3327V12.6668H20.666C22.1388 12.6668 23.3327 11.4729 23.3327 10.0002V9.3335ZM21.3327 8.66683H20.666V11.3335C21.4024 11.3335 21.9993 10.7365 21.9993 10.0002V9.3335C21.9993 8.96531 21.7009 8.66683 21.3327 8.66683Z"
                    fill="#FCFCFD"
                  />
                  <path
                    d="M16.0007 14C15.6325 14 15.334 14.2985 15.334 14.6667V16.6667H14.0007C13.6325 16.6667 13.334 16.9651 13.334 17.3333C13.334 17.7015 13.6325 18 14.0007 18H18.0007C18.3688 18 18.6673 17.7015 18.6673 17.3333C18.6673 16.9651 18.3688 16.6667 18.0007 16.6667H16.6673V14.6667C16.6673 14.2985 16.3688 14 16.0007 14Z"
                    fill="#FCFCFD"
                  />
                  <path
                    d="M30.334 16.994L30.982 14.564H28.72L29.038 13.37H31.306L31.72 11.792H29.458L29.782 10.61H32.038L32.644 8.36H33.874L33.268 10.61H34.918L35.524 8.36H36.754L36.148 10.61H38.41L38.098 11.792H35.83L35.404 13.37H37.666L37.354 14.564H35.086L34.438 16.994H33.214L33.856 14.564H32.206L31.558 16.994H30.334ZM32.53 13.37H34.174L34.6 11.792H32.95L32.53 13.37ZM41.4788 17V9.74L39.8528 10.73V9.332L41.4788 8.36H42.7568V17H41.4788Z"
                    fill="#FCFCFD"
                  />
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4004 4C10.4482 4 8.64855 4.161 7.2041 4.35177C5.90411 4.52346 4.92385 5.50372 4.75217 6.80371C4.5614 8.24816 4.40039 10.0478 4.40039 12C4.40039 13.9522 4.5614 15.7518 4.75217 17.1963C4.92385 18.4963 5.90411 19.4765 7.2041 19.6482C8.64855 19.839 10.4482 20 12.4004 20C14.3526 20 16.1522 19.839 17.5967 19.6482C18.8967 19.4765 19.8769 18.4963 20.0486 17.1963C20.2394 15.7518 20.4004 13.9522 20.4004 12C20.4004 10.0478 20.2394 8.24816 20.0486 6.80371C19.8769 5.50372 18.8967 4.52346 17.5967 4.35177C16.1522 4.16101 14.3526 4 12.4004 4ZM6.94223 2.36899C4.74543 2.65912 3.05952 4.34504 2.76938 6.54184C2.56992 8.05208 2.40039 9.94127 2.40039 12C2.40039 14.0587 2.56992 15.9479 2.76938 17.4582C3.05951 19.655 4.74543 21.3409 6.94223 21.631C8.45247 21.8305 10.3417 22 12.4004 22C14.4591 22 16.3483 21.8305 17.8586 21.631C20.0553 21.3409 21.7413 19.655 22.0314 17.4582C22.2309 15.9479 22.4004 14.0587 22.4004 12C22.4004 9.94127 22.2309 8.05208 22.0314 6.54184C21.7413 4.34504 20.0553 2.65912 17.8586 2.36899C16.3483 2.16953 14.4591 2 12.4004 2C10.3417 2 8.45247 2.16953 6.94223 2.36899Z"
                    fill="#D2A163"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4004 17C12.9527 17 13.4004 16.5523 13.4004 16V13H16.4004C16.9527 13 17.4004 12.5523 17.4004 12C17.4004 11.4477 16.9527 11 16.4004 11H13.4004V8C13.4004 7.44772 12.9527 7 12.4004 7C11.8481 7 11.4004 7.44772 11.4004 8V11H8.40039C7.84811 11 7.40039 11.4477 7.40039 12C7.40039 12.5523 7.84811 13 8.40039 13H11.4004V16C11.4004 16.5523 11.8481 17 12.4004 17Z"
                    fill="#D2A163"
                  />
                </svg>
                <a href={`/user/${item.name}`}>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.3736 13.516C17.9254 13.494 18.3549 13.0287 18.3328 12.4769L18.1424 7.71753C18.1216 7.19663 17.7041 6.77913 17.1832 6.75829L12.4238 6.56789C11.872 6.54581 11.4067 6.97527 11.3846 7.52712C11.3626 8.07896 11.792 8.54421 12.3439 8.56629L14.8211 8.6654L7.95086 15.5357C7.56033 15.9262 7.56033 16.5594 7.95085 16.9499C8.34138 17.3404 8.97454 17.3404 9.36507 16.9499L16.2353 10.0796L16.3344 12.5568C16.3565 13.1086 16.8217 13.5381 17.3736 13.516Z"
                      fill="#D2A163"
                      />
                  </svg>
                </a>
             </div>
                <hr style={{ color: "white" }}></hr>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <img
                      width={100}
                      height={100}
                      style={{ marginLeft: "5%", marginBottom: "5%",borderRadius:"50%" }}
                      src={`${item?.imgpath}`}
                    />
                    <p style={{ color: "white" }}>{item?.name}</p>
                    <p style={{ color: "white" }}>
                      <SellerPrice item={item?.address} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          </Slider>
        </div>

        <div style={{ padding: "5%"  }}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <h1
            style={{ color: "white", marginBottom: "7%", fontFamily: "Freight Big Pro" ,fontWeight:"700",fontSize:"48px"}}
          >
            Recommendation
          </h1>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.90906 7.76521C9.50324 7.3906 8.87058 7.4159 8.49597 7.82172L5.2652 11.3217C4.9116 11.7047 4.9116 12.2952 5.26519 12.6782L8.49597 16.1783C8.87057 16.5841 9.50323 16.6094 9.90905 16.2348C10.3149 15.8602 10.3402 15.2276 9.96558 14.8217L8.28397 13L18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11L8.284 11L9.96557 9.17829C10.3402 8.77247 10.3149 8.13981 9.90906 7.76521Z" fill="#D2A163"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0909 7.76521C14.4968 7.3906 15.1294 7.4159 15.504 7.82172L18.7348 11.3217C19.0884 11.7047 19.0884 12.2952 18.7348 12.6782L15.504 16.1783C15.1294 16.5841 14.4968 16.6094 14.091 16.2348C13.6851 15.8602 13.6598 15.2276 14.0344 14.8217L15.716 13L6 13C5.44771 13 5 12.5523 5 12C5 11.4477 5.44771 11 6 11L15.716 11L14.0344 9.17829C13.6598 8.77247 13.6851 8.13981 14.0909 7.76521Z" fill="#D2A163"/>
</svg>
          </div>
          </div>

          <div
            style={{
              paddingBottom: "10%",
              display: "grid",
              gridTemplateColumns: "19% 19% 19% 19%",
              gap: "8%",
              gridRowGap: "10%",
            }}
          >
            {datas && datas.slice(5,9).map((item) => (
              <HomeCard ipfs={item.ipfs} imageType={item.type} 
              usdPrice={usdPrice} name={item.distillery} imgpath={item.imgpath} idAuction={item.auctionid}
              collectionId={item.collectionId} token={item.token}
              />
              ))}
              {/* <h4 style={{ color: "var(--background2)" }}>{price1&&price1}</h4>
              <hr style={{ color: "white" }} /> */}
              {/* <div className="cardText2">
                <h4 style={{ color: "#CF9658" }}>Flavor Profile</h4>
                <h4 style={{ color: "white" }}>Peaty, Smoky, Floral</h4>
              </div> */}
          </div>
          
        </div>

        <div style={{ background: "black", padding: "5%" }}>
          <h2
            style={{
              marginTop: "3%",
              marginLeft: "5%",
              marginBottom: "5%",
              fontFamily: " Freight Big Pro",
              color: "white",
              fontWeight:"700",
              fontSize:"48px"
            }}
          >
            Hot collections
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "32% 32% 32%",
              gap: "1%",
            }}
          >
            <div>
              <ImageGallery items={images}  style={{ width: "200px", height: "150px", objectFit: "cover" }}  />
              <p style={{ color: "white", marginLeft: "10%" }}>
              {datas && datas[1]?.distillery} collection
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "10% 30% 30%",
                  gap: "5%",
                  marginLeft: "10%",
                }}
              >
                <img height={35} width={35} style={{borderRadius:"50%"}} src={datas && datas[0]?.user?.imgpath} />
                <p
                  style={{
                    marginTop: "5%",
                    color: "white",
                    fontSize: "0.6rem",
                  }}
                >
 By {datas && datas[0]?.user?.name}                </p>
                <span
                  style={{
                    borderWidth: "0.1rem",
                    borderStyle: "solid",
                    marginTop: "5%",
                    borderColor: "white",
                    color: "white",
                    textAlign: "center",
                    fontSize: "0.6rem",
                    width: "100%",
                    height: "1.3rem",
                    padding: "1%",
                  }}
                >
                 28 BOTTLES
                </span>
              </div>
            </div>

            <div>
              <ImageGallery items={images2} />
              <p style={{ color: "white", marginLeft: "10%" }}>
              {datas && datas[0]?.distillery} collection
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "10% 30% 30%",
                  gap: "5%",
                  marginLeft: "10%",
                }}
              >
              <img height={35} width={35} style={{borderRadius:"50%"}} src={datas && datas[2]?.user?.imgpath} />
              
                <p
                  style={{
                    marginTop: "5%",
                    color: "white",
                    fontSize: "0.6rem",
                  }}
                >
 By {datas && datas[2]?.user?.name}                </p>
                <span
                  style={{
                    borderWidth: "0.1rem",
                    borderStyle: "solid",
                    marginTop: "5%",
                    borderColor: "white",
                    color: "white",
                    textAlign: "center",
                    fontSize: "0.6rem",
                    width: "100%",
                    height: "1.3rem",
                    padding: "1%",
                  }}
                >
                 28 BOTTLES
                </span>
              </div>
            </div>
            <div>
              <ImageGallery items={images3} />
              <p style={{ color: "white", marginLeft: "10%" }}>
                {datas && datas[16]?.distillery} collection
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "10% 30% 30%",
                  gap: "5%",
                  marginLeft: "10%",
                }}
              >
               <img height={35} width={35} style={{borderRadius:"50%"}} src={datas && datas[13]?.user?.imgpath} />
                <p
                  style={{
                    marginTop: "5%",
                    color: "white",
                    fontSize: "0.6rem",
                  }}
                >
 By {datas && datas[13]?.user?.name}                </p>
                <span
                  style={{
                    borderWidth: "0.1rem",
                    borderStyle: "solid",
                    marginTop: "5%",
                    borderColor: "white",
                    color: "white",
                    textAlign: "center",
                    fontSize: "0.6rem",
                    width: "100%",
                    height: "1.3rem",
                    padding: "1%",
                  }}
                >
                 28 BOTTLES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "black",
          display: "flex",
          alignItems: "center",
          paddingTop:'7%'
        }}
      >
        <div style={{ width: "50%" }}>
          <div style={{ marginLeft: "5%", padding: "5%" }}>
            <p
              style={{
                color: "var(--background2)",
                fontSize:"16px",
                fontWeight:"200",
                fontFamily: "Freight Big Pro",
              }}
            >
              SAVE YOUR TIME WITH STACKS
            </p>
            <h2 style={{ color: "#FCFCFD", fontFamily: "Freight Big Pro",fontWeight:"700",fontSize:"64px" }}>
              Earn Rare Whisky <br></br> Bottles with IWC
            </h2>
            <p style={{ color: "var(--background2)" }}>
              A creative agency that lead and inspire
            </p>
            <div style={{ display: "flex" }}>
              <Button
          onClick={()=>window.location.href="/subscription"}
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
                }}
              >
                EARN NOW
              </Button>{" "}
              <Button
              onClick={()=>window.location.href="/discover"}
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius: "0%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderWidth: "0.1rem",
                }}
              >
                DISCOVER MORE
              </Button>{" "}
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "4%", background: "black",display:"flex",alignItems:"end" }}>
          <img
            height={420}
             src="/images/homebottom2.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
