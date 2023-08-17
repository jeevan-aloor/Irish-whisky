import React,{useState,useRef} from 'react'
import "./contact.css"
import axios from 'axios'
import { toast } from "react-toastify";
import { API_URL } from '../constants/userConstants';


const ContactUs = () => {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [subject,setSubject]=useState("")
  const [message,setMessage]=useState("")

  const formRef=useRef()

const handleAddContact=async (e)=>{
  e.preventDefault()
  let payload={
    username:name,
    useremail:email,
    subject,
    message
  }
  
  try {
    if(name && email && subject && message){
      let res=await axios.post(`${API_URL}/contactus`,payload)
      console.log(res,"add")
      formRef.current.reset()
      toast.success("Feedback Added successfully");
    }else{
      toast.error("Please Add All The Fields !");
    }
  } catch (error) {
    console.log(error)
    
  }
}


  return (
    <div style={{ width:"100%"  ,background:"var(--background)",paddingTop:"5%",paddingBottom:"0%"}}> 
    <p style={{color:"#F4F5F6",textAlign:"center",fontSize:"0.8rem"}}>CONTACT US</p>
 <h1 style={{color:"var(--background2)",textAlign:"center",fontWeight:"700",fontFamily:"Freight Big Pro",fontSize:"48px",fontStyle:"normal",letterSpacing:"-0.96px",lineHeight:"normal"}}>Get in Touch with Our Team</h1>
 <p style={{color:"white",textAlign:"center" ,marginTop:"2%",marginBottom:"5%"}}>We're here to help! Reach out to us with any questions, concerns, or feedback regarding our platform and services.
</p>
 
 <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,background:"var(--background)"}}>
    
    </div>
    
    <div style={{background:"var(--background3",padding:"5%"}}>
        <div style={{marginLeft:"9%"}}>    <p style={{color:"white",fontSize:"0.8rem"}}>CONTACT US</p>
 <h1 style={{color:"var(--background2)",fontWeight:"700",fontFamily:"Freight Big Pro",fontSize:"48px",fontStyle:"normal",letterSpacing:"-0.96px",lineHeight:"normal"}}>Contact Form</h1>
 <p style={{color:"white" ,marginTop:"2%",marginBottom:"5%"}}>We're here to help! Reach out to us with any questions, concerns, or feedback regarding our platform and services.
</p></div>


    <form style={{width :"80%",marginLeft:"10%"}} onSubmit={handleAddContact} ref={formRef}>
        <div className="form-group">
          <label style={{color:"white",fontSize:"0.8rem",
}} htmlFor="exampleInputEmail1"> NAME</label>
          <input  style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderColor: "var(--borderColor)",
                  borderWidth:"0.2rem",
                  color:"var(--background2)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background3)" ,
                }} placeholder='JOHN DOE'  type="text" className="form-control" id="exampleInputtext1" onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{color:"white",marginTop:"3%",marginBottom:"1%",                  fontSize:"0.8rem",
}} htmlFor="exampleInputtext1">EMAIL </label>
          <input  style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderWidth:"0.2rem",
                  color:"var(--background2)",
                  borderColor: "var(--borderColor)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background3)" ,
                }}  placeholder='JOHN.DOE@EXAMPLE.COM' type="text" className="form-control" id="exampleInputtext1" onChange={(e)=>setEmail(e.target.value)} />
        </div>
  <div className="form-group" >
          <label style={{color:"white",marginTop:"3%",marginBottom:"1%",                  fontSize:"0.8rem",
}} htmlFor="exampleInputtext1">SUBJECT </label>
          <input  style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderWidth:"0.2rem",
                  color:"var(--background2)",
                  borderColor: "var(--borderColor)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background3)" ,
                }} placeholder='I NEED ASSISTANCE WITH MY ACCOUNT'  type="text" className="form-control" id="exampleInputtext1" onChange={(e)=>setSubject(e.target.value)}/>
        </div>
        <div className="form-group">
        <label style={{color:"white",marginTop:"3%",marginBottom:"1%",                  fontSize:"0.8rem",
}} htmlFor="exampleInputtext1">MESSAGE </label>        <textarea  placeholder='HELLO, I AM HAVING TROUBLE ACCESING MY ACCOUNT. CAN YOU PLEASE HELP ME RESOLVE THIS ISSUE? THANK YOU.'  style={{
                  borderWidth:"0.2rem",
                  color:"var(--background2)",
                  borderColor: "var(--borderColor)",
                  backgroundColor: "var(--background3)" ,
                  resize:"none"
                }}  className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} onChange={(e)=>setMessage(e.target.value)} />
      </div>
       
        <button style={{color:"black",width:"100%",borderRadius:"1%",background:"var(--background2)" ,marginTop:"5%",border:"none"}} type="submit" className="btn btn-primary">SUBMIT </button>
    
      </form>
      </div>
    </div>
  )
}

export default ContactUs