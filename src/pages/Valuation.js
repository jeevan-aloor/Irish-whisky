import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { API_URL } from "../constants/userConstants";
import SimpleReactValidator from 'simple-react-validator';
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import styles from './Upload2.css'

const Valuation = () => {
  const user = useSelector(state => state.user.user)
  const validator = useRef( new SimpleReactValidator() )
  const [valuationData, setValuationData] = useState({})
  const [state, setState] = useState({
    distillery: '',
    AGES: '',
    CASK: '',
    PRICE: '',
    REGION: '',
    CONDITION: '',
    BottleRelease: '',
    bottlingDate: null,
    additionalDetails: '',
    errors: {}
  })
  
  const handleValuationData = async () => {
    const { data } = await axios.get(`${API_URL}/get-valuation-data`);
    if(data.message === 'Success'){
      const { finalDataObj } = data
      setValuationData(finalDataObj)
    } else {
      let finalDataObj = {}
      setValuationData(finalDataObj)
    }
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
  }
  const customValidate = () => {
    let error = false
    if(validator.current.allValid()){
      error = false
    } else {
      error = true
      validator.current.showMessages()
      setState({...state,
        errors: validator.current.getErrorMessages(),
    });
    } 
    return error
  }
  const handleSubmit = async (e, type) => {
    e.preventDefault()

    const error = customValidate()
    const { distillery, AGES, CASK, CONDITION, PRICE, REGION, BottleRelease, bottlingDate, additionalDetails } = state
    let obj = { distillery, AGES, CASK, CONDITION, PRICE, REGION, BottleRelease, bottlingDate, additionalDetails }

    if(!error){
      if(type === "Validate"){
        const res = await axios.post(`${API_URL}/bottle-valuation`,obj)
      } else {
        obj.user = user._id
        const { data } = await axios.post(`${API_URL}/save-user-valuation`,obj)
        if(data.status === "Success"){
          toast.success("The Valuation is saved successfully.")
        }
      }
    }
  }
  
  useEffect(() => {
    handleValuationData()
  },[])

const { AGES, CASK, CONDITION, PRICE, REGION, BottleRelease } = valuationData
  return (
    <div style={{ background: "var(--background)" }}>
      <div
        style={{
          width: "100%",
          background: "var(--background)",
          padding: "5%",
          paddingBottom: "8%",
        }}
      >
        <p style={{ color: "#F4F5F6", textAlign: "center", fontSize: "0.8rem" }}>
          VALUATION
        </p>
        <h1
          style={{
            color: "var(--background2)",
            textAlign: "center",
            fontWeight: "200",
            fontFamily: "Fright",
          }}
        >
          Estimate the Value of Your Rare Whiskey Bottles
        </h1>
        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "2%",
            marginBottom: "5%",
          }}
        >
          Utilize our proprietary valuation algorithm to determine the potential
          worth of your whiskey collection.
        </p>
      </div>
      <div
        style={{
          background: "var(--background3)",
          height: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          <div style={{ marginLeft: "5%", padding: "5%" }}>
            <h1
              style={{
                color: "var(--background2)",
                fontWeight: "380",
                fontFamily: "Fright",
              }}
            >
              Introduction
            </h1>
            <p style={{ color: "white",width:"460px" }}>
              Accurately assessing the value of rare whiskey bottles can be a
              challenging task. At [Your Company Name], we have developed a
              sophisticated valuation tool that takes into account various
              factors, such as age, distillery, rarity, and bottle condition, to
              provide you with an estimated value for your prized possessions.
            </p>
            <Button
              style={{
                color: "white",
                backgroundColor: "var(--background3)",
                height: "2.5rem",
                marginTop: "1rem",
                marginRight: "1rem",
                borderColor: "var(--background2)",
                borderRadius: "0%",
                paddingLeft: "5%",
                paddingRight: "5%",
                borderWidth: "0.1rem",
              }}
            >
              LEARN MORE
            </Button>{" "}
          </div>
        </div>
        <div style={{ marginLeft: "5%" }}>
          <img width={500} src="/images/valuation.png" />
        </div>
      </div>

      {/* How it works */}
      <div
        style={{
          width: "100%",
          background: "var(--background)",
          padding: "5%",
          paddingBottom: "8%",
        }}
      >
        <h1
          style={{
            color: "var(--background2)",
            fontWeight: "200",
            fontFamily: "Fright",
            fontSize: "2rem",
            marginLeft: "1%",
          }}
        >
          How It Works
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "25% 25% 25% 25%",
            columnGap: "2%",
            paddingRight: "5%",
          }}
        >
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "0.8rem",
                background: "#5F4529",
                width: "24%",
                textAlign: "center",
                padding: "2%",
              }}
            >
              STEP 1
            </h3>
            <h1
              style={{
                fontSize: "0.9rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              Input your bottle details
            </h1>
            <p style={{ color: "white" }}>
              Provide information about your whiskey bottle, such as the
              distillery, age, cask type, bottling date, and any other relevant
              details.
            </p>
          </div>
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "0.8rem",
                background: "#5F4529",
                width: "24%",
                textAlign: "center",
                padding: "2%",
              }}
            >
              STEP 2
            </h3>
            <h1
              style={{
                fontSize: "0.9rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              Receive an instant valuation
            </h1>
            <p style={{ color: "white" }}>
            Our valuation algorithm will analyze the provided data and generate an estimated value for your whiskey bottle.
            </p>
          </div>{" "}
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "0.8rem",
                background: "#5F4529",
                width: "24%",
                textAlign: "center",
                padding: "2%",
              }}
            >
              STEP 3
            </h3>
            <h1
              style={{
                fontSize: "0.9rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              Review the valuation breakdown
            </h1>
            <p style={{ color: "white" }}>
              Understand the factors that contribute to your bottle's value,
              including comparable sales, rarity, and market trends.
            </p>
          </div>{" "}
          <div
            style={{
              background: "var(--background)",
              padding: "5%",
              margin: "5%",
              borderColor: "var(--borderColor)",
              borderStyle: "solid",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "0.8rem",
                background: "#5F4529",
                width: "24%",
                textAlign: "center",
                padding: "2%",
              }}
            >
              STEP 4
            </h3>
            <h1
              style={{
                fontSize: "0.9rem",
                color: "var(--background2)",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              Mint your whiskey NFT
            </h1>
            <p style={{ color: "white" }}>
              Mint your whiskey NFT: If you're interested in turning your rare
              whiskey bottle into a tradeable NFT, explore our minting options
              and start the process.
            </p>
          </div>
        </div>
        <p style={{ color: "white", marginLeft: "1%", marginTop: "5%",fontSize:"16px",fontWeight:"500" }}>
          *Please note that the estimated value provided by our tool is for
          informational purposes only and may not reflect the actual sale price
          in the market. Consult with a professional appraiser or conduct
          additional research before making any investment decisions.
        </p>
      </div>
      <div style={{ display: "grid", background: "var(--background3)" }}>
        <div style={{ marginLeft: "5%", marginTop: "5%" }}>
          {" "}
          <p style={{ color: "#D2A163", fontSize: "0.8rem" }}>OUR TOOL</p>
          <h1
            style={{
              color: "var(--background2)",
              fontWeight: "380",
              fontFamily: "Fright",
              fontSize:"48px"
            }}
          >
            Valuation Tool
          </h1>
          <p
            style={{ color: "white", marginBottom: "2%", paddingRight: "10%" }}
          >
            Discover the potential worth of your rare whiskey bottles with our
            Valuation Tool, a sophisticated algorithm designed to provide
            accurate value estimates based on key factors such as age,
            distillery, and rarity.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "50% 30%",gap:"5%" }}>
          <div
            style={{ width: "100%", paddingTop: "2%", paddingBottom: "20%" }}
          >
            <form style={{ width: "80%", marginLeft: "10%" }} onSubmit={(e) => handleSubmit(e, "Validate")}>
              <div className="form-group">
                <label
                  style={{ color: "white", fontSize: "0.8rem" }}
                  htmlFor="exampleInputEmail1"
                >
                  {" "}
                  DISTILLERY
                </label>
                <input
                  style={{
                    height: "2rem",
                    padding: "1.2rem",
                    borderColor: "var(--borderColor)",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  placeholder="MACALLAN"
                  type="text"
                  className="form-control"
                  id="exampleInputtext1"
                  name="distillery"
                  value={state.distillery}
                  onChange={handleChange}
                />
                <div style={{color:"red"}}>{validator.current.message(
                        "distillery",
                        state.distillery,
                        "required"
                      )}</div>
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
                  AGE{" "}
                </label>
                <select
                  style={{
                    // height: "2rem",
                    // padding: "1.2rem",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  className="form-control"
                  id="exampleInputtext1"
                  name="AGES"
                  onChange={handleChange}
                  defaultValue={null}
                >
                  <option value="">Select Age</option>
                  {AGES && AGES.length > 0
                    ? AGES.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                <div style={{color:"red"}}>{validator.current.message(
                        "AGES",
                        state.AGES,
                        "required"
                      )}</div>
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
                  CASK TYPE{" "}
                </label>
                <select
                  style={{
                    // height: "2rem",
                    // padding: "1.2rem",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  className="form-control"
                  id="exampleInputtext1"
                  name="CASK"
                  onChange={handleChange}
                >
                  <option value="">Select Cask Type</option>
                  {CASK && CASK.length > 0
                    ? CASK.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                <div style={{color:"red"}}>{validator.current.message(
                        "CASK",
                        state.CASK,
                        "required"
                      )}</div>
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
                  CONDITION{" "}
                </label>
                <select
                  style={{
                    // height: "2rem",
                    // padding: "1.2rem",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  className="form-control"
                  id="exampleInputtext1"
                  name="CONDITION"
                  onChange={handleChange}
                >
                  <option value="">Select Condition</option>
                  {CONDITION && CONDITION.length > 0
                    ? CONDITION.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                <div style={{color:"red"}}>{validator.current.message(
                        "CONDITION",
                        state.CONDITION,
                        "required"
                      )}</div>
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
                  PRICE{" "}
                </label>
                <select
                  style={{
                    // height: "2rem",
                    // padding: "1.2rem",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  className="form-control"
                  id="exampleInputtext1"
                  name="PRICE"
                  onChange={handleChange}
                >
                  <option value="">Select Price Range</option>
                  {PRICE && PRICE.length > 0
                    ? PRICE.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                <div style={{color:"red"}}>{validator.current.message(
                        "PRICE",
                        state.PRICE,
                        "required"
                      )}</div>
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
                  REGION{" "}
                </label>
                <select
                  style={{
                    // height: "2rem",
                    // padding: "1.2rem",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  className="form-control"
                  id="exampleInputtext1"
                  name="REGION"
                  onChange={handleChange}
                >
                  <option value="">Select Region</option>
                  {REGION && REGION.length > 0
                    ? REGION.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                <div style={{color:"red"}}>{validator.current.message(
                        "REGION",
                        state.REGION,
                        "required"
                      )}</div>
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
                  BOTTLE RELEASE
                </label>
                <select
                  style={{
                    // height: "2rem",
                    // padding: "1.2rem",
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    marginTop: "0.8rem",
                    backgroundColor: "var(--background3)",
                  }}
                  className="form-control"
                  id="exampleInputtext1"
                  name="BottleRelease"
                  onChange={handleChange}
                >
                  <option value="">Select Bottle Release</option>
                  {BottleRelease && BottleRelease.length > 0
                    ? BottleRelease.map((object, i) => (
                        <option
                          key={i}
                          value={object}
                        >
                          {object}
                        </option>
                      ))
                    : ""}
                </select>
                <div style={{color:"red"}}>{validator.current.message(
                        "BottleRelease",
                        state.BottleRelease,
                        "required"
                      )}</div>
              </div>
              <div className="form-group" >
                <label
                  style={{
                    color: "white",
                    marginTop: "3%",
                    marginBottom: "1%",
                    fontSize: "0.8rem",
                  }}
                  htmlFor="exampleInputtext1"
                >
                  BOTTLING DATE{" "}
                </label>{" "}
                <input
                type="date"
                  placeholder="JANUARY 2020"
                  style={{
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    backgroundColor: "var(--background3)",
                    padding:"3px",
                    paddingLeft:"5px",
                    height:"45px"
                    
                    
                  }}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  name="bottlingDate"
                  value={state.bottlingDate}
                  onChange={handleChange}
                />
                
                <div style={{color:"red"}}>{validator.current.message(
                        "bottlingDate",
                        state.bottlingDate,
                        "required"
                      )}</div>
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
                  ADDITIONAL DETAILS{" "}
                </label>{" "}
                <textarea
                  placeholder="LIMITED EDITION, 1 OF 500"
                  style={{
                    borderWidth: "0.2rem",
                    color: "var(--background2)",
                    borderColor: "var(--borderColor)",
                    backgroundColor: "var(--background3)",
                    resize:"none",
                    height:"100px"
                  }}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  name="additionalDetails"
                  value={state.additionalDetails}
                  onChange={handleChange}
                />
                {/* <div style={{color:"red"}}>{validator.current.message(
                        "additionalDetails",
                        state.additionalDetails,
                        "required"
                      )}</div> */}
              </div>
              <button
                style={{
                  color: "black",
                  width: "100%",
                  borderRadius: "1%",
                  background: "var(--background2)",
                  marginTop: "5%",
                  border: "none",
                }}
                type="submit"
                className="btn btn-primary"
              >
                SUBMIT{" "}
              </button>
            </form>
          </div>
          <div
            style={{
              background: "var(--background)",
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              padding:"5%",
              marginBottom:"30%"
            }}
          >
            <div style={{display: 'flex', width: '100%', justifyContent:'space-between'}}>
              <h3 style={{color:"white",fontWeight:"400",fontSize:"1.5rem"}}>Results</h3>
              <button style={{color:"white",fontWeight:"400",fontSize:"1.5rem", background: 'transparent', border: 'none'}} onClick={(e) => handleSubmit(e,"SAVE")}>
                Save
              </button>
            </div>
            <h4  style={{color:"var(--background2)",fontFamily:"fright",marginBottom:"4%"}}>Glenfiddich 40-Year-Old</h4> 
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>DISTILLERY</p>
                <p style={{color:"white", textAlign:"end"}}>{state.distillery}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>AGE</p>
                <p style={{color:"white", textAlign:"end"}}>{state.AGES}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>CASK TYPE</p>
                <p style={{color:"white", textAlign:"end"}}>{state.CASK}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>CONDITION</p>
                <p style={{color:"white", textAlign:"end"}}>{state.CONDITION}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>PRICE</p>
                <p style={{color:"white", textAlign:"end"}}>{state.PRICE}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>REGION</p>
                <p style={{color:"white", textAlign:"end"}}>{state.REGION}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>BOTTLE RELEASE</p>
                <p style={{color:"white", textAlign:"end"}}>{state.BottleRelease}</p>
            </div>
            
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>BOTTLING DATE</p>
                <p style={{color:"white", textAlign:"end"}}>{state.bottlingDate}</p>
            </div>
            <div style={{display:"grid" ,gridTemplateColumns:"50% 50%",gap:"1%",fontSize:"0.9rem"}}>
                <p style={{color:"var(--background2)"}}>ADDITIONAL DETAILS</p>
                <p style={{color:"white", textAlign:"end"}}>{state.additionalDetails}</p>
            </div>
            <hr style={{color:"white" ,marginTop:"3%",marginBottom:"3%"}}></hr>
            <p style={{color:"white",fontSize:"0.9rem"}}>ESTIMATED VALUE</p>
            <h3  style={{color:"var(--background2)",fontSize:"54px"}}>$12,000</h3>
            <p style={{color:"white",fontSize:"0.9rem"}}>VALUATION BREAKDOWN</p>
            <ul style={{color:"var(--background2)",fontSize:"0.8rem"}}>
                <li>Comparable Sales: $4,800 - $5,200</li>
                <li>Rarity Factor: +5% (Limited Edition)</li>
                <li>Market Trend: +2% (Increased demand for Macallan)</li>
            </ul>

          </div>
        </div>
        <h2 style={{color:"var(--background2)",fontSize:"48px",paddingBottom:"5%",paddingLeft:"5%",paddingRight:"5%",fontFamily:"fright",textAlign:"center",width:"100%",fontWeight:"700"}}>Explore the potential worth of your whiskey collection with our valuation tool and make informed decisions about your investments.</h2>

      </div>
    </div>
  );
};

export default Valuation;
