import React from 'react'
import { useEffect,useState } from 'react'
import { API_URL } from '../constants/userConstants'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Notifications = () => {
    const [notification, setNotification] = useState(null)
    const  user = useSelector((state) => state.user.user);

    useEffect(()=>{
        axios.get(`${API_URL}/notification/${user._id}`)
        .then(function ({data}) {
          // console.log(data)
          //  if(datas.length<2){
          //   data.draft.map((item)=>(
          //     datas.push(item)
          //   ))
          //   }
        
      setNotification(data.draft)
    
         })
        .catch(function (error) {
          console.log(error);
        });
    
      },[])
  return (<div style={{height:notification&&notification.length?"100%":'100vh',paddingBottom:"5%"}}> 
<h2 style={{marginTop:"5%",color:"white",marginLeft:"5%"}}>Notifications</h2>
    <div  className="notifications" style={{ paddingBottom: "2%" ,marginLeft:"2%",marginRight:"10%"}}>
                     
{notification&& notification.length ?notification.reverse().map((item)=>(
 item.notificationType =='bid' ? <div className="notifications" onClick={()=>window.location.href=item.pathname}  style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
 <div style={{display:"flex"}}>
 <img style={{marginLeft:"3%"}}  height={120} width={120} src={`http://${item && item.img && item.img}`} />
<div>
  
<p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>Bid placed for your nft {item.Distillery}

</p>
<p style={{ color: "var(--background2)", fontSize: "0.9rem", marginLeft: "10%" }}>By {item.user &&item.user.name &&item.user.name} for {item.bidprice} MATIC</p>
</div>

   {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
   <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
 </svg> */}
 </div>

</div>:item.notificationType=='burn' ?<div className="notifications"   style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
  <div style={{display:"flex"}}>
  <img style={{marginLeft:"3%"}}  height={120} width={120} src={`http://${item && item.img && item.img}`} />

  <p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>
     You burned nft token  <span style={{color:"var(--background2)"}}>{item.burnTokenName} </span>
    </p>
 
    {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
  </svg> */}
  </div>
 
 </div>:item.notificationType =='transfer'? <div className="notifications" onClick={()=>window.location.href=item.pathname}  style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
   
  <div style={{display:"flex"}}>
  <img style={{marginLeft:"3%"}}  height={120} width={120} src={`http://${item && item.img && item.img}`} />
 
  <p style={{ color: "white", fontSize: "0.9rem", marginLeft: "10%", marginBottom: "0%" }}>
   {item.user &&item.user.name &&item.user.name} Transfered  <br></br> 
   <span style={{color:"var(--background2)"}}>{item.Distillery} Token </span> to your account
   </p>
 
    {/* <svg style={{ marginTop: "8%" }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.000976562" width="12" height="12" rx="6" fill="#CF9658" />
  </svg> */}
  </div>
 
 </div>:item.notificationType =='nft'? <div className="notifications" onClick={()=>window.location.href="/profile"}   style={{cursor:"pointer", display: "flex", marginTop: "10%" }}>
  
   
  <div style={{display:"flex"}}>
  <img style={{marginLeft:"3%"}}  height={120} width={120} src={`http://${item && item.img && item.img}`} />
 
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
      
  </div>
  </div>
  )
}

export default Notifications