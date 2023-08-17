 import axios from 'axios'
import React,{ useState }  from 'react'
import { InputGroup,Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URL } from '../constants/userConstants'

const Footer = () => {
let [email,setEmail] = useState('Enter your email')
const navigate = useNavigate()

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const isValid = ValidateEmail(email)
    if(isValid){
      let { data }=await axios.post(`${API_URL}/email-subscription/${email}`)
      if(data.msg === "Success"){
        toast.success("Subscribed Successfully")
        setEmail('')
      } else if(data.msg === "Already Exists"){
        toast.warn("You have already subscribed.")
      }
    } else {
      toast.warning("Please enter a valid Email!")
    }
    } catch (error) {
    console.log(error)
  }
}

  return (
    <footer style={{borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem",background:"var(--background)",borderBottom:"none",fontStyle:"normal"}}>

              <div style={{ padding:"5%",paddingBottom:"1%", display:"grid",gridTemplateColumns:"20% 13% 13% 20%",gap:"12%",gridRowGap:"2%" }}>
 
 <div >
    <img src='/Media Assets/iwc-logo.png' style={{marginBottom:"20%"}} width="75px" height="80px" />
    <h4  style={{fontSize:"24px",fontWeight:"500",letterSpacing: "-0.01em",width:"256px", color:"white"}}>Discover, Invest, and Savor the World of Rare Whiskey NFTs</h4>
 </div>
 <div > 
 <h4  style={{color:"white",fontSize:"1rem",marginBottom:"20%" }}>STACKS</h4>
    <p onClick={() => navigate("/discover")} style={{color:"var(--background2)", cursor:"pointer", fontWeight:"600",fontSize:"14px",fontStyle:"normal" }}>DISCOVER</p>
    <p onClick={() => navigate("/connect-wallet")} style={{color:"var(--background2)", cursor: "pointer",fontWeight:"600",fontSize:"14px",fontStyle:"normal" }}>CONNECT WALLET</p>
    <p onClick={() => navigate("/upload-1")} style={{color:"var(--background2)", cursor: "pointer",fontWeight:"600",fontSize:"14px",fontStyle:"normal" }}>CREATE BOTTLE</p>
 </div>
 <div> 
    <h4  style={{color:"white",fontSize:"1rem",marginBottom:"20%" }}>INFO</h4>
    <p style={{color:"var(--background2)" ,fontWeight:"600",fontWeight:"600",fontSize:"14px",fontStyle:"normal"}}>DOWNLOAD</p>
    <p style={{color:"var(--background2)" ,fontWeight:"600",fontWeight:"600",fontSize:"14px",fontStyle:"normal"}}>DEMOS</p>
    <p style={{color:"var(--background2)" ,fontWeight:"600",fontWeight:"600",fontSize:"14px",fontStyle:"normal"}}>SUPPORT</p>
 </div><div >
    <h4  style={{color:"white",fontSize:"1rem",marginBottom:"20%" }}>JOIN NEWSLETTER</h4>
    <p  style={{color:"white",marginTop:"2rem"}}>Subscribe our newsletter to get more free design course and resource</p>
    
    <div        
 style={{display:"flex"}}>
  <form style={{display: "flex"}} >
    <input type="email" id="basic-addon2"
    onClick={() => setEmail('')}
    onChange={(e) => setEmail(e.target.value)}
    value={email}
                style={{
                  height: "2.5rem",
                  borderLeft: "none",
                  borderRadius: "2%",
                  borderColor: "var(--borderColor)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)",
                  color: "var(--background2)",
                  borderColor: "#42352B",
                  padding:"0.1rem",
                  outline: 'none'
                }}
                placeholder="Enter your email"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="no-outline" />
    
    <svg onClick={(e) => handleSubmit(e)} style={{marginTop: "1rem"}} width="40" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="32" fill="#CF9658"/>
<path fillRule="evenodd" clipRule="evenodd" d="M18.0909 11.2652C18.4968 10.8906 19.1294 10.9159 19.504 11.3217L22.7348 14.8217C23.0884 15.2047 23.0884 15.7952 22.7348 16.1782L19.504 19.6783C19.1294 20.0841 18.4968 20.1094 18.091 19.7348C17.6851 19.3602 17.6598 18.7276 18.0344 18.3217L19.716 16.5L10 16.5C9.44771 16.5 9 16.0523 9 15.5C9 14.9477 9.44771 14.5 10 14.5L19.716 14.5L18.0344 12.6783C17.6598 12.2725 17.6851 11.6398 18.0909 11.2652Z" fill="#FCFCFD"/>
</svg>
    
  </form>
              </div>
 </div>
        </div>
        <hr style={{height: '3px', borderWidth: 0, backgroundColor: "#3F342A", width:"90%",marginLeft:"5%" }} />

        <div style={{display:"flex",justifyContent:"space-between",paddingLeft:"5%",paddingRight:"5%"}}>
            <p style={{color:"#D2A163"}}>Copyright © 2023 IWC LLC. All rights reserved</p>
<p  style={{color:"white"}}>We use cookies for better service.
<span style={{color:"#CF9658"}}> &nbsp; &nbsp; Accept</span></p>
        </div>

    </footer>
    
  )
}

export default Footer