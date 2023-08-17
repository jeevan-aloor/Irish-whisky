import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import "./Header.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { getConfig } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { API_URL } from "../constants/userConstants";
import { useLocation } from "react-router-dom";

function Header(accountBal) {
 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 const [data,setdata]=useState("")
 const [data2,setData2]=useState("")
const location = useLocation()
  let [path, setPath] = useState()
  useEffect(() => {
    if (window.location.pathname) {
      setPath(window.location.pathname)
    }

  }, [])
  let navigate = useNavigate()
  const formatAddress = (address) => {
    const firstPart = address.substring(0, 5);
    const lastPart = address.substring(address.length - 3);
    return `${firstPart}...${lastPart}`;
  };
  const formatAddress2 = (address) => {
    const firstPart = address.substring(0, 10);
    const lastPart = address.substring(address.length - 3);
    return `${firstPart}...${lastPart}`;
  };
  const  user = useSelector((state) => state.user.user);
  

  const [hasMetamask, setHasMetamask] = useState(!!window.ethereum);
  const [nonce, setNonce] = useState(null)
  const [token, settoken] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationCount, setnotificationCount] = useState()
  const [showNotification, setshownotification] = useState(false)


  // const Getnonce = async () => {
  //   const { data } = await axios.get(`${API_URL}/nonce`)
  //   return data.nonce
  // }
  
  const signOut = async ()=>{
    const { data } = await axios.get(`${API_URL}/sign-out`,{ withCredentials: true })
    localStorage.clear()
    if(data.message=="logout succesful"){
      window.location.href = "/"
    }
   }
  //  const [chainid,setchainid] = useState()

  //  let  checknetworkChange = async() => {
  //   if(window.ethereum){
  //     const currentChainId = await window.ethereum.request({
  //       method: 'eth_chainId',
  //     });
  //     setchainid(currentChainId)
  //      if(currentChainId !=='0x13881'){
  //     window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: '0x13881' }], 
  //     }).then((data)=>{
  //       connectMetamask()
  //       // toast.success(data.message)
  //     }).catch((err)=>{
  //       console.log(err.message)
  //       if(err.message == `Unrecognized chain ID "0x13881". Try adding the chain using wallet_addEthereumChain first.`){
  //         window.ethereum.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [{
  //           chainId: '0x13881',
  //           chainName: 'Mumbai Testnet',
  //           nativeCurrency: {
  //               name: 'Matic',
  //               symbol: 'MATIC',
  //               decimals: 18
  //           },
  //           rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  //           blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  //           }]
  //           }).then((data)=>{
  //             connectMetamask()
  //           })
  //           .catch((error) => {
  //           console.log(error)
  //           })        }
  //     })

    
  //   }else{
  //     connectMetamask()
  //   }
  
  //   }

   
  // }
  // const connectMetamask = async () => {

  //   const nonce = await Getnonce()
  //    setNonce(nonce)
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner()
  //   const address = await signer.getAddress()
  //   //  localStorage.setItem("address",address)
  //   const message = `Welcome to Iwc
    
  //   This request will not trigger a blockchain
  //   transaction or cost any gas fees.
    
  //   Your authentication status will 
  //   reset after 24 hours.

  //   Wallet address:${address}
  //   Nonce:${nonce}`
  //   const signmessage = await signer.signMessage(message);
  //   const data = {
  //     signmessage, message, address, nonce
  //   }

  //   const responce = await axios.post(`${API_URL}/login`, data,{ withCredentials: true })

  //   if(responce.data && responce.data.success =="user found"){
  //     localStorage.setItem('token',responce.data.token)
  //     dispatch(login({user: responce.data.user}))
  //     dispatch(storeToken({token: responce.data.token}))
  //     window.location.href = '/profile'
  //     toast.success("login succesfully")
  //   }else{
  //     localStorage.setItem('token',responce.data.token)
  //     dispatch(login({user: responce.data.user}))
  //     dispatch(storeToken({token: responce.data.token}))
  //     navigate("/edit-profile")

  //   }
   
  // }
  // const handleClick = () => {

  //   if (hasMetamask) {
  //     checknetworkChange(chainid)
  //   } else {
  //     window.location.href = 'https://metamask.io/download/';
  //   }
  // };
  let shareAccount = (()=>{
    navigator.clipboard.writeText(user&& user&&user.address&&user.address)
    toast.success("Account address copied")
  })
  let deleteNotification = (()=>{
    axios.delete(`${API_URL}/notification/${user._id}`)
    .then(function ({data}) {
      // console.log(data)
      //  if(datas.length<2){
      //   data.draft.map((item)=>(
      //     datas.push(item)
      //   ))
      //   }
  console.log(data)

     })
    .catch(function (error) {
      console.log(error);
    });
  })
  let updateNotification = (()=>{
    axios.put(`${API_URL}/notification/${user._id}`)
    .then(function ({data}) {
      // console.log(data)
      //  if(datas.length<2){
      //   data.draft.map((item)=>(
      //     datas.push(item)
      //   ))
      //   }
  console.log(data)

     })
    .catch(function (error) {
      console.log(error);
    });
  })
  // update on click notification
  let updateNotify = ()=>{
    let nftIds = []
    let datas = []
    if(user && user._id){
      axios.get(`${API_URL}/notification/${user._id}`)
      .then(function ({data}) {
        // console.log(data)
        //  if(datas.length<2){
        //   data.draft.map((item)=>(
        //     datas.push(item)
        //   ))
        //   }
        
        const result = data.draft&& data.draft.slice(data.draft.length-3, data.draft.length);
  
        data.draft&&  data.draft.map((item)=>{
          if(item.viewed==false){
            datas.push(item)
          }
        })
        setnotificationCount(datas)
    setNotification(result)
  
       })
      .catch(function (error) {
        console.log(error);
      });
    }
  
  }
 // intial notification
  useEffect(()=>{
    let nftIds = []
    let datas = []
    if(user && user._id){
      axios.get(`${API_URL}/notification/${user._id}`)
      .then(function ({data}) {
        // console.log(data)
        //  if(datas.length<2){
        //   data.draft.map((item)=>(
        //     datas.push(item)
        //   ))
        //   }
        
        const result = data.draft&& data.draft.slice(data.draft.length-3, data.draft.length);
  
        data.draft&&  data.draft.map((item)=>{
          if(item.viewed==false){
            datas.push(item)
          }
        })
        setnotificationCount(datas)
    setNotification(result)
  
       })
      .catch(function (error) {
        console.log(error);
      });
    }
  

  },[])
  
  useEffect(()=>{
setTimeout(() => {
  setshownotification(true)
}, 2000);
  },[])
    return (
    <Navbar style={{ backgroundColor: "var(--background)", borderStyle: "solid", borderWidth: "0.1rem", borderColor: "var(--borderColor)", borderTop: "none", borderLeft: "none", borderRight: "none",textTransform:"uppercase" }} expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="/Media Assets/iwc-logo.png" alt="iwc-logo" width="60" height="60" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", color: "#46392E" }}
            navbarScroll
          >
            <Nav.Link style={{ color: "var(--background2)" }} href="#action1">
              Whiskey Shop
            </Nav.Link>
            <Nav.Link style={{ color: "var(--background2)" }} href="/aboutus">
              About Us
            </Nav.Link>
            <Nav.Link style={{ color: "var(--background2)" }} href="/contactus">
              Contact Us
            </Nav.Link>
            <Nav.Link style={{ color: "var(--background2)" }} href="/page-links">
              Page links
            </Nav.Link>
          </Nav>
          <Form onSubmit={(e) => e.preventDefault()} className="d-flex">
            <InputGroup className="mb-3">
              <Form.Control
                style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderRight: "none",
                  borderWidth: "0.01rem",
                  borderRadius: "2%",
                  // borderColor: "var(--borderColor)",
                  borderColor: "var(--background)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)",
                  color:"#D2A163",
                }}
                // placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="no-outline"
                disabled={true}
              />
              <InputGroup.Text
                id="basic-addon2"
                style={{
                  height: "2rem",
                  padding:"1.2rem",
                  // borderLeft: "none",
                  borderRadius: "2%",
                  // borderColor: "var(--borderColor)",
                  borderColor: "var(--background)",
                  borderWidth: "0.01rem",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)",
                }}
              >
                {/* <img src="/images/searchIcon.png" /> */}
              </InputGroup.Text>
            {showNotification && user&& user._id?  <div style={{background:"var(--background2)",position:"absolute",left:"40%",
              height:"30%",top:"16%",width:"3%",textAlign:"center",fontWeight:"bold",marginBottom:"3%"}}>
                <p>{notificationCount&&notificationCount.length}</p>
              </div>:null } 
              <Popup  trigger={showNotification  && user&& user._id?<button  style={{ background: "none", border: "none" }}> <img 
                onClick={()=>[updateNotification(),updateNotify()]}
                style={{
                  height: "3rem",
                  marginTop: "0.8rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
                src="/images/Notification.png"
              /></button>:null} position="bottom center">
                <div  style={{  padding: "7%", width: "320px",boxShadow: "0px 16px 64px -48px rgba(31, 47, 70, 0.4)",backgroundColor:"#211715",border:"1px solid" }}>
                {notification && notification.length &&
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10%" }}>
                  <h4 style={{ color: "white", fontFamily: "fright" }}>Notification</h4>
                  <Button
                    style={{
                      color: "var(--background)",
                      backgroundColor: "var(--background2)",
                      border: "none",
                      borderRadius: "3%",
                      fontSize: "0.9rem"
                    }}
                    onClick={() => window.location.href = "/notification"}
                  >
                    SEE ALL
                  </Button>{" "}
                </div>}
                
{notification&& notification.length ?notification.reverse().map((item)=>(
 item.notificationType =='bid' ? <div className="notifications" onClick={()=>window.location.href=item.pathname}  style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
 <div>
   <p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>Bid placed for your nft {item.Distillery}

   </p>
   <p style={{ color: "var(--background2)", fontSize: "0.9rem", marginLeft: "10%" }}>By {item.user &&item.user.name &&item.user.name} for {item.bidprice} MATIC</p>

   {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
   <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
 </svg> */}
 </div>

</div>:item.notificationType=='burn' ?<div className="notifications"   style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
  <div>
  <p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>
     You burned nft token  <span style={{color:"var(--background2)"}}>{item.burnTokenName} </span>
    </p>
 
    {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
  </svg> */}
  </div>
 
 </div>:item.notificationType =='transfer'? <div className="notifications" onClick={()=>window.location.href=item.pathname}  style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
  <div>
  <p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>
   {item.user &&item.user.name &&item.user.name} Transfered  <br></br> 
   <span style={{color:"var(--background2)"}}>{item.Distillery} Token </span> to your account
   </p>
 
    {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
  </svg> */}
  </div>
 
 </div>:item.notificationType =='nft'? <div className="notifications" onClick={()=>window.location.href="/profile"}   style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
  <div>
  <p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>
  Your created new nft token <br></br> 
   <span style={{color:"var(--background2)"}}>{item.Distillery}  </span> 
   </p>
 
    {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
  </svg> */}
  </div>
 
 </div>:null
 )) :null}


                
{!notification ||!notification.length &&  <div style={{textAlign:"center",color:"var(--background2)"}}><p>Nothing to show</p></div> }

                </div>
              </Popup>
              
              <button onClick={()=>navigate("/upload-1")} style={{marginLeft:"2%", width:"150px",height:"45px",marginTop:"13px",marginRight:"10px",background:"#CF9658"}}>UPLOAD</button>

              {user && user.address ?

                <Popup trigger={<div style={{
                  width: "30%", borderStyle: "solid", borderColor: "var(--borderColor)"
                  , borderWidth: "0.1rem", height: "75%", marginTop: "2%"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>

                    {/* <img height={48} width={45}            src={`${user&& user.imgpath}`} />
                    <p style={{ color: "white", marginLeft: "2%", marginTop: "3%" }}>{user &&user.address&& formatAddress(user.address)} <span style={{ color: "var(--background2)" }}> </span></p> */}

                    <img height={44} width={45}            src={`${user&& user.imgpath}`} />
                    {/* <p style={{ color: "white", marginLeft: "2%", marginTop: "3%" }}>{user &&user.address&& formatAddress(user.address)} ETH  <span style={{ color: "var(--background2)" }}> </span></p> */}
                    {accountBal&&accountBal.accountbal ? <p style={{ color: "white", marginLeft: "2%", marginTop: "2.5%",width:"150px" }}>{accountBal.accountbal.toFixed(5)} <span style={{color:"var(--background2)"}}>MATIC</span></p>:<p style={{width:"150px"}}></p>}
                    <svg style={{ margin: "5%", marginBottom: "10%" }} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.792893 0.792893C1.18342 0.402369 1.81658 0.402369 2.20711 0.792893L5 3.58579L7.79289 0.792893C8.18342 0.402369 8.81658 0.402369 9.20711 0.792893C9.59763 1.18342 9.59763 1.81658 9.20711 2.20711L5.70711 5.70711C5.31658 6.09763 4.68342 6.09763 4.29289 5.70711L0.792893 2.20711C0.402369 1.81658 0.402369 1.18342 0.792893 0.792893Z" fill="#D2A163" />
                    </svg>
                  </div>

                </div>} position="bottom right">
                  <div style={{ background: "var(--background3)", padding: "6%", width: "320px" }}>
                    <h4
                      style={{ color: "white", marginTop: "5%" }}
                    >
                     {user &&user ?user.name:""} <br></br>{" "}
                      <span style={{ fontSize: "0.9rem" ,wordBreak:"break-word"}}>
                        {" "}
                        { user&& user&&user.address?formatAddress2(user.address):""}
                        <svg
                        onClick={()=>shareAccount()}
                        style={{cursor:"pointer"}}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9896 9.67065C12.0046 9.92016 12.2651 10.0885 12.4769 9.95562C13.7923 9.13033 14.6668 7.66713 14.6668 5.99967C14.6668 3.42235 12.5775 1.33301 10.0002 1.33301C8.3327 1.33301 6.8695 2.20754 6.04421 3.52297C5.91137 3.7347 6.07967 3.99521 6.32918 4.01021C9.31307 4.1896 11.8102 6.68934 11.9896 9.67065Z"
                            fill="#CF9658"
                          />
                          <path
                            d="M10.6668 9.99967C10.6668 12.577 8.57749 14.6663 6.00016 14.6663C3.42283 14.6663 1.3335 12.577 1.3335 9.99967C1.3335 7.42235 3.42283 5.33301 6.00016 5.33301C8.57749 5.33301 10.6668 7.42235 10.6668 9.99967Z"
                            fill="#CF9658"
                          />
                        </svg>{" "}
                      </span>
                    </h4>
                    <div style={{ marginTop: "10%", background: "var(--background)", padding: "3%", width: "100%" }}>
                      <div style={{ display: "flex" }}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_44_37812)">
                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#627EEA" />
                            <path d="M20.123 7V16.6089L28.2445 20.2379L20.123 7Z" fill="white" fill-opacity="0.602" />
                            <path d="M20.1226 7L12 20.2379L20.1226 16.6089V7Z" fill="white" />
                            <path d="M20.123 26.4645V32.9936L28.25 21.75L20.123 26.4645Z" fill="white" fill-opacity="0.602" />
                            <path d="M20.1226 32.9936V26.4634L12 21.75L20.1226 32.9936Z" fill="white" />
                            <path d="M20.123 24.9538L28.2445 20.2382L20.123 16.6113V24.9538Z" fill="white" fill-opacity="0.2" />
                            <path d="M12 20.2382L20.1226 24.9538V16.6113L12 20.2382Z" fill="white" fill-opacity="0.602" />
                          </g>
                          <defs>
                            <clipPath id="clip0_44_37812">
                              <rect width="40" height="40" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <div><p style={{ color: "var(--background2)", fontSize: "0.7rem", marginLeft: "10%", marginBottom: "0%" }}>Balance

                        </p>
                          {/* <h4 style={{ display:"flex", color: "white", marginLeft: "5%", marginTop: "3%" }}>{accountBal&&accountBal.accountbal &&accountBal.accountbal.toFixed(4)} <span style={{color:"var(--background2)"}}>MATIC</span> <span style={{ color: "var(--background2)" }}> </span></h4> */}
                          {accountBal&&accountBal.accountbal ? <h4 style={{
                            width:"100%",marginLeft:"10%",
                            color: "white", marginTop: "3%" }}>{accountBal.accountbal.toFixed(5)} <span style={{color:"var(--background2)"}}>MATIC</span></h4>:null}
                        </div>
                      </div>


                      <div >


                        <Button
                          style={{
                            borderRadius: "0rem",
                            color: "var(--background2)",
                            borderColor: "var(--borderColor)",
                            height: "2.5rem",
                            backgroundColor: "var(--background)",
                            width: "100%",
                            marginTop: "5%",boxShadow:"none"

                          }}
                          onClick={() =>window.location.href= "/register"}

                        >
                          MANAGE COINBASE
                        </Button>
                      </div>
                    </div>
                    {location && location.pathname !== "/profile"&&    <><div style={{ display: "flex", marginTop: "10%" }}>
                       <svg style={{ marginRight: "5%" }} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fillRule="evenodd" clipRule="evenodd" d="M8 10.8346C4.77834 10.8346 2.16667 13.4463 2.16667 16.668V18.3346C2.16667 18.7949 1.79357 19.168 1.33333 19.168C0.873096 19.168 0.5 18.7949 0.5 18.3346V16.668C0.5 12.5258 3.85786 9.16797 8 9.16797C12.1421 9.16797 15.5 12.5258 15.5 16.668V18.3346C15.5 18.7949 15.1269 19.168 14.6667 19.168C14.2064 19.168 13.8333 18.7949 13.8333 18.3346V16.668C13.8333 13.4463 11.2217 10.8346 8 10.8346Z" fill="#D2A163" />
                         <path fillRule="evenodd" clipRule="evenodd" d="M8 9.16732C9.84095 9.16732 11.3333 7.67493 11.3333 5.83398C11.3333 3.99304 9.84095 2.50065 8 2.50065C6.15905 2.50065 4.66667 3.99304 4.66667 5.83398C4.66667 7.67493 6.15905 9.16732 8 9.16732ZM8 10.834C10.7614 10.834 13 8.59541 13 5.83398C13 3.07256 10.7614 0.833984 8 0.833984C5.23858 0.833984 3 3.07256 3 5.83398C3 8.59541 5.23858 10.834 8 10.834Z" fill="#D2A163" />
                       </svg>
                       <p onClick={() => window.location.href = "/profile"}
                         style={{ color: "var(--background2)", cursor: "pointer" }}>  MY PROFILE
                       </p>

                     </div><hr style={{ color: "white", margin: "0%" }} /></>
}
                    
                    {location && location.pathname !== "/upload-1"&&     <><div style={{ display: "flex", marginTop: "6%" }}>
                       <svg style={{ marginRight: "5%" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fillRule="evenodd" clipRule="evenodd" d="M10.0003 3.33464C8.37347 3.33464 6.87379 3.46881 5.67008 3.62778C4.58676 3.77086 3.76988 4.58774 3.6268 5.67106C3.46783 6.87477 3.33366 8.37444 3.33366 10.0013C3.33366 11.6282 3.46783 13.1278 3.6268 14.3315C3.76988 15.4149 4.58676 16.2317 5.67008 16.3748C6.87379 16.5338 8.37347 16.668 10.0003 16.668C11.6272 16.668 13.1269 16.5338 14.3306 16.3748C15.4139 16.2317 16.2308 15.4149 16.3738 14.3315C16.5328 13.1278 16.667 11.6282 16.667 10.0013C16.667 8.37444 16.5328 6.87477 16.3738 5.67106C16.2308 4.58774 15.4139 3.77086 14.3306 3.62778C13.1269 3.46881 11.6272 3.33464 10.0003 3.33464ZM5.45186 1.97546C3.6212 2.21724 2.21626 3.62217 1.97449 5.45283C1.80827 6.71137 1.66699 8.2857 1.66699 10.0013C1.66699 11.7169 1.80827 13.2912 1.97449 14.5498C2.21626 16.3804 3.62119 17.7854 5.45186 18.0271C6.71039 18.1934 8.28472 18.3346 10.0003 18.3346C11.7159 18.3346 13.2903 18.1934 14.5488 18.0271C16.3795 17.7854 17.7844 16.3804 18.0262 14.5498C18.1924 13.2912 18.3337 11.7169 18.3337 10.0013C18.3337 8.2857 18.1924 6.71137 18.0262 5.45284C17.7844 3.62217 16.3795 2.21724 14.5488 1.97546C13.2903 1.80925 11.7159 1.66797 10.0003 1.66797C8.28472 1.66797 6.71039 1.80925 5.45186 1.97546Z" fill="#D2A163" />
                         <path d="M7.49953 9.16732C8.42001 9.16732 9.1662 8.42113 9.1662 7.50065C9.1662 6.58018 8.42001 5.83398 7.49953 5.83398C6.57906 5.83398 5.83287 6.58018 5.83287 7.50065C5.83287 8.42113 6.57906 9.16732 7.49953 9.16732Z" fill="#D2A163" />
                         <path d="M15.1006 10.5901L16.5959 12.0853C16.5443 12.8655 16.469 13.5894 16.3859 14.2324L13.9221 11.7686C13.5967 11.4431 13.069 11.4431 12.7436 11.7686L10.934 13.5782C9.95765 14.5545 8.37474 14.5545 7.39843 13.5782L7.25545 13.4352C6.93001 13.1098 6.40238 13.1098 6.07694 13.4352L4.06939 15.4428C3.83682 15.1275 3.68122 14.749 3.626 14.3309C3.59588 14.1029 3.56665 13.8642 3.53906 13.6161L4.89843 12.2567C5.87474 11.2804 7.45765 11.2804 8.43396 12.2567L8.57694 12.3997C8.90238 12.7251 9.43001 12.7251 9.75545 12.3997L11.5651 10.5901C12.5414 9.61375 14.1243 9.61375 15.1006 10.5901Z" fill="#D2A163" />
                       </svg>
                       {/* {console.log(location)} */}

                       <p onClick={() => window.location.href = "/upload-1"} style={{ color: "var(--background2)", cursor: "pointer" }}> MY BOTTLES</p>



                     </div><hr style={{ color: "white", margin: "0%" }} /></>
 }
                    <div style={{ display: "flex", marginTop: "6%" }}>
                      <svg style={{ marginRight: "5%" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_44_37843)">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8.33366 15.001V17.501C8.33366 17.9612 8.70675 18.3343 9.16699 18.3343H10.8337C11.2939 18.3343 11.667 17.9612 11.667 17.501V15.001H13.3337V17.501C13.3337 18.8817 12.2144 20.001 10.8337 20.001H9.16699C7.78628 20.001 6.66699 18.8817 6.66699 17.501V15.001H8.33366Z" fill="#D2A163" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.4997 11.0721L13.1239 10.5717C14.2704 9.65265 14.9997 8.24588 14.9997 6.66764C14.9997 3.90622 12.7611 1.66764 9.99967 1.66764C7.23825 1.66764 4.99967 3.90622 4.99967 6.66764C4.99967 8.24588 5.72898 9.65265 6.87546 10.5717L7.49967 11.0721V13.3343C7.49967 13.7945 7.87277 14.1676 8.33301 14.1676H11.6663C12.1266 14.1676 12.4997 13.7945 12.4997 13.3343V11.0721ZM14.1663 11.8721V13.3343C14.1663 14.715 13.0471 15.8343 11.6663 15.8343H8.33301C6.9523 15.8343 5.83301 14.715 5.83301 13.3343V11.8721C4.3089 10.6504 3.33301 8.77296 3.33301 6.66764C3.33301 2.98574 6.31778 0.000976562 9.99967 0.000976562C13.6816 0.000976562 16.6663 2.98574 16.6663 6.66764C16.6663 8.77296 15.6904 10.6504 14.1663 11.8721Z" fill="#D2A163" />
                          <path d="M8.92259 6.91205C8.59715 6.58661 8.06951 6.58661 7.74408 6.91205C7.41864 7.23748 7.41864 7.76512 7.74408 8.09056L9.16667 9.51315V14.168H10.8333V9.51315L12.2559 8.09056C12.5814 7.76512 12.5814 7.23748 12.2559 6.91205C11.9305 6.58661 11.4028 6.58661 11.0774 6.91205L10 7.98946L8.92259 6.91205Z" fill="#D2A163" />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_37843">
                            <rect width="20" height="20" fill="white" transform="translate(0 0.000976562)" />
                          </clipPath>
                        </defs>
                      </svg>

                      <p style={{ color: "var(--background2)" }}>  DARK THEME
                      </p>
                      <Form style={{marginLeft:"80px"}} >
                          <Form.Check
                            
                            type="switch"
                            id="custom-switch"
                            
                            
                           
                          />
                        </Form>
                    </div>
                    <hr style={{ color: "white", margin: "0%" }} />

                    <div style={{ display: "flex", marginTop: "6%" }}>
                      <svg style={{ marginRight: "5%" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.19058 12.5012C9.65049 12.4839 10.0374 12.8426 10.0548 13.3025C10.0939 14.3394 10.1489 15.0961 10.2029 15.6387C10.2562 16.173 10.5787 16.4945 11.0284 16.5495C11.5586 16.6143 12.3065 16.6673 13.3329 16.6673C14.3593 16.6673 15.1073 16.6143 15.6375 16.5495C16.0869 16.4945 16.4096 16.1729 16.4629 15.6384C16.5632 14.6313 16.6662 12.8913 16.6662 10.0007C16.6662 7.10997 16.5632 5.36999 16.4629 4.36288C16.4096 3.82842 16.0869 3.50679 15.6375 3.45185C15.1073 3.38703 14.3593 3.33398 13.3329 3.33398C12.3065 3.33398 11.5586 3.38703 11.0284 3.45184C10.5787 3.50681 10.2562 3.8283 10.2029 4.36263C10.1489 4.90519 10.0939 5.66193 10.0548 6.69875C10.0374 7.15866 9.65049 7.51742 9.19058 7.50006C8.73067 7.4827 8.37191 7.09579 8.38928 6.63588C8.42945 5.57169 8.48641 4.78017 8.54447 4.19741C8.66651 2.97227 9.52068 1.95707 10.8261 1.79749C11.4338 1.72321 12.2503 1.66732 13.3329 1.66732C14.4156 1.66732 15.232 1.72321 15.8397 1.7975C17.1453 1.9571 17.9993 2.97278 18.1213 4.19767C18.2288 5.27622 18.3329 7.07438 18.3329 10.0007C18.3329 12.9269 18.2288 14.7251 18.1213 15.8036C17.9993 17.0285 17.1453 18.0442 15.8397 18.2038C15.232 18.2781 14.4156 18.334 13.3329 18.334C12.2503 18.334 11.4338 18.2781 10.8261 18.2038C9.52069 18.0442 8.66651 17.029 8.54447 15.8039C8.48641 15.2211 8.42945 14.4296 8.38928 13.3654C8.37191 12.9055 8.73067 12.5186 9.19058 12.5012Z" fill="#D2A163" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.00625 12.3284C6.33168 12.6538 6.33168 13.1815 6.00625 13.5069C5.68081 13.8323 5.15317 13.8323 4.82774 13.5069L1.91107 10.5902C1.58563 10.2648 1.58563 9.73716 1.91107 9.41172L4.82774 6.49505C5.15317 6.16962 5.68081 6.16962 6.00625 6.49505C6.33168 6.82049 6.33168 7.34813 6.00625 7.67357L4.51217 9.16764H12.5003C12.9606 9.16764 13.3337 9.54074 13.3337 10.001C13.3337 10.4612 12.9606 10.8343 12.5003 10.8343L4.51217 10.8343L6.00625 12.3284Z" fill="#D2A163" />
                      </svg>

                      <p onClick={()=>signOut()} style={{cursor:"pointer", color: "var(--background2)" }}>  DISCONNECT
                      </p>

                    </div>


                  </div>
                </Popup>
                : <>{  
                  user &&user && user.address ? null : 
                  <Button
                  style={{
                    color: "var(--background)",
                    backgroundColor: "var(--background2)",
                    border: "none",
                    height:"42px",
                    marginTop:"14px",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width:"140px"
                  }}
                  onClick={() => window.location.href="/connect-wallet"}
                >
                  Connect Wallet
                </Button>
                }
                </>}
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
