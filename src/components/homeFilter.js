import React,{useEffect} from 'react'
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import {handleInputChange} from  "./homejavasc";

const homeFilter = ({setState, state, setSelectedFilters, selectedFilters}) => {

 
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
 
  return (
    <div style={{ display: "flex",justifyContent:"space-between", marginBottom: "15px" }}>
    <div>
      <label
        htmlFor="customRange1"
        style={{ color: "var(--borderColor)", paddingLeft: "10px" }}
        className="form-label"
      >
        PRICE
      </label>
      
              <div
        
      >
             <select style={{
          background: "var(--background)",
          borderColor: "var(--borderColor)",
          color: "var(--background2)",
          padding: "0.3rem",
          outline: "none",
          margin: "0 10px",
          borderWidth: "0.1rem",
        }}  name="price" value={state.price} onChange={(e) => handleChange(e)} >
          <option value="High">HIGHEST PRICE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}</option>
          <option value="Low">LOWEST PRICE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}</option>
               </select>
        </div>
    </div>{" "}
    <div>
      <label
        htmlFor="customRange1"
        style={{ color: "var(--borderColor)" }}
        className="form-label"
      >
        LIKES
      </label>
      <div
        
      >
             <select style={{
          background: "var(--background)",
          borderColor: "var(--borderColor)",
          color: "var(--background2)",
          padding: "0.3rem 0",
          outline: "none",
          margin: "0 0px",
          borderWidth: "0.1rem",
          width:"100%"
        }}  name="likes" value={state.likes} onChange={(e) => handleChange(e)} >
          <option value="Most">MOST LIKED &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}</option>
          <option value="Least">LEAST LIKED &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}</option>
               </select>
        </div>
    </div>{" "}
    <div>
      <label
        htmlFor="customRange1"
        style={{ color: "var(--borderColor)", paddingLeft: "10px" }}
        className="form-label"
      >
        CREATOR
      </label>
      <div
      >
             <select style={{
          background: "var(--background)",
          borderColor: "var(--borderColor)",
          color: "var(--background2)",
          padding: "0.3rem",
          outline: "none",
          margin: "0 10px",
          borderWidth: "0.1rem",
          width: '215px'
        }}  name="type" >
          <option value="High">VERIFIED ONLY &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}</option>
               </select>
        </div>
    </div>
    <div style={{ flexBasis: "20%" }}>
      {/* <label
        htmlFor="customRange1"
        style={{ color: "var(--borderColor)" }}
        className="form-label"
      >
        PRICE RANGE
      </label>
      <br></br>
      <div className="slidecontainer">
        <input
        style={{width: '90%'}}
          type="range"
          className="slider"
          min={1}
          max={100}
          defaultValue={50}
         
          
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <p>0.01 ETH</p>
          <p>10 ETH</p>
        </div>
      </div>{" "} */}
    </div>{" "}
  </div>  )
}

export default homeFilter;