import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";
import Web3 from 'web3';
import { toast } from 'react-toastify';
import { MARKET_ABI } from '../NFT_ABI';
import { API_URL } from '../constants/userConstants';
const web3 = new Web3(Web3.givenProvider );
const NfToken = ({item}) => {
    const [data,setData] = useState()
    const [collectionData,setCollectionData] = useState()
    const [idAuction,setidAuction] = useState()
    const [auctionPrice,setAuctionPrice] = useState()
    const [BidUsd,setBidUsd] = useState()
    const [directAmount,setDirectAmount] = useState()
    const [directPrice,setDirectPrice] = useState()

    const  {user} = useSelector((state) => state);

    const getReserveAuctionIdFor = async (marketContractAddress, nftContractAddress,tokenId) => {
      marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD"
      nftContractAddress = item.collectionId;
      tokenId = item.token;
      // Instance of the Contract
      const contractInstance = new web3.eth.Contract(MARKET_ABI, marketContractAddress);
      var auctionID = await contractInstance.methods.getReserveAuctionIdFor(nftContractAddress,tokenId).call();
      setidAuction(auctionID);
    }
    if(auctionPrice||directAmount){
      axios.get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=F3HN9IGWSZ5NYWEJBEM4Q214H2Q1BESN67`).
      then(({data})=>{
        auctionPrice && setBidUsd(data?.result?.maticusd*auctionPrice)
        directAmount &&  setDirectPrice(data?.result.maticusd*directAmount)
      })
      
    }

    
    // useEffect(()=>{
    //   getusd()
    // },[idAuction,auctionPrice])
  useEffect(()=>{
    getReserveAuctionIdFor()
  },[item,collectionData,data])

  useEffect(()=>{
   
    // let bidprice = minimumBid
    let auctionId = idAuction
    if(idAuction&&item.collectionId&&item.token&&auctionId){
      axios.get(`${API_URL}/bid/${auctionId}/${item.collectionId}/${item.token}`).then((data)=>{
      setAuctionPrice(data?.data?.[0].bidprice)
        // setpreviousBidAccount(data?.data?.[0].user)
       }).catch((err)=>{
       })
    }
  
  },[idAuction,item])
    useEffect(()=>{


         axios
    .get(`https://ipfs.io/ipfs/${item.ipfs}/metadata.json`)
    .then((response) => {
        setData(response?.data)

      })
    .catch((error) => {
      return null;
    });

    },[item])
    useEffect(()=>{
      axios
 .get(`https://ipfs.io/ipfs/${item.collectionHash}/metadata.json`)
 .then((response) => {
  setCollectionData(response?.data)

   })
 .catch((error) => {
   return null;
 });

 },[item])
let getDirectAmount = (async()=>{
  let data = await  axios.get(`${API_URL}/sign-order/${item.token}/${item.collectionId}`)
  if(data && data.data){
   setDirectAmount(data.data.amount/10**18)

  }
  
})
 useEffect(()=>{
  getDirectAmount()
 },[item])
  return (
    <>
    {data && data.image && data.image && item.ipfs && item.token && item.collectionId ? 
   <div onClick={()=>{window.location.href = `/item-1/${item.ipfs}/${item.token}/${item.collectionId}`
      }} 

      style={{marginTop:"5%",cursor:"pointer", flexBasis:"25%", width: "40%"
}}>
{console.log(data && data.image && data.image.split('.').pop())}
 {data && data.image && data.image.split('.').pop() == "jpg" &&<img
    style={{ width: "100%" }}
    width={230}
    height={120}
    src={`http://${data && data.image && data.image}`}
  /> } 
 {data && data.image && data.image.split('.').pop() == "mp4" &&   <video   width={180}
    height={120} autoPlay controls >
     <source src={`http://${data && data.image && data.image}`} type="video/mp4"/>
</video>  }

   <div>
    <div className="cardText">
       <div>
        <h4 style={{ color: "white" }}>{data &&data.Distillery&&data.Distillery!=="undefined" && data.Distillery}-
        {data &&data.Age &&data.Age!=="undefined"&&data.Age}</h4>{" "}
        {/* <h4 style={{ color: "white" }}>{item.cas&&item.Cask type!=="undefined" && item.Cask type}</h4> */}
      </div>
      <svg
        width="70"
        height="23"
        viewBox="0 0 90 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7048 17.18C12.0168 17.18 11.4108 17.04 10.8868 16.76C10.3668 16.48 9.95877 16.086 9.66277 15.578C9.37077 15.07 9.22477 14.474 9.22477 13.79V8.372L10.6888 8.36V13.754C10.6888 14.078 10.7428 14.368 10.8508 14.624C10.9628 14.88 11.1128 15.098 11.3008 15.278C11.4888 15.454 11.7048 15.588 11.9488 15.68C12.1928 15.772 12.4448 15.818 12.7048 15.818C12.9728 15.818 13.2268 15.772 13.4668 15.68C13.7108 15.584 13.9268 15.448 14.1148 15.272C14.3028 15.092 14.4508 14.874 14.5588 14.618C14.6668 14.362 14.7208 14.074 14.7208 13.754V8.36H16.1848V13.79C16.1848 14.474 16.0368 15.07 15.7408 15.578C15.4488 16.086 15.0408 16.48 14.5168 16.76C13.9968 17.04 13.3928 17.18 12.7048 17.18ZM17.8615 17V8.36H19.3255L23.3335 14.45V8.36H24.7975V17H23.3335L19.3255 10.91V17H17.8615ZM30.1288 17.18C29.2648 17.18 28.5248 16.992 27.9088 16.616C27.2928 16.236 26.8188 15.708 26.4868 15.032C26.1588 14.356 25.9948 13.572 25.9948 12.68C25.9948 11.788 26.1588 11.004 26.4868 10.328C26.8188 9.652 27.2928 9.126 27.9088 8.75C28.5248 8.37 29.2648 8.18 30.1288 8.18C31.1248 8.18 31.9548 8.43 32.6188 8.93C33.2828 9.426 33.7488 10.096 34.0168 10.94L32.5588 11.342C32.3908 10.778 32.1048 10.338 31.7008 10.022C31.2968 9.702 30.7728 9.542 30.1288 9.542C29.5488 9.542 29.0648 9.672 28.6768 9.932C28.2928 10.192 28.0028 10.558 27.8068 11.03C27.6148 11.498 27.5168 12.048 27.5128 12.68C27.5128 13.312 27.6088 13.864 27.8008 14.336C27.9968 14.804 28.2888 15.168 28.6768 15.428C29.0648 15.688 29.5488 15.818 30.1288 15.818C30.7728 15.818 31.2968 15.658 31.7008 15.338C32.1048 15.018 32.3908 14.578 32.5588 14.018L34.0168 14.42C33.7488 15.264 33.2828 15.936 32.6188 16.436C31.9548 16.932 31.1248 17.18 30.1288 17.18ZM38.9881 17.18C38.1241 17.18 37.3841 16.992 36.7681 16.616C36.1521 16.236 35.6781 15.708 35.3461 15.032C35.0181 14.356 34.8541 13.572 34.8541 12.68C34.8541 11.788 35.0181 11.004 35.3461 10.328C35.6781 9.652 36.1521 9.126 36.7681 8.75C37.3841 8.37 38.1241 8.18 38.9881 8.18C39.8521 8.18 40.5921 8.37 41.2081 8.75C41.8281 9.126 42.3021 9.652 42.6301 10.328C42.9621 11.004 43.1281 11.788 43.1281 12.68C43.1281 13.572 42.9621 14.356 42.6301 15.032C42.3021 15.708 41.8281 16.236 41.2081 16.616C40.5921 16.992 39.8521 17.18 38.9881 17.18ZM38.9881 15.818C39.5681 15.822 40.0501 15.694 40.4341 15.434C40.8221 15.174 41.1121 14.808 41.3041 14.336C41.5001 13.864 41.5981 13.312 41.5981 12.68C41.5981 12.048 41.5001 11.5 41.3041 11.036C41.1121 10.568 40.8221 10.204 40.4341 9.944C40.0501 9.684 39.5681 9.55 38.9881 9.542C38.4081 9.538 37.9261 9.666 37.5421 9.926C37.1581 10.186 36.8681 10.552 36.6721 11.024C36.4801 11.496 36.3841 12.048 36.3841 12.68C36.3841 13.312 36.4801 13.862 36.6721 14.33C36.8641 14.794 37.1521 15.156 37.5361 15.416C37.9241 15.676 38.4081 15.81 38.9881 15.818ZM44.3224 17V8.36H45.6244L48.6124 14.48L51.6004 8.36H52.9024V17H51.5524V11.462L48.9004 17H48.3244L45.6784 11.462V17H44.3224ZM54.588 17V8.36H55.89L58.878 14.48L61.866 8.36H63.168V17H61.818V11.462L59.166 17H58.59L55.944 11.462V17H54.588ZM68.5077 17.18C67.6437 17.18 66.9037 16.992 66.2877 16.616C65.6717 16.236 65.1977 15.708 64.8657 15.032C64.5377 14.356 64.3737 13.572 64.3737 12.68C64.3737 11.788 64.5377 11.004 64.8657 10.328C65.1977 9.652 65.6717 9.126 66.2877 8.75C66.9037 8.37 67.6437 8.18 68.5077 8.18C69.3717 8.18 70.1117 8.37 70.7277 8.75C71.3477 9.126 71.8217 9.652 72.1497 10.328C72.4817 11.004 72.6477 11.788 72.6477 12.68C72.6477 13.572 72.4817 14.356 72.1497 15.032C71.8217 15.708 71.3477 16.236 70.7277 16.616C70.1117 16.992 69.3717 17.18 68.5077 17.18ZM68.5077 15.818C69.0877 15.822 69.5697 15.694 69.9537 15.434C70.3417 15.174 70.6317 14.808 70.8237 14.336C71.0197 13.864 71.1177 13.312 71.1177 12.68C71.1177 12.048 71.0197 11.5 70.8237 11.036C70.6317 10.568 70.3417 10.204 69.9537 9.944C69.5697 9.684 69.0877 9.55 68.5077 9.542C67.9277 9.538 67.4457 9.666 67.0617 9.926C66.6777 10.186 66.3877 10.552 66.1917 11.024C65.9997 11.496 65.9037 12.048 65.9037 12.68C65.9037 13.312 65.9997 13.862 66.1917 14.33C66.3837 14.794 66.6717 15.156 67.0557 15.416C67.4437 15.676 67.9277 15.81 68.5077 15.818ZM73.842 17V8.36H75.306L79.314 14.45V8.36H80.778V17H79.314L75.306 10.91V17H73.842Z"
          fill="#A17545"
        />
        <rect
          x="1"
          y="1"
          width="88"
          height="21"
          stroke="#A17545"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
  <h4 style={{ color: "var(--background2)" }}>{BidUsd ?<span>${BidUsd.toFixed(3)}</span>:directPrice&& <span>${directPrice.toFixed(3)}</span>}</h4>
  <hr style={{ color: "white" }} />
  <div className="cardText2">
    <h4 style={{ color: "#CF9658" }}>{collectionData && collectionData[0] && collectionData[0].attribute1}</h4>
    <h4 style={{ color: "white" }}>{collectionData && collectionData[1] && collectionData[1].attribute2}</h4>
  </div>
</div> :null  
  }
    </>
    

)
}

export default NfToken