import React from 'react'

const Login = () => {
  return (
    <div style={{ width:"100%"  ,background:"var(--background)",padding:"5%",paddingBottom:"8%"}}> 
    <p style={{color:"white",textAlign:"center",fontSize:"0.8rem"}}>LOGIN</p>
 <h1 style={{color:"var(--background2)",textAlign:"center",fontWeight:"380",fontFamily:"Fright"}}>Login to your account</h1>
 <p style={{color:"white",textAlign:"center" ,marginTop:"2%",marginBottom:"5%"}}>Create your account today and embark on a journey of rare whiskey NFT discovery and investment.
</p>
 
 <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,background:"var(--background)"}}>
    
    </div><form style={{width :"80%",marginLeft:"10%"}}>
        <div className="form-group">
          <label style={{color:"white",                  fontSize:"0.8rem",
}} htmlFor="exampleInputEmail1">EMAIL ADDRESS</label>
          <input  style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderColor: "var(--borderColor)",
                  borderWidth:"0.2rem",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)" ,
                }}  type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="form-group">
          <label style={{color:"white",marginTop:"3%",marginBottom:"1%",                  fontSize:"0.8rem",
}} htmlFor="exampleInputPassword1">CONFIRM PASSWORD</label>
          <input  style={{
                  height: "2rem",
                  padding: "1.2rem",
                  borderWidth:"0.2rem",
                  borderColor: "var(--borderColor)",
                  marginTop: "0.8rem",
                  backgroundColor: "var(--background)" ,
                }}  type="password" className="form-control" id="exampleInputPassword1" />
        </div>
       
        <button style={{color:"black",width:"100%",borderRadius:"1%",background:"var(--background2)" ,marginTop:"5%",border:"none"}} type="submit" className="btn btn-primary">SIGN UP</button>
    <p style={{color:"var(--background2)",textAlign:"center", marginTop:"3%",fontSize:"0.8rem"}}>FORGOT PASSWORD</p>
    
      </form>
        
    </div>
  )
}

export default Login