import React, { useEffect, useState,useRef } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useSelector,useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { MARKET_ABI, NFT_ABI } from "../NFT_ABI";
import Web3 from "web3";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { API_URL } from "../constants/userConstants";
import moment from "moment/moment";
import authActions from "../redux/auth/actions"
const { login, storeToken } = authActions
const web3 = new Web3(Web3.givenProvider);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "#211715",
    width: "30%",
    padding: "2%",
    transform: "translate(-50%, -50%)",
  },
};

const Item = (getAccountBal) => {
  const { id } = useParams();
  const { token } = useParams();
  const { collectionId } = useParams();
  const [data, setData] = useState();
  const [putonSale, setPutonSaleprice] = useState();
  const [nftCon, setnftContract] = useState();
  const [signatureData, setSignature] = useState();
  const [idAuction, setidAuction] = useState();
  const [amountData, setamount] = useState();
  const [directSaleuserAccount, setdirectSaleuserAccount] = useState();
  const [bidData, setBidData] = useState();
  const [minimumBid, setMinimumBid] = useState();
  const [bidLoading, setbidLoading] = useState();
  const [accountBal, setAccountBal] = useState();
  const [previousBidAccount, setpreviousBidAccount] = useState();
  const [endTime, setEndTime] = useState();
  const [finalLoad, setFinalLoading] = useState(false);
  const [finalDone, setFinalDone] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState();
  const [bidDone, setBidDone] = useState();
  let [isloading, setLoading] = useState(false);
  let [transactionHash, setTransactionHash] = useState(false);
  let [usd, setUsd] = useState();
  const [shareUrl,setShareUrl]=useState("")
  const [shareOn,setShareOn]=useState(false)
  const [favouriteItem,setFavouriteItem]=useState(false)
  const [itemRarityData, setItemRarityData] = useState([])
  const popupRef = useRef();

  const { user } = useSelector((state) => state);
const [NftId,setNftId] = useState()

  const getusd = async () => {
    let { data } = await axios.get(
      `https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=F3HN9IGWSZ5NYWEJBEM4Q214H2Q1BESN67`
    );
    setUsd(data?.result?.maticusd * minimumBid);
  };
  const handleClosePopup = () => {
    popupRef.current.close();
  };

  useEffect(()=>{

  },[])

  useEffect(() => {
    getusd();
  }, [minimumBid]);
  const buyFromPrivateSale = async () => {
    // ****** Test Values should be from DB **********
    let marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
    let nftContract = nftCon;
    let paymentMode = "0x0000000000000000000000000000000000000000";
    let tokenId = token;
    let amount = JSON.stringify(amountData); // pass amount *10^18
    let deadline = 1717314202; // duration of the sale
    let signature = signatureData;
    // Instance of the Contract
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    // Find gas limit
    let limit = await contractInstance.methods
      .buyFromPrivateSale(
        nftContract,
        paymentMode,
        amount,
        tokenId,
        deadline,
        signature
      )
      .estimateGas({ from: account });
    // Call a function of the contract:
    return await contractInstance.methods
      .buyFromPrivateSale(
        nftContract,
        paymentMode,
        amount,
        tokenId,
        deadline,
        signature
      )
      .send(
        {
          from: account,
          value: amount,
          gasLimit: limit + 5000,
        },
        async (err, transactionHash) => {
          if (transactionHash) {
            let transactionReceipt = null;
            while (transactionReceipt === null) {
              console.log(
                "In-Progress transaction receipt for approve: ",
                transactionReceipt
              );
              transactionReceipt = await web3.eth.getTransactionReceipt(
                transactionHash
              );
            }
            console.log(
              "FINAL transaction receipt for approve: ",
              transactionReceipt
            );
            setLoading(false);

            transactionReceipt.status == true &&
              toast.success("Purchased successfully");
            setTransactionHash(transactionHash);
            SetpurchaseStep("step3");
          } else {
            if (
              err.message ==
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              setLoading(false);

              toast.error(" User denied transaction signature");
            }
          }
        }
      );
  };

  
    // const userDataId = useSelector((store)=>store.user.user._id)
   
    // console.log(userDataId,"userData")
    let stateValues=JSON.parse(localStorage.getItem("state"))
    // console.log(stateValues,"satatat")
    if(stateValues){
     var userDataId=stateValues.user.user._id
    }
    // console.log(values.user.user._id,"values")

 

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${id}/metadata.json`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        console.log("Error on getIPFSDataFromHash>", error);
        return null;
      });
  }, [id]);
  const fetchItemRaritydata = async () => {
    let { data }=await axios.get(`${API_URL}/get-nft-rarity/${id}`)
    setItemRarityData(data)
    const isFavourite = 
    data?.favourites?.length > 0 && data.favourites.filter((favourite) => favourite.user === user.user._id).length > 0;
    setFavouriteItem(isFavourite)
  }

  useEffect(() => {
    fetchItemRaritydata()
  },[])


  const shareLink=()=>{
    setShareOn(true)
    setShareUrl(window.location.href)
  }

  // Share function here 
  const handleShare=async ()=>{
    
    try {
      
      let url=window.location.href
      const input = document.createElement('input');
      input.style.opacity = '0';
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      toast.success("Link copied successfully");   
    } catch (error) {
      console.log(error)
      toast.error("Url Not Copied");   
    }
  }

// Favourite function here 

const handleFavourite =async(id)=>{
  try {
    let {data}=await axios.put(`${API_URL}/add-fav/${id}/${userDataId}`)

    if(data.isFavourite === true){
      toast.success("Favourites Added");
      setFavouriteItem(data.isFavourite)
    }else{
      toast.success("Favourites Removed");
      setFavouriteItem(data.isFavourite)
    }

  } catch (error) {
    console.log(error,"error")
    toast.error("Favourite not able add"); 
  }
}
function closeShare(){
  setShareOn(false)
}

  const getReserveAuctionIdFor = async (
    marketContractAddress,
    nftContractAddress,
    tokenId
  ) => {
    marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
    nftContractAddress = collectionId;
    tokenId = token;
    // Instance of the Contract
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    var auctionID = await contractInstance.methods
      .getReserveAuctionIdFor(nftContractAddress, tokenId)
      .call();
    setidAuction(auctionID);
  };
  const placeBid = async (marketContractAddress, auctionId, bidAmount) => {
    setbidLoading(true);

    // Test Values
    bidAmount = bidData;
    bidAmount = web3.utils.toWei(bidAmount.toString(), "ether");
    auctionId = idAuction;
    marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
    // Instance of the Contract
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    // Find gas limit
    let limit = await contractInstance.methods
      .placeBid(bidAmount, auctionId)
      .estimateGas({ from: account, value: bidAmount });
    // Call a function of the contract:
    return await contractInstance.methods.placeBid(bidAmount, auctionId).send(
      {
        from: account,
        value: bidAmount,
        gasLimit: limit + 5000,
      },
      async (err, transactionHash) => {
        if (transactionHash) {
          let transactionReceipt = null;
          while (transactionReceipt === null) {
            console.log(
              "In-Progress transaction receipt for approve: ",
              transactionReceipt
            );
            transactionReceipt = await web3.eth.getTransactionReceipt(
              transactionHash
            );
          }
          console.log(
            "FINAL transaction receipt for approve: ",
            transactionReceipt
          );
          setbidLoading(false);
          setBidDone(true);

          transactionReceipt.status == true &&
            toast.success("Bid placed successfully");
            setTimeout(() => {
                // window.location.href = window.location.pathname
            }, 2000);
          // let body = {
          //   user : user?.user?._id,
          //   bidprice:bidData,
          //   token:token,
          //   collectionId:collectionId,
          //   auctionId:idAuction
          // }
          let body = {
            user : user?.user?._id,
            notifyTo:NftId[0].owner,
            bidprice:bidData,
            Distillery:data.Distillery,
            img:data.image,
            pathname: window.location.pathname,
            notificationType:'bid'
          }

          axios.post(`${API_URL}/notification`, body)
          .then(function (response) {
            console.log(response);
            getAccountBal()
            // window.location.href = window.location.pathname

          })
          .catch(function (error) {
            console.log(error);
          });
          let auctionId = idAuction;
          transactionReceipt.status == true &&
            axios
              .put(
                `${API_URL}/bid-update/${auctionId}/${collectionId}/${token}/${bidData}/${user?.user?._id}`
              )
              .then((data) => {
                if (idAuction && collectionId && user && token) {
                  axios
                    .get(`${API_URL}/bid/${auctionId}/${collectionId}/${token}`)
                    .then((data) => {
                      setMinimumBid(data?.data?.[0].bidprice);
                      setpreviousBidAccount(data?.data?.[0].user);
                      console.log(data?.data?.[0].user,"datuserr")
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                // setAuctionEnded(true)
              });
        } else {
          if (
            err.message ==
            "MetaMask Tx Signature: User denied transaction signature."
          ) {
            setbidLoading(false);

            toast.error(" User denied transaction signature");
          }
        }
      }
    );
  };
  // const getMinBidAmount = async (marketContractAddress, auctionId) => {
  //   marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD"
  //   auctionId =idAuction;
  //   console.log(idAuction)
  //   // Instance of the Contract
  //   const contractInstance = new web3.eth.Contract(MARKET_ABI, marketContractAddress);
  //   var result = await contractInstance.methods.getMinBidAmount(auctionId).call();
  //   setMinimumBid(result);
  //   console.log(result)
  // }
  let placeBidHandler = () => {
    placeBid();
  };
  let placeBidhandler1 = () => {
    if (Number(bidData) < minimumBid || Number(bidData) == minimumBid) {
      return toast.error("Bid price have to be higher than previous bid");
    }
    if(Number(bidData) > accountBal){
      return toast.error("Insufficient account balance");

    }
    if (!bidData) {
      return toast.error("Please Enter bid price");
    }
    SetpurchaseStep2("step2");
  };

  const getReserveAuction = async (marketContractAddress, auctionId) => {
    marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
    auctionId = idAuction;
    // Contract instance
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    // Find gas limit
    let result = await contractInstance.methods
      .getReserveAuction(auctionId)
      .call();
    setEndTime(moment.unix(result.endTime).isBefore(moment.now()));
    setBidAccount(result.seller);
    return result;
  };
  useEffect(() => {
    getReserveAuction();
  }, [idAuction]);

  useEffect(() => {
    getReserveAuctionIdFor();
  }, [token, collectionId]);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [purchaseStep, SetpurchaseStep] = useState("step1");
  const [purchaseStep2, SetpurchaseStep2] = useState("step1");
  const [TransferTokenmodalIsOpen, TransfersetIsOpen2] = React.useState(false);
  const [RemoveSalemodalIsOpen, RemoveSalesetIsOpen] = React.useState(false);
  const [BurnTokenmodalIsOpen, BurnTokensetIsOpen] = React.useState(false);
  const [ReportmodalIsOpen, ReportsetIsOpen] = React.useState(false);
  const [bidAccount, setBidAccount] = useState();
  const [acceptBidStep, setAccetptBidStep2] = useState("step1");
  const [acceptBidisOpen, setAcceptBid] = React.useState(false);
  const [toAddressTransfer, settoAddressTransfer] = React.useState();
  const [safeTransferLoading, setsafeTransferLoading] = React.useState(false);
  const [transferDone, setTransferDone] = React.useState(false);
  const [burnLoading, setburnburnLoading] = React.useState(false);
  const [burnDone, setBurnDone] = React.useState(false);
  const [cancelReservationLoading, setcancelReservationLoading] =
    React.useState(false);
  const [cancelDone, setCancelDone] = React.useState(false);
  function openAcceptBidmodal() {
    setAcceptBid(true);
  }
  const burn = async (nftContractAddress, tokenId) => {
    setburnburnLoading(true);
    // Test values
    nftContractAddress = collectionId;
    tokenId = token;
    // Contract instance
    const contractInstance = new web3.eth.Contract(NFT_ABI, nftContractAddress);
    // Find gas limit
    let limit = await contractInstance.methods
      .burn(tokenId)
      .estimateGas({ from: account });
    // Call a function of the contract:
    return await contractInstance.methods.burn(tokenId).send(
      {
        from: account,
        value: 0,
        gasLimit: limit + 5000,
      },
      async (err, transactionHash) => {
        console.log(err);
        if (transactionHash) {
          let transactionReceipt = null;
          while (transactionReceipt === null) {
            console.log(
              "In-Progress transaction receipt for approve: ",
              transactionReceipt
            );
            transactionReceipt = await web3.eth.getTransactionReceipt(
              transactionHash
            );
          }
          let body = {
            user : user?.user?._id,
            notifyTo:user?.user?._id,
            burnTokenName:data.Distillery,
            img:data.image,
            notificationType:'burn'
          }
          axios.post(`${API_URL}/notification`, body)
          .then(function (response) {
            console.log(response);
            getAccountBal()
            // window.location.href = window.location.pathname

          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(
            "FINAL transaction receipt for approve: ",
            transactionReceipt
          );
          setburnburnLoading(false);
          toast.success("Token Burned successfully");
          setBurnDone(true);
          setTimeout(() => {
            window.location.href = "/profile";
          }, 3000);
        } else {
          if (
            err.message ==
            "MetaMask Tx Signature: User denied transaction signature."
          ) {
            setburnburnLoading(false);

            toast.error(" User denied transaction signature");
          }
          // if(err.message=="execution reverted: NFT721Creator: Caller does not own the NFT"){
          //   setburnburnLoading(false)
          //   toast.error("Cant burn token when nft on sale");

          // }
        }
      }
    );
  };
  const transferHandler = () => {
    if (!toAddressTransfer) {
      toast.error("Please enter Receiver address");
    } else {
      safeTransferFrom();
    }
  };
  const cancelReserveAuction = async (marketContractAddress, auctionId) => {
    setcancelReservationLoading(true);
    // Test Values
    auctionId = idAuction;
    marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
    // Instance of the Contract
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    // Find gas limit
    let limit = await contractInstance.methods
      .cancelReserveAuction(auctionId)
      .estimateGas({ from: account });
    // Call a function of the contract:
    return await contractInstance.methods.cancelReserveAuction(auctionId).send(
      {
        from: account,
        value: 0,
        gasLimit: limit + 5000,
      },
      async (err, transactionHash) => {
        if (transactionHash) {
          let transactionReceipt = null;
          while (transactionReceipt === null) {
            console.log(
              "In-Progress transaction receipt for approve: ",
              transactionReceipt
            );
            transactionReceipt = await web3.eth.getTransactionReceipt(
              transactionHash
            );
          }
          console.log(
            "FINAL transaction receipt for approve: ",
            transactionReceipt
          );
          setCancelDone(true);
          toast.success("Removed from sale successfully");
          setcancelReservationLoading(false);
          setTimeout(() => {
            window.location.href = "/profile";
          }, 3000);
        } else {
          if (
            err.message ==
            "MetaMask Tx Signature: User denied transaction signature."
          ) {
            setcancelReservationLoading(false);

            toast.error(" User denied transaction signature");
          }
        }
      }
    );
  };
  const safeTransferFrom = async (
    nftContractAddress,
    fromAddress,
    toAddress,
    tokenId
  ) => {
    setsafeTransferLoading(true);
    console.log(account);
    console.log(toAddressTransfer);
    console.log(token);
    console.log(collectionId);
    // Test values
    nftContractAddress = collectionId;
    fromAddress = account;
    toAddress = toAddressTransfer;
    tokenId = token;
    // Contract instance
    const contractInstance = new web3.eth.Contract(NFT_ABI, nftContractAddress);
    // Find gas limit
    let limit = await contractInstance.methods
      .safeTransferFrom(fromAddress, toAddress, tokenId)
      .estimateGas({ from: account });
    // Call a function of the contract:
    return await contractInstance.methods
      .safeTransferFrom(fromAddress, toAddress, tokenId)
      .send(
        {
          from: account,
          value: 0,
          gasLimit: limit + 5000,
        },
        async (err, transactionHash) => {
          if (transactionHash) {
            let transactionReceipt = null;
            while (transactionReceipt === null) {
              console.log(
                "In-Progress transaction receipt for approve: ",
                transactionReceipt
              );
              transactionReceipt = await web3.eth.getTransactionReceipt(
                transactionHash
              );
            }
            console.log(
              "FINAL transaction receipt for approve: ",
              transactionReceipt
            );
            axios.get(`${API_URL}/address/${toAddressTransfer}`)
            .then(function (response) {
              console.log(response.data._id);
              let body = {
                user : user?.user?._id,
                notifyTo:response.data._id,
                Distillery:data.Distillery,
                img:data.image,
                pathname: window.location.pathname,
                notificationType:'transfer'
              }
    
              axios.post(`${API_URL}/notification`, body)
              .then(function (response) {
                console.log(response);
                getAccountBal()
                // window.location.href = window.location.pathname
    
              })
              .catch(function (error) {
                console.log(error);
              });
              // window.location.href = window.location.pathname
  
            })
            .catch(function (error) {
              console.log(error);
            });
           
            setsafeTransferLoading(false);
            toast.success("Transfered successfuly");
            setTransferDone(true);
            setTimeout(() => {
              window.location.href = "/profile";
            }, 3000);
          } else {
            if (
              err.message ==
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              setsafeTransferLoading(false);

              toast.error(" User denied transaction signature");
            }
          }
        }
      );
  };
  function closeAcceptBidModal() {
    setAcceptBid(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const [account, setAccount] = useState();
 

  useEffect(() => {
    setAccount(user && user.user && user.user.address);
  }, [user]);
  function closeModal() {
    setIsOpen(false);
    SetpurchaseStep("step1");
  }

  const getBalance = async () => {
    if (user && user.user && user.user.address) {
      let address = user && user.user && user.user.address;
      let balance = await web3.eth.getBalance(address);
      balance = web3.utils.fromWei(balance).toString();
      setAccountBal(Number(balance));
      return balance;
    }
  };
  useEffect(() => {
    getBalance();
  }, [user, token]);
  function openModal2() {
    setIsOpen2(true);
    let auctionId = idAuction;
    let user = account;
    if (idAuction && collectionId && user && token) {
      axios
        .get(`${API_URL}/bid/${auctionId}/${collectionId}/${token}`)
        .then((data) => {
          console.log(data);
          setMinimumBid(data?.data?.[0].bidprice);
          setpreviousBidAccount(data?.data?.[0].user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function closeModal2() {
    setIsOpen2(false);
    SetpurchaseStep2("step1");
  }
  function TransferopenModal() {
    TransfersetIsOpen2(true);
  }

  function TransfercloseModal() {
    TransfersetIsOpen2(false);
  }
  function RemoveSaleopenModal() {
    RemoveSalesetIsOpen(true);
  }

  function RemoveSalecloseModal() {
    RemoveSalesetIsOpen(false);
  }
  function BurnTokenopenModal() {
    BurnTokensetIsOpen(true);
  }

  function BurnTokenCloseModal() {
    BurnTokensetIsOpen(false);
  }
  function ReportopenModal() {
    ReportsetIsOpen(true);
  }

  let getAmount = async () => {
    let data = await axios.get(
      `${API_URL}/sign-order/${token}/${collectionId}`
    );

    if (data && data.data) {
      setdirectSaleuserAccount(data.data.userAccount)
      setamount(data.data.amount);
    }
  };
   useEffect(() => {
    getAmount();
  }, []);

  function ReportCloseModal() {
    ReportsetIsOpen(false);
  }
  let puchaseHander1 = async () => {
    if (!account) {
      toast.error("Please login to continue");
    }
    let data = await axios.get(
      `${API_URL}/sign-order/${token}/${collectionId}`
    );
    if (data && data.data) {
      setSignature(data.data.signature);
      setamount(data.data.amount);
      setnftContract(data.data.nftContract);
    }

    SetpurchaseStep("step2");
  };
  const finalizeReserveAuction = async (marketContractAddress, auctionId) => {
    setFinalLoading(true);
    if (idAuction) {
      // Test Values
      auctionId = idAuction;
      marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
      // Instance of the Contract
      const contractInstance = new web3.eth.Contract(
        MARKET_ABI,
        marketContractAddress
      );
      // Find gas limit
      let limit = await contractInstance.methods
        .finalizeReserveAuction(auctionId)
        .estimateGas({ from: account });
      // Call a function of the contract:
      return await contractInstance.methods
        .finalizeReserveAuction(auctionId)
        .send(
          {
            from: account,
            value: 0,
            gasLimit: limit + 5000,
          },

          async (err, transactionHash) => {
            if (transactionHash) {
              let transactionReceipt = null;
              while (transactionReceipt === null) {
                console.log(
                  "In-Progress transaction receipt for approve: ",
                  transactionReceipt
                );
                transactionReceipt = await web3.eth.getTransactionReceipt(
                  transactionHash
                );
              }
              console.log(
                "FINAL transaction receipt for approve: ",
                transactionReceipt
              );
              setLoading(false);
  
              transactionReceipt.status == true &&
                             setFinalLoading(false);
                setFinalDone(true)
                toast.success("Token finalized")
                setTimeout(() => {
                  window.location.href = "/profile";
                }, 3000);
            } else {
              if (
                err.message ==
                "MetaMask Tx Signature: User denied transaction signature."
              ) {
                setFinalLoading(false);
  
                toast.error(" User denied transaction signature");
              }
            }
          }
       
        );
    }
  };
  let puchaseHander2 = () => {
    // SetpurchaseStep("step3")

    if (amountData && signatureData && nftCon) {
      setLoading(true);
      buyFromPrivateSale();
    }
  };

  useEffect(() => {
    // let bidprice = minimumBid
    let auctionId = idAuction;
    let user = account;
    if (idAuction && collectionId && user && token) {
      axios
        .get(`${API_URL}/bid/${auctionId}/${collectionId}/${token}`)
        .then((data) => {
          setNftId(data.data)
          setMinimumBid(data?.data?.[0].bidprice);
          setpreviousBidAccount(data?.data?.[0].user);
          
        })
        .catch((err) => {
          console.log(err);
          setAuctionEnded(true);
        });
    }
  }, [idAuction, collectionId, user, token, data]);
  useEffect(() => {
    // let bidprice = minimumBid
    let auctionId = idAuction;
    let user = account;
    if (idAuction && collectionId && user && token) {
      !minimumBid &&
        !previousBidAccount &&
        axios
          .get(`${API_URL}/bid/${auctionId}/${collectionId}/${token}`)
          .then((data) => {
            setMinimumBid(data?.data?.[0].bidprice);
            console.log(data);
            console.log(data?.data?.[0]);
            setpreviousBidAccount(data?.data?.[0].user);
          })
          .catch((err) => {
            console.log(err);
            setAuctionEnded(true);
          });
    }
  }, [idAuction, account, minimumBid]);

  // useEffect(()=>{
  //   getMinBidAmount()

  // },[idAuction])
  return (
    <div style={{ background: "var(--background)", padding: "5%" }}>
      <Modal
        isOpen={acceptBidisOpen}
        onRequestClose={closeAcceptBidModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {acceptBidStep == "step1" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div style={{ cursor: "pointer" }} onClick={closeAcceptBidModal}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>{" "}
            <div style={{ marginTop: "2%" }}>
              <div style={{}}>
                <svg
                  width="300"
                  height="53"
                  viewBox="0 0 384 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="2.5" width="48" height="48" rx="24" fill="#5F4529" />
                  <path
                    d="M67.88 19.5V14.708L64 7.98H65.656L68.6 13.076L71.536 7.98H73.192L69.32 14.708V19.5H67.88ZM76.7063 19.74C75.8476 19.74 75.1063 19.5453 74.4823 19.156C73.8636 18.7667 73.3863 18.228 73.0503 17.54C72.7143 16.852 72.5463 16.0627 72.5463 15.172C72.5463 14.2653 72.7169 13.4707 73.0583 12.788C73.3996 12.1053 73.8823 11.5747 74.5063 11.196C75.1303 10.812 75.8636 10.62 76.7063 10.62C77.5703 10.62 78.3143 10.8147 78.9383 11.204C79.5623 11.588 80.0396 12.124 80.3703 12.812C80.7063 13.4947 80.8743 14.2813 80.8743 15.172C80.8743 16.0733 80.7063 16.868 80.3703 17.556C80.0343 18.2387 79.5543 18.7747 78.9303 19.164C78.3063 19.548 77.5649 19.74 76.7063 19.74ZM76.7063 18.388C77.6023 18.388 78.2689 18.0893 78.7063 17.492C79.1436 16.8947 79.3623 16.1213 79.3623 15.172C79.3623 14.196 79.1409 13.42 78.6983 12.844C78.2556 12.2627 77.5916 11.972 76.7063 11.972C76.1036 11.972 75.6076 12.108 75.2183 12.38C74.8289 12.652 74.5383 13.028 74.3463 13.508C74.1543 13.988 74.0583 14.5427 74.0583 15.172C74.0583 16.1427 74.2823 16.9213 74.7303 17.508C75.1783 18.0947 75.8369 18.388 76.7063 18.388ZM85.9156 19.724C85.361 19.724 84.8836 19.636 84.4836 19.46C84.089 19.284 83.761 19.0493 83.4996 18.756C83.2383 18.4627 83.033 18.1373 82.8836 17.78C82.7343 17.4227 82.6276 17.0573 82.5636 16.684C82.505 16.3107 82.4756 15.9613 82.4756 15.636V10.86H83.9156V15.188C83.9156 15.5933 83.953 15.9853 84.0276 16.364C84.1023 16.7427 84.2276 17.084 84.4036 17.388C84.585 17.692 84.825 17.932 85.1236 18.108C85.4276 18.284 85.8063 18.372 86.2596 18.372C86.617 18.372 86.9423 18.3107 87.2356 18.188C87.529 18.0653 87.7796 17.884 87.9876 17.644C88.1956 17.3987 88.3556 17.0893 88.4676 16.716C88.5796 16.3427 88.6356 15.908 88.6356 15.412L89.5716 15.7C89.5716 16.532 89.4196 17.2493 89.1156 17.852C88.817 18.4547 88.393 18.9187 87.8436 19.244C87.2996 19.564 86.657 19.724 85.9156 19.724ZM88.7956 19.5V17.188H88.6356V10.86H90.0676V19.5H88.7956ZM97.9666 19.74C97.3213 19.74 96.78 19.6227 96.3426 19.388C95.9106 19.148 95.5826 18.8333 95.3586 18.444C95.14 18.0547 95.0306 17.628 95.0306 17.164C95.0306 16.7107 95.116 16.3187 95.2866 15.988C95.4626 15.652 95.708 15.3747 96.0226 15.156C96.3373 14.932 96.7133 14.756 97.1506 14.628C97.5613 14.516 98.02 14.42 98.5266 14.34C99.0386 14.2547 99.556 14.1773 100.079 14.108C100.601 14.0387 101.089 13.972 101.543 13.908L101.031 14.204C101.047 13.436 100.892 12.868 100.567 12.5C100.247 12.132 99.692 11.948 98.9026 11.948C98.38 11.948 97.9213 12.068 97.5266 12.308C97.1373 12.5427 96.8626 12.9267 96.7026 13.46L95.3506 13.052C95.5586 12.2947 95.9613 11.7 96.5586 11.268C97.156 10.836 97.9426 10.62 98.9186 10.62C99.7026 10.62 100.375 10.7613 100.935 11.044C101.5 11.3213 101.905 11.7427 102.151 12.308C102.273 12.5747 102.351 12.8653 102.383 13.18C102.415 13.4893 102.431 13.8147 102.431 14.156V19.5H101.167V17.428L101.463 17.62C101.137 18.3187 100.681 18.8467 100.095 19.204C99.5133 19.5613 98.804 19.74 97.9666 19.74ZM98.1826 18.548C98.6946 18.548 99.1373 18.4573 99.5106 18.276C99.8893 18.0893 100.193 17.8467 100.423 17.548C100.652 17.244 100.801 16.9133 100.871 16.556C100.951 16.2893 100.993 15.9933 100.999 15.668C101.009 15.3373 101.015 15.084 101.015 14.908L101.511 15.124C101.047 15.188 100.591 15.2493 100.143 15.308C99.6946 15.3667 99.2706 15.4307 98.8706 15.5C98.4706 15.564 98.1106 15.6413 97.7906 15.732C97.556 15.8067 97.3346 15.9027 97.1266 16.02C96.924 16.1373 96.7586 16.2893 96.6306 16.476C96.508 16.6573 96.4466 16.884 96.4466 17.156C96.4466 17.3907 96.5053 17.6147 96.6226 17.828C96.7453 18.0413 96.932 18.2147 97.1826 18.348C97.4386 18.4813 97.772 18.548 98.1826 18.548ZM104.511 19.5V10.86H105.783V12.948L105.575 12.676C105.676 12.4093 105.807 12.164 105.967 11.94C106.132 11.716 106.316 11.532 106.519 11.388C106.743 11.2067 106.996 11.068 107.279 10.972C107.561 10.876 107.849 10.82 108.143 10.804C108.436 10.7827 108.711 10.8013 108.967 10.86V12.196C108.668 12.116 108.34 12.0947 107.983 12.132C107.625 12.1693 107.295 12.3 106.991 12.524C106.713 12.7213 106.497 12.9613 106.343 13.244C106.193 13.5267 106.089 13.8333 106.031 14.164C105.972 14.4893 105.943 14.8227 105.943 15.164V19.5H104.511ZM114.067 19.74C113.219 19.74 112.478 19.5533 111.843 19.18C111.214 18.8013 110.723 18.276 110.371 17.604C110.019 16.9267 109.843 16.1373 109.843 15.236C109.843 14.292 110.016 13.476 110.363 12.788C110.71 12.0947 111.192 11.5613 111.811 11.188C112.435 10.8093 113.166 10.62 114.003 10.62C114.872 10.62 115.611 10.82 116.219 11.22C116.832 11.62 117.291 12.1907 117.595 12.932C117.904 13.6733 118.038 14.556 117.995 15.58H116.555V15.068C116.539 14.0067 116.323 13.2147 115.907 12.692C115.491 12.164 114.872 11.9 114.051 11.9C113.171 11.9 112.502 12.1827 112.043 12.748C111.584 13.3133 111.355 14.124 111.355 15.18C111.355 16.1987 111.584 16.988 112.043 17.548C112.502 18.108 113.155 18.388 114.003 18.388C114.574 18.388 115.07 18.2573 115.491 17.996C115.912 17.7347 116.243 17.3587 116.483 16.868L117.851 17.34C117.515 18.1027 117.008 18.6947 116.331 19.116C115.659 19.532 114.904 19.74 114.067 19.74ZM110.875 15.58V14.436H117.259V15.58H110.875ZM125.435 19.74C124.79 19.74 124.249 19.6227 123.811 19.388C123.379 19.148 123.051 18.8333 122.827 18.444C122.609 18.0547 122.499 17.628 122.499 17.164C122.499 16.7107 122.585 16.3187 122.755 15.988C122.931 15.652 123.177 15.3747 123.491 15.156C123.806 14.932 124.182 14.756 124.619 14.628C125.03 14.516 125.489 14.42 125.995 14.34C126.507 14.2547 127.025 14.1773 127.547 14.108C128.07 14.0387 128.558 13.972 129.011 13.908L128.499 14.204C128.515 13.436 128.361 12.868 128.035 12.5C127.715 12.132 127.161 11.948 126.371 11.948C125.849 11.948 125.39 12.068 124.995 12.308C124.606 12.5427 124.331 12.9267 124.171 13.46L122.819 13.052C123.027 12.2947 123.43 11.7 124.027 11.268C124.625 10.836 125.411 10.62 126.387 10.62C127.171 10.62 127.843 10.7613 128.403 11.044C128.969 11.3213 129.374 11.7427 129.619 12.308C129.742 12.5747 129.819 12.8653 129.851 13.18C129.883 13.4893 129.899 13.8147 129.899 14.156V19.5H128.635V17.428L128.931 17.62C128.606 18.3187 128.15 18.8467 127.563 19.204C126.982 19.5613 126.273 19.74 125.435 19.74ZM125.651 18.548C126.163 18.548 126.606 18.4573 126.979 18.276C127.358 18.0893 127.662 17.8467 127.891 17.548C128.121 17.244 128.27 16.9133 128.339 16.556C128.419 16.2893 128.462 15.9933 128.467 15.668C128.478 15.3373 128.483 15.084 128.483 14.908L128.979 15.124C128.515 15.188 128.059 15.2493 127.611 15.308C127.163 15.3667 126.739 15.4307 126.339 15.5C125.939 15.564 125.579 15.6413 125.259 15.732C125.025 15.8067 124.803 15.9027 124.595 16.02C124.393 16.1373 124.227 16.2893 124.099 16.476C123.977 16.6573 123.915 16.884 123.915 17.156C123.915 17.3907 123.974 17.6147 124.091 17.828C124.214 18.0413 124.401 18.2147 124.651 18.348C124.907 18.4813 125.241 18.548 125.651 18.548ZM135.947 19.74C135.137 19.74 134.454 19.54 133.899 19.14C133.345 18.7347 132.923 18.188 132.635 17.5C132.353 16.8067 132.211 16.0307 132.211 15.172C132.211 14.3027 132.353 13.524 132.635 12.836C132.923 12.148 133.345 11.6067 133.899 11.212C134.459 10.8173 135.145 10.62 135.955 10.62C136.755 10.62 137.443 10.82 138.019 11.22C138.601 11.6147 139.046 12.156 139.355 12.844C139.665 13.532 139.819 14.308 139.819 15.172C139.819 16.036 139.665 16.812 139.355 17.5C139.046 18.188 138.601 18.7347 138.019 19.14C137.443 19.54 136.753 19.74 135.947 19.74ZM131.971 19.5V7.98H133.403V13.14H133.243V19.5H131.971ZM135.771 18.436C136.342 18.436 136.814 18.292 137.187 18.004C137.561 17.716 137.841 17.3267 138.027 16.836C138.214 16.34 138.307 15.7853 138.307 15.172C138.307 14.564 138.214 14.0147 138.027 13.524C137.846 13.0333 137.563 12.644 137.179 12.356C136.801 12.068 136.318 11.924 135.731 11.924C135.171 11.924 134.707 12.0627 134.339 12.34C133.971 12.612 133.697 12.9933 133.515 13.484C133.334 13.9693 133.243 14.532 133.243 15.172C133.243 15.8013 133.331 16.364 133.507 16.86C133.689 17.3507 133.966 17.7373 134.339 18.02C134.713 18.2973 135.19 18.436 135.771 18.436ZM145.253 19.74C144.394 19.74 143.653 19.5453 143.029 19.156C142.41 18.7667 141.933 18.228 141.597 17.54C141.261 16.852 141.093 16.0627 141.093 15.172C141.093 14.2653 141.264 13.4707 141.605 12.788C141.946 12.1053 142.429 11.5747 143.053 11.196C143.677 10.812 144.41 10.62 145.253 10.62C146.117 10.62 146.861 10.8147 147.485 11.204C148.109 11.588 148.586 12.124 148.917 12.812C149.253 13.4947 149.421 14.2813 149.421 15.172C149.421 16.0733 149.253 16.868 148.917 17.556C148.581 18.2387 148.101 18.7747 147.477 19.164C146.853 19.548 146.112 19.74 145.253 19.74ZM145.253 18.388C146.149 18.388 146.816 18.0893 147.253 17.492C147.69 16.8947 147.909 16.1213 147.909 15.172C147.909 14.196 147.688 13.42 147.245 12.844C146.802 12.2627 146.138 11.972 145.253 11.972C144.65 11.972 144.154 12.108 143.765 12.38C143.376 12.652 143.085 13.028 142.893 13.508C142.701 13.988 142.605 14.5427 142.605 15.172C142.605 16.1427 142.829 16.9213 143.277 17.508C143.725 18.0947 144.384 18.388 145.253 18.388ZM154.463 19.724C153.908 19.724 153.431 19.636 153.031 19.46C152.636 19.284 152.308 19.0493 152.047 18.756C151.785 18.4627 151.58 18.1373 151.431 17.78C151.281 17.4227 151.175 17.0573 151.111 16.684C151.052 16.3107 151.023 15.9613 151.023 15.636V10.86H152.463V15.188C152.463 15.5933 152.5 15.9853 152.575 16.364C152.649 16.7427 152.775 17.084 152.951 17.388C153.132 17.692 153.372 17.932 153.671 18.108C153.975 18.284 154.353 18.372 154.807 18.372C155.164 18.372 155.489 18.3107 155.783 18.188C156.076 18.0653 156.327 17.884 156.535 17.644C156.743 17.3987 156.903 17.0893 157.015 16.716C157.127 16.3427 157.183 15.908 157.183 15.412L158.119 15.7C158.119 16.532 157.967 17.2493 157.663 17.852C157.364 18.4547 156.94 18.9187 156.391 19.244C155.847 19.564 155.204 19.724 154.463 19.724ZM157.343 19.5V17.188H157.183V10.86H158.615V19.5H157.343ZM165.678 19.5C165.166 19.6013 164.66 19.6413 164.158 19.62C163.662 19.604 163.22 19.5053 162.83 19.324C162.441 19.1373 162.145 18.8493 161.942 18.46C161.772 18.1187 161.678 17.7747 161.662 17.428C161.652 17.076 161.646 16.6787 161.646 16.236V8.46H163.07V16.172C163.07 16.524 163.073 16.8253 163.078 17.076C163.089 17.3267 163.145 17.5427 163.246 17.724C163.438 18.0653 163.742 18.2653 164.158 18.324C164.58 18.3827 165.086 18.3667 165.678 18.276V19.5ZM159.894 12.036V10.86H165.678V12.036H159.894ZM175.46 19.5C174.948 19.6013 174.441 19.6413 173.94 19.62C173.444 19.604 173.001 19.5053 172.612 19.324C172.222 19.1373 171.926 18.8493 171.724 18.46C171.553 18.1187 171.46 17.7747 171.444 17.428C171.433 17.076 171.428 16.6787 171.428 16.236V8.46H172.852V16.172C172.852 16.524 172.854 16.8253 172.86 17.076C172.87 17.3267 172.926 17.5427 173.028 17.724C173.22 18.0653 173.524 18.2653 173.94 18.324C174.361 18.3827 174.868 18.3667 175.46 18.276V19.5ZM169.676 12.036V10.86H175.46V12.036H169.676ZM180.534 19.74C179.676 19.74 178.934 19.5453 178.31 19.156C177.692 18.7667 177.214 18.228 176.878 17.54C176.542 16.852 176.374 16.0627 176.374 15.172C176.374 14.2653 176.545 13.4707 176.886 12.788C177.228 12.1053 177.71 11.5747 178.334 11.196C178.958 10.812 179.692 10.62 180.534 10.62C181.398 10.62 182.142 10.8147 182.766 11.204C183.39 11.588 183.868 12.124 184.198 12.812C184.534 13.4947 184.702 14.2813 184.702 15.172C184.702 16.0733 184.534 16.868 184.198 17.556C183.862 18.2387 183.382 18.7747 182.758 19.164C182.134 19.548 181.393 19.74 180.534 19.74ZM180.534 18.388C181.43 18.388 182.097 18.0893 182.534 17.492C182.972 16.8947 183.19 16.1213 183.19 15.172C183.19 14.196 182.969 13.42 182.526 12.844C182.084 12.2627 181.42 11.972 180.534 11.972C179.932 11.972 179.436 12.108 179.046 12.38C178.657 12.652 178.366 13.028 178.174 13.508C177.982 13.988 177.886 14.5427 177.886 15.172C177.886 16.1427 178.11 16.9213 178.558 17.508C179.006 18.0947 179.665 18.388 180.534 18.388ZM192.123 19.74C191.478 19.74 190.936 19.6227 190.499 19.388C190.067 19.148 189.739 18.8333 189.515 18.444C189.296 18.0547 189.187 17.628 189.187 17.164C189.187 16.7107 189.272 16.3187 189.443 15.988C189.619 15.652 189.864 15.3747 190.179 15.156C190.494 14.932 190.87 14.756 191.307 14.628C191.718 14.516 192.176 14.42 192.683 14.34C193.195 14.2547 193.712 14.1773 194.235 14.108C194.758 14.0387 195.246 13.972 195.699 13.908L195.187 14.204C195.203 13.436 195.048 12.868 194.723 12.5C194.403 12.132 193.848 11.948 193.059 11.948C192.536 11.948 192.078 12.068 191.683 12.308C191.294 12.5427 191.019 12.9267 190.859 13.46L189.507 13.052C189.715 12.2947 190.118 11.7 190.715 11.268C191.312 10.836 192.099 10.62 193.075 10.62C193.859 10.62 194.531 10.7613 195.091 11.044C195.656 11.3213 196.062 11.7427 196.307 12.308C196.43 12.5747 196.507 12.8653 196.539 13.18C196.571 13.4893 196.587 13.8147 196.587 14.156V19.5H195.323V17.428L195.619 17.62C195.294 18.3187 194.838 18.8467 194.251 19.204C193.67 19.5613 192.96 19.74 192.123 19.74ZM192.339 18.548C192.851 18.548 193.294 18.4573 193.667 18.276C194.046 18.0893 194.35 17.8467 194.579 17.548C194.808 17.244 194.958 16.9133 195.027 16.556C195.107 16.2893 195.15 15.9933 195.155 15.668C195.166 15.3373 195.171 15.084 195.171 14.908L195.667 15.124C195.203 15.188 194.747 15.2493 194.299 15.308C193.851 15.3667 193.427 15.4307 193.027 15.5C192.627 15.564 192.267 15.6413 191.947 15.732C191.712 15.8067 191.491 15.9027 191.283 16.02C191.08 16.1373 190.915 16.2893 190.787 16.476C190.664 16.6573 190.603 16.884 190.603 17.156C190.603 17.3907 190.662 17.6147 190.779 17.828C190.902 18.0413 191.088 18.2147 191.339 18.348C191.595 18.4813 191.928 18.548 192.339 18.548ZM202.307 19.74C201.432 19.74 200.688 19.5453 200.075 19.156C199.467 18.7613 199.003 18.22 198.683 17.532C198.363 16.844 198.198 16.06 198.187 15.18C198.198 14.2787 198.366 13.4867 198.691 12.804C199.022 12.116 199.494 11.58 200.107 11.196C200.72 10.812 201.459 10.62 202.323 10.62C203.235 10.62 204.019 10.844 204.675 11.292C205.336 11.74 205.779 12.3533 206.003 13.132L204.595 13.556C204.414 13.0547 204.118 12.6653 203.707 12.388C203.302 12.1107 202.835 11.972 202.307 11.972C201.715 11.972 201.227 12.1107 200.843 12.388C200.459 12.66 200.174 13.0387 199.987 13.524C199.8 14.004 199.704 14.556 199.699 15.18C199.71 16.14 199.931 16.916 200.363 17.508C200.8 18.0947 201.448 18.388 202.307 18.388C202.872 18.388 203.342 18.26 203.715 18.004C204.088 17.7427 204.371 17.3667 204.563 16.876L206.003 17.252C205.704 18.0573 205.238 18.6733 204.603 19.1C203.968 19.5267 203.203 19.74 202.307 19.74ZM211.041 19.74C210.167 19.74 209.423 19.5453 208.809 19.156C208.201 18.7613 207.737 18.22 207.417 17.532C207.097 16.844 206.932 16.06 206.921 15.18C206.932 14.2787 207.1 13.4867 207.425 12.804C207.756 12.116 208.228 11.58 208.841 11.196C209.455 10.812 210.193 10.62 211.057 10.62C211.969 10.62 212.753 10.844 213.409 11.292C214.071 11.74 214.513 12.3533 214.737 13.132L213.329 13.556C213.148 13.0547 212.852 12.6653 212.441 12.388C212.036 12.1107 211.569 11.972 211.041 11.972C210.449 11.972 209.961 12.1107 209.577 12.388C209.193 12.66 208.908 13.0387 208.721 13.524C208.535 14.004 208.439 14.556 208.433 15.18C208.444 16.14 208.665 16.916 209.097 17.508C209.535 18.0947 210.183 18.388 211.041 18.388C211.607 18.388 212.076 18.26 212.449 18.004C212.823 17.7427 213.105 17.3667 213.297 16.876L214.737 17.252C214.439 18.0573 213.972 18.6733 213.337 19.1C212.703 19.5267 211.937 19.74 211.041 19.74ZM219.88 19.74C219.032 19.74 218.29 19.5533 217.656 19.18C217.026 18.8013 216.536 18.276 216.184 17.604C215.832 16.9267 215.656 16.1373 215.656 15.236C215.656 14.292 215.829 13.476 216.176 12.788C216.522 12.0947 217.005 11.5613 217.624 11.188C218.248 10.8093 218.978 10.62 219.816 10.62C220.685 10.62 221.424 10.82 222.032 11.22C222.645 11.62 223.104 12.1907 223.408 12.932C223.717 13.6733 223.85 14.556 223.808 15.58H222.368V15.068C222.352 14.0067 222.136 13.2147 221.72 12.692C221.304 12.164 220.685 11.9 219.864 11.9C218.984 11.9 218.314 12.1827 217.856 12.748C217.397 13.3133 217.168 14.124 217.168 15.18C217.168 16.1987 217.397 16.988 217.856 17.548C218.314 18.108 218.968 18.388 219.816 18.388C220.386 18.388 220.882 18.2573 221.304 17.996C221.725 17.7347 222.056 17.3587 222.296 16.868L223.664 17.34C223.328 18.1027 222.821 18.6947 222.144 19.116C221.472 19.532 220.717 19.74 219.88 19.74ZM216.688 15.58V14.436H223.072V15.58H216.688ZM229.322 19.74C228.512 19.74 227.829 19.54 227.274 19.14C226.72 18.7347 226.298 18.188 226.01 17.5C225.728 16.8067 225.586 16.0307 225.586 15.172C225.586 14.3027 225.728 13.524 226.01 12.836C226.298 12.148 226.72 11.6067 227.274 11.212C227.834 10.8173 228.52 10.62 229.33 10.62C230.13 10.62 230.818 10.82 231.394 11.22C231.976 11.6147 232.421 12.156 232.73 12.844C233.04 13.532 233.194 14.308 233.194 15.172C233.194 16.036 233.04 16.812 232.73 17.5C232.421 18.188 231.976 18.7347 231.394 19.14C230.818 19.54 230.128 19.74 229.322 19.74ZM225.346 23.34V10.86H226.618V17.22H226.778V23.34H225.346ZM229.146 18.436C229.717 18.436 230.189 18.292 230.562 18.004C230.936 17.716 231.216 17.3267 231.402 16.836C231.589 16.34 231.682 15.7853 231.682 15.172C231.682 14.564 231.589 14.0147 231.402 13.524C231.221 13.0333 230.938 12.644 230.554 12.356C230.176 12.068 229.693 11.924 229.106 11.924C228.546 11.924 228.082 12.0627 227.714 12.34C227.346 12.612 227.072 12.9933 226.89 13.484C226.709 13.9693 226.618 14.532 226.618 15.172C226.618 15.8013 226.706 16.364 226.882 16.86C227.064 17.3507 227.341 17.7373 227.714 18.02C228.088 18.2973 228.565 18.436 229.146 18.436ZM239.772 19.5C239.26 19.6013 238.753 19.6413 238.252 19.62C237.756 19.604 237.313 19.5053 236.924 19.324C236.535 19.1373 236.239 18.8493 236.036 18.46C235.865 18.1187 235.772 17.7747 235.756 17.428C235.745 17.076 235.74 16.6787 235.74 16.236V8.46H237.164V16.172C237.164 16.524 237.167 16.8253 237.172 17.076C237.183 17.3267 237.239 17.5427 237.34 17.724C237.532 18.0653 237.836 18.2653 238.252 18.324C238.673 18.3827 239.18 18.3667 239.772 18.276V19.5ZM233.988 12.036V10.86H239.772V12.036H233.988ZM247.185 19.74C246.54 19.74 245.999 19.6227 245.561 19.388C245.129 19.148 244.801 18.8333 244.577 18.444C244.359 18.0547 244.249 17.628 244.249 17.164C244.249 16.7107 244.335 16.3187 244.505 15.988C244.681 15.652 244.927 15.3747 245.241 15.156C245.556 14.932 245.932 14.756 246.369 14.628C246.78 14.516 247.239 14.42 247.745 14.34C248.257 14.2547 248.775 14.1773 249.297 14.108C249.82 14.0387 250.308 13.972 250.761 13.908L250.249 14.204C250.265 13.436 250.111 12.868 249.785 12.5C249.465 12.132 248.911 11.948 248.121 11.948C247.599 11.948 247.14 12.068 246.745 12.308C246.356 12.5427 246.081 12.9267 245.921 13.46L244.569 13.052C244.777 12.2947 245.18 11.7 245.777 11.268C246.375 10.836 247.161 10.62 248.137 10.62C248.921 10.62 249.593 10.7613 250.153 11.044C250.719 11.3213 251.124 11.7427 251.369 12.308C251.492 12.5747 251.569 12.8653 251.601 13.18C251.633 13.4893 251.649 13.8147 251.649 14.156V19.5H250.385V17.428L250.681 17.62C250.356 18.3187 249.9 18.8467 249.313 19.204C248.732 19.5613 248.023 19.74 247.185 19.74ZM247.401 18.548C247.913 18.548 248.356 18.4573 248.729 18.276C249.108 18.0893 249.412 17.8467 249.641 17.548C249.871 17.244 250.02 16.9133 250.089 16.556C250.169 16.2893 250.212 15.9933 250.217 15.668C250.228 15.3373 250.233 15.084 250.233 14.908L250.729 15.124C250.265 15.188 249.809 15.2493 249.361 15.308C248.913 15.3667 248.489 15.4307 248.089 15.5C247.689 15.564 247.329 15.6413 247.009 15.732C246.775 15.8067 246.553 15.9027 246.345 16.02C246.143 16.1373 245.977 16.2893 245.849 16.476C245.727 16.6573 245.665 16.884 245.665 17.156C245.665 17.3907 245.724 17.6147 245.841 17.828C245.964 18.0413 246.151 18.2147 246.401 18.348C246.657 18.4813 246.991 18.548 247.401 18.548ZM260.901 19.74C260.09 19.74 259.407 19.54 258.853 19.14C258.298 18.7347 257.877 18.188 257.589 17.5C257.306 16.8067 257.165 16.0307 257.165 15.172C257.165 14.3027 257.306 13.524 257.589 12.836C257.877 12.148 258.298 11.6067 258.853 11.212C259.413 10.8173 260.098 10.62 260.909 10.62C261.709 10.62 262.397 10.82 262.973 11.22C263.554 11.6147 263.999 12.156 264.309 12.844C264.618 13.532 264.773 14.308 264.773 15.172C264.773 16.036 264.618 16.812 264.309 17.5C263.999 18.188 263.554 18.7347 262.973 19.14C262.397 19.54 261.706 19.74 260.901 19.74ZM256.925 19.5V7.98H258.357V13.14H258.197V19.5H256.925ZM260.725 18.436C261.295 18.436 261.767 18.292 262.141 18.004C262.514 17.716 262.794 17.3267 262.981 16.836C263.167 16.34 263.261 15.7853 263.261 15.172C263.261 14.564 263.167 14.0147 262.981 13.524C262.799 13.0333 262.517 12.644 262.133 12.356C261.754 12.068 261.271 11.924 260.685 11.924C260.125 11.924 259.661 12.0627 259.293 12.34C258.925 12.612 258.65 12.9933 258.469 13.484C258.287 13.9693 258.197 14.532 258.197 15.172C258.197 15.8013 258.285 16.364 258.461 16.86C258.642 17.3507 258.919 17.7373 259.293 18.02C259.666 18.2973 260.143 18.436 260.725 18.436ZM266.686 9.332V7.86H268.11V9.332H266.686ZM266.686 19.5V10.86H268.11V19.5H266.686ZM273.903 19.74C273.097 19.74 272.407 19.54 271.831 19.14C271.255 18.7347 270.809 18.188 270.495 17.5C270.185 16.812 270.031 16.036 270.031 15.172C270.031 14.308 270.185 13.532 270.495 12.844C270.809 12.156 271.255 11.6147 271.831 11.22C272.407 10.82 273.095 10.62 273.895 10.62C274.711 10.62 275.396 10.8173 275.951 11.212C276.505 11.6067 276.924 12.148 277.207 12.836C277.495 13.524 277.639 14.3027 277.639 15.172C277.639 16.0307 277.495 16.8067 277.207 17.5C276.924 18.188 276.505 18.7347 275.951 19.14C275.396 19.54 274.713 19.74 273.903 19.74ZM274.079 18.436C274.66 18.436 275.137 18.2973 275.511 18.02C275.884 17.7373 276.159 17.3507 276.335 16.86C276.516 16.364 276.607 15.8013 276.607 15.172C276.607 14.532 276.516 13.9693 276.335 13.484C276.159 12.9933 275.887 12.612 275.519 12.34C275.151 12.0627 274.684 11.924 274.119 11.924C273.532 11.924 273.047 12.068 272.663 12.356C272.284 12.644 272.001 13.0333 271.815 13.524C271.633 14.0147 271.543 14.564 271.543 15.172C271.543 15.7853 271.636 16.34 271.823 16.836C272.009 17.3267 272.289 17.716 272.663 18.004C273.041 18.292 273.513 18.436 274.079 18.436ZM276.607 19.5V13.14H276.447V7.98H277.879V19.5H276.607ZM284.147 19.5V10.388C284.147 10.164 284.158 9.93733 284.179 9.708C284.2 9.47333 284.248 9.24667 284.323 9.028C284.398 8.804 284.52 8.59867 284.691 8.412C284.888 8.19333 285.104 8.03867 285.339 7.948C285.574 7.852 285.811 7.79333 286.051 7.772C286.296 7.75067 286.528 7.74 286.747 7.74H287.843V8.924H286.827C286.406 8.924 286.091 9.028 285.883 9.236C285.675 9.43867 285.571 9.748 285.571 10.164V19.5H284.147ZM282.683 12.036V10.86H287.843V12.036H282.683ZM292.488 19.74C291.629 19.74 290.888 19.5453 290.264 19.156C289.645 18.7667 289.168 18.228 288.832 17.54C288.496 16.852 288.328 16.0627 288.328 15.172C288.328 14.2653 288.498 13.4707 288.84 12.788C289.181 12.1053 289.664 11.5747 290.288 11.196C290.912 10.812 291.645 10.62 292.488 10.62C293.352 10.62 294.096 10.8147 294.72 11.204C295.344 11.588 295.821 12.124 296.152 12.812C296.488 13.4947 296.656 14.2813 296.656 15.172C296.656 16.0733 296.488 16.868 296.152 17.556C295.816 18.2387 295.336 18.7747 294.712 19.164C294.088 19.548 293.346 19.74 292.488 19.74ZM292.488 18.388C293.384 18.388 294.05 18.0893 294.488 17.492C294.925 16.8947 295.144 16.1213 295.144 15.172C295.144 14.196 294.922 13.42 294.48 12.844C294.037 12.2627 293.373 11.972 292.488 11.972C291.885 11.972 291.389 12.108 291 12.38C290.61 12.652 290.32 13.028 290.128 13.508C289.936 13.988 289.84 14.5427 289.84 15.172C289.84 16.1427 290.064 16.9213 290.512 17.508C290.96 18.0947 291.618 18.388 292.488 18.388ZM298.417 19.5V10.86H299.689V12.948L299.481 12.676C299.582 12.4093 299.713 12.164 299.873 11.94C300.038 11.716 300.222 11.532 300.425 11.388C300.649 11.2067 300.902 11.068 301.185 10.972C301.468 10.876 301.756 10.82 302.049 10.804C302.342 10.7827 302.617 10.8013 302.873 10.86V12.196C302.574 12.116 302.246 12.0947 301.889 12.132C301.532 12.1693 301.201 12.3 300.897 12.524C300.62 12.7213 300.404 12.9613 300.249 13.244C300.1 13.5267 299.996 13.8333 299.937 14.164C299.878 14.4893 299.849 14.8227 299.849 15.164V19.5H298.417ZM67.56 45.5L64.216 33.98H65.968L68.392 42.692L70.816 33.988L72.576 33.98L75 42.692L77.424 33.98H79.184L75.832 45.5H74.168L71.696 36.884L69.224 45.5H67.56ZM80.5263 45.5V33.98H82.1983V38.948H87.9583V33.98H89.6383V45.5H87.9583V40.524H82.1983V45.5H80.5263ZM92.0456 45.5V33.98H93.7176V45.5H92.0456ZM100.296 45.74C99.4693 45.74 98.7227 45.5987 98.056 45.316C97.3947 45.028 96.848 44.62 96.416 44.092C95.9893 43.5587 95.712 42.9267 95.584 42.196L97.328 41.932C97.504 42.636 97.872 43.1853 98.432 43.58C98.992 43.9693 99.6453 44.164 100.392 44.164C100.856 44.164 101.283 44.092 101.672 43.948C102.061 43.7987 102.373 43.588 102.608 43.316C102.848 43.0387 102.968 42.708 102.968 42.324C102.968 42.116 102.931 41.932 102.856 41.772C102.787 41.612 102.688 41.4733 102.56 41.356C102.437 41.2333 102.285 41.1293 102.104 41.044C101.928 40.9533 101.733 40.876 101.52 40.812L98.568 39.94C98.28 39.8547 97.9867 39.7453 97.688 39.612C97.3893 39.4733 97.1147 39.2947 96.864 39.076C96.6187 38.852 96.4187 38.5773 96.264 38.252C96.1093 37.9213 96.032 37.5213 96.032 37.052C96.032 36.3427 96.2133 35.7427 96.576 35.252C96.944 34.756 97.44 34.3827 98.064 34.132C98.688 33.876 99.3867 33.748 100.16 33.748C100.939 33.7587 101.635 33.8973 102.248 34.164C102.867 34.4307 103.379 34.8147 103.784 35.316C104.195 35.812 104.477 36.4147 104.632 37.124L102.84 37.428C102.76 36.996 102.589 36.6253 102.328 36.316C102.067 36.0013 101.747 35.7613 101.368 35.596C100.989 35.4253 100.579 35.3373 100.136 35.332C99.7093 35.3213 99.3173 35.3853 98.96 35.524C98.608 35.6627 98.3253 35.8573 98.112 36.108C97.904 36.3587 97.8 36.6467 97.8 36.972C97.8 37.292 97.8933 37.5507 98.08 37.748C98.2667 37.9453 98.496 38.1027 98.768 38.22C99.0453 38.332 99.32 38.4253 99.592 38.5L101.72 39.1C101.987 39.1747 102.288 39.276 102.624 39.404C102.965 39.5267 103.293 39.7 103.608 39.924C103.928 40.148 104.192 40.4467 104.4 40.82C104.608 41.188 104.712 41.652 104.712 42.212C104.712 42.7933 104.595 43.3053 104.36 43.748C104.125 44.1853 103.803 44.5533 103.392 44.852C102.987 45.1453 102.517 45.3667 101.984 45.516C101.451 45.6653 100.888 45.74 100.296 45.74ZM106.417 45.5V33.98H108.089V39.356L112.913 33.98H114.993L109.897 39.604L115.369 45.5H113.225L108.089 39.996V45.5H106.417ZM119.271 45.5V40.74L115.375 33.98H117.327L120.119 38.82L122.911 33.98H124.863L120.967 40.74V45.5H119.271ZM128.542 45.5V33.98H133.07C133.801 33.98 134.414 34.1293 134.91 34.428C135.406 34.7267 135.779 35.1133 136.03 35.588C136.281 36.0573 136.406 36.5533 136.406 37.076C136.406 37.7107 136.249 38.2547 135.934 38.708C135.625 39.1613 135.206 39.4707 134.678 39.636L134.662 39.244C135.398 39.4253 135.963 39.78 136.358 40.308C136.753 40.8307 136.95 41.4413 136.95 42.14C136.95 42.8173 136.814 43.4067 136.542 43.908C136.275 44.4093 135.883 44.8013 135.366 45.084C134.854 45.3613 134.233 45.5 133.502 45.5H128.542ZM130.238 43.908H133.246C133.625 43.908 133.963 43.836 134.262 43.692C134.566 43.548 134.803 43.3427 134.974 43.076C135.15 42.804 135.238 42.4813 135.238 42.108C135.238 41.7613 135.161 41.4493 135.006 41.172C134.857 40.8893 134.638 40.668 134.35 40.508C134.067 40.3427 133.734 40.26 133.35 40.26H130.238V43.908ZM130.238 38.684H133.046C133.355 38.684 133.633 38.6227 133.878 38.5C134.129 38.372 134.326 38.1907 134.47 37.956C134.619 37.716 134.694 37.428 134.694 37.092C134.694 36.644 134.545 36.276 134.246 35.988C133.947 35.7 133.547 35.556 133.046 35.556H130.238V38.684ZM143.35 45.74C142.198 45.74 141.217 45.4893 140.406 44.988C139.595 44.4813 138.974 43.7773 138.542 42.876C138.115 41.9747 137.902 40.9293 137.902 39.74C137.902 38.5507 138.115 37.5053 138.542 36.604C138.974 35.7027 139.595 35.0013 140.406 34.5C141.217 33.9933 142.198 33.74 143.35 33.74C144.497 33.74 145.475 33.9933 146.286 34.5C147.102 35.0013 147.723 35.7027 148.15 36.604C148.577 37.5053 148.79 38.5507 148.79 39.74C148.79 40.9293 148.577 41.9747 148.15 42.876C147.723 43.7773 147.102 44.4813 146.286 44.988C145.475 45.4893 144.497 45.74 143.35 45.74ZM143.35 44.148C144.166 44.1587 144.843 43.98 145.382 43.612C145.926 43.2387 146.334 42.7213 146.606 42.06C146.878 41.3933 147.014 40.62 147.014 39.74C147.014 38.86 146.878 38.092 146.606 37.436C146.334 36.7747 145.926 36.26 145.382 35.892C144.843 35.524 144.166 35.3373 143.35 35.332C142.534 35.3213 141.854 35.5 141.31 35.868C140.771 36.236 140.366 36.7533 140.094 37.42C139.822 38.0867 139.683 38.86 139.678 39.74C139.673 40.62 139.806 41.3907 140.078 42.052C140.35 42.708 140.758 43.22 141.302 43.588C141.851 43.956 142.534 44.1427 143.35 44.148ZM152.945 45.5V35.556H149.113V33.98H158.449V35.556H154.617V45.5H152.945ZM163.555 45.5V35.556H159.723V33.98H169.059V35.556H165.227V45.5H163.555ZM170.499 45.5V33.98H172.171V43.924H177.387V45.5H170.499ZM178.745 45.5V33.98H186.105V35.556H180.417V38.788H185.145V40.364H180.417V43.924H186.105V45.5H178.745ZM192.053 45.5V36.388C192.053 36.164 192.064 35.9373 192.085 35.708C192.107 35.4733 192.155 35.2467 192.229 35.028C192.304 34.804 192.427 34.5987 192.597 34.412C192.795 34.1933 193.011 34.0387 193.245 33.948C193.48 33.852 193.717 33.7933 193.957 33.772C194.203 33.7507 194.435 33.74 194.653 33.74H195.749V34.924H194.733C194.312 34.924 193.997 35.028 193.789 35.236C193.581 35.4387 193.477 35.748 193.477 36.164V45.5H192.053ZM190.589 38.036V36.86H195.749V38.036H190.589ZM197.026 45.5V36.86H198.298V38.948L198.09 38.676C198.192 38.4093 198.322 38.164 198.482 37.94C198.648 37.716 198.832 37.532 199.034 37.388C199.258 37.2067 199.512 37.068 199.794 36.972C200.077 36.876 200.365 36.82 200.658 36.804C200.952 36.7827 201.226 36.8013 201.482 36.86V38.196C201.184 38.116 200.856 38.0947 200.498 38.132C200.141 38.1693 199.81 38.3 199.506 38.524C199.229 38.7213 199.013 38.9613 198.858 39.244C198.709 39.5267 198.605 39.8333 198.546 40.164C198.488 40.4893 198.458 40.8227 198.458 41.164V45.5H197.026ZM206.519 45.74C205.66 45.74 204.919 45.5453 204.295 45.156C203.676 44.7667 203.199 44.228 202.863 43.54C202.527 42.852 202.359 42.0627 202.359 41.172C202.359 40.2653 202.529 39.4707 202.871 38.788C203.212 38.1053 203.695 37.5747 204.319 37.196C204.943 36.812 205.676 36.62 206.519 36.62C207.383 36.62 208.127 36.8147 208.751 37.204C209.375 37.588 209.852 38.124 210.183 38.812C210.519 39.4947 210.687 40.2813 210.687 41.172C210.687 42.0733 210.519 42.868 210.183 43.556C209.847 44.2387 209.367 44.7747 208.743 45.164C208.119 45.548 207.377 45.74 206.519 45.74ZM206.519 44.388C207.415 44.388 208.081 44.0893 208.519 43.492C208.956 42.8947 209.175 42.1213 209.175 41.172C209.175 40.196 208.953 39.42 208.511 38.844C208.068 38.2627 207.404 37.972 206.519 37.972C205.916 37.972 205.42 38.108 205.031 38.38C204.641 38.652 204.351 39.028 204.159 39.508C203.967 39.988 203.871 40.5427 203.871 41.172C203.871 42.1427 204.095 42.9213 204.543 43.508C204.991 44.0947 205.649 44.388 206.519 44.388ZM222.776 45.5L222.784 39.972C222.784 39.3267 222.611 38.8227 222.264 38.46C221.923 38.092 221.477 37.908 220.928 37.908C220.608 37.908 220.304 37.9827 220.016 38.132C219.728 38.276 219.493 38.5053 219.312 38.82C219.131 39.1293 219.04 39.5267 219.04 40.012L218.288 39.708C218.277 39.0947 218.403 38.5587 218.664 38.1C218.931 37.636 219.293 37.276 219.752 37.02C220.211 36.764 220.728 36.636 221.304 36.636C222.205 36.636 222.915 36.9107 223.432 37.46C223.949 38.004 224.208 38.7373 224.208 39.66L224.2 45.5H222.776ZM212.44 45.5V36.86H213.712V39.172H213.872V45.5H212.44ZM217.616 45.5L217.624 40.028C217.624 39.3667 217.453 38.8493 217.112 38.476C216.771 38.0973 216.317 37.908 215.752 37.908C215.192 37.908 214.739 38.1 214.392 38.484C214.045 38.868 213.872 39.3773 213.872 40.012L213.12 39.564C213.12 39.004 213.253 38.5027 213.52 38.06C213.787 37.6173 214.149 37.2707 214.608 37.02C215.067 36.764 215.587 36.636 216.168 36.636C216.749 36.636 217.256 36.7587 217.688 37.004C218.12 37.2493 218.453 37.6013 218.688 38.06C218.923 38.5133 219.04 39.0547 219.04 39.684L219.032 45.5H217.616ZM229.655 45.5V33.98H231.327V45.5H229.655ZM236.169 45.5L232.825 33.98H234.577L237.001 42.692L239.425 33.988L241.185 33.98L243.609 42.692L246.033 33.98H247.793L244.441 45.5H242.777L240.305 36.884L237.833 45.5H236.169ZM253.631 45.74C252.479 45.74 251.498 45.4893 250.687 44.988C249.876 44.4813 249.255 43.7773 248.823 42.876C248.396 41.9747 248.183 40.9293 248.183 39.74C248.183 38.5507 248.396 37.5053 248.823 36.604C249.255 35.7027 249.876 35.0013 250.687 34.5C251.498 33.9933 252.479 33.74 253.631 33.74C254.959 33.74 256.058 34.076 256.927 34.748C257.802 35.42 258.41 36.324 258.751 37.46L257.055 37.916C256.831 37.1107 256.431 36.4787 255.855 36.02C255.284 35.5613 254.543 35.332 253.631 35.332C252.815 35.332 252.135 35.516 251.591 35.884C251.047 36.252 250.636 36.7667 250.359 37.428C250.087 38.0893 249.951 38.86 249.951 39.74C249.946 40.62 250.079 41.3907 250.351 42.052C250.628 42.7133 251.039 43.228 251.583 43.596C252.132 43.964 252.815 44.148 253.631 44.148C254.543 44.148 255.284 43.9187 255.855 43.46C256.431 42.996 256.831 42.364 257.055 41.564L258.751 42.02C258.41 43.156 257.802 44.06 256.927 44.732C256.058 45.404 254.959 45.74 253.631 45.74Z"
                    fill="#FCFCFD"
                  />
                </svg>
                <h4
                  style={{
                    textAlign: "left",
                    marginTop: "7%",
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                >
                  {minimumBid && minimumBid} MATIC for{" "}
                  {data && data.Distillery && data.Distillery}
                </h4>
                <hr style={{ color: "white" }}></hr>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "var(--background2)" }}>Service fee</p>
                <p style={{ color: "white", textAlign: "left" }}>1</p>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "var(--background2)" }}>Total bid amount</p>
                <p style={{ color: "white", textAlign: "left" }}>
                  {minimumBid && minimumBid} MATIC
                </p>
              </div>
              <p
                onClick={() => setAccetptBidStep2("step2")}
                style={{
                  color: "white",
                  marginTop: "5%",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                ACCEPT BID
              </p>
              <Button
                onClick={() => closeAcceptBidModal()}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--borderColor)",
                  borderRadius: "0%",
                  width: "100%",
                  borderWidth: "0.1rem",
                }}
              >
                CANCEL
              </Button>{" "}
            </div>
          </>
        ) : acceptBidStep == "step2" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                Follow steps
              </h4>
              <div style={{ cursor: "pointer" }} onClick={closeAcceptBidModal}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <div style={{ marginTop: "5%" }}>
              <div style={{ display: "flex", marginTop: "5%" }}>
                <div style={{ marginRight: "7%" }}>
                  <svg
                    width="48"
                    height="49"
                    viewBox="0 0 48 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#46392E"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15 14.5C14.4477 14.5 14 14.9477 14 15.5C14 16.0523 14.4477 16.5 15 16.5H16V30.5C16 32.7091 17.7909 34.5 20 34.5H28C30.2091 34.5 32 32.7091 32 30.5V16.5H33C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5H15ZM30 16.5H18V30.5C18 31.6046 18.8954 32.5 20 32.5H28C29.1046 32.5 30 31.6046 30 30.5V16.5Z"
                      fill="#D2A163"
                    />
                    <path
                      d="M24.7071 19.7929C24.3166 19.4024 23.6834 19.4024 23.2929 19.7929L20.2929 22.7929C19.9024 23.1834 19.9024 23.8166 20.2929 24.2071C20.6834 24.5976 21.3166 24.5976 21.7071 24.2071L23 22.9142V28.5C23 29.0523 23.4477 29.5 24 29.5C24.5523 29.5 25 29.0523 25 28.5V22.9142L26.2929 24.2071C26.6834 24.5976 27.3166 24.5976 27.7071 24.2071C28.0976 23.8166 28.0976 23.1834 27.7071 22.7929L24.7071 19.7929Z"
                      fill="#D2A163"
                    />
                  </svg>
                </div>
                <div>
                  <p style={{ color: "white", marginBottom: "0%" }}>
                    ACCEPT BID
                  </p>
                  <p style={{ color: "var(--background2)" }}>
                    Send transaction with your wallet
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setAccetptBidStep2("step3")}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  border: "none",
                  borderRadius: "0%",
                  width: "100%",
                }}
              >
                START NOW
              </Button>{" "}
            </div>
          </>
        ) : acceptBidStep == "step3" ? (
          <>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                Follow steps
              </h4>
              <div style={{ cursor: "pointer" }} onClick={closeAcceptBidModal}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <div style={{ marginTop: "15%" }}>
              <div style={{ display: "flex", marginTop: "1%" }}>
                <div style={{ marginRight: "7%" }}></div>
                <div>
                  <p style={{ color: "white", marginBottom: "0%" }}>
                    ACCEPT BID
                  </p>
                  <p style={{ color: "var(--background2)" }}>
                    Send transaction with your wallet
                  </p>
                </div>
              </div>
              {finalLoad == false ? (
                <Button
                  onClick={() => {
                    finalizeReserveAuction();
                  }}
                  disabled={finalDone}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background2)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--background2)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  {!finalDone ? <span>START NOW </span> : <span>DONE</span>}
                </Button>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <ReactLoading
                    type={"spin"}
                    color={"var(--background2)"}
                    height={"20%"}
                    width={"15%"}
                  />
                </div>
              )}
            </div>
          </>
        ) : null}
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {purchaseStep == "step1" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                Check out
              </h4>
              <div style={{ cursor: "pointer" }} onClick={closeModal}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <p style={{ color: "white" }}>
              You are about to purchase Whisky Bottle from IWC
            </p>

            <hr style={{ color: "white" }}></hr>
            <div
              style={{
                display: "flex",
                fontSize: "0.9rem",
                justifyContent: "space-between",
              }}
            >
              <p style={{ color: "var(--background2)" }}>Your balance</p>
              <p style={{ color: "white", textAlign: "left" }}>
                {accountBal && accountBal.toFixed(4)} MATIC
              </p>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "0.9rem",
                justifyContent: "space-between",
              }}
            >
              <p style={{ color: "var(--background2)" }}>Service fee</p>
              <p style={{ color: "white", textAlign: "left" }}>{ amountData && ((amountData / 10 ** 18) / 1.5).toFixed(3)} </p>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "0.9rem",
                justifyContent: "space-between",
              }}
            >
              <p style={{ color: "var(--background2)" }}>You will pay</p>
              <p style={{ color: "white", textAlign: "left" }}>
                {amountData && amountData / 10 ** 18} MATIC
              </p>
            </div>
            <div style={{ marginTop: "15%" }}>
              <div
                style={{
                  display: "flex",
                  marginTop: "5%",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: "#311B1C",
                    color: "#A17545",
                    padding: "7%",
                    borderRadius: "15px",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <svg
                      style={{ marginRight: "2%" }}
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0003 27.167C21.8914 27.167 26.667 22.3914 26.667 16.5003C26.667 10.6093 21.8914 5.83366 16.0003 5.83366C10.1093 5.83366 5.33366 10.6093 5.33366 16.5003C5.33366 22.3914 10.1093 27.167 16.0003 27.167ZM16.0003 29.8337C23.3641 29.8337 29.3337 23.8641 29.3337 16.5003C29.3337 9.13653 23.3641 3.16699 16.0003 3.16699C8.63653 3.16699 2.66699 9.13653 2.66699 16.5003C2.66699 23.8641 8.63653 29.8337 16.0003 29.8337Z"
                        fill="#A17545"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0003 9.83301C15.2639 9.83301 14.667 10.43 14.667 11.1663C14.667 11.9027 15.2639 12.4997 16.0003 12.4997C16.7367 12.4997 17.3337 11.9027 17.3337 11.1663C17.3337 10.43 16.7367 9.83301 16.0003 9.83301ZM16.0003 15.1663C15.2639 15.1663 14.667 15.7633 14.667 16.4997V21.833C14.667 22.5694 15.2639 23.1663 16.0003 23.1663C16.7367 23.1663 17.3337 22.5694 17.3337 21.833V16.4997C17.3337 15.7633 16.7367 15.1663 16.0003 15.1663Z"
                        fill="#A17545"
                      />
                    </svg>
                    <div>
                      <h4 style={{ fontSize: "1rem" }}>
                        THIS CREATOR IS NOT VERIFIED<br></br>
                        <span style={{ fontSize: "0.8rem" }}>
                          Purchase this Bottle at your own risk{" "}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <p
                onClick={() => puchaseHander1()}
                style={{
                  color: "white",
                  marginTop: "5%",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                {" "}
                I UNDERSTAND, CONTINUE{" "}
              </p>
              <Button
                onClick={() => closeModal()}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--borderColor)",
                  borderRadius: "0%",
                  width: "100%",
                  borderWidth: "0.1rem",
                }}
              >
                CANCEL
              </Button>{" "}
            </div>
          </>
        ) : purchaseStep == "step2" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                Follow steps
              </h4>
              <div style={{ cursor: "pointer" }} onClick={closeModal}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <div style={{ marginTop: "5%" }}>
              <div style={{ display: "flex" }}>
                {isloading && (
                  <ReactLoading
                    type={"spin"}
                    color={"var(--background2)"}
                    height={"20%"}
                    width={"15%"}
                  />
                )}

                <div style={{ marginLeft: "5%" }}>
                  <p style={{ color: "white", marginBottom: "0%" }}>
                    PURCHASING
                  </p>
                  <p style={{ color: "var(--background2)" }}>
                    Sending transaction with your wallet
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "15%" }}>
                <div
                  style={{
                    display: "flex",
                    marginTop: "5%",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#311B1C",
                      color: "#A17545",
                      padding: "5%",
                      borderRadius: "15px",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <svg
                        style={{ marginRight: "1%" }}
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.0003 27.167C21.8914 27.167 26.667 22.3914 26.667 16.5003C26.667 10.6093 21.8914 5.83366 16.0003 5.83366C10.1093 5.83366 5.33366 10.6093 5.33366 16.5003C5.33366 22.3914 10.1093 27.167 16.0003 27.167ZM16.0003 29.8337C23.3641 29.8337 29.3337 23.8641 29.3337 16.5003C29.3337 9.13653 23.3641 3.16699 16.0003 3.16699C8.63653 3.16699 2.66699 9.13653 2.66699 16.5003C2.66699 23.8641 8.63653 29.8337 16.0003 29.8337Z"
                          fill="#A17545"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.0003 9.83301C15.2639 9.83301 14.667 10.43 14.667 11.1663C14.667 11.9027 15.2639 12.4997 16.0003 12.4997C16.7367 12.4997 17.3337 11.9027 17.3337 11.1663C17.3337 10.43 16.7367 9.83301 16.0003 9.83301ZM16.0003 15.1663C15.2639 15.1663 14.667 15.7633 14.667 16.4997V21.833C14.667 22.5694 15.2639 23.1663 16.0003 23.1663C16.7367 23.1663 17.3337 22.5694 17.3337 21.833V16.4997C17.3337 15.7633 16.7367 15.1663 16.0003 15.1663Z"
                          fill="#A17545"
                        />
                      </svg>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <h4 style={{ fontSize: "0.7rem" }}>
                            THIS CREATOR IS NOT VERIFIED<br></br>
                            <span style={{ fontSize: "0.8rem" }}>
                              Purchase this Bottle at your own risk{" "}
                            </span>
                          </h4>
                        </div>
                        <img
                          style={{ marginLeft: "5%" }}
                          height={50}
                          width={50}
                          src="/images/profile.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  onClick={() => puchaseHander2()}
                  style={{
                    color: "white",
                    marginTop: "5%",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  I UNDERSTAND, CONTINUE{" "}
                </p>
                <Button
                  onClick={() => closeModal()}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--borderColor)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  CANCEL
                </Button>{" "}
              </div>
            </div>
          </>
        ) : purchaseStep == "step3" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}></h4>
              <div style={{ cursor: "pointer" }} onClick={closeModal}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <div style={{ marginTop: "5%" }}>
              <h1 style={{ textAlign: "center", color: "white" }}>Yay! 🎉</h1>
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: "10%",
                }}
              >
                You successfully purchased Whisky Bottle from IWC
              </p>
              <div
                style={{
                  borderRadius: "15px",
                  borderStyle: "solid",
                  borderWidth: "0.1rem",
                  borderColor: "var(--borderColor",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#676B79",
                    padding: "5%",
                    paddingBottom: "1%",
                  }}
                >
                  <p>Status</p>
                  <p>Transaction ID</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#676B79",
                    padding: "5%",
                    paddingTop: "1%",
                  }}
                >
                  <p style={{ color: "#9757D7" }}>Processing</p>
                  <p style={{ color: "white" }}>0msx836930...87r398</p>
                </div>
              </div>
              <p
                style={{
                  marginTop: "10%",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Time to show-off
              </p>
              <div style={{ textAlign: "center" }}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32ZM24 34C29.5228 34 34 29.5228 34 24C34 18.4771 29.5228 14 24 14C18.4771 14 14 18.4771 14 24C14 29.5228 18.4771 34 24 34Z"
                    fill="#D2A163"
                  />
                  <path
                    d="M24 22C24 21.4477 24.4477 21 25 21H26C26.5523 21 27 20.5523 27 20C27 19.4477 26.5523 19 26 19H25C23.3431 19 22 20.3432 22 22V24H21C20.4477 24 20 24.4477 20 25C20 25.5523 20.4477 26 21 26H22V32C22 32.5523 22.4477 33 23 33C23.5523 33 24 32.5523 24 32V26H26C26.5523 26 27 25.5523 27 25C27 24.4477 26.5523 24 26 24H24V22Z"
                    fill="#D2A163"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="46"
                    height="46"
                    rx="23"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
                <svg
                  style={{ marginLeft: "5%" }}
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.181 25.9998C13.5273 26.0045 12.4598 27.8884 13.4786 29.3157C14.9376 31.3596 17.5833 33 22.0003 33C28.8454 33 34.34 27.4217 33.5708 20.8311L34.6977 18.5773C35.4792 17.0143 34.1212 15.2362 32.4076 15.5789L30.9188 15.8767C30.5241 15.6684 30.1156 15.5113 29.7665 15.3974C29.0861 15.1755 28.2626 15 27.5003 15C26.131 15 24.9492 15.3513 24.01 16.0559C23.0815 16.7526 22.5585 17.6682 22.2715 18.509C22.1392 18.8966 22.0511 19.2853 21.9946 19.6584C21.4633 19.4912 20.9216 19.2663 20.3913 18.9915C19.1881 18.3683 18.2151 17.5782 17.6663 16.8855C16.7455 15.7233 14.794 15.8095 14.1092 17.3202C13.1441 19.4495 13.4089 21.9735 14.2764 24.0129C14.5672 24.6964 14.9454 25.3721 15.4075 25.9983C15.3284 25.9992 15.2527 25.9996 15.181 25.9998ZM22.0002 31C18.1369 31 16.1392 29.6007 15.1063 28.1537C15.0599 28.0887 15.1067 28 15.1865 27.9998C16.2374 27.9968 18.3944 27.9471 19.817 27.1145C19.8906 27.0714 19.8744 26.9629 19.7936 26.9358C16.4774 25.8208 14.5924 21.0986 15.9307 18.1459C15.9614 18.0782 16.0524 18.0693 16.0986 18.1275C17.6275 20.0572 20.9703 21.9472 23.8786 21.9989C23.9417 22 23.9894 21.9427 23.9798 21.8803C23.8626 21.1205 23.4151 17 27.5002 17C28.4757 17 29.9271 17.4758 30.4617 17.9633C30.4864 17.9858 30.5199 17.9961 30.5527 17.9895L32.7997 17.5401C32.8813 17.5238 32.946 17.6084 32.9088 17.6829L31.5151 20.4702C31.5054 20.4895 31.5024 20.5118 31.5061 20.5331C32.4822 26.02 27.9882 31 22.0002 31Z"
                    fill="#D2A163"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="46"
                    height="46"
                    rx="23"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
                <svg
                  style={{ marginLeft: "5%" }}
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28 16H20C17.7909 16 16 17.7909 16 20V28C16 30.2091 17.7909 32 20 32H28C30.2091 32 32 30.2091 32 28V20C32 17.7909 30.2091 16 28 16ZM20 14C16.6863 14 14 16.6863 14 20V28C14 31.3137 16.6863 34 20 34H28C31.3137 34 34 31.3137 34 28V20C34 16.6863 31.3137 14 28 14H20Z"
                    fill="#D2A163"
                  />
                  <path
                    d="M29 20C29.5523 20 30 19.5523 30 19C30 18.4477 29.5523 18 29 18C28.4477 18 28 18.4477 28 19C28 19.5523 28.4477 20 29 20Z"
                    fill="#D2A163"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29 24C29 26.7614 26.7614 29 24 29C21.2386 29 19 26.7614 19 24C19 21.2386 21.2386 19 24 19C26.7614 19 29 21.2386 29 24ZM27 24C27 25.6569 25.6569 27 24 27C22.3431 27 21 25.6569 21 24C21 22.3431 22.3431 21 24 21C25.6569 21 27 22.3431 27 24Z"
                    fill="#D2A163"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="46"
                    height="46"
                    rx="23"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
                <svg
                  style={{ marginLeft: "5%" }}
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32ZM24 34C29.5228 34 34 29.5228 34 24C34 18.4771 29.5228 14 24 14C18.4771 14 14 18.4771 14 24C14 29.5228 18.4771 34 24 34Z"
                    fill="#D2A163"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.8779 21.8539C20.2973 22.9183 20.2786 24.3212 20.8944 25.5528C21.1414 26.0468 20.9412 26.6474 20.4472 26.8944C19.9532 27.1414 19.3525 26.9412 19.1056 26.4472C18.2214 24.6788 18.2027 22.5817 19.1221 20.8961C20.0643 19.1687 21.921 18 24.5 18C26.457 18 27.9423 18.882 28.8692 20.1696C29.7746 21.4276 30.1239 23.0338 29.9538 24.5192C29.7836 26.0056 29.0762 27.4847 27.7299 28.3746C26.5809 29.134 25.1012 29.3769 23.3753 28.9852L22.4635 32.2676C22.3157 32.7998 21.7645 33.1113 21.2323 32.9635C20.7002 32.8157 20.3887 32.2645 20.5365 31.7324L21.7158 27.4868C21.7175 27.4804 21.7193 27.4739 21.7212 27.4675L23.0365 22.7324C23.1843 22.2002 23.7355 21.8887 24.2677 22.0365C24.7998 22.1843 25.1113 22.7355 24.9635 23.2676L23.9112 27.056C25.1622 27.3211 26.0396 27.0944 26.627 26.7061C27.37 26.215 27.8472 25.3358 27.9668 24.2917C28.0864 23.2467 27.8305 22.1502 27.2459 21.338C26.6827 20.5555 25.7931 20 24.5 20C22.5791 20 21.4357 20.8313 20.8779 21.8539Z"
                    fill="#D2A163"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="46"
                    height="46"
                    rx="23"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : null}
      </Modal>

      {/* place bid  */}
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {purchaseStep2 == "step1" ? (
          <>
            {" "}
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                  Place a bid
                </h4>
                <div style={{ cursor: "pointer" }} onClick={closeModal2}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#FCFCFD"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#46392E"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              <p style={{ color: "white", marginTop: "5%" }}>
                You are about to place a bid for{" "}
                {data && data.Distillery && data.Distillery} from IWC
              </p>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                  marginTop: "10%",
                }}
              ></div>
              <h4 style={{ color: "white" }}>Your bid</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "1%",
                }}
              >
                <input
                  onChange={(e) => setBidData(e.target.value)}
                  placeholder={`Enter Bid`}
                  style={{
                    width:"80%",
                    background: "var(--background)",
                    border: "none",
                    outline: "none",
                    color: "var(--background2)",
                    width:"200px"
                  }}
                  type="number"
                />
                <p style={{ color: "white" }}>MATIC</p>
              </div>
              <hr style={{ color: "white" }}></hr>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "var(--background2)" }}>
                  Previous bid amount
                </p>
                <p style={{ color: "white", textAlign: "left" }}>
                  {minimumBid && minimumBid}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "var(--background2)" }}>Your balance</p>
                <p style={{ color: "white", textAlign: "left" }}>
                  {accountBal && accountBal.toFixed(4)} MATIC
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "var(--background2)" }}>Service fee</p>
                <p style={{ color: "white", textAlign: "left" }}>{ bidData && (bidData / 1.5).toFixed(3)} MATIC</p>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "var(--background2)" }}>Total bid amount</p>
                <p style={{ color: "white", textAlign: "left" }}>
                  {bidData && bidData} MATIC
                </p>
              </div>
              <div style={{ marginTop: "15%" }}>
                <p
                  onClick={() => placeBidhandler1()}
                  style={{
                    color: "white",
                    marginTop: "5%",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  PLACE A BID{" "}
                </p>
                <Button
                  onClick={closeModal2}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--borderColor)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  CANCEL
                </Button>{" "}
              </div>
            </>{" "}
          </>
        ) : purchaseStep2 == "step2" ? (
          <>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* <h4 style={{fontFamily:"fright",color:"white"}}>Follow steps</h4> */}
              <span></span>
              <div style={{ cursor: "pointer" }} onClick={closeModal2}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                    fill="#FCFCFD"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="19"
                    stroke="#46392E"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <div style={{ marginTop: "5%" }}>
              <div style={{ display: "flex", marginTop: "5%" }}>
                <div style={{ marginRight: "7%" }}>
                  <svg
                    width="48"
                    height="49"
                    viewBox="0 0 48 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#46392E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 14.5C14.4477 14.5 14 14.9477 14 15.5C14 16.0523 14.4477 16.5 15 16.5H16V30.5C16 32.7091 17.7909 34.5 20 34.5H28C30.2091 34.5 32 32.7091 32 30.5V16.5H33C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5H15ZM30 16.5H18V30.5C18 31.6046 18.8954 32.5 20 32.5H28C29.1046 32.5 30 31.6046 30 30.5V16.5Z"
                      fill="#D2A163"
                    />
                    <path
                      d="M24.7071 19.7929C24.3166 19.4024 23.6834 19.4024 23.2929 19.7929L20.2929 22.7929C19.9024 23.1834 19.9024 23.8166 20.2929 24.2071C20.6834 24.5976 21.3166 24.5976 21.7071 24.2071L23 22.9142V28.5C23 29.0523 23.4477 29.5 24 29.5C24.5523 29.5 25 29.0523 25 28.5V22.9142L26.2929 24.2071C26.6834 24.5976 27.3166 24.5976 27.7071 24.2071C28.0976 23.8166 28.0976 23.1834 27.7071 22.7929L24.7071 19.7929Z"
                      fill="#D2A163"
                    />
                  </svg>
                </div>
                <div>
                  <p style={{ color: "white", marginBottom: "0%" }}>
                    DEPOSIT MATIC
                  </p>
                  <p style={{ color: "var(--background2)" }}>
                    Send transaction with your wallet
                  </p>
                </div>
              </div>
              {!bidLoading ? (
                <Button
                  onClick={() => placeBidHandler()}
                  disabled={bidDone}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background2)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    border: "none",
                    borderRadius: "0%",
                    width: "100%",
                  }}
                >
                  {!bidDone ? <span>START NOW</span> : <span>Done</span>}
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5%",
                  }}
                >
                  <ReactLoading
                    type={"spin"}
                    color={"var(--background2)"}
                    height={"20%"}
                    width={"15%"}
                  />
                </div>
              )}
            </div>
            <div style={{ marginTop: "15%" }}></div>
            <div style={{ marginTop: "15%" }}></div>
          </>
        ) : null}
      </Modal>
      <Modal 
      isOpen={shareOn}
      style={customStyles}
      onRequestClose={closeShare}
      >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h4 style={{color:"white"}}>Share The Link </h4>
      <div style={{ cursor: "pointer" }} onClick={closeShare}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#FCFCFD"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#46392E"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                </div>
                <div style={{ display: "flex", gap:"10px",marginTop:"30px" }}>
      <input style={{width:"80%", backgroundColor:"#211715",color:"white",border:"none",borderRadius:"5px"}} value={shareUrl}/>
      <img onClick={handleShare} width="30px" src="https://img.icons8.com/?size=1x&id=PoI08DwSsc7G&format=png" alt="copy icon"/>
      {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    style={{ color: 'white' }} // Apply the white color to the SVG
    onClick={handleShare}
  >
    <path d="M0 0h24v24H0z" fill="black" />
    <path d="M14 1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H4V5h10v14zM20 7h-1V6c0-1.1-.9-2-2-2h-2V3c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v1H5c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2h1v1c0 1.1.9 2 2 2h2v1c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-1h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 3h4v2h-4V3zm6 16H8V9h8v10z" />
  </svg> */}
  </div>
  <div style={{textAlign:"center",marginTop:"30px"}}>
  <a  href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                     <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32ZM24 34C29.5228 34 34 29.5228 34 24C34 18.4771 29.5228 14 24 14C18.4771 14 14 18.4771 14 24C14 29.5228 18.4771 34 24 34Z" fill="#D2A163"/>
<path d="M24 22C24 21.4477 24.4477 21 25 21H26C26.5523 21 27 20.5523 27 20C27 19.4477 26.5523 19 26 19H25C23.3431 19 22 20.3432 22 22V24H21C20.4477 24 20 24.4477 20 25C20 25.5523 20.4477 26 21 26H22V32C22 32.5523 22.4477 33 23 33C23.5523 33 24 32.5523 24 32V26H26C26.5523 26 27 25.5523 27 25C27 24.4477 26.5523 24 26 24H24V22Z" fill="#D2A163"/>
<rect x="1" y="1" width="46" height="46" rx="23" stroke="#46392E" stroke-width="2"/>
</svg></a>
<a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
<svg  style={{marginLeft:"5%"}} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M15.181 25.9998C13.5273 26.0045 12.4598 27.8884 13.4786 29.3157C14.9376 31.3596 17.5833 33 22.0003 33C28.8454 33 34.34 27.4217 33.5708 20.8311L34.6977 18.5773C35.4792 17.0143 34.1212 15.2362 32.4076 15.5789L30.9188 15.8767C30.5241 15.6684 30.1156 15.5113 29.7665 15.3974C29.0861 15.1755 28.2626 15 27.5003 15C26.131 15 24.9492 15.3513 24.01 16.0559C23.0815 16.7526 22.5585 17.6682 22.2715 18.509C22.1392 18.8966 22.0511 19.2853 21.9946 19.6584C21.4633 19.4912 20.9216 19.2663 20.3913 18.9915C19.1881 18.3683 18.2151 17.5782 17.6663 16.8855C16.7455 15.7233 14.794 15.8095 14.1092 17.3202C13.1441 19.4495 13.4089 21.9735 14.2764 24.0129C14.5672 24.6964 14.9454 25.3721 15.4075 25.9983C15.3284 25.9992 15.2527 25.9996 15.181 25.9998ZM22.0002 31C18.1369 31 16.1392 29.6007 15.1063 28.1537C15.0599 28.0887 15.1067 28 15.1865 27.9998C16.2374 27.9968 18.3944 27.9471 19.817 27.1145C19.8906 27.0714 19.8744 26.9629 19.7936 26.9358C16.4774 25.8208 14.5924 21.0986 15.9307 18.1459C15.9614 18.0782 16.0524 18.0693 16.0986 18.1275C17.6275 20.0572 20.9703 21.9472 23.8786 21.9989C23.9417 22 23.9894 21.9427 23.9798 21.8803C23.8626 21.1205 23.4151 17 27.5002 17C28.4757 17 29.9271 17.4758 30.4617 17.9633C30.4864 17.9858 30.5199 17.9961 30.5527 17.9895L32.7997 17.5401C32.8813 17.5238 32.946 17.6084 32.9088 17.6829L31.5151 20.4702C31.5054 20.4895 31.5024 20.5118 31.5061 20.5331C32.4822 26.02 27.9882 31 22.0002 31Z" fill="#D2A163"/>
<rect x="1" y="1" width="46" height="46" rx="23" stroke="#46392E" stroke-width="2"/>
</svg></a>
<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
<svg  style={{marginLeft:"5%"}} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M28 16H20C17.7909 16 16 17.7909 16 20V28C16 30.2091 17.7909 32 20 32H28C30.2091 32 32 30.2091 32 28V20C32 17.7909 30.2091 16 28 16ZM20 14C16.6863 14 14 16.6863 14 20V28C14 31.3137 16.6863 34 20 34H28C31.3137 34 34 31.3137 34 28V20C34 16.6863 31.3137 14 28 14H20Z" fill="#D2A163"/>
<path d="M29 20C29.5523 20 30 19.5523 30 19C30 18.4477 29.5523 18 29 18C28.4477 18 28 18.4477 28 19C28 19.5523 28.4477 20 29 20Z" fill="#D2A163"/>
<path fillRule="evenodd" clipRule="evenodd" d="M29 24C29 26.7614 26.7614 29 24 29C21.2386 29 19 26.7614 19 24C19 21.2386 21.2386 19 24 19C26.7614 19 29 21.2386 29 24ZM27 24C27 25.6569 25.6569 27 24 27C22.3431 27 21 25.6569 21 24C21 22.3431 22.3431 21 24 21C25.6569 21 27 22.3431 27 24Z" fill="#D2A163"/>
<rect x="1" y="1" width="46" height="46" rx="23" stroke="#46392E" stroke-width="2"/>
</svg></a>
<a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer"> 
<svg style={{marginLeft:"5%"}} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32ZM24 34C29.5228 34 34 29.5228 34 24C34 18.4771 29.5228 14 24 14C18.4771 14 14 18.4771 14 24C14 29.5228 18.4771 34 24 34Z" fill="#D2A163"/>
<path fillRule="evenodd" clipRule="evenodd" d="M20.8779 21.8539C20.2973 22.9183 20.2786 24.3212 20.8944 25.5528C21.1414 26.0468 20.9412 26.6474 20.4472 26.8944C19.9532 27.1414 19.3525 26.9412 19.1056 26.4472C18.2214 24.6788 18.2027 22.5817 19.1221 20.8961C20.0643 19.1687 21.921 18 24.5 18C26.457 18 27.9423 18.882 28.8692 20.1696C29.7746 21.4276 30.1239 23.0338 29.9538 24.5192C29.7836 26.0056 29.0762 27.4847 27.7299 28.3746C26.5809 29.134 25.1012 29.3769 23.3753 28.9852L22.4635 32.2676C22.3157 32.7998 21.7645 33.1113 21.2323 32.9635C20.7002 32.8157 20.3887 32.2645 20.5365 31.7324L21.7158 27.4868C21.7175 27.4804 21.7193 27.4739 21.7212 27.4675L23.0365 22.7324C23.1843 22.2002 23.7355 21.8887 24.2677 22.0365C24.7998 22.1843 25.1113 22.7355 24.9635 23.2676L23.9112 27.056C25.1622 27.3211 26.0396 27.0944 26.627 26.7061C27.37 26.215 27.8472 25.3358 27.9668 24.2917C28.0864 23.2467 27.8305 22.1502 27.2459 21.338C26.6827 20.5555 25.7931 20 24.5 20C22.5791 20 21.4357 20.8313 20.8779 21.8539Z" fill="#D2A163"/>
<rect x="1" y="1" width="46" height="46" rx="23" stroke="#46392E" stroke-width="2"/>
</svg></a>

                     </div>
{/*                      
      <div style={{display:"flex",marginTop:"30px",gap:"30px"}}>
      <a  href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img width="60px" src="https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?size=626&ext=jpg&ga=GA1.2.1829918996.1684468773&semt=ais" alt="instagram" />
            
          </a>

          <a  href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img width="60px" src="https://img.freepik.com/premium-vector/twittet-app-icon-social-media-logo-vector-illustration_277909-405.jpg?size=626&ext=jpg&ga=GA1.1.1829918996.1684468773&semt=sph" alt="Twitter" />
            
          </a>
          <a  href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img width="60px" src="https://img.freepik.com/free-icon/facebook_318-566730.jpg?size=626&ext=jpg&ga=GA1.2.1829918996.1684468773&semt=sph" alt="Facebook" />
            
          </a>
          <a  href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
            <img width="60px" src="https://cdn-icons-png.flaticon.com/512/220/220214.png?w=740&t=st=1688552745~exp=1688553345~hmac=e6680a62a511da3a8313a46f19aeea66687f11bd88d458515e23db8ec027d68c" alt="Pintrest" />
            
          </a>

      </div> */}

      </Modal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "45% 40% 6%",
          gap: "4%",
        }}
      >
        
        <div
          style={{
            // background: `url(http://${data && data.image && data.image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            height: "100%",
          }}
        >
           {data && data.image && data.image.split('.').pop() == "jpg" &&<img
    style={{ width: "100%" }}
    width={230}
    height={600}
    src={`http://${data && data.image && data.image}`}
  /> } 
 {data && data.image && data.image.split('.').pop() == "mp4" &&   <video height={600} width={500}  style={{objectFit:"fill"}} autoPlay controls >
     <source src={`http://${data && data.image && data.image}`} type="video/mp4"/>
</video>  }
          {/* <Button
            style={{
              borderRadius: "0rem",
              color: "white",
              borderColor: "var(--background2)",
              height: "2.5rem",
              backgroundColor: "#A17545",
              marginTop: "2%",
              marginLeft: "2%",
              fontSize: "0.8rem",
            }}
          >
            ART
          </Button>
          <Button
            style={{
              borderRadius: "0rem",
              color: "black",
              borderColor: "var(--background2)",
              height: "2.5rem",
              backgroundColor: "var(--background2)",
              marginTop: "2%",
              marginLeft: "1%",
              fontSize: "0.8rem",
            }}
          >
            UNLOCKABLE
          </Button> */}
        </div>
        <div>
          <h3 style={{ color: "#FCFCFD", fontFamily: "Freight Big Pro",fontSize:"48px",fontWeight:"700",fontStyle:"normal",lineHeight:"normal" }}>
            {data && data.Distillery && data.Distillery}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "20% 20%",
              width: "100%",
            }}
          >
            <p
              style={{
                borderWidth: "0.1rem",
                borderStyle: "solid",
                borderColor: "var(--background2)",
                color: "var(--background2)",
                textAlign: "center",
                fontSize: "0.8rem",
              }}
            >
              {data && data.Age && data.Age}
            </p>
            <p
              style={{
                borderWidth: "0.1rem",
                borderStyle: "solid",
                borderColor: "var(--borderColor)",
                color: "var(--background2)",
                textAlign: "center",
                fontSize: "0.8rem",
                marginLeft: "2%",
              }}
            >
              {data && data[`Cask type`] && data[`Cask type`]}{" "}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              color: "var(--background2)",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
              borderWidth: "0.1rem",
              padding: "1%",
              width: "100%",
              paddingBottom: "0%",
              height: "5%",
              fontSize: "0.7rem",
            }}
          >
            <Button
              style={{
                borderRadius: "0rem",
                color: "black",
                borderColor: "var(--borderColor)",
                backgroundColor: "var(--background2)",
                height: "1.5rem",
                paddingLeft: "10%",
                paddingRight: "10%",
                fontSize: "0.7rem",
              }}
            >
              INFO
            </Button>
            <p
              style={{
                marginLeft: "3%",
                padding: "0.2rem",
                paddingLeft: "8%",
                paddingRight: "8%",
                paddingBottom: "0%",
              }}
            >
              OWNERS
            </p>
            <p
              style={{
                marginLeft: "3%",
                padding: "0.2rem",
                paddingLeft: "8%",
                paddingRight: "8%",
                paddingBottom: "0%",
              }}
            >
              HISTORY
            </p>
            <p
              style={{
                marginLeft: "3%",
                padding: "0.2rem",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom: "0%",
              }}
            >
              BIDS
            </p>
          </div>
          <p style={{ marginTop: "5%", color: "white" }}>DESCRIPTION</p>
          <p style={{ color: "var(--background2)", fontSize: "0.9rem" }}>
            {data && data.Details && data.Details}
          </p>

          <div
            style={{
              display: "flex",
              fontSize: "0.9rem",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            <p style={{ color: "var(--background2)" }}>RARITY LEVEL</p>
            <p style={{ color: "white", textAlign: "left" }}>{itemRarityData?.rarity_level}</p>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "0.9rem",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "var(--background2)" }}>RARITY INDEX</p>
            <p style={{ color: "white", textAlign: "end" }}>{itemRarityData?.rarity_index}/100</p>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "0.9rem",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "var(--background2)" }}>RARITY RANKING</p>
            <p style={{ color: "white", textAlign: "left" }}>#{itemRarityData?.rarity_index} OUT OF 100</p>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "0.9rem",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "var(--background2)" }}>BOTTLING DATE</p>
            <p style={{ color: "white", textAlign: "left" }}>
              {data && data[`Bottling Date`] && data[`Bottling Date`]}{" "}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "0.9rem",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "var(--background2)" }}>ADDITIONAL DETAILS</p>
            <p style={{ color: "white", textAlign: "left" }}>
              {data && data[`Additional date`] && data[`Additional date`]}
            </p>
          </div>
          <div
            style={{
              padding: "5%",
              background: "var(--background3)",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
              borderWidth: "0.1rem",
            }}
          >
          
            {previousBidAccount &&
              previousBidAccount.address !== bidAccount && (
                <div style={{ display: "flex", padding: "3%" }}>
                  <img
                    style={{ borderRadius: "100%", width: "90px" }}
                    height={70}
                    src={previousBidAccount && previousBidAccount.imgpath}
                  />
                  <div>
                    <p
                      style={{
                        color: "var(--background2)",
                        marginLeft: "5%",
                        marginBottom: "0%",
                      }}
                    >
                      HIGHEST BID BY
                      <span style={{ color: "white" }}>
                        {" "}
                        {previousBidAccount.name} {minimumBid && minimumBid}{" "}
                        MATIC{" "}
                      </span>
                      ${usd && usd.toFixed(3)}
                    </p>
                  </div>
                </div>
              )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40% 40%",
                gap: "10%",
                marginLeft: "5%",
              }}
            >
              {amountData&&directSaleuserAccount!==account?
                 <Button
                 onClick={openModal}
                style={{
                  borderRadius: "0rem",
                  color: "white",
                  borderColor: "var(--borderColor)",
                  height: "2.5rem",
                  backgroundColor: "var(--background)",
                  width: "100%",
                  marginTop: "5%",
                }}
              >
                PURCHASE NOW
              </Button>
              :null}
           
              {endTime && bidAccount && account && bidAccount == account ? (
                <Button
                  disabled={
                    previousBidAccount && previousBidAccount.address == account
                  }
                  onClick={() => openAcceptBidmodal()}
                  style={{
                    borderRadius: "0rem",
                    color: "white",
                    borderColor: "var(--background2)",
                    height: "2.5rem",
                    backgroundColor: "var(--background3)",
                    width: "100%",
                    marginTop: "5%",
                  }}
                >
                  FINALIZE{" "}
                </Button>
              ) : endTime !== true ? (
                <Button
                  disabled={endTime || account == bidAccount}
                  onClick={openModal2}
                  style={{
                    borderRadius: "0rem",
                    color: "white",
                    borderColor: "var(--background2)",
                    height: "2.5rem",
                    backgroundColor: "var(--background3)",
                    width: "100%",
                    marginTop: "5%",
                  }}
                >
                  PLACE A BID{" "}
                </Button>
              ) : auctionEnded ? (
                null
              ) : null}
            </div>
            <p
              style={{
                color: "var(--background2)",
                marginLeft: "5%",
                marginTop: "5%",
              }}
            >
              SERVICE FEE
              <span style={{ color: "white" }}>1.5% </span>
              2.563 MATIC $4,540.62
            </p>
          </div>
        </div>
        <div>
          <div
            style={{
              marginTop: "3%",
              borderWidth: "0.1rem",
              background: "var(--borderColor)",
              textAlign: "center",
              width: "50%",
              padding: "5%",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#D2A163"
              />
            </svg>
          </div>
          <div
            style={{
              marginTop: "20%",
              borderWidth: "0.1rem",
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              width: "50%",
              textAlign: "center",
              padding: "5%",
            }}
            onClick={shareLink}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99858 10.0396C9.02798 10.5911 8.60474 11.062 8.05324 11.0914C7.30055 11.1315 6.7044 11.1806 6.23854 11.2297C5.61292 11.2957 5.23278 11.68 5.16959 12.2328C5.07886 13.0264 5 14.2275 5 15.9997C5 17.772 5.07886 18.973 5.16959 19.7666C5.23289 20.3204 5.61207 20.7036 6.23675 20.7695C7.33078 20.885 9.13925 20.9997 12 20.9997C14.8608 20.9997 16.6692 20.885 17.7632 20.7695C18.3879 20.7036 18.7671 20.3204 18.8304 19.7666C18.9211 18.973 19 17.7719 19 15.9997C19 14.2275 18.9211 13.0264 18.8304 12.2328C18.7672 11.68 18.3871 11.2957 17.7615 11.2297C17.2956 11.1806 16.6995 11.1315 15.9468 11.0914C15.3953 11.062 14.972 10.5911 15.0014 10.0396C15.0308 9.48806 15.5017 9.06482 16.0532 9.09422C16.8361 9.13595 17.4669 9.18757 17.9712 9.24075C19.4556 9.3973 20.6397 10.4504 20.8175 12.0056C20.9188 12.892 21 14.1712 21 15.9997C21 17.8282 20.9188 19.1074 20.8175 19.9938C20.6398 21.5481 19.4585 22.6017 17.9732 22.7585C16.7919 22.8831 14.9108 22.9997 12 22.9997C9.08922 22.9997 7.20806 22.8831 6.02684 22.7585C4.54151 22.6017 3.36021 21.5481 3.18253 19.9938C3.0812 19.1074 3 17.8282 3 15.9997C3 14.1712 3.0812 12.892 3.18253 12.0056C3.36031 10.4504 4.54436 9.3973 6.02877 9.24075C6.53306 9.18757 7.16393 9.13595 7.94676 9.09422C8.49827 9.06482 8.96918 9.48806 8.99858 10.0396Z"
                fill="#D2A163"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.20711 6.20711C8.81658 6.59763 8.18342 6.59763 7.79289 6.20711C7.40237 5.81658 7.40237 5.18342 7.79289 4.79289L11.2929 1.29289C11.6834 0.902369 12.3166 0.902369 12.7071 1.29289L16.2071 4.79289C16.5976 5.18342 16.5976 5.81658 16.2071 6.20711C15.8166 6.59763 15.1834 6.59763 14.7929 6.20711L13 4.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V4.41421L9.20711 6.20711Z"
                fill="#D2A163"
              />
            </svg>
          </div>
          <div
            style={{
              marginTop: "20%",
              borderWidth: "0.1rem",
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              width: "50%",
              textAlign: "center",
              padding: "5%",
            }}
            
            onClick={()=>handleFavourite(id)}
          >
            
            {favouriteItem ? <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.80957C10.8321 3.6888 9.24649 3 7.5 3C3.91015 3 1 5.91015 1 9.5C1 15.8683 7.97034 19.385 10.8138 20.5547C11.5796 20.8697 12.4204 20.8697 13.1862 20.5547C16.0297 19.385 23 15.8682 23 9.5C23 5.91015 20.0899 3 16.5 3C14.7535 3 13.1679 3.6888 12 4.80957Z"
                fill="#A17545"
              />
            </svg>:<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#CF9658" 
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 21.35l-1.45-1.32C5.4 16.36 2 13.25 2 9.5 2 7.42 3.29 5.53 5.07 4.74 6.86 3.96 9 4.5 12 6 15 4.5 17.14 3.96 18.93 4.74 20.71 5.53 22 7.42 22 9.5c0 3.75-3.4 6.86-8.55 10.54L12 21.35z" />
</svg>}

          </div>
          <div
            style={{
              marginTop: "20%",
              borderWidth: "0.1rem",
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              width: "50%",
              textAlign: "center",
              padding: "5%",
            }}
          >
            <Popup
              trigger={
                <svg
                  style={{ cursor: "pointer" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_133_2884)">
                    <path
                      d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                      fill="#D2A163"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_133_2884">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              position="bottom top"
              onClose={handleClosePopup}
              ref={popupRef}
             
            >
              <div
                style={{
                  background: "var(--background3)",
                  padding: "6%",
                  width: "230px",
                }}
              >
                <div style={{ display: "flex", marginTop: "10%" }}>
                  <svg
                    style={{ marginRight: "5%" }}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99935 16.668C13.6812 16.668 16.666 13.6832 16.666 10.0013C16.666 6.3194 13.6812 3.33464 9.99935 3.33464C6.31745 3.33464 3.33268 6.3194 3.33268 10.0013C3.33268 13.6832 6.31745 16.668 9.99935 16.668ZM9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346Z"
                      fill="#D2A163"
                    />
                    <path
                      d="M9.16602 5.83431C9.16602 5.37407 9.53911 5.00098 9.99935 5.00098C10.4596 5.00098 10.8327 5.37407 10.8327 5.83431C12.2134 5.83431 13.3327 6.9536 13.3327 8.33431C13.3327 8.79455 12.9596 9.16764 12.4993 9.16764C12.0391 9.16764 11.666 8.79455 11.666 8.33431C11.666 7.87407 11.2929 7.50098 10.8327 7.50098H8.9522C8.61005 7.50098 8.33268 7.77834 8.33268 8.12049C8.33268 8.38715 8.50332 8.62389 8.75629 8.70821L11.7695 9.7126C12.703 10.0238 13.3327 10.8974 13.3327 11.8815C13.3327 13.1441 12.3091 14.1676 11.0465 14.1676H10.8327C10.8327 14.6279 10.4596 15.001 9.99935 15.001C9.53911 15.001 9.16602 14.6279 9.16602 14.1676C7.7853 14.1676 6.66602 13.0484 6.66602 11.6676C6.66602 11.2074 7.03911 10.8343 7.49935 10.8343C7.95959 10.8343 8.33268 11.2074 8.33268 11.6676C8.33268 12.1279 8.70578 12.501 9.16602 12.501H11.0465C11.3886 12.501 11.666 12.2236 11.666 11.8815C11.666 11.6148 11.4954 11.3781 11.2424 11.2937L8.22924 10.2894C7.2957 9.97817 6.66602 9.10453 6.66602 8.12049C6.66602 6.85787 7.68957 5.83431 8.9522 5.83431H9.16602Z"
                      fill="#D2A163"
                    />
                  </svg>

                  <p style={{ color: "var(--background2)" }} onClick={handleClosePopup} > Change price</p>
                </div>
                <hr style={{ color: "white", margin: "0%" }} />
                {!minimumBid && (
                  <div style={{ display: "flex", marginTop: "6%" }}>
                    <svg
                      style={{ marginRight: "5%" }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99935 3.33464C8.37249 3.33464 6.87282 3.46881 5.6691 3.62778C4.58579 3.77086 3.7689 4.58774 3.62583 5.67106C3.46685 6.87477 3.33268 8.37444 3.33268 10.0013C3.33268 11.6282 3.46685 13.1278 3.62583 14.3315C3.7689 15.4149 4.58579 16.2317 5.6691 16.3748C6.87282 16.5338 8.37249 16.668 9.99935 16.668C11.6262 16.668 13.1259 16.5338 14.3296 16.3748C15.4129 16.2317 16.2298 15.4149 16.3729 14.3315C16.5318 13.1278 16.666 11.6282 16.666 10.0013C16.666 8.37444 16.5318 6.87477 16.3729 5.67106C16.2298 4.58774 15.4129 3.77086 14.3296 3.62778C13.1259 3.46881 11.6262 3.33464 9.99935 3.33464ZM5.45088 1.97546C3.62022 2.21724 2.21529 3.62217 1.97351 5.45283C1.80729 6.71137 1.66602 8.2857 1.66602 10.0013C1.66602 11.7169 1.80729 13.2912 1.97351 14.5498C2.21529 16.3804 3.62022 17.7854 5.45088 18.0271C6.70942 18.1934 8.28374 18.3346 9.99935 18.3346C11.715 18.3346 13.2893 18.1934 14.5478 18.0271C16.3785 17.7854 17.7834 16.3804 18.0252 14.5498C18.1914 13.2912 18.3327 11.7169 18.3327 10.0013C18.3327 8.2857 18.1914 6.71137 18.0252 5.45284C17.7834 3.62217 16.3785 2.21724 14.5478 1.97546C13.2893 1.80925 11.715 1.66797 9.99935 1.66797C8.28374 1.66797 6.70942 1.80925 5.45088 1.97546Z"
                        fill="#D2A163"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.16074 6.49505C7.83531 6.82049 7.83531 7.34813 8.16074 7.67357L10.4882 10.001L8.16074 12.3284C7.83531 12.6538 7.83531 13.1815 8.16074 13.5069C8.48618 13.8323 9.01382 13.8323 9.33926 13.5069L12.2559 10.5902C12.5814 10.2648 12.5814 9.73716 12.2559 9.41172L9.33926 6.49505C9.01382 6.16962 8.48618 6.16962 8.16074 6.49505Z"
                        fill="#D2A163"
                      />
                    </svg>

                    <p
                      onClick={TransferopenModal}
                      style={{ color: "var(--background2)", cursor: "pointer" }}
                    >
                      {" "}
                      Transfer token
                    </p>
                  </div>
                )}
                <hr style={{ color: "white", margin: "0%" }} />
                {
                  previousBidAccount &&
                  previousBidAccount.address == account && (
                    <div style={{ display: "flex", marginTop: "6%" }}>
                      <svg
                        style={{ marginRight: "5%" }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99935 16.668C13.6812 16.668 16.666 13.6832 16.666 10.0013C16.666 6.3194 13.6812 3.33464 9.99935 3.33464C6.31745 3.33464 3.33268 6.3194 3.33268 10.0013C3.33268 13.6832 6.31745 16.668 9.99935 16.668ZM9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346Z"
                          fill="#D2A163"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.91009 6.91205C7.23553 6.58661 7.76317 6.58661 8.0886 6.91205L9.99935 8.82279L11.9101 6.91205C12.2355 6.58661 12.7632 6.58661 13.0886 6.91205C13.414 7.23748 13.414 7.76512 13.0886 8.09056L11.1779 10.0013L13.0886 11.912C13.414 12.2375 13.414 12.7651 13.0886 13.0906C12.7632 13.416 12.2355 13.416 11.9101 13.0906L9.99935 11.1798L8.0886 13.0906C7.76317 13.416 7.23553 13.416 6.91009 13.0906C6.58466 12.7651 6.58466 12.2375 6.91009 11.912L8.82084 10.0013L6.91009 8.09056C6.58466 7.76512 6.58466 7.23748 6.91009 6.91205Z"
                          fill="#D2A163"
                        />
                      </svg>

                      <p
                        style={{
                          color: "var(--background2)",
                          cursor: "pointer",
                        }}
                        onClick={RemoveSaleopenModal}
                      >
                        {" "}
                        Remove from sale
                      </p>
                    </div>
                  )}
                <hr style={{ color: "white", margin: "0%" }} />
                {!minimumBid && (
                  <div style={{ display: "flex", marginTop: "6%" }}>
                    <svg
                      style={{ marginRight: "5%" }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346ZM8.0886 6.91205C7.76317 6.58661 7.23553 6.58661 6.91009 6.91205C6.58466 7.23748 6.58466 7.76512 6.91009 8.09056L8.82084 10.0013L6.91009 11.912C6.58466 12.2375 6.58466 12.7651 6.91009 13.0906C7.23553 13.416 7.76317 13.416 8.0886 13.0906L9.99935 11.1798L11.9101 13.0906C12.2355 13.416 12.7632 13.416 13.0886 13.0906C13.414 12.7651 13.414 12.2375 13.0886 11.912L11.1779 10.0013L13.0886 8.09056C13.414 7.76512 13.414 7.23748 13.0886 6.91205C12.7632 6.58661 12.2355 6.58661 11.9101 6.91205L9.99935 8.82279L8.0886 6.91205Z"
                        fill="#A17545"
                      />
                    </svg>

                    <p
                      onClick={BurnTokenopenModal}
                      style={{ color: "var(--background2)", cursor: "pointer" }}
                    >
                      {" "}
                      Burn token
                    </p>
                  </div>
                )}
                <hr style={{ color: "white", margin: "0%" }} />

                <div style={{ display: "flex", marginTop: "6%" }}>
                  <svg
                    style={{ marginRight: "5%" }}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99935 16.668C13.6812 16.668 16.666 13.6832 16.666 10.0013C16.666 6.3194 13.6812 3.33464 9.99935 3.33464C6.31745 3.33464 3.33268 6.3194 3.33268 10.0013C3.33268 13.6832 6.31745 16.668 9.99935 16.668ZM9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346Z"
                      fill="#D2A163"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99935 5.83398C9.53911 5.83398 9.16602 6.20708 9.16602 6.66732C9.16602 7.12756 9.53911 7.50065 9.99935 7.50065C10.4596 7.50065 10.8327 7.12756 10.8327 6.66732C10.8327 6.20708 10.4596 5.83398 9.99935 5.83398ZM9.99935 9.16732C9.53911 9.16732 9.16602 9.54041 9.16602 10.0007V13.334C9.16602 13.7942 9.53911 14.1673 9.99935 14.1673C10.4596 14.1673 10.8327 13.7942 10.8327 13.334V10.0007C10.8327 9.54041 10.4596 9.16732 9.99935 9.16732Z"
                      fill="#D2A163"
                    />
                  </svg>

                  <p
                    onClick={()=>{
                      handleClosePopup();
                      ReportopenModal();
                      }}
                    style={{ color: "var(--background2)", cursor: "pointer" }}
                  >
                    {" "}
                    Report
                  </p>
                </div>
              </div>
            </Popup>

            {/* transfer modal */}
            <Modal
              isOpen={TransferTokenmodalIsOpen}
              onRequestClose={TransfercloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                  Transfer token
                </h4>
                <div style={{ cursor: "pointer" }} onClick={TransfercloseModal}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#FCFCFD"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#46392E"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              <p style={{ color: "var(--background2)", marginTop: "5%" }}>
                You can transfer tokens from your address to another
              </p>
              <h4 style={{ color: "white" }}>Receiver address</h4>
              <div style={{ height: "1%" }}>
                <input
                  placeholder="Paste address"
                  onChange={(e) => settoAddressTransfer(e.target.value)}
                  style={{
                    background: "var(--background)",
                    border: "none",
                    outline: "none",
                    color: "var(--background2)",
                  }}
                />
                <hr style={{ color: "white" }}></hr>
              </div>
              {safeTransferLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReactLoading
                    type={"spin"}
                    color={"var(--background2)"}
                    height={"20%"}
                    width={"15%"}
                  />
                </div>
              ) : (
                <p
                  onClick={() => !transferDone && transferHandler()}
                  style={{
                    color: "white",
                    marginTop: "5%",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {transferDone ? (
                    <span>DONE</span>
                  ) : (
                    <span>CONTINUE</span>
                  )}{" "}
                </p>
              )}
              {!safeTransferLoading && !transferDone && (
                <Button
                  onClick={TransfercloseModal}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--borderColor)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  CANCEL
                </Button>
              )}
            </Modal>
            {/* remove sale modal */}
            <Modal
              isOpen={RemoveSalemodalIsOpen}
              onRequestClose={RemoveSalecloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                  Remove from sale
                </h4>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={RemoveSalecloseModal}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#FCFCFD"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#46392E"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              <p style={{ color: "var(--background2)", marginTop: "5%" }}>
                Do you really want to remove your Bottle from sale? You can put
                it on sale anytime
              </p>
              {cancelReservationLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReactLoading
                    type={"spin"}
                    color={"var(--background2)"}
                    height={"20%"}
                    width={"15%"}
                  />
                </div>
              ) : (
                <p
                  onClick={() => !cancelDone && cancelReserveAuction()}
                  style={{
                    color: "white",
                    marginTop: "5%",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {cancelDone ? <span>Done</span> : <span>REMOVE NOW</span>}
                </p>
              )}
              {!cancelReservationLoading && !cancelDone && (
                <Button
                  onClick={RemoveSalecloseModal}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--borderColor)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  CANCEL
                </Button>
              )}
            </Modal>

            {/* burn Token modal */}
            <Modal
              isOpen={BurnTokenmodalIsOpen}
              onRequestClose={BurnTokenCloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>
                  Burn token
                </h4>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={BurnTokenCloseModal}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#FCFCFD"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#46392E"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              <p style={{ color: "var(--background2)", marginTop: "5%" }}>
                Are you sure to burn this token? This action cannot be undone.
                Token will be transfered to zero address
              </p>
              {burnLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReactLoading
                    type={"spin"}
                    color={"var(--background2)"}
                    height={"20%"}
                    width={"15%"}
                  />
                </div>
              ) : (
                <Button
                  onClick={() => {
                    burn();
                  }}
                  disabled={burnDone}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background2)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--borderColor)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  {burnDone ? <span> DONE</span> : <span>CONTINUE </span>}
                </Button>
              )}
              {!burnDone && !burnLoading && (
                <Button
                  onClick={BurnTokenCloseModal}
                  style={{
                    color: "white",
                    backgroundColor: "var(--background)",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginRight: "1rem",
                    borderColor: "var(--borderColor)",
                    borderRadius: "0%",
                    width: "100%",
                    borderWidth: "0.1rem",
                  }}
                >
                  CANCEL
                </Button>
              )}
            </Modal>

            {/*Report  modal */}
            <Modal
              isOpen={ReportmodalIsOpen}
              onRequestClose={ReportCloseModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "Freight Big Pro;", color: "white" }}>Report</h4>
                <div style={{ cursor: "pointer" }} onClick={ReportCloseModal}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="#FCFCFD"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#46392E"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
              <p style={{ color: "var(--background2)", marginTop: "5%" }}>
                Describe why you think this Bottle should be removed from
                marketplace
              </p>
              <div className="form-group">
                <label
                  style={{
                    color: "white",
                    marginTop: "3%",
                    marginBottom: "1%",
                    fontSize: "0.8rem",
                  }}
                  htmlFor="exampleInputtext1"
                >
                  MESSAGE{" "}
                </label>{" "}
                <textarea
                  placeholder="Tell us the details"
                  style={{
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    backgroundColor: "var(--background3)",
                    resize:"none"
                  }}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  defaultValue={""}
                />
              </div>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--background)",
                  borderRadius: "0%",
                  width: "100%",
                  borderWidth: "0.1rem",
                }}
              >
                SEND NOW
              </Button>{" "}
              <Button
                onClick={ReportCloseModal}
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  borderColor: "var(--borderColor)",
                  borderRadius: "0%",
                  width: "100%",
                  borderWidth: "0.1rem",
                }}
              >
                CANCEL
              </Button>{" "}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
