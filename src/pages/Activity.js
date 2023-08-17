import React from 'react'
import { Button } from 'react-bootstrap'
import "./Activity.css"
const Activity = () => {
  return (
    <div style={{background:"var(--background)"}}> 
   <div style={{
           
           display:"flex",alignItems:"center",justifyContent:"space-between",paddingLeft:"5%",paddingRight:"5%"}}>
       <Button
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
             >
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M3.606 0.843797C3.33545 0.59406 2.91368 0.610928 2.66394 0.881474L0.510094 3.21478C0.274362 3.47015 0.27436 3.86378 0.510089 4.11915L2.66394 6.45251C2.91367 6.72306 3.33544 6.73994 3.60599 6.4902C3.87654 6.24047 3.89341 5.81869 3.64368 5.54815L2.52261 4.33364L8.99996 4.33364C9.36815 4.33364 9.66663 4.03516 9.66663 3.66697C9.66663 3.29878 9.36815 3.0003 8.99996 3.0003L2.52263 3.0003L3.64367 1.78585C3.89341 1.51531 3.87654 1.09353 3.606 0.843797Z" fill="#D2A163"/>
</svg>&nbsp;&nbsp;&nbsp;
         BACK TO HOME
             </Button>{" "}
             <div style={{display:"flex",marginTop:"2%"}}>
               <p style={{color:"var(--background2)",fontSize:"0.8rem"}}>PROFILE &nbsp;&nbsp;&nbsp;&nbsp;  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L3.58579 5L0.792893 7.79289C0.402369 8.18342 0.402369 8.81658 0.792893 9.20711C1.18342 9.59763 1.81658 9.59763 2.20711 9.20711L5.70711 5.70711C6.09763 5.31658 6.09763 4.68342 5.70711 4.29289L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893Z" fill="#D2A163"/>
</svg>
</p>      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <p style={{color:"white",fontSize:"0.8rem"}}>ACTIVITY
</p>
             </div>

       </div>
       <hr style={{color:"var(--background2)"}}></hr>

       <div style={{display:"grid",padding:"5%",gridTemplateColumns:"50% 50%"}}>
        <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}> <h4 style={{color:"white",fontFamily:"fright" ,fontSize:"48px"}}>Activity</h4>  
        <Button
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
                 fontSize:"0.7rem",
                 color:"var(--background2)"


               }}
             >
         MARK ALL AS READ
             </Button>{" "}
           
        </div>
        <div style={{display:"flex",marginTop:"5%"}}>
            <p style={{color:"white",background:"#46392E",padding:"1%",fontSize:"0.7rem"}}>MY ACTIVITY</p>
            <p style={{color:"var(--background2)",fontSize:"0.7rem",padding:"1%",marginLeft:"5%"}}>FOLLOWING</p>
            <p style={{color:"var(--background2)",fontSize:"0.7rem",padding:"1%",marginLeft:"5%"}}>ALL ACTIVITY</p>
        </div>  
        <div style={{display:"grid",marginTop:"10%" ,gridTemplateColumns:"80% 20%"}}>
    <div style={{display:"flex"}}>
        
    <img height={90} width={90} src='/images/activity.png' />
    
<div style={{lineHeight:"0.9rem"}}>    <p style={{color:"white",marginLeft:"10%",fontSize:"24px"}}>Something went wrong</p>
    <p style={{color:"white",marginLeft:"10%" ,fontSize:"16px",width:"350px"}}>Can't display activity card. Try again later</p>
 <p style={{color:"var(--background2)",fontSize:"0.9rem",marginLeft:"10%",fontSize:"12px"}}>2 days ago</p>
</div>

    </div>
    <svg style={{marginLeft:"50%"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658"/>
</svg>

 
    </div>
    <div style={{display:"grid",marginTop:"10%" ,gridTemplateColumns:"80% 20%",backgroundColor:"#100804",paddingTop:"20px",paddingLeft:"5px",paddingBottom:"10px"}}>
    <div style={{display:"flex"}}>
    <img height={90} width={90} src='/images/activity.png' style={{marginRight:"10px"}} />
<div style={{lineHeight:"0.9rem"}}>    <p style={{color:"white",marginLeft:"10%"}}>IWC</p>
    <p style={{color:"white",marginLeft:"10%",width:"200px",fontSize:"16px"}}>Started following you </p>
 <p style={{color:"var(--background2)",fontSize:"0.9rem",marginLeft:"10%"}}>2 days ago</p>
</div>

    </div>
    {/* <svg style={{marginLeft:"50%",marginTop:"30px"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658"/>
</svg> */}
<svg style={{marginLeft:"40%",marginTop:"30px"}}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.79289 7.79289C9.40237 8.18342 9.40237 8.81658 9.79289 9.20711L12.5858 12L9.79289 14.7929C9.40237 15.1834 9.40237 15.8166 9.79289 16.2071C10.1834 16.5976 10.8166 16.5976 11.2071 16.2071L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L11.2071 7.79289C10.8166 7.40237 10.1834 7.40237 9.79289 7.79289Z" fill="#D2A163"/>
</svg>

 
    </div>
    <div style={{display:"grid",marginTop:"10%" ,gridTemplateColumns:"80% 20%"}}>
    <div style={{display:"flex"}}>
    <img height={90} width={90} src='/images/activity.png' style={{marginRight:"20px"}} />
<div style={{lineHeight:"0.9rem"}}>    <p style={{color:"white",marginLeft:"10%"}}>ETH received</p>
    <p style={{color:"white",marginLeft:"10%",width:"200px",fontSize:"16px"}}>0.08 ETH recived</p>
 <p style={{color:"var(--background2)",fontSize:"0.9rem",marginLeft:"10%"}}>2 days ago</p>
</div>

    </div>
    <svg style={{marginLeft:"50%"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658"/>
</svg>

 
    </div>
    <div style={{display:"grid",marginTop:"10%" ,gridTemplateColumns:"80% 20%"}}>
    <div style={{display:"flex"}}>
    <img height={90} width={90} src='/images/activity.png' />
<div style={{lineHeight:"0.9rem"}}>    <p style={{color:"white",marginLeft:"10%"}}>Whisky Bottle</p>
    <p style={{color:"white",marginLeft:"10%",width:"400px",fontSize:"16px"}}>Purchased by You for 0.001 ETH from IWC</p>
 <p style={{color:"var(--background2)",fontSize:"0.9rem",marginLeft:"10%"}}>2 days ago</p>
</div>

    </div>
    <svg style={{marginLeft:"50%"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658"/>
</svg>

 
    </div>
    <div style={{display:"grid",marginTop:"10%" ,gridTemplateColumns:"80% 20%"}}>
    <div style={{display:"flex"}}>
    <img height={90} width={90} src='/images/activity.png' />
<div style={{lineHeight:"0.9rem"}}>    <p style={{color:"white",marginLeft:"10%"}}>ETH received</p>
    <p style={{color:"white",marginLeft:"10%",width:"400px",fontSize:"16px"}}>Can't display activity card. Try again later</p>
 <p style={{color:"var(--background2)",fontSize:"0.9rem",marginLeft:"10%"}}>2 days ago</p>
</div>

    </div>
    <svg style={{marginLeft:"50%"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658"/>
</svg>

 
    </div>
    <div style={{display:"grid",marginTop:"10%" ,gridTemplateColumns:"80% 20%"}}>
    <div style={{display:"flex"}}>
    <img height={90} width={90} src='/images/activity.png' />
<div style={{lineHeight:"0.9rem"}}>    <p style={{color:"white",marginLeft:"10%"}}>Something went wrong</p>
    <p style={{color:"white",marginLeft:"10%",width:"400px",fontSize:"16px"}}>Can't display activity card. Try again later</p>
 <p style={{color:"var(--background2)",fontSize:"0.9rem",marginLeft:"10%"}}>2 days ago</p>
</div>

    </div>
    <svg style={{marginLeft:"50%"}} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658"/>
</svg>

 
    </div>
    
        </div>
        <div style={{padding:"1%", height:"50%", marginLeft:"20%",background:"var(--background3)",width:"372px",borderColor:"var(--borderColor)",borderStyle:"solid",borderWidth:"0.1rem"}}>


        <form style={{color:"white",margin:"10%",marginTop:"10%"}} action="/action_page.php">
        <input type="checkbox" id="vehicle1" name="vehicle1" defaultValue="Bike" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>SALES</label><br />
        <input type="checkbox" id="vehicle2" name="vehicle2" defaultValue="Car" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>LISTINGS</label><br />
        <input type="checkbox" id="vehicle3" name="vehicle3" defaultValue="Boat" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>BIDS</label><br />
        <input type="checkbox" id="vehicle3" name="vehicle3" defaultValue="Boat" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>BURNS</label><br />
        <input type="checkbox" id="vehicle3" name="vehicle3" defaultValue="Boat" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>FOLLOWINGS</label><br />
        <input type="checkbox" id="vehicle3" name="vehicle3" defaultValue="Boat" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>LIKES</label><br />
        <input type="checkbox" id="vehicle3" name="vehicle3" defaultValue="Boat" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>PURCHASE</label><br />
        <input type="checkbox" id="vehicle3" name="vehicle3" defaultValue="Boat" defaultChecked/>
        <label htmlFor="vehicle1" style={{marginLeft:"5%",fontWeight:"500",fontSize:"0.8rem",marginTop:"8%"}}>TRANSFERS</label><br />
      </form>
      <hr  style={{color:"var(--background2)" ,width:"80%",marginLeft:"10%"}}></hr>
   <div style={{marginLeft:"10%",display:"flex"}}>
   <Button
               style={{
                 color: "white",
                 backgroundColor: "var(--background)",
                 height: "2rem",
                 marginTop: "0.8rem",
                 marginRight: "1rem",
                 borderColor: "var(--background2)",
                 borderRadius:"0%",
                 paddingLeft:"8%",
                 paddingRight:"8%",
                 borderWidth:"0.1rem",
                 fontSize:"14px"


               }}
             >
        SELECT ALL
             </Button>{" "}
             <Button
               style={{
                 color: "white",
                 backgroundColor: "var(--background)",
                 height: "2rem",
                 marginTop: "0.8rem",
                 marginRight: "1rem",
                 borderColor: "var(--background2)",
                 borderRadius:"0%",
                 paddingLeft:"8%",
                 paddingRight:"8%",
                 borderWidth:"0.1rem",
                 fontSize:"14px"


               }}
             >
        UNSELECT ALL
             </Button>{" "}
   </div>
        </div>
     
       </div>
    </div>
  )
}

export default Activity