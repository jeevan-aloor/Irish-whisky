import React from 'react'
import { Button } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
const Upload1 = () => {
  let navigate  = useNavigate()
  return (
    <div style={{background:"var(--background)" }}>
        <div>
    
        <div style={{
           
            display:"flex",alignItems:"center",justifyContent:"space-between",paddingLeft:"5%",paddingRight:"5%"}}>
        <Button
        onClick={()=>window.location.href="/"}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "0.8rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"3%",
                  paddingRight:"3%",
                  borderWidth:"0.1rem",
                  fontSize:"0.7rem"


                }}
                onClick={()=>navigate("/")}
              >
     <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M3.606 0.843797C3.33545 0.59406 2.91368 0.610928 2.66394 0.881474L0.510094 3.21478C0.274362 3.47015 0.27436 3.86378 0.510089 4.11915L2.66394 6.45251C2.91367 6.72306 3.33544 6.73994 3.60599 6.4902C3.87654 6.24047 3.89341 5.81869 3.64368 5.54815L2.52261 4.33364L8.99996 4.33364C9.36815 4.33364 9.66663 4.03516 9.66663 3.66697C9.66663 3.29878 9.36815 3.0003 8.99996 3.0003L2.52263 3.0003L3.64367 1.78585C3.89341 1.51531 3.87654 1.09353 3.606 0.843797Z" fill="#D2A163"/>
</svg>&nbsp;&nbsp;&nbsp;
          BACK TO HOME
              </Button>{" "}
              <div style={{display:"flex",marginTop:"2%"}}>
                <p style={{color:"var(--background2)",fontSize:"0.8rem"}}>HOME &nbsp;&nbsp;&nbsp;&nbsp;  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L3.58579 5L0.792893 7.79289C0.402369 8.18342 0.402369 8.81658 0.792893 9.20711C1.18342 9.59763 1.81658 9.59763 2.20711 9.20711L5.70711 5.70711C6.09763 5.31658 6.09763 4.68342 5.70711 4.29289L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893Z" fill="#D2A163"/>
</svg>
</p>      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <p style={{color:"white",fontSize:"0.8rem"}}>UPLOAD BOTTLE 
</p>
              </div>

        </div>
        <hr style={{color:"var(--background2)"}}></hr>
         
        </div>
    <div style={{padding:"5%"}}>
        <div style={{display:"flex",justifyContent:"center",textAlign:"center",paddingBottom:"5%"}}>
            <div>
                <h1 style={{color:"white",fontFamily:"fright"}}> Upload Bottle</h1>
                <p style={{color:"var(--background2)"}} >
    Choose <span style={{color:"white"}}>“Single” </span> if you want your collectible to be one of a kind or <span style={{color:"white"}}>“Multiple”</span>  if you want to sell one collectible <br></br> multiple times</p>
            </div>

       
          
            </div> 
      <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{paddingBottom:"3%",padding:"1%",borderStyle:"solid",borderColor:"var(--borderColor)",textAlign:"center",width:"25%"}}>
            <img style={{width:"100%",marginBottom:"5%"}} src='/images/upload1.png' />
            <br></br>
            <Button 
            onClick={()=>window.location.href ="/upload-2"}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
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
                CREATE SINGLE
              </Button>{" "}
            </div>
            <div style={{marginLeft:"3%",paddingBottom:"3%",padding:"1%",borderStyle:"solid",borderColor:"var(--borderColor)",textAlign:"center",width:"25%"}}>
            <img style={{width:"100%",marginBottom:"5%"}} src='/images/upload2.png' />
            <br></br>
            <Button
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
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
                CREATE MULTIPLE
              </Button>{" "}
            </div>
      </div>
      <p style={{textAlign:"center",color:"var(--background2)",paddingBottom:"5%",paddingTop:"3%",fontSize:"0.9rem"}}>We do not own your private keys and cannot access your funds without your confirmation.</p>

    </div>
           
    </div>
  )
}

export default Upload1