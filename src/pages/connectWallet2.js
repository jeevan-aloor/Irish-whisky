import React,{ useState } from 'react'
import { Button } from 'react-bootstrap'

const Connectwallet = () => {
  return (
    <div style={{background:"var(--background)",padding:"10%",paddingTop:"5%"}}> 
    <div style={{display:"flex",alignItems:"center"}}>
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M8.51444 0.609004C7.83808 -0.0153393 6.78365 0.0268318 6.1593 0.703196L0.774683 6.53646C0.185354 7.1749 0.185348 8.15896 0.774671 8.7974L6.15929 14.6308C6.78363 15.3072 7.83806 15.3493 8.51443 14.725C9.1908 14.1007 9.23298 13.0462 8.60865 12.3699L5.80596 9.3336L21.9994 9.3336C22.9198 9.3336 23.666 8.58741 23.666 7.66694C23.666 6.74646 22.9198 6.00027 21.9993 6.00027L5.80602 6.00027L8.60863 2.96414C9.23298 2.28778 9.19081 1.23335 8.51444 0.609004Z" fill="#FCFCFD"/>
</svg> &nbsp;&nbsp;&nbsp;&nbsp;
<h3 style={{color:"white",fontFamily:"fright"}}>Connect your wallet</h3>
    </div>
    <hr style={{color:"var(--background2)"}}></hr>
    <div style={{display:"grid",gridTemplateColumns:"60% 40%",marginTop:"5%"}}>
        <div>
        <div style={{padding:"3%",width:"70%", display:"flex",alignItems:"center",marginTop:"5%"}}>
            <svg style={{marginRight:"5%"}} width="54" height="54" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="54" height="54" rx="32" fill="#CF9658"/>
<path fillRule="evenodd" clipRule="evenodd" d="M39 25H25C23.8954 25 23 25.8954 23 27V37C23 38.1046 23.8954 39 25 39H39C40.1046 39 41 38.1046 41 37V27C41 25.8954 40.1046 25 39 25ZM25 23C22.7909 23 21 24.7909 21 27V37C21 39.2091 22.7909 41 25 41H39C41.2091 41 43 39.2091 43 37V27C43 24.7909 41.2091 23 39 23H25Z" fill="#FCFCFD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M33 32C33 29.2386 35.2386 27 38 27H42C42.5523 27 43 27.4477 43 28C43 28.5523 42.5523 29 42 29H38C36.3431 29 35 30.3431 35 32C35 33.6569 36.3431 35 38 35H42C42.5523 35 43 35.4477 43 36C43 36.5523 42.5523 37 42 37H38C35.2386 37 33 34.7614 33 32Z" fill="#FCFCFD"/>
<path d="M39 32C39 32.5523 38.5523 33 38 33C37.4477 33 37 32.5523 37 32C37 31.4477 37.4477 31 38 31C38.5523 31 39 31.4477 39 32Z" fill="#FCFCFD"/>
</svg> 
<p style={{color:"white"}}>Coinbase Wallet</p>


            </div>
            <div style={{padding:"3%",width:"70%", display:"flex",alignItems:"center",marginTop:"5%",borderStyle:"solid",borderWidth:"0.1rem",borderColor:"var(--background2)"}}>
            <svg style={{marginRight:"5%"}} width="54" height="50" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M40.9422 25.7235C41.4629 26.2442 41.4629 27.0885 40.9422 27.6092L30.2755 38.2758C29.7548 38.7965 28.9106 38.7965 28.3899 38.2758L23.0565 32.9425C22.5358 32.4218 22.5358 31.5776 23.0565 31.0569C23.5772 30.5362 24.4215 30.5362 24.9422 31.0569L29.3327 35.4474L39.0565 25.7235C39.5772 25.2028 40.4215 25.2028 40.9422 25.7235Z" fill="#CF9658"/>
<rect x="1.5" y="1.5" width="61" height="61" rx="30.5" stroke="#CF9658" stroke-width="3"/>
</svg>

<p style={{color:"white",marginRight:"150px"}}>Coinbase Wallet</p>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0523 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z" fill="#FCFCFD"/>
</svg>

            </div>
            <div style={{padding:"3%",width:"70%", display:"flex",alignItems:"center",marginTop:"5%"}}>
            <svg style={{marginRight:"5%"}} width="54" height="54" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="54" height="54" rx="32" fill="#CF9658"/>
<path fillRule="evenodd" clipRule="evenodd" d="M39 25H25C23.8954 25 23 25.8954 23 27V37C23 38.1046 23.8954 39 25 39H39C40.1046 39 41 38.1046 41 37V27C41 25.8954 40.1046 25 39 25ZM25 23C22.7909 23 21 24.7909 21 27V37C21 39.2091 22.7909 41 25 41H39C41.2091 41 43 39.2091 43 37V27C43 24.7909 41.2091 23 39 23H25Z" fill="#FCFCFD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M33 32C33 29.2386 35.2386 27 38 27H42C42.5523 27 43 27.4477 43 28C43 28.5523 42.5523 29 42 29H38C36.3431 29 35 30.3431 35 32C35 33.6569 36.3431 35 38 35H42C42.5523 35 43 35.4477 43 36C43 36.5523 42.5523 37 42 37H38C35.2386 37 33 34.7614 33 32Z" fill="#FCFCFD"/>
<path d="M39 32C39 32.5523 38.5523 33 38 33C37.4477 33 37 32.5523 37 32C37 31.4477 37.4477 31 38 31C38.5523 31 39 31.4477 39 32Z" fill="#FCFCFD"/>
</svg> 
<p style={{color:"white"}}>MyEtherWallet</p>

            </div>
            <div style={{padding:"3%",width:"70%", display:"flex",alignItems:"center",marginTop:"5%"}}>
            <svg style={{marginRight:"5%"}} width="54" height="54" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="54" height="54" rx="32" fill="#CF9658"/>
<path fillRule="evenodd" clipRule="evenodd" d="M39 25H25C23.8954 25 23 25.8954 23 27V37C23 38.1046 23.8954 39 25 39H39C40.1046 39 41 38.1046 41 37V27C41 25.8954 40.1046 25 39 25ZM25 23C22.7909 23 21 24.7909 21 27V37C21 39.2091 22.7909 41 25 41H39C41.2091 41 43 39.2091 43 37V27C43 24.7909 41.2091 23 39 23H25Z" fill="#FCFCFD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M33 32C33 29.2386 35.2386 27 38 27H42C42.5523 27 43 27.4477 43 28C43 28.5523 42.5523 29 42 29H38C36.3431 29 35 30.3431 35 32C35 33.6569 36.3431 35 38 35H42C42.5523 35 43 35.4477 43 36C43 36.5523 42.5523 37 42 37H38C35.2386 37 33 34.7614 33 32Z" fill="#FCFCFD"/>
<path d="M39 32C39 32.5523 38.5523 33 38 33C37.4477 33 37 32.5523 37 32C37 31.4477 37.4477 31 38 31C38.5523 31 39 31.4477 39 32Z" fill="#FCFCFD"/>
</svg> 
<p style={{color:"white"}}>Wallet Connect</p>

            </div>
        </div>
    <div style={{marginTop:"10%"}}>
        <h2 style={{color:"white",fontFamily:"fright"}}>Scan to connect</h2>
        <p style={{color:"var(--background2)",fontSize:"0.7rem"}}>Powered by IWC.Wallet</p>
        <div style={{background:"black",marginTop:"5%",padding:"20%",display:"flex",justifyContent:"center"}}>
            <div style={{width:"90%",height:"40vh",justifyContent:"center", background:"var(--background)",padding:"5%",alignItems:"center",display:"flex"}}>
            <svg width="119" height="118" viewBox="0 0 119 118" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.0013 0.333008H0.667969V37.6663H38.0013V0.333008ZM32.668 32.333H6.0013V5.66634H32.668V32.333Z" fill="#FCFCFD"/>
<path d="M78.0013 107H72.668V117.667H118.001V112.333H78.0013V107Z" fill="#FCFCFD"/>
<path d="M27.334 11H11.334V27H27.334V11Z" fill="#FCFCFD"/>
<path d="M0.667969 117.666H38.0013V80.333H0.667969V117.666ZM6.0013 85.6663H32.668V112.333H6.0013V85.6663Z" fill="#FCFCFD"/>
<path d="M27.334 91H11.334V107H27.334V91Z" fill="#FCFCFD"/>
<path d="M80.668 0.333008V37.6663H118.001V0.333008H80.668ZM112.668 32.333H86.0013V5.66634H112.668V32.333Z" fill="#FCFCFD"/>
<path d="M107.334 11H91.334V27H107.334V11Z" fill="#FCFCFD"/>
<path d="M118.001 43H107.334V53.6667H118.001V43Z" fill="#FCFCFD"/>
<path d="M11.3346 64.333H0.667969V74.9997H11.3346V64.333Z" fill="#FCFCFD"/>
<path d="M56.6673 42.9997H35.334V48.333H62.0007V37.6663V32.333H67.334V21.6663H62.0007H56.6673H51.334V10.9997H56.6673V16.333H75.334V0.333008H70.0007V10.9997H62.0007V0.333008H59.334H48.6673H46.0007V26.9997H56.6673V32.333H46.0007V37.6663H56.6673V42.9997Z" fill="#FCFCFD"/>
<path d="M8.66797 59H19.3346H24.668H27.3346V64.3333H16.668V69.6667H27.3346V75H48.668V69.6667H32.668V64.3333V53.6667H24.668V45.6667H19.3346V53.6667H14.0013V43H0.667969V48.3333H8.66797V59Z" fill="#FCFCFD"/>
<path d="M59.334 107V93.6667H48.6673V83H43.334V99H54.0007V107H43.334V112.333H54.0007V117.667H67.334V112.333H59.334V107Z" fill="#FCFCFD"/>
<path d="M86.002 53.6663H75.3353V40.333H70.002V58.9997H96.6686V53.6663H91.3353V48.333H99.3353V42.9997H91.3353H86.002H80.6686V48.333H86.002V53.6663Z" fill="#FCFCFD"/>
<path d="M80.668 101.666H88.668V106.999H99.3346V101.666V96.3327V88.3327H88.668V96.3327H80.668V88.3327H75.3346V96.3327H70.0013V74.9993H64.668V69.666H59.3346V53.666H40.668V64.3327H46.0013V58.9993H54.0013V69.666V80.3327H64.668V96.3327V101.666H70.0013H75.3346H80.668Z" fill="#FCFCFD"/>
<path d="M112.667 67H104.667H99.334H86.0007V77.6667H80.6673V67H75.334V83H91.334V72.3333H99.334V80.3333H104.667V72.3333H112.667V88.3333H104.667V104.333H118.001V99H110.001V93.6667H118.001V72.3333V67V59H112.667V67Z" fill="#FCFCFD"/>
</svg>

            </div>

        </div>

        <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "2rem",
                  marginRight: "1rem",
                  borderColor: "var(--background2)",
                  borderRadius:"0%",
                  paddingLeft:"5%",
                  paddingRight:"5%",
                  borderWidth:"0.1rem"


                }}
              >
                Don’t have a wallet app?
              </Button>{" "}
    </div>

    </div>

    </div>
  )
}

export default Connectwallet