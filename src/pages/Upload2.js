import { Button, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Upload2.css";
import axios from "axios";
import { API_URL } from "../constants/userConstants";
import Modal from "react-modal";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import Web3 from "web3";
import { MARKET_ABI, NFT_ABI, COLLECTION_ABI } from "../NFT_ABI";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
const customStyles2 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "fit-content",
    marginRight: "-50%",
    paddingBottom: "10%",
    padding: "10%",
    background: "#211715",
    width: "40%",
    padding: "2%",
    transform: "translate(-50%, -50%)",
  },
};

const collectionmodalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    paddingBottom: "10%",
    height: "80vh",
    padding: "10%",
    background: "#211715",
    width: "50%",
    padding: "2%",
    transform: "translate(-50%, -50%)",
  },
};

const projectID = "2Q8XrdFX4Br4uJ16AY0icdgpDmM";
const projectSecret = "7579e7eb7496e17dd58d629729e718ab";
const auth =
  "Basic " + Buffer.from(projectID + ":" + projectSecret).toString("base64");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const Upload2 = () => {
  const { user } = useSelector((state) => state);

  const [account, setAccount] = useState();
  const [approvemessage, setapprove] = useState();
  const [token, setTokenId] = useState(false);
  let [drafts, setdrafts] = useState();
  let [collectionIpfs, setCollectionIpfs] = useState();
  let [Collections, setCollection] = useState();
  let [CollectionsList, setCollectionList] = useState();
  const [putonSale, setputonSale] = useState(false);
  let [load, setLoading] = useState();
  let [authorize, setauthorize] = useState();

  const  [state, setState] = useState({
    distillery: '',
    age: '',
    cask_type: '',
    bottling_date: '',
    details: '',
    additional_details: '',
  })
  const [dropDownData, setDropDownData] = useState({})
  useEffect(()=>{
    console.log(account)
    axios.get(`${API_URL}/getuser/${account}`).then(({data})=>{
      setauthorize(data?.whiteList)
    })
  },[account])
  let [additional_details, setadditional_details] = useState();
  let [hashmetaData, sethashmetaData] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [AuctionmodalIsOpen, setAuctionModal] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [startdate, setStartDate] = useState(new Date());
  const [bidprice, setBidprice] = useState();
  const [bidValue, setbidValue] = useState(null);
  const [minted, setminted] = useState(null);
  const [auctionloading, setAuctionLoading] = useState(null);
  const [auctionMintDone, setAuctionMintdone] = useState(null);
  const [directSalemintDone, setdirectSalemintDone] = useState(null);
  const [directSale, setDirectSale] = useState(false);
  const [putonSalemodal, setputonSalemodal] = React.useState(false);
  const [purchaseStep, SetpurchaseStep] = useState("step1");
  const [purchaseStep2, SetpurchaseStep2] = useState("step1");
  const [collectionId, setCollectionId] = useState(null);
  const [collectionDetails, setCollectionDetails] = useState(null);
  const [putonSalePrice, setPutonSaleprice] = useState(null);
  const [createsign, setcreatSignDone] = useState(null);
  const [collectionModal, setCollectionModal] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [attributesArray, setAttributesarray] = useState(null);

  function closeCollectionModal() {
    setCollectionModal(false);
  }

  const handleChange = (e) => {
      if (e.target.options) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setState({ ...state, [e.target.name]: value[0] });
      } else {
        setState({ ...state, [e.target.name]: e.target.value });
      } 
  }
  const getValuationData = async () => {
      const { data } = await axios.get(`${API_URL}/get-valuation-data`);
      if(data.message === 'Success'){
        const { finalDataObj } = data 
        setDropDownData(finalDataObj)
      } else {
        let finalDataObj = {}
        setDropDownData(finalDataObj)
      }
  }

  let getDatas = () => {
    let data = [];
    let data2 = [];

    for (let i = 0; i < 30; i++) {
      collectionData && collectionData[i] && data.push(collectionData[i]);
    }
    //  setAttributesarray(data)
    data.length &&
      data.map((item) => {
        for (let i = 0; i < 30; i++) {
          item[`attribute${i}`] && data2.push(item[`attribute${i}`]);
        }
      });
    setAttributesarray(data2);
  };
  useEffect(() => {
    getDatas();
    getValuationData()
  }, [collectionModal, collectionId, collectionData]);
  function openCollectionModal(hash) {
    setCollectionModal(true);

    axios
      .get(`https://ipfs.io/ipfs/${hash}/metadata.json`)
      .then((response) => {
        setCollectionData(response?.data);
      })
      .catch((error) => {
        console.log("Error on getIPFSDataFromHash>", error);
        return null;
      });
    getDatas();
  }
  const [enddate, setEndDate] = useState(moment().add(2, "day").toDate());
  const [startDateTimestamp, setstartDateTimestamp] = React.useState(null);
  const [current, setCurrent] = useState(((new Date()).getTime() / 1000));

  let [endDateTimestamp, setendDateTimestamp] = useState();
    function openPutonSalemodal() {
    closeModal();
    setputonSalemodal(true);
  }

  function closeputonSalemodal() {
    setputonSalemodal(false);
    SetpurchaseStep2("step1");
  }
  useEffect(() => {
    setAccount(user && user.user && user.user.address);
  }, [user]);

  

  const handleputonSale = () => {
    setputonSale((current) => !current);
  };
  const handlerDirectSale = () => {
    setDirectSale((current) => !current);
  };

  useEffect(() => {
    if (putonSale == true) {
      setDirectSale(false);
    }
    if (directSale == true) {
      setputonSale(false);
    }
  }, [putonSale, directSale]);
  useEffect(()=>{
    collectionIpfs && collectionIpfs.ipfsHash&&    axios
    .get(`https://ipfs.io/ipfs/${collectionIpfs.ipfsHash}/metadata.json`)
    .then((response) => {
      setCollectionDetails(response?.data);
    })
    .catch((error) => {
      console.log("Error on getIPFSDataFromHash>", error);
      return null;
    });
  },[collectionIpfs])
  console.log(collectionDetails)

  let clearAll = async () => {
    setState({
      ...state,
      distillery: '',
      age: '',
      cask_type: '',
      bottling_date: '',
      details: '',
      additional_details: '',
    })
    setimage(null)
    setFiles([]);
    setdraftSelected();
  };
let collectionHandler = (()=>{
  if(authorize==false){
   return toast.error("your not authorized to create collection")
  }
  if(authorize==true){
    return navigate("/create-collection")

  }
  
})
console.log(authorize)
  // let saveCollection = async () => {
  //   // formData.append("photo", files[0]);
  //   let data = {
  //     Collections: Collections,
  //   };
  //   const res = await axios.post(`${API_URL}/create-collection`, data, {
  //     withCredentials: true,
  //   });
  //   if (res && res.data && res.data.message == "collection created") {
  //     toast.success("collection created");
  //     closeModal2();
  //   }
  // };
  // let getCollections = async () => {
  //   const res = await axios.get(`${API_URL}/get-collection`, {
  //     withCredentials: true,
  //   });
  //   if (res.data && res.data.collections) {
  //     setCollectionList(res.data.collections);
  //   }
  // };

  let validater = () => {
    if (
      !state.distillery &&
      !state.age &&
      !state.cask_type &&
      !state.bottling_date &&
      !state.additional_details &&
      !state.details
    ) {
      return toast.error("All fields required");
    }
    if (!state.distillery) {
      return toast.error("Please enter distillery");
    }
    if (!state.age) {
      return toast.error("Please enter age");
    }
    if (!state.cask_type) {
      return toast.error("Please enter cask type");
    }
    if (!state.bottling_date) {
      return toast.error("Please enter bottling date");
    }
    if (!state.details) {
      return toast.error("Please enter description");
    }
    if (!state.additional_details) {
      return toast.error("Please enter additional details");
    }
    if (!files[0]) {
      return toast.error("Please upload image");
    }
    if (!collectionId) {
      return toast.error("Please select collection");
    }
    openModal();
  };
console.log(collectionDetails&& collectionDetails.award)
  let saveDraft = async () => {
     var formData = new FormData();
    formData.append("distillery", state.distillery);
    formData.append("age", state.age);
    formData.append("cask_type", state.cask_type);
    formData.append("bottling_date", state.bottling_date);
    formData.append("details", state.details);
    formData.append("additional_details", state.additional_details);
    // console.log("auto save")
    // var formData = new FormData();
    // // formData.append("photo", files[0]);
    // formData.append("distillery", distillery);
    // formData.append("age", age);
    // formData.append("cask_type", cask_type);
    // formData.append("bottling_date", bottling_date);
    // formData.append("details", details);
    // formData.append("additional_details", additional_details);
    // formData.append("photo", files[0]);
    // formData.append("type",files[0].type !=="video/mp4"?"image":"video");

    const headers = { "Content-Type": "multipart/form-data" };
    const res = await axios.put(
      `${API_URL}/save-draft/${user.user._id}`,
      formData,
      headers
    );
    if (res && res.data && res.data.message == "valid token") {
      toast.success("draft saved");
    }
   };
  
  let [image, setimage] = useState();
  console.log(image)
  let [isdraft, setisDraft] = useState(false);
  let getDraft = async () => {
    const res = await axios.get(`${API_URL}/get-draft/${user.user._id}`, {
      withCredentials: true,
    });
    if (res.data && res.data.draft) {
      setdrafts(res.data.draft);
      console.log(res.data.draft)
    }
  };
  let [draftSelected, setdraftSelected] = useState();
  let draftHandler = (id) => {
    setFiles([]);
    drafts.map((item) => {
      if (item._id === id) {
        setdraftSelected(item);
      }
    });
    draftDeleteHandler(id)

    setisDraft(false);
  };
  console.log(state.bottling_date)

  useEffect(() => {
    if (draftSelected) {
      setState({...state, distillery:draftSelected.distillery && draftSelected.distillery !== "undefined" && draftSelected.distillery !== "null" ? draftSelected.distillery : "",
      age: draftSelected.age && draftSelected.age !== "undefined" && draftSelected.age !== "null" ? draftSelected.age : "",
      bottling_date: draftSelected.bottling_date && draftSelected.bottling_date !== "undefined" && draftSelected.bottling_date !== "null" ? draftSelected.bottling_date : "",
      details: draftSelected.details && draftSelected.details !== "undefined" && draftSelected.details !== "null" ? draftSelected.details : "",
      cask_type: draftSelected.cask_type && draftSelected.cask_type !== "undefined" && draftSelected.cask_type !== "null" ? draftSelected.cask_type : "",
      additional_details: draftSelected.additional_details && draftSelected.additional_details !== "undefined" && draftSelected.additional_details !== "null" ? draftSelected.additional_details : "",
    })      
    console.log(draftSelected.bottling_date && draftSelected.bottling_date !== "undefined" && draftSelected.bottling_date)
    // setFiles([JSON.parse(draftSelected.fileDatas)])
      // setimage(
      //   draftSelected.imgpath &&
      //     draftSelected.imgpath !== "undefined" &&
      //     draftSelected.imgpath !== "null"
      //     ? draftSelected.imgpath
      //     : ""
      // );
    }
  }, [draftSelected]);
  useEffect(() => {
    getDraft();
  }, []);

  useDropzone({
    maxFiles: 1,
  });
  
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
console.log(files)
  function openModal() {
    setIsOpen(true);
  }
  function openauctionmodal() {
    if (!auctionMintDone) {
      closeModal();
      setAuctionModal(true);
    }
  }
  function closeAuctionmodal() {
    setAuctionModal(false);
  }
  function openModal2() {
    setIsOpen2(true);
  }

  // function afterOpenModal() {
  //   subtitle.style.color = '#f00';
  // }
  let navigate = useNavigate();
  useEffect(() => {
    if (redirect == true) {
      window.location.href = "/profile";
    }
  }, [redirect]);
  function closeModal() {
    setIsOpen(false);
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  let expectedBlockTime = 5000; //5 seconds

  function closeModal2() {
    setIsOpen2(false);
  }
  async function metaDataUpload(metadata) {
    let ipfsResponse = [];

    // let metadata = fs.readFileSync(`./metadata.json`);

    // const contentBuffer_1 = Buffer.from(JSON.parse(JSON.stringify(metadata)));

    ipfs
      .add(
        { path: "/metadata.json", content: metadata },
        { wrapWithDirectory: true, pin: true }
      )
      .then((data) => {
        
        sethashmetaData(data.cid.toString());
    
      });

    // ipfsResponse.push(result);
    // console.log(result)

    // if (ipfsResponse) {
    //   console.log(ipfsResponse)
    //     sethashmetaData(ipfsResponse[0].cid.toString())
    // }
  }
  useEffect(() => {
    if (hashmetaData) {
      if (putonSale == false && directSale == false) {
        mint();
      } else {
        mintAndApproveMarket();
      }
    }
  }, [hashmetaData]);
  async function imageUpload(imageMetadata) {
    setLoading(true);
    // let imageMetadata = fs.readFileSync(`./bottle.jfif`);
    const result = await ipfs.add(
      { path:files[0].type !=="video/mp4"? "/nft.jpg":"nft.mp4", content: imageMetadata },
      { wrapWithDirectory: true, pin: true }
    );

    return result.cid.toString();
  }
  const mintAndApproveMarket = async (
    nftContractAddress,
    ipfsHash,
    royalty,
    marketContract
  ) => {
    console.log("mint and approve");
    // Test values
    try {
      nftContractAddress = collectionId;
      ipfsHash = hashmetaData;
      royalty = 0;
      marketContract = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
      // Contract instance
      const contractInstance = new web3.eth.Contract(
        NFT_ABI,
        nftContractAddress
      );
      // Find gas limit
      let limit = await contractInstance.methods
        .mintAndApproveMarket(ipfsHash, royalty, marketContract)
        .estimateGas({ from: account });
      // Call a function of the contract:
      return await contractInstance.methods
        .mintAndApproveMarket(ipfsHash, royalty, marketContract)
        .send(
          {
            from: account,
            value: 0,
            gasLimit: limit + 5000,
          },
          async (err, transactionHash) => {
            setapprove("And Waiting for Approve");
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
                web3.eth
                  .getTransactionReceipt(transactionHash)
                  .then(function (data) {
                    let logs = data.logs;
                    console.log(web3.utils.hexToNumber(logs[0].topics[3]));
                    setTokenId(web3.utils.hexToNumber(logs[0].topics[3]));

                    data.status == true && setLoading(false);
                    data.status == true && toast.success("minted successfully");
                    data.status == true && setapprove(null);
                    // sethashmetaData();
                    setminted(true);
                  });
                await sleep(expectedBlockTime);
              }
              console.log(
                "FINAL transaction receipt for approve: ",
                transactionReceipt
              );
              async function imageUpload2(imageMetadata) {
                // let imageMetadata = fs.readFileSync(`./bottle.jfif`);
                const result = await ipfs.add(
                  { path:files[0].type !=="video/mp4"? "/nft.jpg":"nft.mp4", content: imageMetadata },
                  { wrapWithDirectory: true, pin: true }
                );
            
                return result.cid.toString();
              }
              let imageHash = await imageUpload2(files[0]);
              let body = {
                user : user?.user?._id,
                notifyTo:user?.user?._id,
                Distillery:state.distillery,
                img:files && files[0].type !=="video/mp4"?`ipfs.io/ipfs/${imageHash}/nft.jpg`:`ipfs.io/ipfs/${imageHash}/nft.mp4`,
                notificationType:'nft'
              }
              axios.post(`${API_URL}/notification`, body)
              .then(function (response) {
                console.log(response);

                // window.location.href = window.location.pathname
              })
              .catch(function (error) {
                console.log(error);
              });
              // transactionReceipt.status == true && setLoading(false);
              // transactionReceipt.status == true &&
              //   toast.success("minted successfully");
              // transactionReceipt.status == true && setapprove(null);
              // sethashmetaData();
              // setminted(true);
            } else {
              if (
                err.message ==
                "MetaMask Tx Signature: User denied transaction signature."
              ) {
                setLoading(false);
                toast.error(" User denied transaction signature");
                sethashmetaData();
              }
            }
          }
        );
    } catch (err) {
      console.log(err);
    }
  };
   const createReserveAuction = async () => {
    closeAuctionmodal();
    openModal();

    setAuctionLoading(true);
    // // Test Values
    let tokenId = token;
    let nftContract = collectionId;
    let reservePrice = JSON.stringify(bidValue);
    let startDate = startDateTimestamp;
    let endDate = Math.floor(endDateTimestamp)
    let marketContractAddress = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
    let tokenAddress = "0x0000000000000000000000000000000000000000";
    // Instance of the Contract
    const contractInstance = new web3.eth.Contract(
      MARKET_ABI,
      marketContractAddress
    );
    // Find gas limit
    let limit =
      tokenId &&
      reservePrice &&
      startDate &&
      endDate &&
      (await contractInstance.methods
        .createReserveAuction(
          nftContract,
          tokenId,
          reservePrice,
          startDate,
          endDate,
          tokenAddress
        )
        .estimateGas({ from: account }));
    // Call a function of the contract:
    let data = await contractInstance.methods
      .createReserveAuction(
        nftContract,
        tokenId,
        reservePrice,
        startDate,
        endDate,
        tokenAddress
      )
      .send(
        {
          from: account,
          value: 0,
          gasLimit: limit + 5000,
        },
        (err, res) => {
          if (err) {
            console.log(err.message);
            if (
              err.message ==
              "MetaMask Tx Signature: User denied transaction signature."
            ) {
              setAuctionLoading(false);
              return toast.error(" User denied transaction signature");
            }
          } else {
            console.log(res);
          }
        }
      );
    if (data.transactionHash) {
      toast.success("Auction placed successfully");
    
      console.log(data.events.ReserveAuctionCreated.returnValues.auctionId)   
      var formData = new FormData();
      // formData.append("photo", files[0]);
      formData.append("distillery", state.distillery);
      formData.append("age", state.age);
      formData.append("cask_type", state.cask_type);
      formData.append("bottling_date", state.bottling_date);
      formData.append("details", state.details);
      formData.append("additional_details", state.additional_details);
      formData.append("photo", files[0]);
      formData.append("user", user && user.user && user.user._id);
      formData.append("token", token);
      formData.append("collectionId", collectionId);
      formData.append("ipfs", hashmetaData);
      formData.append("auctionid", data.events.ReserveAuctionCreated.returnValues.auctionId);
      formData.append("type",files[0].type !=="video/mp4"?"image":"video" );
      formData.append("award",collectionDetails&& collectionDetails.award);
      formData.append("bottleNumber",collectionDetails&& collectionDetails.bottleNumber);
      formData.append("collection_description",collectionDetails&& collectionDetails.collection_description);
      formData.append("collection_title",collectionDetails&& collectionDetails.collection_title);
      formData.append("collection_url",collectionDetails&& collectionDetails.collection_url);
      formData.append("exclusiveEdition",collectionDetails&& collectionDetails.exclusiveEdition);
      formData.append("limitedEdition",collectionDetails&& collectionDetails.limitedEdition);
      formData.append("specialEdition",collectionDetails&& collectionDetails.specialEdition);
      formData.append("region",collectionDetails&& collectionDetails.region);
      const headers = { "Content-Type": "multipart/form-data" };
      const res = await axios.put(
        `${API_URL}/save-nft`,
        formData,
        headers
      )
      if (res && res.data && res.data.message == "valid token") {
        toast.success("nft  saved");
        sethashmetaData()
      }
      let body = {
        user : user?.user?._id,
        bidprice:bidValue/10**18,
        token:token,
        collectionId:collectionId,
        account:account,
        auctionId:data?.events?.ReserveAuctionCreated?.returnValues?.auctionId,
        endTime:endDate,
        owner:user?.user?._id
      }

        axios.post(`${API_URL}/bid`,body).then((data)=>{
          setAuctionMintdone(true);
          setAuctionLoading(false);
        console.log(data)
       }).catch((err)=>{
        console.log(err)
       })

    }
  };
  const step3Handler = () => {
    if (!putonSalePrice) {
      return toast.error("Please enter price");
    }
    SetpurchaseStep2("step3");
  };

  const createSignOrder = async (nftContract, tokenId, amount, deadline) => {
    nftContract = collectionId;
    tokenId = token; // replace
    amount = JSON.stringify(putonSalePrice * 10 ** 18); // replace
    deadline = 1717314202; // replace

    const typeHash = await web3.utils.keccak256(
      "BuyFromPrivateSale(address nftContract,uint256 tokenId,address buyer,uint256 price,uint256 deadline)"
    );

    // for abi.encode
    const firstBytes = web3.utils.keccak256(
      web3.eth.abi.encodeParameters(
        ["bytes32", "address", "uint256", "uint256", "uint256"],
        [typeHash, nftContract, tokenId, amount, deadline]
      )
    );

    // for abi.encodePacked
    const finalBytes = await web3.utils.soliditySha3(
      { value: "\x19\x01", type: "string" },
      { value: firstBytes, type: "bytes32" }
    );

    const digest = await web3.utils.soliditySha3(
      { value: "\x19Ethereum Signed Message:\n32", type: "string" },
      { value: finalBytes, type: "bytes32" }
    );

    let signature = await web3.eth.personal.sign(digest, account);
    console.log("signature", signature);
    let body = {
      // r :r,
      // s:s,
      // v:v,
      amount: amount,
      nftContract: collectionId,
      token: token,
      signature: signature,
      userAccount:account
    };
    axios
      .post(`${API_URL}/sign-order`, body)
      .then((data) => {
         if(data?.data?.data?.amount){
          toast.success("Sign order created")
          setcreatSignDone(true);
        }
        //  window.location.href = '/profile'
      })
      .catch((err) => {
        console.log(err);
      });

    return signature;

    // check
    // signature = "0xd7ac1723dad58a0429c664425f7030b56a91bbf8434ba488119a01107d8eddac01a4a044b3eae68c828a7c88c82cabde8abd988080b3963542f1604375199a5b1b"
    // let signer = await web3.eth.personal.ecRecover(digest, signature);
    // console.log(signer);
  };
  const draftDeleteHandler = (async(id,use)=>{
    if(use=='delete'){
      axios.delete(`${API_URL}/delete-draft/${id}`)  
      .then(res => {  
        toast.success("Deleted successfuly")
        getDraft()
        })  
    }else{
      axios.delete(`${API_URL}/delete-draft/${id}`)  
      .then(res => {  
        })  
    }

  
  })
  const mint = async (
    nftContractAddress,
    ipfsHash,
    royalty,
    marketContract
  ) => {
    try {
      nftContractAddress = collectionId;
      ipfsHash = hashmetaData;
      royalty = 0;
      marketContract = "0xD6C5092e4E932d17FB41a22BB57693fE4109fFaD";
      // Contract instance
      const contractInstance = new web3.eth.Contract(
        NFT_ABI,
        nftContractAddress
      );
      // Find gas limit
      let limit = await contractInstance.methods
        .mint(ipfsHash, royalty, marketContract)
        .estimateGas({ from: account });
      // Call a function of the contract:
      return await contractInstance.methods
        .mint(ipfsHash, royalty, marketContract)
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
                await sleep(expectedBlockTime);
              }
              console.log(
                "FINAL transaction receipt for approve: ",
                transactionReceipt
              );
              transactionReceipt.status == true && setLoading(false);
              transactionReceipt.status == true &&
                toast.success("minted successfully");
              sethashmetaData();
              let imageHash = await imageUpload(files[0]);
              let body = {
                user : user?.user?._id,
                notifyTo:user?.user?._id,
                Distillery:state.distillery,
                img:files && files[0].type !=="video/mp4"?`ipfs.io/ipfs/${imageHash}/nft.jpg`:`ipfs.io/ipfs/${imageHash}/nft.mp4`,
                notificationType:'nft'
              }
              axios.post(`${API_URL}/notification`, body)
              .then(function (response) {
                console.log(response);
                setRedirect(true);

                // window.location.href = window.location.pathname
              })
              .catch(function (error) {
                console.log(error);
              });
              // setTimeout(() => {
              //   window.location.href = "/upload-2"
              // }, 2000);
            } else {
              if (
                err.message ==
                "MetaMask Tx Signature: User denied transaction signature."
              ) {
                setLoading(false);
                toast.error(" User denied transaction signature");
                sethashmetaData();
              }
            }
          }
        );
    } catch (err) {
      console.log(err);
    }
  };
  let createbottle = async () => {
    if (user.user.address) {
      let imageHash = await imageUpload(files[0]);
      if (imageHash) {
        let metadata1 = {
          Distillery: `${state.distillery}`,
          Age: `${state.age}`,
          "Cask type": `${state.cask_type}`,
          "Bottling Date": `${state,state.bottling_date}`,
          Details: `${state.details}`,
          "Additional date": `${state.additional_details}`,
          image:files && files[0].type !=="video/mp4"?`ipfs.io/ipfs/${imageHash}/nft.jpg`:`ipfs.io/ipfs/${imageHash}/nft.mp4`,
        };
        let metadata = JSON.stringify(metadata1);
        let data = await metaDataUpload(metadata);
      }
    } else {
      toast.error("login to continue");
    }
  };

  const auctionHandler = () => {
    setstartDateTimestamp(Math.floor(new Date(startdate).getTime() / 1000));
    let amount = bidprice * 10 ** 18;
    setbidValue(amount);

    if (!bidprice) {
      toast.error("Enter Bid Price");
    }
    if(bidprice==0){
      toast.error("Enter Bid Price more than 0");

    }
    if (!endDateTimestamp) {
    return  toast.error("Select Expiration time  ");
    }
  };

  useEffect(() => {
    if (
      (token !== null,
      startDateTimestamp !== null,
      endDateTimestamp !== null,
      bidValue)
    ) {
      endDateTimestamp &&  createReserveAuction();
    }
  }, [token, startDateTimestamp, endDateTimestamp, bidValue]);
  // get collections
  function getUserCollections() {
    let collectionContractAddress =
      '0x2E73fa6d643EeB770aA26be13eF0dA7C697d3561';
    let userAddress = account; //Metamask logged in Address
    const contractInstance = new web3.eth.Contract(
      COLLECTION_ABI,
      collectionContractAddress
    );
    contractInstance.methods
      .userCollections(userAddress)
      .call()
      .then((data) => {
        data && setCollectionList(data);
      });
  }
  useEffect(() => {
    if (account) {
      getUserCollections();
    }
  }, [account]);
  let createsignHandler = () => {
    if (token && collectionId && putonSalePrice) {
      createSignOrder();
    }
  };
  return (
    <>
      <div style={{ background: "var(--background)" }}>
        <div
          style={{
            background: "var(--background)",
            display: "flex",
            height: "3.3rem",
          }}
        >
          <p
            style={{
              cursor: "pointer",
              color: "var(--background2)",
              paddingTop: "1%",
              padding: "2%",
              paddingBottom: "0.1rem",
              marginBottom: "0rem",
            }}
            onClick={() => [setisDraft(false)]}
          >
            Create bottle
          </p>
          <p
            onClick={() => [setisDraft(true), getDraft()]}
            style={{
              cursor: "pointer",
              color: "var(--background2)",
              paddingTop: "1%",
              padding: "2%",
              paddingBottom: "0.1rem",
              marginBottom: "0rem",
            }}
          >
            Drafts
          </p>
        </div>
        <hr style={{ color: "white" }}></hr>
        <Modal
          isOpen={putonSalemodal}
          onRequestClose={closeputonSalemodal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {purchaseStep2 == "step1" ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "fright", color: "white" }}>
                  Put on sale
                </h4>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={closeputonSalemodal}
                >
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

              <div
                style={{
                  display: "flex",
                  fontSize: "0.9rem",
                  justifyContent: "space-between",
                  marginTop: "10%",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "1%",
                }}
              >
                <input
                type="number"
                  onChange={(e) => setPutonSaleprice(e.target.value)}
                  placeholder="Enter Price"
                  style={{
                    background: "var(--background)",
                    border: "none",
                    width:"100%",
                    outline: "none",
                    color: "var(--background2)",
                  }}
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
                <p style={{ color: "var(--background2)" }}>Service fee</p>
                <p style={{ color: "white", textAlign: "left" }}>0 MATIC</p>
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
                  {putonSalePrice} MATIC
                </p>
              </div>
              <div style={{ marginTop: "15%" }}>
                <p
                  onClick={() => step3Handler()}
                  style={{
                    color: "white",
                    marginTop: "5%",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  CONTINUE{" "}
                </p>
                <Button
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
          ) : purchaseStep2 == "step3" ? (
            <>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontFamily: "fright", color: "white" }}>
                  Follow steps
                </h4>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={closeputonSalemodal}
                >
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
                        d="M30.7071 19.7929C31.0976 20.1834 31.0976 20.8166 30.7071 21.2071L22.7071 29.2071C22.3166 29.5976 21.6834 29.5976 21.2929 29.2071L17.2929 25.2071C16.9024 24.8166 16.9024 24.1834 17.2929 23.7929C17.6834 23.4024 18.3166 23.4024 18.7071 23.7929L22 27.0858L29.2929 19.7929C29.6834 19.4024 30.3166 19.4024 30.7071 19.7929Z"
                        fill="#D2A163"
                      />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: "white", marginBottom: "0%" }}>
                      APPROVE
                    </p>
                    <p style={{ color: "var(--background2)" }}>
                      Approve perfoming transactions with your wallet
                    </p>
                  </div>
                </div>
                <Button
                  disabled
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
                  DONE
                </Button>{" "}
              </div>
              <div style={{ marginTop: "15%" }}>
                <div style={{ display: "flex", marginTop: "1%" }}>
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
                        d="M14.0228 30.8979L14.7474 27.6369C14.9124 26.8943 15.2858 26.2142 15.8237 25.6762L25.6717 15.8283C27.2338 14.2662 29.7664 14.2662 31.3285 15.8283L32.6717 17.1715C34.2338 18.7336 34.2338 21.2662 32.6717 22.8283L22.8237 32.6762C22.2858 33.2142 21.6056 33.5875 20.863 33.7526L17.6021 34.4772C15.4586 34.9535 13.5464 33.0414 14.0228 30.8979ZM16.6998 28.0708L15.9751 31.3317C15.8164 32.0462 16.4538 32.6836 17.1683 32.5248L20.4292 31.8002C20.7863 31.7208 21.1145 31.5451 21.3783 31.2925L17.2074 27.1216C16.9548 27.3855 16.7791 27.7137 16.6998 28.0708ZM18.6213 25.7071L22.7929 29.8787L28.3787 24.2929L24.2071 20.1213L18.6213 25.7071ZM31.2575 21.4141L29.7929 22.8787L25.6213 18.7071L27.0859 17.2425C27.8669 16.4615 29.1333 16.4615 29.9143 17.2425L31.2575 18.5857C32.0385 19.3667 32.0385 20.633 31.2575 21.4141Z"
                        fill="#D2A163"
                      />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: "white", marginBottom: "0%" }}>
                      SIGNATURE
                    </p>
                    <p style={{ color: "var(--background2)" }}>
                      Create a signature to place a bit
                    </p>
                  </div>
                </div>
                {createsign ? (
                  <Button
                    onClick={() => navigate("/profile")}
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
                    DONE
                  </Button>
                ) : (
                  <Button
                    onClick={() => createsignHandler()}
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
                    START NOW
                  </Button>
                )}
              </div>
            </>
          ) : null}
        </Modal>
        <Modal
          isOpen={collectionModal}
          onRequestClose={closeCollectionModal}
          style={collectionmodalStyles}
          contentLabel="Example Modal"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span></span>
            <div style={{ cursor: "pointer" }} onClick={closeCollectionModal}>
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
          <div style={{ color: "white", padding: "5%", textAlign: "center" }}>
            <div style={{ display: "grid", width: "100%" }}>
              <h3 style={{ color: "var(--background2)" }}>
                {collectionData && collectionData.collection_title}
              </h3>
            </div>
            <div
              style={{
                marginTop: "5%",
                display: "grid",
                justifyContent: "space-between",
                padding: "5%",
                gridTemplateColumns: "50% 50%",
              }}
            >
              {attributesArray &&
                attributesArray.length &&
                attributesArray.map((item) => <p>{item && item} </p>)}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5%",
              }}
            >
              <h5 style={{ color: "var(--background2)" }}>Collection url : </h5>
              <span>
                &nbsp;{" "}
                {collectionData &&
                  collectionData.collection_url &&
                  collectionData.collection_url}
              </span>
            </div>

            <h4 style={{ color: "var(--background2)" }}>Description</h4>

            <div style={{ marginLeft: "5%", marginTop: "5%" }}>
              {collectionData &&
                collectionData.collection_description &&
                collectionData.collection_description}
            </div>
          </div>
        </Modal>
        {isdraft ? (
          <div style={{ paddingBottom: "5%" }}>
            {drafts && drafts.length ? (
              drafts.map((item) => (
                <div className="drafts">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      marginTop: "5%",
                      padding: "2%",
                    }}
                  >
                    {/* <img
                      height={80}
                      width={80}
                      src={
                        item.imgpath
                          ? `${item.imgpath}`
                          : "/images/selectimg.png"
                      }
                    /> */}
                    <div>
                      <p
                        style={{
                          color: "white",
                          fontSize: "0.9rem",
                          marginBottom: "0%",
                        }}
                      >
                        &nbsp;&nbsp; &nbsp; DISTILLERY :{" "}
                        {item.distillery && item.distillery}
                        &nbsp; AGE : {item.age !== "undefined" && item.age}
                        &nbsp; CASK TYPE :{" "}
                        {item.cask_type !== "undefined" && item.cask_type}
                      </p>
                      <p
                        style={{
                          color: "var(--background2)",
                          fontSize: "0.9rem",
                          marginLeft: "4%",
                        }}
                      >
                        {item.bottling_date &&
                          moment(item.bottling_date && item.bottling_date).format(
                            "YYYY-MM-DD"
                          )}
                      </p>
                    </div>
                  </div>
                  <div>
                  <button onClick={() => draftHandler(item._id)}
 className="btnDelete" style={{height:"50px",width:"100px",marginRight:"10px",background:"var(--background2)"}}>Select</button>
                  <button onClick={() => draftDeleteHandler(item._id,'delete')} className="btnDelete" style={{height:"50px",width:"100px",marginRight:"10px",background:"var(--background2)"}}>Delete</button>
                    </div>
                 
                  </div>
                  <hr style={{ color: "white" }}></hr>
                </div>
              ))
            ) : (
              <h1
                style={{
                  color: "var(--background2)",
                  textAlign: "center",
                  paddingTop: "10%",
                  paddingBottom: "10%",
                }}
              >
                No drafts
              </h1>
            )}
          </div>
        ) : (
          <div style={{ background: "var(--background)" }}>
            <div style={{ padding: "15%" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60% 30%",
                  gap: "15%",
                }}
              >
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1
                      style={{
                        color: "white",
                        fontFamily: "fright",
                        fontWeight: "300",
                      }}
                    >
                      Create single <br></br> collectible
                    </h1>
                    <div>
                      <Modal
                        isOpen={modalIsOpen2}
                        onRequestClose={closeModal2}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <div
                          className="form-group"
                          style={{ flexBasis: "30%" }}
                        >
                          <label
                            style={{
                              color: "white",
                              marginTop: "3%",
                              marginBottom: "1%",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="exampleInputPassword1"
                          >
                            Collection Name
                          </label>
                          <input
                            style={{
                              height: "2rem",
                              padding: "1.2rem",
                              borderWidth: "0.2rem",
                              borderColor: "var(--borderColor)",
                              marginTop: "0.8rem",
                              borderRadius: "0%",
                              color: "var(--background2)",
                              width: "100%",
                              backgroundColor: "var(--background)",
                            }}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setCollection(e.target.value)}
                          />
                        </div>
                        <Button
                          style={{
                            color: "white",
                            backgroundColor: "var(--borderColor)",
                            height: "2.5rem",
                            marginTop: "1rem",
                            marginRight: "1rem",
                            border: "none",
                            borderRadius: "0%",
                            width: "100%",
                          }}
                          // onClick={() => {
                          //   saveCollection();
                          // }}
                        >
                          Create collection
                        </Button>{" "}
                      </Modal>
                      <Modal
                        isOpen={AuctionmodalIsOpen}
                        onRequestClose={closeAuctionmodal}
                        style={customStyles2}
                        contentLabel="Example Modal"
                      >
                        <div
                          className="form-group"
                          style={{
                            flexBasis: "30%",
                            borderBottom: "1px solid var(--background2)",
                          }}
                        >
                          <label
                            style={{
                              color: "white",
                              marginTop: "3%",
                              marginBottom: "1%",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="exampleInputPassword1"
                          >
                            Minimum Bid
                          </label>
                          <div style={{ display: "flex" }}>
                          <input
  placeholder="Minimum bid price"
  style={{
    height: "2rem",
    padding: "1.2rem",
    borderWidth: "0.2rem",
    borderColor: "var(--borderColor)",
    marginTop: "0.8rem",
    borderRadius: "0%",
    color: "#CF9658",
    width: "100%",
    backgroundColor: "var(--background)",
    border: "none",
    boxShadow: "none",
  }}
  type="number"
  className="form-control"
  id="exampleInputPassword1"
  onChange={(e) => setBidprice(e.target.value)}
/>
                            <p
                              style={{
                                color: "var(--background2)",
                                marginBottom: "0px",
                                marginTop: "20px",
                              }}
                            >
                              MATIC
                            </p>
                          </div>
                        </div>
                        <div
                          className="form-group"
                          style={{
                            width: "100%",
                            display: "flex",
                            gap: "10%",
                            marginTop: "5%",
                            marginBottom: "20%",
                          }}
                        >
                   
                          <div>
                            <label
                              style={{
                                color: "white",
                                marginTop: "3%",
                                marginBottom: "1%",
                                fontSize: "0.8rem",
                              }}
                              htmlFor="exampleInputPassword1"
                            >
                              Expiration date
                            </label>
                            <br></br>
                            <br></br>
                            <select style={{width:"30rem",color:"var(--background2)",background:"var(--background)"
                          ,border:"solid 1px var(--borderColor)"  ,padding:"2%"
                          }} onChange={(e)=>e.target.value =="5minute"&& setendDateTimestamp(current+600)
        || e.target.value =="1day"&& setendDateTimestamp(current+ 100000) || 
            e.target.value =="2day"&& setendDateTimestamp(current+ 200000)
            || e.target.value =="3day"&& setendDateTimestamp(current+ 300000)
            || e.target.value =="4day"&& setendDateTimestamp(current+ 350000)
            || e.target.value =="5day"&& setendDateTimestamp(current+ 450000)
            || e.target.value =="6day"&& setendDateTimestamp(current+ 550000)
            || e.target.value =="7day"&& setendDateTimestamp(current+ 600000)
            || e.target.value =="8day"&& setendDateTimestamp(current+ 650000)
            || e.target.value =="9day"&& setendDateTimestamp(current+ 750000)
            || e.target.value =="10day"&& setendDateTimestamp(current+ 850000)

            
    } name="cars" id="cars">
                <option value={null}>Select Expire date</option>
        <option value="5minute">5minute</option>
  <option value="1day">1 day</option>
  <option value="2day">2 day</option>
  <option value="3day">3 day</option>
  <option value="4day">4 day</option>
  <option value="5day">5 day</option>
  <option value="6day">6 day</option>
  <option value="7day">7 day</option>
  <option value="8day">8 day</option>
  <option value="9day">9 day</option>
  <option value="10day">10 day</option>

</select>
                          </div>
                        </div>
                        <Button
                          style={{
                            color: "white",
                            backgroundColor: "var(--borderColor)",
                            height: "2.5rem",
                            marginTop: "1rem",
                            marginRight: "1rem",
                            border: "none",
                            borderRadius: "0%",
                            width: "100%",
                          }}
                          onClick={() => {
                            auctionHandler();
                          }}
                        >
                          Start auction
                        </Button>{" "}
                      </Modal>
                    </div>
                    <div>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h4 style={{ fontFamily: "fright", color: "white" }}>
                            Follow steps
                          </h4>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={closeModal}
                          >
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
                                  fill="#5F4529"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M30.7071 19.7929C31.0976 20.1834 31.0976 20.8166 30.7071 21.2071L22.7071 29.2071C22.3166 29.5976 21.6834 29.5976 21.2929 29.2071L17.2929 25.2071C16.9024 24.8166 16.9024 24.1834 17.2929 23.7929C17.6834 23.4024 18.3166 23.4024 18.7071 23.7929L22 27.0858L29.2929 19.7929C29.6834 19.4024 30.3166 19.4024 30.7071 19.7929Z"
                                  fill="#FCFCFD"
                                />
                              </svg>
                              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.5C3 3.29086 4.79086 1.5 7 1.5H15.3431C16.404 1.5 17.4214 1.92143 18.1716 2.67157L19.8284 4.32843C20.5786 5.07857 21 6.09599 21 7.15685V19.5C21 21.7091 19.2091 23.5 17 23.5H7C4.79086 23.5 3 21.7091 3 19.5V5.5ZM19 8.5V19.5C19 20.6046 18.1046 21.5 17 21.5H7C5.89543 21.5 5 20.6046 5 19.5V5.5C5 4.39543 5.89543 3.5 7 3.5H14V5.5C14 7.15685 15.3431 8.5 17 8.5H19ZM18.8891 6.5C18.7909 6.2176 18.6296 5.95808 18.4142 5.74264L16.7574 4.08579C16.5419 3.87035 16.2824 3.70914 16 3.61094V5.5C16 6.05228 16.4477 6.5 17 6.5H18.8891Z" fill="#D2A163"/>
<path d="M11.6172 9.57588C11.4993 9.62468 11.3888 9.69702 11.2929 9.79289L8.29289 12.7929C7.90237 13.1834 7.90237 13.8166 8.29289 14.2071C8.68342 14.5976 9.31658 14.5976 9.70711 14.2071L11 12.9142V17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5V12.9142L14.2929 14.2071C14.6834 14.5976 15.3166 14.5976 15.7071 14.2071C16.0976 13.8166 16.0976 13.1834 15.7071 12.7929L12.7071 9.79289C12.4125 9.49825 11.9797 9.42591 11.6172 9.57588Z" fill="#D2A163"/>
</svg> */}
                            </div>
                            <div>
                              <p style={{ color: "white", marginBottom: "0%" }}>
                                UPLOAD FILES & MINT TOKEN
                              </p>
                              <p style={{ color: "var(--background2)" }}>
                                Call contract method
                              </p>
                            </div>
                          </div>
                          {load ? (
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
                                height={"10%"}
                                width={"10%"}
                              />
                            </div>
                          ) : (
                            <Button
                              disabled={minted ? true : false}
                              onClick={() => createbottle()}
                              style={{
                                color: "white",
                                backgroundColor: "var(--borderColor)",
                                height: "2.5rem",
                                marginTop: "1rem",
                                marginRight: "1rem",
                                border: "none",
                                borderRadius: "0%",
                                width: "100%",
                              }}
                            >
                              {minted ? (
                                <span>DONE</span>
                              ) : (
                                <span>START NOW</span>
                              )}
                            </Button>
                          )}
                        </div>
                        <div style={{ marginTop: "15%" }}>
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
                                  d="M14.0226 30.8979L14.7473 27.6369C14.9123 26.8943 15.2857 26.2142 15.8236 25.6762L25.6715 15.8283C27.2336 14.2662 29.7663 14.2662 31.3284 15.8283L32.6715 17.1715C34.2336 18.7336 34.2336 21.2662 32.6715 22.8283L22.8236 32.6762C22.2857 33.2142 21.6055 33.5875 20.8629 33.7526L17.602 34.4772C15.4585 34.9535 13.5463 33.0414 14.0226 30.8979ZM16.6997 28.0708L15.975 31.3317C15.8162 32.0462 16.4536 32.6836 17.1681 32.5248L20.429 31.8002C20.7861 31.7208 21.1144 31.5451 21.3782 31.2925L17.2073 27.1216C16.9547 27.3855 16.779 27.7137 16.6997 28.0708ZM18.6212 25.7071L22.7928 29.8787L28.3785 24.2929L24.207 20.1213L18.6212 25.7071ZM31.2573 21.4141L29.7928 22.8787L25.6212 18.7071L27.0857 17.2425C27.8668 16.4615 29.1331 16.4615 29.9142 17.2425L31.2573 18.5857C32.0384 19.3667 32.0384 20.633 31.2573 21.4141Z"
                                  fill="#D2A163"
                                />
                              </svg>
                            </div>
                            <div>
                              <p style={{ color: "white", marginBottom: "0%" }}>
                                SIGN SELL ORDER
                              </p>
                              <p style={{ color: "var(--background2)" }}>
                                Sign sell order using your wallet
                              </p>
                            </div>
                          </div>
                          {auctionloading ? (
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
                                height={"10%"}
                                width={"10%"}
                              />
                            </div>
                          ) : auctionMintDone ? (
                            <Button
                              disabled={token ? false : true}
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
                              onClick={() => navigate("/profile")}
                            >
                              DONE
                            </Button>
                          ) : (
                            <Button
                              disabled={token ? false : true}
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
                              onClick={() => {
                                putonSale
                                  ? openauctionmodal()
                                  : openPutonSalemodal();
                              }}
                            >
                              START NOW
                            </Button>
                          )}
                        </div>
                        <div style={{ marginTop: "15%" }}>
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
                                  d="M29.7422 20.5H18.2578C17.1042 20.5 16.1898 21.4734 16.2617 22.6248L16.7617 30.6248C16.8276 31.6788 17.7017 32.5 18.7578 32.5H29.2422C30.2984 32.5 31.1725 31.6788 31.2383 30.6248L31.7383 22.6248C31.8103 21.4734 30.8959 20.5 29.7422 20.5ZM18.2578 18.5C15.9506 18.5 14.1217 20.4467 14.2656 22.7495L14.7656 30.7495C14.8974 32.8577 16.6456 34.5 18.7578 34.5H29.2422C31.3545 34.5 33.1027 32.8577 33.2345 30.7495L33.7345 22.7495C33.8784 20.4467 32.0495 18.5 29.7422 18.5H18.2578Z"
                                  fill="#D2A163"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M19 19.5C19 16.7386 21.2386 14.5 24 14.5C26.7614 14.5 29 16.7386 29 19.5V21.5C29 22.0523 28.5523 22.5 28 22.5C27.4477 22.5 27 22.0523 27 21.5V19.5C27 17.8431 25.6569 16.5 24 16.5C22.3431 16.5 21 17.8431 21 19.5V21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5V19.5Z"
                                  fill="#D2A163"
                                />
                              </svg>
                            </div>
                            <div>
                              <p style={{ color: "white", marginBottom: "0%" }}>
                                SIGN LOCK ORDER
                              </p>
                              <p style={{ color: "var(--background2)" }}>
                                Sign lock order using your wallet
                              </p>
                            </div>
                          </div>
                          <Button
                            disabled
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
                            START NOW
                          </Button>{" "}
                        </div>
                      </Modal>
                    </div>
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "var(--background)",
                        height: "2.5rem",
                        marginTop: "0.8rem",
                        marginRight: "1rem",
                        borderColor: "var(--background2)",
                        borderRadius: "0%",
                        paddingLeft: "3%",
                        paddingRight: "3%",
                        borderWidth: "0.1rem",
                        fontSize: "0.7rem",
                      }}
                    >
                      SWITCH TO MULTIPLE
                    </Button>{" "}
                  </div>

                  <h4
                    style={{
                      color: "white",
                      marginTop: "8%",
                      fontSize: "1rem",
                    }}
                  >
                    UPLOAD FILE
                  </h4>
                  <p style={{ color: "var(--background2)" }}>
                    Drag or choose your file to upload
                  </p>
                  <section>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <img
                        style={{ width: "100%" }}
                        src="/images/uploadfield.png"
                      />{" "}
                    </div>
                  </section>
                  <div
                    style={{
                      width: "100%",
                      background: "var(--background)",
                      paddingBottom: "8%",
                    }}
                  >
                    <h4
                      style={{
                        color: "white",
                        fontSize: "1rem",
                        marginTop: "8%",
                        marginBottom: "7%",
                      }}
                    >
                      BOTTLE DETAILS1
                    </h4>

                    <form>
                      <div style={{ display: "flex", marginBottom: "4%" }}>
                        <div
                          className="form-group"
                          style={{ flexBasis: "30%", marginRight: "5%" }}
                        >
                          <label
                            style={{
                              color: "white",
                              marginTop: "3%",
                              marginBottom: "1%",
                              fontSize: "0.7rem",
                            }}
                            htmlFor="exampleInputPassword1"
                          >
                            DISTILLERY *{" "}
                          </label>
                          <input
                            style={{
                              height: "2rem",
                              padding: "1.2rem",
                              borderWidth: "0.2rem",
                              borderColor: "var(--borderColor)",
                              marginTop: "0.8rem",
                              borderRadius: "0%",
                              color: "var(--background2)",
                              backgroundColor: "var(--background)",
                            }}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="distillery"
                            onChange={handleChange}
                            value={
                              state.distillery !== "undefined" && state.distillery !== null
                                ? state.distillery
                                : ""
                            }
                          />
                        </div>
                        <div
                          className="form-group"
                          style={{ flexBasis: "30%" }}
                        >
                          <label
                            style={{
                              color: "white",
                              marginTop: "3%",
                              marginBottom: "1%",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="exampleInputPassword1"
                          >
                            AGE *
                          </label>
                          <select
                            style={{
                              height: "2.5rem",
                              padding: "0rem",
                              borderWidth: "0.2rem",
                              borderColor: "var(--borderColor)",
                              marginTop: "0.8rem",
                              borderRadius: "0%",
                              color: "var(--background2)",
                              width: "100%",
                              backgroundColor: "var(--background)",
                              outline:"none"
                            }}
                  // className="form-control"
                  id="exampleInputtext1"
                  name="age"
                  onChange={handleChange}
                  value={state.age}
                >
                  <option value="">Select Age</option>
                  {dropDownData.AGES && dropDownData.AGES.length > 0
                    ? dropDownData.AGES.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                        </div>
                        <div
                          className="form-group"
                          style={{ flexBasis: "30%", marginLeft: "3%" }}
                        >
                          <label
                            style={{
                              color: "white",
                              marginTop: "3%",
                              marginBottom: "1%",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="exampleInputPassword1"
                          >
                            CASK TYPE *
                          </label>
                          <select
                            style={{
                              height: "2.5rem",
                              padding: "0rem",
                              borderWidth: "0.2rem",
                              borderColor: "var(--borderColor)",
                              marginTop: "0.8rem",
                              borderRadius: "0%",
                              color: "var(--background2)",
                              width: "100%",
                              backgroundColor: "var(--background)",
                              outline:"none"
                            }}
                  // className="form-control"
                  id="exampleInputtext1"
                  name="cask_type"
                  onChange={handleChange}
                  value={state.cask_type}
                >
                  <option value="">Select Cask Type</option>
                  {dropDownData.CASK && dropDownData.CASK.length > 0
                    ? dropDownData.CASK.map((object, i) => (
                      <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          style={{ color: "white", fontSize: "0.8rem" }}
                          htmlFor="exampleInputEmail1"
                        >
                          BOTTLING DATE *
                        </label>
                        <input
                          style={{
                            height: "2rem",
                            padding: "1.2rem",
                            borderColor: "var(--borderColor)",
                            borderWidth: "0.2rem",
                            marginTop: "0.8rem",
                            borderRadius: "0%",
                            color: "var(--background2)",
                            backgroundColor: "var(--background)",
                          }}
                          type="date"
                          className="form-control"
                          id="exampleInputPassword1"
                          name="bottling_date"
                          value={
                            state.bottling_date !== "undefined" &&
                            state.bottling_date !== null
                              ? state.bottling_date
                              : ""
                          }
                          onChange={handleChange}
                        />
                      </div>
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
                          DESCRIPTION *{" "}
                        </label>{" "}
                        <textarea
                          style={{
                            borderWidth: "0.2rem",
                            color: "var(--background2)",
                            borderColor: "var(--borderColor)",
                            backgroundColor: "var(--background)",
                            resize:"none"
                          }}
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          name="details"
                          value={
                            state.details !== "undefined" && state.details !== null
                              ? state.details
                              : ""
                          }
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          style={{
                            color: "white",
                            marginTop: "3%",
                            marginBottom: "1%",
                            fontSize: "0.8rem",
                          }}
                          htmlFor="exampleInputPassword1"
                        >
                          ADDITIONAL DETAILS *
                        </label>
                        <input
                          style={{
                            height: "2rem",
                            padding: "1.2rem",
                            borderWidth: "0.2rem",
                            borderRadius: "0%",
                            borderColor: "var(--borderColor)",
                            marginTop: "0.8rem",
                            color: "var(--background2)",

                            backgroundColor: "var(--background)",
                          }}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handleChange}
                          name="additional_details"
                          value={
                            state.additional_details !== "undefined" &&
                            state.additional_details !== null
                              ? state.additional_details
                              : ""
                          }
                        />
                      </div>
                    </form>
                    <hr
                      style={{ color: "var(--background2)", marginTop: "10%" }}
                    ></hr>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5%",
                      }}
                    >
                      <div>
                        {" "}
                        <h4 style={{ color: "white", fontSize: "1.2rem" }}>
                          PUT ON SALE
                        </h4>
                        <p style={{ color: "var(--background2)" }}>
                          You’ll receive bids on this Bottle
                        </p>
                      </div>
                      <div style={{ marginTop: "5%" }}>
                        <Form 
                        
                        >
                          <Form.Check
                            disabled={directSale}
                            type="switch"
                            id="custom-switch" 
                            className="custom-switch"
                            onClick={() =>
                              directSale !== true && handleputonSale()
                            }
                          />
                        </Form>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5%",
                      }}
                    >
                      <div>
                        {" "}
                        <h4 style={{ color: "white", fontSize: "1.2rem" }}>
                          INSTANT SALE PRICE
                        </h4>
                        <p style={{ color: "var(--background2)" }}>
                          Enter the price for which the Bottle will be instantly
                          sold
                        </p>
                      </div>
                      <div style={{ marginTop: "5%" }}>
                        <Form
                          onClick={() => {
                            putonSale !== true && handlerDirectSale();
                          }}
                          
                        >
                          <Form.Check
                            disabled={putonSale}
                            type="switch"
                            id="custom-switch"
                            
                          />
                        </Form>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5%",
                      }}
                    >
                      <div>
                        {" "}
                        <h4 style={{ color: "white", fontSize: "1.2rem" }}>
                          UNLOCK ONCE PURCHASED
                        </h4>
                        <p style={{ color: "var(--background2)" }}>
                          Content will be unlocked after successful transaction
                        </p>
                      </div>
                      <div  style={{ marginTop: "5%"}}>
                        <Form style={{ marginTop: "5%"}}>
                          <Form.Check type="switch" id="custom-switch" />
                        </Form>
                      </div>{" "}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "5%",
                      }}
                    >
                      <div>
                        {" "}
                        <h4 style={{ color: "white", fontSize: "1.2rem" }}>
                          CHOOSE COLLECTION
                        </h4>
                        <p style={{ color: "var(--background2)" }}>
                          Choose an exiting collection or create a new one
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "23% 23% 23% 23%",
                        gap: "5%",
                        marginTop: "5%",
                        height:"fit-content",
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          background: "#100804",
                          paddingTop: "15%",
                          paddingBottom: "15%",
                          paddingLeft: "8%",
                        }}
                        onClick={() =>collectionHandler()}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="32" height="32" rx="16" fill="#FCFCFD" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17 11C17 10.4477 16.5523 10 16 10C15.4477 10 15 10.4477 15 11V15H11C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17H15V21C15 21.5523 15.4477 22 16 22C16.5523 22 17 21.5523 17 21V17H21C21.5523 17 22 16.5523 22 16C22 15.4477 21.5523 15 21 15H17V11Z"
                            fill="#D2A163"
                          />
                        </svg>
                        <h4
                          style={{
                            color: "white",
                            fontSize: "0.9rem",
                            marginTop: "10%",
                          }}
                        >
                          CREATE <br></br> COLLECTION
                        </h4>
                      </div>
                      {CollectionsList &&
                        CollectionsList.map((item) => (
                          <div 
                            onClick={() => [
                              setCollectionId(item.newCollection),
                              setCollectionIpfs(item),
                              // openCollectionModal(item.ipfsHash),
                              getDatas(),
                            ]}
                            style={{
                               background: "#100804",
                              paddingTop: "15%",
                              paddingBottom: "15%",
                              paddingLeft: "8%",
                              border:
                                collectionId === item.newCollection
                                  ? "2px solid var(--background2)"
                                  : "none",
                            }}
                          >
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="32"
                                height="32"
                                rx="16"
                                fill="#5F4529"
                              />
                            </svg>

                            <h4
                              style={{
                                color: "white",
                                fontSize: "0.9rem",
                                marginTop: "20%",
                              }}
                            >
                              {item[0]}
                            </h4>
                          </div>
                        ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "25%",
                      }}
                    >
                      <div>
                        <p
                          onClick={() => validater()}
                          style={{ color: "white", cursor: "pointer" }}
                        >
                          CREATE BOTTLE &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <svg
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M6.39397 0.843309C6.66452 0.593571 7.08629 0.61044 7.33603 0.880985L9.48988 3.21429C9.72561 3.46967 9.72561 3.86329 9.48988 4.11867L7.33603 6.45203C7.0863 6.72257 6.66453 6.73945 6.39398 6.48971C6.12343 6.23998 6.10656 5.81821 6.35629 5.54766L7.47736 4.33315L1.00001 4.33315C0.63182 4.33315 0.333343 4.03467 0.333343 3.66648C0.333343 3.29829 0.63182 2.99982 1.00001 2.99982L7.47734 2.99982L6.3563 1.78536C6.10656 1.51482 6.12343 1.09305 6.39397 0.843309Z"
                              fill="#FCFCFD"
                            />
                          </svg>
                        </p>
                      </div>
                      <div style={{ marginLeft: "5%" }}>
                        <p
                          onClick={() => saveDraft()}
                          style={{ color: "white", cursor: "pointer" }}
                        >

                         SAVE DRAFT <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 1.3335C7.63181 1.3335 7.33334 1.63197 7.33334 2.00016V4.00016C7.33334 4.36835 7.63181 4.66683 8 4.66683C8.36819 4.66683 8.66667 4.36835 8.66667 4.00016V2.00016C8.66667 1.63197 8.36819 1.3335 8 1.3335Z" fill="#FCFCFD"/>
<path d="M8 11.3335C7.63181 11.3335 7.33334 11.632 7.33334 12.0002V14.0002C7.33334 14.3684 7.63181 14.6668 8 14.6668C8.36819 14.6668 8.66667 14.3684 8.66667 14.0002V12.0002C8.66667 11.632 8.36819 11.3335 8 11.3335Z" fill="#FCFCFD"/>
<path d="M14 7.3335C14.3682 7.3335 14.6667 7.63197 14.6667 8.00016C14.6667 8.36835 14.3682 8.66683 14 8.66683H12C11.6318 8.66683 11.3333 8.36835 11.3333 8.00016C11.3333 7.63197 11.6318 7.3335 12 7.3335H14Z" fill="#FCFCFD"/>
<path d="M4.66667 8.00016C4.66667 7.63197 4.36819 7.3335 4 7.3335H2C1.63181 7.3335 1.33334 7.63197 1.33334 8.00016C1.33334 8.36835 1.63181 8.66683 2 8.66683H4C4.36819 8.66683 4.66667 8.36835 4.66667 8.00016Z" fill="#FCFCFD"/>
<path d="M11.7713 3.28618C12.0316 3.02583 12.4537 3.02583 12.7141 3.28618C12.9744 3.54653 12.9744 3.96864 12.7141 4.22899L11.2999 5.64321C11.0395 5.90356 10.6174 5.90356 10.3571 5.64321C10.0967 5.38286 10.0967 4.96075 10.3571 4.7004L11.7713 3.28618Z" fill="#FCFCFD"/>
<path d="M5.64296 10.3571C5.38261 10.0968 4.9605 10.0968 4.70015 10.3571L3.28593 11.7714C3.02558 12.0317 3.02558 12.4538 3.28593 12.7142C3.54628 12.9745 3.96839 12.9745 4.22874 12.7142L5.64296 11.3C5.90331 11.0396 5.90331 10.6175 5.64296 10.3571Z" fill="#FCFCFD"/>
<path d="M12.7141 11.7714C12.9744 12.0318 12.9744 12.4539 12.7141 12.7142C12.4537 12.9746 12.0316 12.9746 11.7713 12.7142L10.357 11.3C10.0967 11.0397 10.0967 10.6176 10.357 10.3572C10.6174 10.0969 11.0395 10.0969 11.2999 10.3572L12.7141 11.7714Z" fill="#FCFCFD"/>
<path d="M5.64302 5.64312C5.90337 5.38277 5.90337 4.96066 5.64302 4.70031L4.22881 3.28609C3.96846 3.02574 3.54635 3.02574 3.286 3.28609C3.02565 3.54644 3.02565 3.96855 3.286 4.2289L4.70021 5.64312C4.96056 5.90347 5.38267 5.90347 5.64302 5.64312Z" fill="#FCFCFD"/>
</svg>

                         {/* SAVE DRAFT */}

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "12%",
                    borderWidth: "0.1rem",
                    height: "fit-content",
                    borderStyle: "solid",
                    borderColor: "var(--borderColor)",
                    overflow:"auto",
                    
                  }}
                >
                  <h3 style={{ color: "white", marginBottom: "10%" }}>
                    Preview
                  </h3>
                  {files.length ? null : (
                    <img
                      style={{ height: "200px", width: "100%" }}
                      src={
                        image && image ? `${image}` : "/images/selectimg.png"
                      }
                    />
                  )}


{ files.length && files[0].type == "video/mp4"&&files.map((file) => (
                    <div key={file.name}>
                      <div>
                      <video width="230" height="300" controls >
      <source src={file.preview} type="video/mp4"/>
</video>
                      </div>
                    </div>
                  ))}
                   {files.length && files[0].type !== "video/mp4" ?files &&files.map((file) => (
                    <div key={file.name}>
                      <div>
                        <img
                          src={file.preview}
                          style={{ height: "180px", width: "100%" }}
                          // Revoke data uri after image is loaded
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                          }}
                        />
                      </div>
                    </div>
                  )): null}
                  <div>
                    <div className="personalcardText">
                      {/* <div>
                {  distillery &&    <h4 style={{ color: "white", fontSize: "1rem" }}>
                      {distillery && distillery} - {age && age}
                    </h4> }
                  
                    <h4 style={{ color: "white", fontSize: "1rem" }}>
                      {cask_type && cask_type}
                    </h4> 
                   { bottling_date &&   <h4 style={{ color: "white", fontSize: "1rem" }}>
                    -  {bottling_date && bottling_date}
                    </h4>}
                    <h4 style={{ color: "white", fontSize: "1rem" }}>
                      {additional_details && additional_details}
                    </h4>
                  </div>
                   */}
                      {/* <svg
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
             </svg> */}
                    </div>
                  </div>
                  {/* <h4 style={{ color: "var(--background2)" }}>$900</h4> */}
                  <hr style={{ color: "white" }} />
                  <div className="personalcardText2">
                    <h4 style={{ color: "white", fontSize: "0.8rem" }}>
                      {state && state.distillery}
                    </h4>
                    <h4 style={{ color: "white", fontSize: "0.8rem" }}>
                      {state && state.age}
                    </h4>
                  </div>
                  <div className="personalcardText2">
                    <h4 style={{ color: "white", fontSize: "0.8rem" }}>
                      {state && state.cask_type}
                    </h4>
                    <h4 style={{ color: "white", fontSize: "0.8rem" }}>
                      {state && state.bottling_date}
                    </h4>
                  </div>
                  <p style={{ color: "white" }}>{state && state.details}</p>
                  <p style={{ color: "white" }}>
                    {state && state.additional_details}
                  </p>
                  <h4
                    onClick={() => clearAll()}
                    style={{
                      color: "var(--background2)",
                      marginTop: "5%",
                      fontSize: "1.2rem",
                      cursor: "pointer",
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#D2A163"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z"
                        fill="#D2A163"
                      />
                    </svg>{" "}
                    CLEAR ALL
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload2;