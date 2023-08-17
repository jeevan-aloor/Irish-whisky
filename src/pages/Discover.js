import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import HomeCard from "../components/HomeCard";
import { API_URL } from "../constants/userConstants";
import { useEffect,useState } from "react";
import ReactPaginate from "react-paginate"
import HomeFilter from "../components/homeFilter"
import axios from "axios";
import { toast } from "react-toastify";

let initState = {
  region: "REGION",
  cask_type: "TYPE",
  age: "AGE",
  price: "HIGH",
  likes: "Most",
}

const Discover = () => {
  let [datas,setdatas] = useState(0)
  let [usdPrice,setusdPrice] = useState()
  let numeberOfData = 12
  const [currentItems, setCurrentItems] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filterData, setFilterData] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([])

  const [state, setState] = useState(initState)
  

  let getNft =(async()=>{
    let data = await axios.get(`${API_URL}/get-nft`)
    console.log(data.draft,"data")
    setdatas(data?.data?.draft)
 })
 const getusd = async()=>{
  let {data} = await axios.get(`https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=F3HN9IGWSZ5NYWEJBEM4Q214H2Q1BESN67`)
  setusdPrice(data?.result?.maticusd)
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
    setState({ ...state, [e.target.name]: value });
  } else {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const isThere = selectedFilters.filter((item) => {
    return item.key === e.target.name
  })
  
  if(isThere.length > 0){
    let x = selectedFilters
    x.forEach((item) => {
      if(item.key === e.target.name){
        item.value = e.target.value
      }
    })
    setSelectedFilters(x)
  } else {
    let obj = {key: e.target.name, value: value[0]}
    setSelectedFilters(prevArray => [...prevArray, obj])
  }
}

 const getFilterData = async () => {
  const { data } = await axios.get(`${API_URL}/get-valuation-data`);
  if(data.message === 'Success'){
    const { finalDataObj } = data
    setFilterData(finalDataObj)
  } else {
    let finalDataObj = {}
    setFilterData(finalDataObj)
  }
}

const handlePageClick = (event) => {
  const newOffset = (event.selected * numeberOfData) % datas.length;
  setItemOffset(newOffset);
};

const handleApplyFilter = async () => {
  let appliedFilterTags = []
  selectedFilters.map((item) => {
    if(item.key !== 'price' && item.key !== 'likes'){
      appliedFilterTags.push({ key: item.key, values: item.value });
    }
  });
  if(appliedFilterTags.length > 0){

    let params = {
      appliedFilterTags,
      price: state.price,
      likes: state.likes,
      usdPrice
    }
    const { data } = await axios.post(`${API_URL}/filter-data`, params)
    setdatas(data.data)
    setCurrentItems(data.data)
  } else {
    toast.warning("Please select Required Filters")
  }
}

const clearAllFilters = () => {
  setSelectedFilters([])
  setState(initState)
  getNft()
}

 useEffect(()=>{
  getNft()
  getusd()
  getFilterData()
 },[])
 

 useEffect(() => {
  if(datas.length > 0){
    const endOffset = itemOffset + numeberOfData;
    setCurrentItems(datas?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(datas?.length / numeberOfData));
  }
 }, [datas,itemOffset, numeberOfData]);

 
  return (
    <div>
     <div style={{ padding: "5%",paddingBottom:"25%" }}>
          <h1 style={{ color: "white", marginBottom: "7%",fontFamily:"Freight Big Pro",fontWeight:"700",fontSize:"48px",fontStyle:"normal" }}>Discover</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1%",
            }}
          >
              <div
      >
          <select style={{
            background: "var(--background)",
            borderColor: "var(--borderColor)",
            color: "var(--background2)",
            padding: "0.3rem",
            outline: "none",
            margin: "0 10px"
          }}
          onChange={(e) => handleChange(e)} 
          name="region"
          value={state.region}
          >
            <option value="#">Recently Added</option>
          </select>
        </div>
            <div
              style={{
                display: "flex",
                color: "var(--background2)",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: "1rem",
                  background: "#46392E",
                  padding: "0.2rem",
                  color: "#FCFCFD",
                  cursor: "pointer"
                }}
                onClick={() => clearAllFilters()}
              >
                ALL BOTTLES
              </p>
              <div
      >
          <select style={{
            background: "var(--background)",
            borderColor: "var(--borderColor)",
            color: "var(--background2)",
            padding: "0.3rem",
            outline: "none",
            margin: "0 10px"
          }}
          onChange={(e) => handleChange(e)} 
          name="region"
          value={state.region}
          >
            <option value="#">REGION</option>
            {filterData && filterData.REGION.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
              <div
        
      >
              <select style={{
          background: "var(--background)",
          borderColor: "var(--borderColor)",
          color: "var(--background2)",
          padding: "0.3rem",
          outline: "none",
        }} onChange={(e) => handleChange(e)} name="age" value={state.age} >
          <option value="#">AGE</option>
                  {filterData && filterData.AGES.map((item) => (
                  <option value={item}>{item}</option>
                  ))}
               </select>
        </div>
              <div
        
      >
             <select style={{
          background: "var(--background)",
          borderColor: "var(--borderColor)",
          color: "var(--background2)",
          padding: "0.3rem",
          outline: "none",
          margin: "0 10px"
        }} onChange={(e) => handleChange(e)} name="cask_type" value={state.cask_type} >
          <option value="#">TYPE</option>
                  {filterData && filterData.CASK.map((item) => (
                  <option value={item}>{item}</option>
                  ))}
               </select>
        </div>
              <p style={{ margin: "1rem" }}>HOT</p>
            </div>
            <div
            style={{
              color: "white",
              borderRadius: "0.2rem",
              paddingLeft: "1.8rem",
              paddingRight: "1.8rem",
              backgroundColor: "var(--background2)",
              border: "none",
              marginTop: "0rem",
              marginLeft: "1rem",
              marginRight: "1rem",
              fontWeight: "3rem",
              fontSize: "1.2rem",
            }}>
            <Button
            style={{backgroundColor: "transparent", border: "none"}}
            onClick={() => handleApplyFilter()}
            >
              Filter
            </Button>
            <Button
                style={{backgroundColor: "transparent", border: "none"}}
              onClick={() => clearAllFilters()}
              >
            <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.529247 0.528758C0.789596 0.268409 1.21171 0.268409 1.47206 0.528758L5.00065 4.05735L8.52925 0.528758C8.7896 0.268409 9.21171 0.268409 9.47206 0.528758C9.73241 0.789108 9.73241 1.21122 9.47206 1.47157L5.94346 5.00016L9.47206 8.52876C9.73241 8.78911 9.73241 9.21122 9.47206 9.47157C9.21171 9.73192 8.7896 9.73192 8.52925 9.47157L5.00065 5.94297L1.47206 9.47157C1.21171 9.73192 0.789596 9.73192 0.529247 9.47157C0.268897 9.21122 0.268897 8.78911 0.529247 8.52876L4.05784 5.00016L0.529247 1.47157C0.268897 1.21122 0.268897 0.789108 0.529247 0.528758Z"
                  fill="#FCFCFD"
                />
              </svg>
            </Button>
            </div>
          </div>

          {/* filter */}
          <hr
            style={{
              height: "2px",
              borderWidth: 0,
              color: "gray",
              backgroundColor: "gray",
              marginTop: "3%",
              marginBottom: "3%",
            }}
          />

            <HomeFilter setState={setState} state={state} setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
            {currentItems && currentItems.length === 0 ? (
              <p style={{margin: "1rem 0",color:"var(--background2)", fontSize: "1.3rem",textAlign: "center"}}>0 Search Results</p>
            ) : (
            <div
            style={{
              paddingBottom: "0%",
              display: "grid",
              gridTemplateColumns: "19% 19% 19% 19%",
              gap: "8%",
              gridRowGap: "10%",
            }}
            >
               {currentItems && currentItems.map((item)=>{
            return <HomeCard ipfs={item.ipfs}  usdPrice={usdPrice} name={item.distillery} imgpath={item.imgpath} idAuction={item.auctionid}
            collectionId={item.collectionId} token={item.token} imageType={item.type}
            />
            
          })}
          </div>
  )
}

          </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination" 
        activeClassName="active"
        renderOnZeroPageCount={null}
        
      />
      {/* <button  style={{border:"1px solid #CF9658",background:"none",color:"#CF9658",textAlign:"center",marginLeft:"600px",marginTop:"50px",marginBottom:"50px"}}>LOAD MORE</button> */}
    </div>
  );
}

export default Discover;