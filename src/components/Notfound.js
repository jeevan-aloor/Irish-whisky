import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const Notfound = () => {
  return (
    <div style={{display:"flex" ,justifyContent:"center",alignItems:"center",background:"var(--background)",paddingBottom:"10%"}}> 
  <div>
  <img style={{marginTop:"10%"}} src='/images/notfound.png' />
    <h3 style={{color:"white",fontFamily:"fright",textAlign:"center",marginTop:"5%"}}>Sorry, we couldn’t find any results <br></br> for this search.</h3>
    <p style={{color:"var(--background2)",textAlign:"center"}}>Maybe give one of these a try?</p>
    <div style={{display:"flex",width:"35%", marginLeft:"35%",marginBottom:"5%"}}>
       <Form.Control
                style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderRight: "none",
                  borderWidth: "0.01rem",
                  borderRadius: "2%",
                  borderColor: "#42352B",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)",
                  color: "var(--background2)",
                }}
                placeholder="Enter your search..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="no-outline"
              />
              <InputGroup.Text
                id="basic-addon2"
                style={{
                  height: "2.5rem",
                  borderLeft: "none",
                  borderRadius: "2%",
                  borderColor: "var(--borderColor)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)",
                  color: "var(--background2)",
                  padding:"0.1rem"
                }}
              >
<svg width="40" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="32" fill="#CF9658"/>
<path fillRule="evenodd" clipRule="evenodd" d="M18.0909 11.2652C18.4968 10.8906 19.1294 10.9159 19.504 11.3217L22.7348 14.8217C23.0884 15.2047 23.0884 15.7952 22.7348 16.1782L19.504 19.6783C19.1294 20.0841 18.4968 20.1094 18.091 19.7348C17.6851 19.3602 17.6598 18.7276 18.0344 18.3217L19.716 16.5L10 16.5C9.44771 16.5 9 16.0523 9 15.5C9 14.9477 9.44771 14.5 10 14.5L19.716 14.5L18.0344 12.6783C17.6598 12.2725 17.6851 11.6398 18.0909 11.2652Z" fill="#FCFCFD"/>
</svg>

              </InputGroup.Text>
              </div> 
              <h4 style={{color:"white",textAlign:"center",marginBottom:"5%"}}>Explore more</h4>
              <div style={{display:"grid",gridTemplateColumns:"23% 23% 23% 23%",gap:"4%",fontSize:"0.8rem"}}>
                <div style={{display:"flex",borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem" ,padding:"2%" ,height:"4rem",borderRadius:"50px",paddingRight:"10%" }}>
                <img height={50} width={50} src='/images/activity.png' />
                <div> <p style={{color:"white",marginLeft:"10%",width:"100%"}}>ARTWORK <br></br> <span style={{color:"var(--background2"}}>138 Bottles</span></p><br></br>
                </div>
                </div>
                <div style={{display:"flex",borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem" ,padding:"2%" ,height:"4rem",borderRadius:"50px",paddingRight:"10%" }}>
                <img height={50} width={50} src='/images/activity.png' />
                <div> <p style={{color:"white",marginLeft:"10%",width:"100%"}}>PHOTOGRAPHY <br></br> <span style={{color:"var(--background2"}}>138 Bottles</span></p><br></br>
                </div>
                </div>
                <div style={{display:"flex",borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem" ,padding:"2%" ,height:"4rem",borderRadius:"50px",paddingRight:"10%" }}>
                <img height={50} width={50} src='/images/activity.png' />
                <div> <p style={{color:"white",marginLeft:"10%",width:"100%"}}>GAME <br></br> <span style={{color:"var(--background2"}}>138 Bottles</span></p><br></br>
                </div>
                </div>
                <div style={{display:"flex",borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem" ,padding:"2%" ,height:"4rem",borderRadius:"50px",paddingRight:"10%" }}>
                <img height={50} width={50} src='/images/activity.png' />
                <div> <p style={{color:"white",marginLeft:"10%",width:"100%"}}>MUSIC <br></br> <span style={{color:"var(--background2"}}>138 Bottles</span></p><br></br>
                </div>
                </div>
              </div>
    </div>  
   
    </div>
  )
}

export default Notfound