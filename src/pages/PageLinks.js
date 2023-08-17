 import React from 'react'
 import { Link } from 'react-router-dom'
  const PageLinks = () => {
   return (
     <div style={{background:"var(--background)",padding:"5%"}}>
        
             <Link exact style={{color:"var(--background2)"}} to={'/login'}   >login  </Link> <br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/register'}   >register</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/storage-options'}   >storage-options</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/minting-options'}  >minting-options</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/aboutus'}   >about us</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/personalize-recomendation'}   >personalize-recomendation</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/contactus'}  >contact us</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/dashboard'}   >dashboard</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/ar-enabled'}   >ar-enabled</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/valuation'}  >valuation</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/subscription'}  >subscription</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/upload-1'}  >upload-1</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/upload-2'}   >upload-2</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/faq'}   >faq</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/profile'}   >profile</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/activity'}   >activity</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/search'}   >search</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/not-found'}   >not-found</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/item-1'}   >item-1</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/item-2'}   >item-2</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/edit-profile'}  >edit-profile</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/profile2'}   >profile2</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/redeem'}   >redeem</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/connect-wallet'}   >connect-wallet</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/connect-wallet2'}   >connect-wallet2</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/connect-wallet3'}   >connect-wallet3</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/storage-listing'}   >storage-listing</Link><br></br>
            <Link exact style={{color:"var(--background2)"}} to={'/transactions'}   >Transactions</Link><br></br>
             
     </div>
   )
 }
 
 export default PageLinks