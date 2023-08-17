import React from 'react'
import { useEffect ,useState} from 'react';
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);
const SellerPrice = ({item}) => {
console.log(item)
    let [balance,setBalance] = useState()
   
    const getAccountBal = async ( ) => {
  
   
        let balance = await web3.eth.getBalance(item);
        balance = web3.utils.fromWei(balance).toString();
            setBalance(Number(balance));
     
      
    };
    useEffect(()=>{
        getAccountBal()

    },[])
  return (
    <div>
    {balance? <p style={{ color: "white", marginLeft: "2%", marginTop: "3%" }}>{balance.toFixed(3)} <span style={{color:"var(--background2)"}}>MATIC</span></p>:null}

    </div>
  )
}

export default SellerPrice