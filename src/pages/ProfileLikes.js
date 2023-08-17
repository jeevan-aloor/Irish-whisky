import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NFT_ABI,COLLECTION_ABI } from "../NFT_ABI";
import Web3 from 'web3';
import NfToken from "../components/NfToken";
const web3 = new Web3(Web3.givenProvider );

const Profile = () => {
  let navigate = useNavigate()
    let [isloading,setLoading] = useState(true)
    let [ipfshashArray,setipfshashArray] = useState([])
    let [collectionList,setCollectionList] = useState([])
    const  {user} = useSelector((state) => state);
    console.log(user,"userlikesss")
    const formatAddress = (address) => {
      const firstPart = address.substring(0, 5);
      const lastPart = address.substring(address.length - 3);
      return `${firstPart}...${lastPart}`;
    };
  

useEffect(() => {
  setTimeout(() => {
     setLoading(false)
  }, 2000);
   
}, []);


let GetData = (()=>{
 
  if(user && user.user && user.user.address){
    let  collectionContractAddress = '0x2E73fa6d643EeB770aA26be13eF0dA7C697d3561';
    let userAddress = user&& user.user.address; //Metamask logged in Address
   const contractInstance = new web3.eth.Contract(COLLECTION_ABI, collectionContractAddress);
    contractInstance.methods.userCollections(userAddress).call().then((data)=>{
      setCollectionList(data)
     
    })
  }

})
let array = []

useEffect(()=>{

  collectionList && collectionList.length && collectionList.map(async(item)=>{
    let nftContractAddress = item.newCollection;
   let address = user&& user.user.address; //Metamask logged in Address
  const contractInstance = new web3.eth.Contract(NFT_ABI, nftContractAddress);
  let bal = await contractInstance.methods.balanceOf(address).call();
  
  for (var i = 0; i < bal; i++) {
    let id, uri;
    // Token ID
    id = await contractInstance.methods.tokenOfOwnerByIndex(address, i).call();
    // Token URI
    uri = await contractInstance.methods.getTokenIPFSPath(id).call();
    // setipfshashArray((prevState)=>[...prevState,uri])
    array.push({ipfs:uri,token:id,collectionId:item.newCollection,collectionHash:item.ipfsHash})
     let uniq = [...new Set(array)];
     setipfshashArray(uniq)


  }

  })
},[collectionList,])

 useEffect(()=>{
  GetData()

 },[user,isloading])
 
  

   return (
    <>
    {isloading ?  
    <div style={{height:"80vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--background)"}}>
 <ReactLoading type={'bubbles'} color={'var(--background2)'} height={'10%'} width={'10%'} />
</div>   : <div>
 <div>
   <div
     style={{
       backgroundImage: "url(/images/profileBanner.png)",
       height: "36vh",
       backgroundRepeat: "no-repeat",
       backgroundPosition: "center",
       backgroundSize: "cover",
     }}
   >
     <div style={{ display: "flex", justifyContent: "space-between" }}>
       <div
         style={{
           background: "var(--background3)",
           marginLeft: "5%",
           marginTop: "10%",
           padding: "3%",
           width:"22%",
           
         }}
       >
          <img
           style={{ marginLeft: "20%", marginBottom: "5%",borderRadius:"50%",height:"150px",width:"150px"  }}
           src={`${user.user&& user.user.imgpath}`}
         />{" "}
         <br></br>
         <h4
           style={{ color: "white", textAlign: "center", marginTop: "5%",wordWrap:"break-word",width:"100%" }}
         >
           { user && user.user  ? user.user.name : ""} <br></br>{" "}
           <span style={{ fontSize: "0.9rem",textAlign:"center"}}>
             {
               user && user.user&&user.user.address  ?  formatAddress(user.user.address) : ""
             }
             <svg
               width="16"
               height="16"
               viewBox="0 0 16 16"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M11.9896 9.67065C12.0046 9.92016 12.2651 10.0885 12.4769 9.95562C13.7923 9.13033 14.6668 7.66713 14.6668 5.99967C14.6668 3.42235 12.5775 1.33301 10.0002 1.33301C8.3327 1.33301 6.8695 2.20754 6.04421 3.52297C5.91137 3.7347 6.07967 3.99521 6.32918 4.01021C9.31307 4.1896 11.8102 6.68934 11.9896 9.67065Z"
                 fill="#CF9658"
               />
               <path
                 d="M10.6668 9.99967C10.6668 12.577 8.57749 14.6663 6.00016 14.6663C3.42283 14.6663 1.3335 12.577 1.3335 9.99967C1.3335 7.42235 3.42283 5.33301 6.00016 5.33301C8.57749 5.33301 10.6668 7.42235 10.6668 9.99967Z"
                 fill="#CF9658"
               />
             </svg>{" "}
           </span>
         </h4>
         <p
           style={{
             color: "var(--background2)",
             fontSize: "0.9rem",
             textAlign: "center",
           }}
         >
  {
               user && user.user  ?  user.user.bio : ""
             }         </p>
         <div style={{ textAlign: "center" }}>
           <svg
             width="16"
             height="16"
             viewBox="0 0 16 16"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M8.00016 13.333C10.9457 13.333 13.3335 10.9452 13.3335 7.99967C13.3335 5.05416 10.9457 2.66634 8.00016 2.66634C5.05464 2.66634 2.66683 5.05416 2.66683 7.99967C2.66683 10.9452 5.05464 13.333 8.00016 13.333ZM8.00016 14.6663C11.6821 14.6663 14.6668 11.6816 14.6668 7.99967C14.6668 4.31778 11.6821 1.33301 8.00016 1.33301C4.31826 1.33301 1.3335 4.31778 1.3335 7.99967C1.3335 11.6816 4.31826 14.6663 8.00016 14.6663Z"
               fill="#D2A163"
             />
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M9.16429 12.1174C9.65676 11.1325 9.99984 9.67851 9.99984 7.99967C9.99984 6.32084 9.65676 4.86685 9.16429 3.88191C8.63195 2.81722 8.14321 2.66634 7.99984 2.66634C7.85647 2.66634 7.36773 2.81722 6.83538 3.88191C6.34292 4.86685 5.99984 6.32084 5.99984 7.99967C5.99984 9.67851 6.34292 11.1325 6.83538 12.1174C7.36773 13.1821 7.85647 13.333 7.99984 13.333C8.14321 13.333 8.63195 13.1821 9.16429 12.1174ZM7.99984 14.6663C9.84079 14.6663 11.3332 11.6816 11.3332 7.99967C11.3332 4.31778 9.84079 1.33301 7.99984 1.33301C6.15889 1.33301 4.6665 4.31778 4.6665 7.99967C4.6665 11.6816 6.15889 14.6663 7.99984 14.6663Z"
               fill="#D2A163"
             />
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M14.6339 8.66634C14.6557 8.44707 14.6668 8.22467 14.6668 7.99967C14.6668 7.77467 14.6557 7.55228 14.6339 7.33301H1.36641C1.34464 7.55228 1.3335 7.77467 1.3335 7.99967C1.3335 8.22467 1.34464 8.44707 1.36641 8.66634H14.6339Z"
               fill="#D2A163"
             />
           </svg>
           <div style={{ display: "flex", marginTop: "10%",justifyContent:"center" }}>
             <Button
               style={{
                 color: "black",
                 backgroundColor: "var(--background2)",
                 height: "2.5rem",
                 marginTop: "0.8rem",
                 marginRight: "1rem",
                 borderColor: "var(--background2)",
                 borderRadius: "0%",
                 borderWidth: "0.1rem",
                 fontSize: "0.7rem",
               }}
             >
               Follow
             </Button>{" "}
             <Button
               style={{
                 color: "black",
                 backgroundColor: "var(--background3)",
                 height: "2.5rem",
                 marginTop: "0.8rem",
                 marginRight: "1rem",
                 borderColor: "var(--borderColor)",
                 borderRadius: "0%",
                 borderWidth: "0.1rem",
                 fontSize: "0.7rem",
               }}
             >
               <svg
                 width="21"
                 height="20"
                 viewBox="0 0 21 20"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   fillRule="evenodd"
                   clipRule="evenodd"
                   d="M7.99882 8.36614C8.02332 8.82573 7.67061 9.21815 7.21103 9.24265C6.58379 9.27609 6.087 9.31699 5.69878 9.35794C5.17743 9.41292 4.86065 9.73316 4.80799 10.1938C4.73238 10.8552 4.66667 11.8561 4.66667 13.3329C4.66667 14.8098 4.73238 15.8107 4.80799 16.472C4.86074 16.9335 5.17672 17.2528 5.69729 17.3078C6.60898 17.404 8.11604 17.4996 10.5 17.4996C12.884 17.4996 14.391 17.404 15.3027 17.3078C15.8233 17.2528 16.1393 16.9335 16.192 16.472C16.2676 15.8107 16.3333 14.8098 16.3333 13.3329C16.3333 11.8561 16.2676 10.8552 16.192 10.1938C16.1394 9.73316 15.8226 9.41292 15.3012 9.35794C14.913 9.31699 14.4162 9.27609 13.789 9.24265C13.3294 9.21815 12.9767 8.82573 13.0012 8.36614C13.0257 7.90656 13.4181 7.55385 13.8777 7.57835C14.5301 7.61313 15.0558 7.65614 15.476 7.70046C16.713 7.83092 17.6997 8.7085 17.8479 10.0045C17.9323 10.7432 18 11.8092 18 13.3329C18 14.8567 17.9323 15.9227 17.8479 16.6613C17.6998 17.9566 16.7154 18.8346 15.4776 18.9652C14.4933 19.0691 12.9257 19.1663 10.5 19.1663C8.07435 19.1663 6.50672 19.0691 5.52236 18.9652C4.28459 18.8346 3.30017 17.9566 3.15211 16.6613C3.06767 15.9227 3 14.8567 3 13.3329C3 11.8092 3.06767 10.7432 3.15211 10.0045C3.30026 8.7085 4.28697 7.83092 5.52397 7.70046C5.94422 7.65614 6.46994 7.61313 7.1223 7.57835C7.58189 7.55385 7.97432 7.90656 7.99882 8.36614Z"
                   fill="#D2A163"
                 />
                 <path
                   fillRule="evenodd"
                   clipRule="evenodd"
                   d="M8.17259 5.17226C7.84715 5.4977 7.31951 5.4977 6.99408 5.17226C6.66864 4.84683 6.66864 4.31919 6.99408 3.99375L9.91074 1.07709C10.2362 0.751649 10.7638 0.751649 11.0893 1.07709L14.0059 3.99375C14.3314 4.31919 14.3314 4.84683 14.0059 5.17226C13.6805 5.4977 13.1528 5.4977 12.8274 5.17226L11.3333 3.67819V11.6663C11.3333 12.1266 10.9602 12.4997 10.5 12.4997C10.0398 12.4997 9.66667 12.1266 9.66667 11.6663V3.67819L8.17259 5.17226Z"
                   fill="#D2A163"
                 />
               </svg>
             </Button>{" "}
             <Button
               style={{
                 color: "black",
                 backgroundColor: "var(--background3)",
                 height: "2.5rem",
                 marginTop: "0.8rem",
                 marginRight: "1rem",
                 borderColor: "var(--borderColor)",
                 borderRadius: "0%",
                 borderWidth: "0.1rem",
                 fontSize: "0.7rem",
               }}
             >
               <svg
                 width="21"
                 height="20"
                 viewBox="0 0 21 20"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <g clipPath="url(#clip0_95_1473)">
                   <path
                     d="M4.66667 8.33301C3.75 8.33301 3 9.08301 3 9.99967C3 10.9163 3.75 11.6663 4.66667 11.6663C5.58333 11.6663 6.33333 10.9163 6.33333 9.99967C6.33333 9.08301 5.58333 8.33301 4.66667 8.33301ZM16.3333 8.33301C15.4167 8.33301 14.6667 9.08301 14.6667 9.99967C14.6667 10.9163 15.4167 11.6663 16.3333 11.6663C17.25 11.6663 18 10.9163 18 9.99967C18 9.08301 17.25 8.33301 16.3333 8.33301ZM10.5 8.33301C9.58333 8.33301 8.83333 9.08301 8.83333 9.99967C8.83333 10.9163 9.58333 11.6663 10.5 11.6663C11.4167 11.6663 12.1667 10.9163 12.1667 9.99967C12.1667 9.08301 11.4167 8.33301 10.5 8.33301Z"
                     fill="#D2A163"
                   />
                 </g>
                 <defs>
                   <clipPath id="clip0_95_1473">
                     <rect
                       width="20"
                       height="20"
                       fill="white"
                       transform="translate(0.5)"
                     />
                   </clipPath>
                 </defs>
               </svg>
             </Button>{" "}
           </div>

           <div style={{ marginTop: "20%" }}>
             <svg
               width="20"
               style={{ marginLeft: "5%", marginRight: "5%" }}
               height="20"
               viewBox="0 0 20 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M2.65067 11.6665C1.27257 11.6704 0.382969 13.2403 1.23197 14.4298C2.44782 16.133 4.65261 17.5 8.33346 17.5C14.0377 17.5 18.6165 12.8514 17.9755 7.35925L18.9146 5.48108C19.5659 4.17857 18.4342 2.69685 17.0062 2.98245L15.7655 3.23057C15.4366 3.05702 15.0962 2.92606 14.8053 2.83117C14.2383 2.64627 13.552 2.5 12.9168 2.5C11.7757 2.5 10.7909 2.79276 10.0082 3.37994C9.23446 3.96053 8.79863 4.72354 8.55946 5.42421C8.44921 5.74717 8.37579 6.07112 8.32868 6.38203C7.88596 6.24269 7.43453 6.05522 6.99258 5.82629C5.98992 5.30693 5.17912 4.64852 4.72175 4.07126C3.95439 3.10275 2.32819 3.17456 1.75754 4.43351C0.953258 6.20789 1.17388 8.31122 1.89683 10.0108C2.13915 10.5803 2.45436 11.1434 2.83945 11.6652C2.77352 11.666 2.71046 11.6663 2.65067 11.6665ZM8.33337 15.8333C5.11392 15.8333 3.4492 14.6672 2.58841 13.4614C2.54973 13.4072 2.58873 13.3333 2.65529 13.3332C3.53099 13.3307 5.32849 13.2892 6.51399 12.5954C6.5753 12.5595 6.56181 12.4691 6.49447 12.4465C3.731 11.5173 2.16014 7.58216 3.27546 5.12158C3.30103 5.06517 3.37687 5.05772 3.41534 5.10628C4.6894 6.71432 7.47507 8.28933 9.89871 8.33242C9.95129 8.33333 9.99104 8.28558 9.98304 8.23361C9.88538 7.60044 9.51246 4.16667 12.9167 4.16667C13.7296 4.16667 14.9391 4.56319 15.3846 4.96942C15.4052 4.98819 15.4331 4.99672 15.4605 4.99125L17.333 4.61675C17.401 4.60315 17.4549 4.67371 17.4239 4.73573L16.2625 7.05849C16.2544 7.07462 16.2519 7.09312 16.255 7.11088C17.0684 11.6833 13.3234 15.8333 8.33337 15.8333Z"
                 fill="#D2A163"
               />
             </svg>
             <svg
               style={{ marginLeft: "5%", marginRight: "5%" }}
               width="20"
               height="20"
               viewBox="0 0 20 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M13.3332 3.33366H6.6665C4.82555 3.33366 3.33317 4.82604 3.33317 6.66699V13.3337C3.33317 15.1746 4.82555 16.667 6.6665 16.667H13.3332C15.1741 16.667 16.6665 15.1746 16.6665 13.3337V6.66699C16.6665 4.82604 15.1741 3.33366 13.3332 3.33366ZM6.6665 1.66699C3.90508 1.66699 1.6665 3.90557 1.6665 6.66699V13.3337C1.6665 16.0951 3.90508 18.3337 6.6665 18.3337H13.3332C16.0946 18.3337 18.3332 16.0951 18.3332 13.3337V6.66699C18.3332 3.90557 16.0946 1.66699 13.3332 1.66699H6.6665Z"
                 fill="#D2A163"
               />
               <path
                 d="M14.1668 6.66667C14.6271 6.66667 15.0002 6.29357 15.0002 5.83333C15.0002 5.3731 14.6271 5 14.1668 5C13.7066 5 13.3335 5.3731 13.3335 5.83333C13.3335 6.29357 13.7066 6.66667 14.1668 6.66667Z"
                 fill="#D2A163"
               />
               <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M14.1668 9.99967C14.1668 12.3008 12.3013 14.1663 10.0002 14.1663C7.69898 14.1663 5.8335 12.3008 5.8335 9.99967C5.8335 7.69849 7.69898 5.83301 10.0002 5.83301C12.3013 5.83301 14.1668 7.69849 14.1668 9.99967ZM12.5002 9.99967C12.5002 11.3804 11.3809 12.4997 10.0002 12.4997C8.61941 12.4997 7.50016 11.3804 7.50016 9.99967C7.50016 8.61892 8.61941 7.49967 10.0002 7.49967C11.3809 7.49967 12.5002 8.61892 12.5002 9.99967Z"
                 fill="#D2A163"
               />
             </svg>
             <svg
               style={{ marginLeft: "5%", marginRight: "5%" }}
               width="20"
               height="20"
               viewBox="0 0 20 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M9.99984 16.667C13.6818 16.667 16.6665 13.6822 16.6665 10.0003C16.6665 6.31843 13.6818 3.33366 9.99984 3.33366C6.31794 3.33366 3.33317 6.31843 3.33317 10.0003C3.33317 13.6822 6.31794 16.667 9.99984 16.667ZM9.99984 18.3337C14.6022 18.3337 18.3332 14.6027 18.3332 10.0003C18.3332 5.39795 14.6022 1.66699 9.99984 1.66699C5.39746 1.66699 1.6665 5.39795 1.6665 10.0003C1.6665 14.6027 5.39746 18.3337 9.99984 18.3337Z"
                 fill="#D2A163"
               />
               <path
                 d="M9.99984 8.33301C9.99984 7.87277 10.3729 7.49967 10.8332 7.49967H11.6665C12.1268 7.49967 12.4998 7.12658 12.4998 6.66634C12.4998 6.20611 12.1268 5.83301 11.6665 5.83301H10.8332C9.45242 5.83301 8.33317 6.9523 8.33317 8.33301V9.99967H7.49984C7.0396 9.99967 6.6665 10.3728 6.6665 10.833C6.6665 11.2933 7.0396 11.6663 7.49984 11.6663H8.33317V16.6663C8.33317 17.1266 8.70625 17.4997 9.1665 17.4997C9.62675 17.4997 9.99984 17.1266 9.99984 16.6663V11.6663H11.6665C12.1268 11.6663 12.4998 11.2933 12.4998 10.833C12.4998 10.3728 12.1268 9.99967 11.6665 9.99967H9.99984V8.33301Z"
                 fill="#D2A163"
               />
             </svg>
           </div>
           <hr
             style={{
               color: "white",
               marginTop: "30%",
               marginBottom: "30%",
             }}
           ></hr>
           <p style={{ color: "var(--background2)" }}>
             Member Since Mar 15, 2021
           </p>
         </div>
       </div>
       <div style={{ marginTop: "13%" }}>
         <Button
           style={{
             color: "var(--background2)",
             backgroundColor: "var(--background3)",
             height: "2.5rem",
             marginTop: "0.8rem",
             marginRight: "1rem",
             borderColor: "var(--background2)",
             borderRadius: "0%",
             borderWidth: "0.1rem",
             fontSize: "0.7rem",
           }}
         >
           EDIT COVER PHOTO &nbsp;&nbsp; <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fillRule="evenodd" clipRule="evenodd" d="M8.00016 2.66634C6.69867 2.66634 5.49894 2.77368 4.53597 2.90086C3.66931 3.01532 3.01581 3.66882 2.90135 4.53548C2.77417 5.49845 2.66683 6.69819 2.66683 7.99967C2.66683 9.30116 2.77417 10.5009 2.90135 11.4639C3.01581 12.3305 3.66931 12.984 4.53597 13.0985C5.49894 13.2257 6.69867 13.333 8.00016 13.333C9.30165 13.333 10.5014 13.2257 11.4644 13.0985C12.331 12.984 12.9845 12.3305 13.099 11.4639C13.2262 10.5009 13.3335 9.30116 13.3335 7.99967C13.3335 6.69819 13.2262 5.49845 13.099 4.53548C12.9845 3.66882 12.331 3.01532 11.4644 2.90086C10.5014 2.77368 9.30165 2.66634 8.00016 2.66634ZM4.36139 1.579C2.89686 1.77242 1.77291 2.89637 1.57949 4.3609C1.44652 5.36773 1.3335 6.62719 1.3335 7.99967C1.3335 9.37216 1.44652 10.6316 1.57949 11.6384C1.77291 13.103 2.89686 14.2269 4.36139 14.4203C5.36822 14.5533 6.62768 14.6663 8.00016 14.6663C9.37265 14.6663 10.6321 14.5533 11.6389 14.4203C13.1035 14.2269 14.2274 13.103 14.4208 11.6384C14.5538 10.6316 14.6668 9.37216 14.6668 7.99967C14.6668 6.62719 14.5538 5.36773 14.4208 4.3609C14.2274 2.89637 13.1035 1.77242 11.6389 1.579C10.6321 1.44603 9.37265 1.33301 8.00016 1.33301C6.62768 1.33301 5.36822 1.44603 4.36139 1.579Z" fill="#CF9658" />
             <path d="M5.99992 7.33366C6.7363 7.33366 7.33325 6.73671 7.33325 6.00033C7.33325 5.26395 6.7363 4.66699 5.99992 4.66699C5.26354 4.66699 4.66659 5.26395 4.66659 6.00033C4.66659 6.73671 5.26354 7.33366 5.99992 7.33366Z" fill="#CF9658" />
             <path d="M12.0808 8.47185L13.277 9.66807C13.2357 10.2922 13.1755 10.8713 13.109 11.3857L11.138 9.41466C10.8776 9.15431 10.4555 9.15431 10.1952 9.41466L8.74746 10.8624C7.96641 11.6434 6.70008 11.6434 5.91904 10.8624L5.80465 10.748C5.5443 10.4876 5.1222 10.4876 4.86185 10.748L3.2558 12.354C3.06975 12.1018 2.94527 11.799 2.90109 11.4645C2.877 11.2821 2.85362 11.0912 2.83154 10.8927L3.91904 9.80519C4.70009 9.02414 5.96641 9.02414 6.74746 9.80519L6.86184 9.91957C7.12219 10.1799 7.5443 10.1799 7.80465 9.91957L9.25237 8.47185C10.0334 7.6908 11.2997 7.69081 12.0808 8.47185Z" fill="#CF9658" />
           </svg>

         </Button>{" "}
         <Button
           style={{
             color: "var(--background2)",
             backgroundColor: "var(--background3)",
             height: "2.5rem",
             marginTop: "0.8rem",
             marginRight: "1rem",
             borderColor: "var(--background2)",
             borderRadius: "0%",
             borderWidth: "0.1rem",
             fontSize: "0.7rem",
           }}
           onClick={()=>navigate("/edit-profile")}
         >
           EDIT PROFILE &nbsp;&nbsp; <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 14.6667C0 14.2985 0.298477 14 0.666667 14H11.3333C11.7015 14 12 14.2985 12 14.6667V14.6667C12 15.0349 11.7015 15.3333 11.3333 15.3333H0.666667C0.298477 15.3333 0 15.0349 0 14.6667V14.6667Z" fill="#CF9658" />
             <path fillRule="evenodd" clipRule="evenodd" d="M9.13807 2.08133C8.87772 1.82098 8.45561 1.82098 8.19526 2.08133L7.6095 2.6671L10 5.05762L10.5858 4.47185C10.8461 4.2115 10.8461 3.78939 10.5858 3.52905L9.13807 2.08133ZM2.6095 7.66709L6.66669 3.6099L9.05721 6.00043L5.00002 10.0576L2.6095 7.66709ZM1.66669 8.6099L1.33333 8.94326V11.3338H3.72386L4.05721 11.0004L1.66669 8.6099ZM7.25245 1.13852C8.0335 0.357472 9.29983 0.357472 10.0809 1.13852L11.5286 2.58624C12.3096 3.36729 12.3096 4.63362 11.5286 5.41466L4.66667 12.2766C4.41662 12.5266 4.07748 12.6671 3.72386 12.6671H1.33333C0.596954 12.6671 0 12.0702 0 11.3338V8.94326C0 8.58964 0.140476 8.2505 0.390524 8.00045L7.25245 1.13852Z" fill="#CF9658" />
           </svg>

         </Button>{" "}
       </div>
     </div>
   </div>
 </div>
 <div
   style={{
     paddingRight: "5rem",
     paddingLeft: "30rem",
     paddingTop: "5%",
     background: "var(--background)",
   }}
 >
   <div
     style={{
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
       marginBottom: "1%",
     }}
   >
     <div
       style={{
         display: "flex",
         color: "var(--background2)",
         alignItems: "center",
         marginLeft:"5%"
       }}
     >
       <p
         style={{
           margin: "1rem"
           ,cursor:"pointer" 
         }}
         onClick={()=>window.location.href ="/profile"}
       >
         ON SALE
       </p>
       <p  onClick={()=>window.location.href ="/profile/collectibles"} style={{ margin: "1rem",cursor:"pointer"  }}>COLLECTIBLES</p>
       <p onClick={()=>window.location.href ="/profile/created"}
  style={{ margin: "1rem",cursor:"pointer" }}>CREATED</p>
       <p onClick={()=>window.location.href ="/profile/likes"} style={{ margin: "1rem",  background: "var(--background2)",
           padding: "0.1rem",
           color: "black",
           fontWeight: "bold",cursor:"pointer"  }}>LIKES</p>
       <p style={{ margin: "1rem",cursor:"pointer"  }}>FOLLOWING</p>
       <p style={{ margin: "1rem",cursor:"pointer"  }}>FOLLOWERS</p>
     </div>
   </div>

   <div
     style={{
       paddingBottom:"5%",marginLeft:"5%",marginTop:"5%",
       height: "fit-content",paddingBottom:"80vh",
       paddingTop:"30px",paddingLeft:"20px",paddingRight:"20px",display: "grid",
       gridTemplateColumns: "28% 28% 28%",
       gap: "5%",
       gridRowGap: "5%",width:"100%"
     }}
     
   >
    {/* {user && user.user.favourites.map((ele)=>(
        <div style={{display:"flex",gap:"50px",marginBottom:"20px"}}>
        <div>
        {ele.type && ele.type=="image" &&
            <img height={100} width={100}
            style={{ background:"black",borderRadius:"50px" }}
            src={`${ele.imgpath}
            `}
            alt="nft-img"
          />
           }
          { ele.type&&ele.type=="video" &&
        <video height={200} width={200} autoPlay loop style={{objectFit:"fill",borderRadius:"50px",height:"100px",width:"100px" }}
         >
        <source src={`${ele.imgpath}`} type="video/mp4"/>
   </video>  
           }
        </div>
        <div>
        <h2 style={{color:"white",fontSize:"20px"}}>{ele.distillery}</h2>
        <h3 style={{color:"white",fontSize:"17px",color:"#A17545"}}>{ele.bottling_date}</h3>
        <h4 style={{color:"white",fontSize:"15px",color:"#CF9658"}}>{ele.additional_details}</h4>
        </div>
        </div>
    ))} */}
    {user && user.user.favourites.map((ele)=>(
      <div style={{height:"400px",padding:"10px",border:"1px solid red"}}>
        {ele.type && ele.type=="image" &&
            <img
            style={{ background:"black",height:"60%",width:"100%" }}
            src={`${ele.imgpath}
            `}
            alt="nft-img"
          />
           }
          { ele.type&&ele.type=="video" &&
        <video  autoPlay loop style={{objectFit:"fill",height:"60%",width:"100%" }}
         >
        <source src={`${ele.imgpath}`} type="video/mp4"/>
   </video>  
           }
           <h2 style={{color:"white",fontSize:"20px",marginTop:"10px"}}>{ele.distillery}</h2>
        
      </div>
    ))}


   
   </div>
 </div>
</div>}
    </>
  
  );
};

export default Profile;
