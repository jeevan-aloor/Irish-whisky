import React from 'react'
import { Button } from 'react-bootstrap'

const Login = () => {
  return (
    <div style={{background:"var(--background)"}}>
    <div style={{ width:"100%"  ,background:"var(--background)",padding:"5%",paddingBottom:"8%"}}> 
    <p style={{color:"#F4F5F6",textAlign:"center",fontSize:"0.8rem" }}>MINTING OPTIONS
</p>
 <h1 style={{color:"var(--background2)",textAlign:"center",fontWeight:"200",fontFamily:"Fright",color:"#CF9658",fontSize:"48px"}}>Transform Your Rare Whiskey Bottles into NFTs
</h1>
 <p style={{color:"white",textAlign:"center" ,marginTop:"2%",marginBottom:"5%"}}>Choose from a range of minting options, designed to help you create, manage, and grow your NFT-backed whiskey collection.

</p>
 

        
    </div>
    <div style={{background:"var(--background3)", height:"90vh",display:"flex",alignItems:"center"}}>
    <div style={{width:"50%"}}>
        <div style={{marginLeft:"5%",padding:"5%"}}>
        <h1 style={{color:"var(--background2)",fontWeight:"380",fontFamily:"Fright"}}>Introduction
    </h1>
    <p style={{color:"white"}}>Turn your rare whiskey bottles into unique, tradeable NFTs with our user-friendly minting process. Our platform offers various minting options, ensuring a seamless experience for both novice and seasoned collectors. Explore our available plans and select the one that best suits your needs.</p>
<Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background3)",
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
                DISCOVER OPTIONS
              </Button>{" "}
         </div>
  
    </div>
    <div style={{marginLeft:"5%"}}>
    <img width={500} src="/images/about.png" />
    </div>
      </div>

      <div style={{ width:"100%"  ,background:"var(--background)",padding:"8%",paddingBottom:"8%"}}> 
    <p style={{color:"var(--background2)",fontSize:"0.8rem"}}>AVAILABLE OPTIONS

</p>
 <h1 style={{color:"var(--background2)",fontWeight:"700",fontFamily:"Fright",fontSize:"48px",letterSpacing:"-0.96px"}}>Choose from a range of minting options
</h1>
 <p style={{color:"#E6E8EC" ,marginTop:"2%",marginBottom:"5%"}}>Choose from a range of minting options, tailored to meet the specific needs of your NFT-backed whiskey collection.

</p>
 <div style={{display:"grid",gridTemplateColumns:"30% 30% 30%",columnGap:"5%"}}>
 <div style={{borderColor:"var(--borderColor)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"0.8rem"}}>BASIC MINTING</h3>
        <h1 style={{fontSize:"1.3rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$20/Month/Bottle</h1>
        <p style={{color:"white"}}>Features:</p>
        <ul style={{color:"white",fontSize:"14px"}}>
            <li>Standard NFT creation</li>
            <li>Immutable blockchain record </li>
            <li>Unique NFT identifiers </li>
            <li>NFT identifiers NFT listing on our marketplace</li>
            
        </ul>
        <Button
                style={{
                  color: "black",
                  backgroundColor: "var(--background2)",
                  height: "2.5rem",
                  marginTop: "2.3rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem",
                  width:"100%"



                }}
              >
                SELECT
              </Button>{" "}
    </div>
    <div style={{borderColor:"var(--borderColor)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"0.8rem"}}>PREMIUM MINTING</h3>
        <h1 style={{fontSize:"1.3rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$50/Month/Bottle</h1>
        <p style={{color:"white"}}>Features:</p>
        <ul style={{color:"white",fontSize:"14px"}}>
            <li>All Basic Minting features</li>
            <li>High-quality 3D modeling and 360-degree visualization</li>
            <li>Metadata enhancement with detailed bottle history </li>
            <li>Priority listing on our marketplace</li>
        </ul>
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
                  borderWidth:"0.1rem",
                  width:"100%"



                }}
              >
                SELECT
              </Button>{" "}
    </div>
    <div style={{borderColor:"var(--borderColor)",borderStyle:"solid",padding:"5%",margin:"5%"}}>
        <h3 style={{color:"white",fontSize:"0.8rem"}}>PLATINUM MINTING</h3>
        <h1 style={{fontSize:"1.3rem",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>$100/Month/Bottle</h1>
        <p style={{color:"white"}}>Features:</p>
        <ul style={{color:"white",fontSize:"14px"}}>
            <li>All Premium Minting features</li>
            <li>AR-enabled NFT experience</li>
            <li>Bottle valuation and rarity assessment</li>
            <li>Personalized NFT creation and promotion support</li>
        </ul>
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
                  borderWidth:"0.1rem",
                  width:"100%"



                }}
              >
                SELECT
              </Button>{" "}
    </div>
 </div>

        
    </div>

    {/* How it works */}
    <div style={{ width:"100%"  ,background:"var(--background3)",padding:"5%",paddingBottom:"8%"}}> 
  
 <h1 style={{color:"var(--background2)",fontWeight:"200",fontFamily:"Fright",fontSize:"48px",marginLeft:"1%"}}>How It Works

</h1>
 
 <div style={{display:"grid",gridTemplateColumns:"26% 26% 26% 26%",columnGap:"1%",paddingRight:"5%"}}>
 <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
 <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"24%",textAlign:"center" ,padding:"2%"}}>STEP 1</h3>
        <h1 style={{fontSize:"18px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Choose a minting plan</h1>
 <p style={{color:"white",fontSize:"14px"}}>Select the minting option that best fits your needs and budget.</p>
       
    </div>
    <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
    <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"24%",textAlign:"center" ,padding:"2%"}}>STEP 2</h3>
        <h1 style={{fontSize:"18px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Initiate the process</h1>
 <p style={{color:"white",fontSize:"14px"}}>Follow the guided steps to mint your NFT-backed whiskey bottles, providing proof of ownership and confirming details.</p>
       
    </div> <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
    <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"24%",textAlign:"center" ,padding:"2%"}}>STEP 3</h3>
        <h1 style={{fontSize:"18px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Create your NFT</h1>
 <p style={{color:"white",fontSize:"14px"}}>Our team will transform your rare whiskey bottle into a unique, tradeable NFT with the features included in your selected minting plan.</p>
       
    </div> <div style={{background:"var(--background)",padding:"5%",margin:"5%" ,borderColor:"var(--borderColor)",borderStyle:"solid"}}>
        <h3 style={{color:"white",fontSize:"0.8rem" ,background:"#5F4529",width:"24%",textAlign:"center" ,padding:"2%"}}>STEP 4</h3>
        <h1 style={{fontSize:"18px",color:"var(--background2)",marginBottom:"5%",marginTop:"5%"}}>Manage your NFTs</h1>
 <p style={{color:"white",fontSize:"14px"}}>Once minted, your NFT will be listed on our marketplace, allowing you to buy, sell, or trade with other whiskey enthusiasts.</p>
       
    </div>
  
   
 </div>

        
    </div>
    </div>
  )
}

export default Login