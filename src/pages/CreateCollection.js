import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { create } from "ipfs-http-client";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COLLECTION_ABI } from "../NFT_ABI";
import { Buffer } from "buffer";
import Web3 from "web3";
import { API_URL } from "../constants/userConstants";

const web3 = new Web3(Web3.givenProvider);

const Profile = () => {
  let [hashmetaData, sethashmetaData] = useState();

  let navigate = useNavigate();
  let [isloading, setLoading] = useState(false);
  let [ipfshashArray, setipfshashArray] = useState([]);
  const { user } = useSelector((state) => state);
  let [collection_title, setcollection_title] = useState();
  let [collection_url, setcollection_url] = useState();
  let [collection_description, setcollection_description] = useState();
  let [bottleNumber, setbottleNumber] = useState();
  let [region, selectRegion] = useState();
  let [award, setAward] = useState();
  let [attributes1, setattributes1] = useState();
  let [account, setAccount] = useState();
  let [attributes2, setattributes2] = useState();
  useEffect(() => {
    setAccount(user && user.user && user.user.address);
  }, [user]);
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
  let awardsArray = [
    'Select Awards',
     'San Francisco World Spirits Competition',
 "World Whiskies Awards",
  "International Wine and Spirits Competition" ,
 "American Distilling Institute Awards ",
 "World Whiskies Awards Japan",
 "International Spirits Challenge",
  "International Review of Spirits",
  "The Scotch Whisky Masters",
  "American Craft Spirits Awards", 
  "Jim Murray's Whisky Bible Awards" 
  ]
  const countries = [
    {name:"Enter Region"},
    {name: "Afghanistan",code: "AF"},
    {name: "Åland Islands",code: "AX"},
    {name: "Albania",code: "AL"},
    {name: "Algeria",code: "DZ"},
    {name: "American Samoa",code: "AS"},
    {name: "Andorra",code: "AD"},
    {name: "Angola",code: "AO"},
    {name: "Anguilla",code: "AI"},
    {name: "Antarctica",code: "AQ"},
    {name: "Antigua & Barbuda",code: "AG"},
    {name: "Argentina",code: "AR"},
    {name: "Armenia",code: "AM"},
    {name: "Aruba",code: "AW"},
    {name: "Australia",code: "AU"},
    {name: "Austria",code: "AT"},
    {name: "Azerbaijan",code: "AZ"},
    {name: "Bahamas",code: "BS"},
    {name: "Bahrain",code: "BH"},
    {name: "Bangladesh",code: "BD"},
    {name: "Barbados",code: "BB"},
    {name: "Belarus",code: "BY"},
    {name: "Belgium",code: "BE"},
    {name: "Belize",code: "BZ"},
    {name: "Benin",code: "BJ"},
    {name: "Bermuda",code: "BM"},
    {name: "Bhutan",code: "BT"},
    {name: "Bolivia",code: "BO"},
    {name: "Caribbean Netherlands",code: "BQ"},
    {name: "Bosnia & Herzegovina",code: "BA"},
    {name: "Botswana",code: "BW"},
    {name: "Bouvet Island",code: "BV"},
    {name: "Brazil",code: "BR"},
    {name: "British Indian Ocean Territory",code: "IO"},
    {name: "Brunei",code: "BN"},
    {name: "Bulgaria",code: "BG"},
    {name: "Burkina Faso",code: "BF"},
    {name: "Burundi",code: "BI"},
    {name: "Cambodia",code: "KH"},
    {name: "Cameroon",code: "CM"},
    {name: "Canada",code: "CA"},
    {name: "Cape Verde",code: "CV"},
    {name: "Cayman Islands",code: "KY"},
    {name: "Central African Republic",code: "CF"},
    {name: "Chad",code: "TD"},
    {name: "Chile",code: "CL"},
    {name: "China",code: "CN"},
    {name: "Christmas Island",code: "CX"},
    {name: "Cocos (Keeling) Islands",code: "CC"},
    {name: "Colombia",code: "CO"},
    {name: "Comoros",code: "KM"},
    {name: "Congo - Brazzaville",code: "CG"},
    {name: "Congo - Kinshasa",code: "CD"},
    {name: "Cook Islands",code: "CK"},
    {name: "Costa Rica",code: "CR"},
    {name: "Côte d’Ivoire",code: "CI"},
    {name: "Croatia",code: "HR"},
    {name: "Cuba",code: "CU"},
    {name: "Curaçao",code: "CW"},
    {name: "Cyprus",code: "CY"},
    {name: "Czechia",code: "CZ"},
    {name: "Denmark",code: "DK"},
    {name: "Djibouti",code: "DJ"},
    {name: "Dominica",code: "DM"},
    {name: "Dominican Republic",code: "DO"},
    {name: "Ecuador",code: "EC"},
    {name: "Egypt",code: "EG"},
    {name: "El Salvador",code: "SV"},
    {name: "Equatorial Guinea",code: "GQ"},
    {name: "Eritrea",code: "ER"},
    {name: "Estonia",code: "EE"},
    {name: "Ethiopia",code: "ET"},
    {name: "Falkland Islands (Islas Malvinas)",code: "FK"},
    {name: "Faroe Islands",code: "FO"},
    {name: "Fiji",code: "FJ"},
    {name: "Finland",code: "FI"},
    {name: "France",code: "FR"},
    {name: "French Guiana",code: "GF"},
    {name: "French Polynesia",code: "PF"},
    {name: "French Southern Territories",code: "TF"},
    {name: "Gabon",code: "GA"},
    {name: "Gambia",code: "GM"},
    {name: "Georgia",code: "GE"},
    {name: "Germany",code: "DE"},
    {name: "Ghana",code: "GH"},
    {name: "Gibraltar",code: "GI"},
    {name: "Greece",code: "GR"},
    {name: "Greenland",code: "GL"},
    {name: "Grenada",code: "GD"},
    {name: "Guadeloupe",code: "GP"},
    {name: "Guam",code: "GU"},
    {name: "Guatemala",code: "GT"},
    {name: "Guernsey",code: "GG"},
    {name: "Guinea",code: "GN"},
    {name: "Guinea-Bissau",code: "GW"},
    {name: "Guyana",code: "GY"},
    {name: "Haiti",code: "HT"},
    {name: "Heard & McDonald Islands",code: "HM"},
    {name: "Vatican City",code: "VA"},
    {name: "Honduras",code: "HN"},
    {name: "Hong Kong",code: "HK"},
    {name: "Hungary",code: "HU"},
    {name: "Iceland",code: "IS"},
    {name: "India",code: "IN"},
    {name: "Indonesia",code: "ID"},
    {name: "Iran",code: "IR"},
    {name: "Iraq",code: "IQ"},
    {name: "Ireland",code: "IE"},
    {name: "Isle of Man",code: "IM"},
    {name: "Israel",code: "IL"},
    {name: "Italy",code: "IT"},
    {name: "Jamaica",code: "JM"},
    {name: "Japan",code: "JP"},
    {name: "Jersey",code: "JE"},
    {name: "Jordan",code: "JO"},
    {name: "Kazakhstan",code: "KZ"},
    {name: "Kenya",code: "KE"},
    {name: "Kiribati",code: "KI"},
    {name: "North Korea",code: "KP"},
    {name: "South Korea",code: "KR"},
    {name: "Kosovo",code: "XK"},
    {name: "Kuwait",code: "KW"},
    {name: "Kyrgyzstan",code: "KG"},
    {name: "Laos",code: "LA"},
    {name: "Latvia",code: "LV"},
    {name: "Lebanon",code: "LB"},
    {name: "Lesotho",code: "LS"},
    {name: "Liberia",code: "LR"},
    {name: "Libya",code: "LY"},
    {name: "Liechtenstein",code: "LI"},
    {name: "Lithuania",code: "LT"},
    {name: "Luxembourg",code: "LU"},
    {name: "Macao",code: "MO"},
    {name: "North Macedonia",code: "MK"},
    {name: "Madagascar",code: "MG"},
    {name: "Malawi",code: "MW"},
    {name: "Malaysia",code: "MY"},
    {name: "Maldives",code: "MV"},
    {name: "Mali",code: "ML"},
    {name: "Malta",code: "MT"},
    {name: "Marshall Islands",code: "MH"},
    {name: "Martinique",code: "MQ"},
    {name: "Mauritania",code: "MR"},
    {name: "Mauritius",code: "MU"},
    {name: "Mayotte",code: "YT"},
    {name: "Mexico",code: "MX"},
    {name: "Micronesia",code: "FM"},
    {name: "Moldova",code: "MD"},
    {name: "Monaco",code: "MC"},
    {name: "Mongolia",code: "MN"},
    {name: "Montenegro",code: "ME"},
    {name: "Montserrat",code: "MS"},
    {name: "Morocco",code: "MA"},
    {name: "Mozambique",code: "MZ"},
    {name: "Myanmar (Burma)",code: "MM"},
    {name: "Namibia",code: "NA"},
    {name: "Nauru",code: "NR"},
    {name: "Nepal",code: "NP"},
    {name: "Netherlands",code: "NL"},
    {name: "Curaçao",code: "AN"},
    {name: "New Caledonia",code: "NC"},
    {name: "New Zealand",code: "NZ"},
    {name: "Nicaragua",code: "NI"},
    {name: "Niger",code: "NE"},
    {name: "Nigeria",code: "NG"},
    {name: "Niue",code: "NU"},
    {name: "Norfolk Island",code: "NF"},
    {name: "Northern Mariana Islands",code: "MP"},
    {name: "Norway",code: "NO"},
    {name: "Oman",code: "OM"},
    {name: "Pakistan",code: "PK"},
    {name: "Palau",code: "PW"},
    {name: "Palestine",code: "PS"},
    {name: "Panama",code: "PA"},
    {name: "Papua New Guinea",code: "PG"},
    {name: "Paraguay",code: "PY"},
    {name: "Peru",code: "PE"},
    {name: "Philippines",code: "PH"},
    {name: "Pitcairn Islands",code: "PN"},
    {name: "Poland",code: "PL"},
    {name: "Portugal",code: "PT"},
    {name: "Puerto Rico",code: "PR"},
    {name: "Qatar",code: "QA"},
    {name: "Réunion",code: "RE"},
    {name: "Romania",code: "RO"},
    {name: "Russia",code: "RU"},
    {name: "Rwanda",code: "RW"},
    {name: "St. Barthélemy",code: "BL"},
    {name: "St. Helena",code: "SH"},
    {name: "St. Kitts & Nevis",code: "KN"},
    {name: "St. Lucia",code: "LC"},
    {name: "St. Martin",code: "MF"},
    {name: "St. Pierre & Miquelon",code: "PM"},
    {name: "St. Vincent & Grenadines",code: "VC"},
    {name: "Samoa",code: "WS"},
    {name: "San Marino",code: "SM"},
    {name: "São Tomé & Príncipe",code: "ST"},
    {name: "Saudi Arabia",code: "SA"},
    {name: "Senegal",code: "SN"},
    {name: "Serbia",code: "RS"},
    {name: "Serbia",code: "CS"},
    {name: "Seychelles",code: "SC"},
    {name: "Sierra Leone",code: "SL"},
    {name: "Singapore",code: "SG"},
    {name: "Sint Maarten",code: "SX"},
    {name: "Slovakia",code: "SK"},
    {name: "Slovenia",code: "SI"},
    {name: "Solomon Islands",code: "SB"},
    {name: "Somalia",code: "SO"},
    {name: "South Africa",code: "ZA"},
    {name: "South Georgia & South Sandwich Islands",code: "GS"},
    {name: "South Sudan",code: "SS"},
    {name: "Spain",code: "ES"},
    {name: "Sri Lanka",code: "LK"},
    {name: "Sudan",code: "SD"},
    {name: "Suriname",code: "SR"},
    {name: "Svalbard & Jan Mayen",code: "SJ"},
    {name: "Eswatini",code: "SZ"},
    {name: "Sweden",code: "SE"},
    {name: "Switzerland",code: "CH"},
    {name: "Syria",code: "SY"},
    {name: "Taiwan",code: "TW"},
    {name: "Tajikistan",code: "TJ"},
    {name: "Tanzania",code: "TZ"},
    {name: "Thailand",code: "TH"},
    {name: "Timor-Leste",code: "TL"},
    {name: "Togo",code: "TG"},
    {name: "Tokelau",code: "TK"},
    {name: "Tonga",code: "TO"},
    {name: "Trinidad & Tobago",code: "TT"},
    {name: "Tunisia",code: "TN"},
    {name: "Turkey",code: "TR"},
    {name: "Turkmenistan",code: "TM"},
    {name: "Turks & Caicos Islands",code: "TC"},
    {name: "Tuvalu",code: "TV"},
    {name: "Uganda",code: "UG"},
    {name: "Ukraine",code: "UA"},
    {name: "United Arab Emirates",code: "AE"},
    {name: "United Kingdom",code: "GB"},
    {name: "United States",code: "US"},
    {name: "U.S. Outlying Islands",code: "UM"},
    {name: "Uruguay",code: "UY"},
    {name: "Uzbekistan",code: "UZ"},
    {name: "Vanuatu",code: "VU"},
    {name: "Venezuela",code: "VE"},
    {name: "Vietnam",code: "VN"},
    {name: "British Virgin Islands",code: "VG"},
    {name: "U.S. Virgin Islands",code: "VI"},
    {name: "Wallis & Futuna",code: "WF"},
    {name: "Western Sahara",code: "EH"},
    {name: "Yemen",code: "YE"},
    {name: "Zambia",code: "ZM"},
    {name: "Zimbabwe",code: "ZW"}
];
  const createCollection = async (hashmetaData) => {
    setLoading(true);
    // Test values
    try {
      let collectionContractAddress =
        "0x2E73fa6d643EeB770aA26be13eF0dA7C697d3561";
      let collectionName = collection_title; // Replace
      let ipfsHash = hashmetaData; //Replace
      // Contract instance
      const contractInstance = new web3.eth.Contract(
        COLLECTION_ABI,
        collectionContractAddress
      );
      // Find gas limit
      let limit = await contractInstance.methods
        .createCollection(collectionName, ipfsHash)
        .estimateGas({ from: account });
      // Call a function of the contract:
      let data = await contractInstance.methods
        .createCollection(collectionName, ipfsHash)
        .send(
          {
            from: account,
            value: 0,
            gasLimit: limit + 5000,
          },
          async (err, transactionHash) => {
            console.log(transactionHash);
            if (transactionHash) {
              let transactionReceipt = null;
              while (transactionReceipt === null) {
                // console.log(
                //   "In-Progress transaction receipt for approve: ",
                //   transactionReceipt
                // );
                transactionReceipt = await web3.eth.getTransactionReceipt(
                  transactionHash
                );
              }

              transactionReceipt.status == true &&
                toast.success("Collection created successfully");
              sethashmetaData();
            } else {
              if (
                err.message ==
                "MetaMask Tx Signature: User denied transaction signature."
              ) {
                toast.error(" User denied transaction signature");
                sethashmetaData();
                setLoading(false);
                setcollection_description();
                setcollection_title();
                setcollection_url();
                setattributes1();
                setattributes2();
              }
            }
          }
        );
      let datas = {
        Collections:
          data?.events?.CollectionCreated?.returnValues?.newCollection,
      };
      const res = await axios.post(`${API_URL}/create-collection`, datas);
      if (res && res.data && res.data.message == "collection created") {
        setLoading(false);
        setTimeout(() => {
          window.location.href = "/upload-2";
        }, 2000); // closeModal2();
      }

      console.log(data?.events?.CollectionCreated?.returnValues?.newCollection);
    } catch (err) {
      console.log(err);
    }
  };

  async function metaDataUpload(metadata) {
    let ipfsResponse = [];
    ipfs
      .add(
        { path: "/metadata.json", content: metadata },
        { wrapWithDirectory: true, pin: true }
      )
      .then((data) => {
        sethashmetaData(data.cid.toString());
        console.log(hashmetaData);
        console.log(data.cid.toString());

        createCollection(data.cid.toString());
      });
  }
  async function Handler() {
    if (
      !collection_title &&
      !collection_description &&
      !bottleNumber &&
      !collection_url &&
      !attributes1 &&
      !attributes2&&!region&&!award
    ) {
      return toast.error("Enter all fields");
    }
    if (!bottleNumber) {
      return toast.error("Enter bottle number");
    }
    if (!region) {
      return toast.error("Enter region");
    }
    if (!collection_title) {
      return toast.error("Enter collection name");
    }
    if (!collection_url) {
      return toast.error("Enter collection url");
    }
    if (!collection_description) {
      return toast.error("Enter collection description");
    }
    if (!award) {
      return toast.error("Please select award");
    }
    if (data && !data[0].attribute1) {
      return toast.error("Please Enter Attribute");
    }
    if (specialEdition==false&&limitedEdition==false&&exclusiveEdition==false) {
      return toast.error("Please select edition");
    }
    if (collection_title && collection_description && collection_url) {
      let metadata1 = {
        collection_title: `${collection_title}`,
        collection_url: `${collection_url}`,
        bottleNumber: `${bottleNumber}`,
        collection_description: `${collection_description}`,
        limitedEdition: `${limitedEdition}`,
        specialEdition: `${specialEdition}`,
        region: `${region}`,
        award: `${award}`,
        exclusiveEdition: `${exclusiveEdition}`,
        ...data,
      };

      console.log(metadata1);
      let metadata = JSON.stringify(metadata1);
      if (metadata) {
        metaDataUpload(metadata);
      }
    }
  }

  const [data, setData] = useState([{}]);

  const handleClick = () => {
    setData([...data, {}]);
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };  const [directSale, setDirectSale] = useState(false);

  const [limitedEdition, setLimitedEdition] = useState(false);
  const [specialEdition, setSpecialEdition] = useState(false);
  const [exclusiveEdition, setExclusiveedition] = useState(false);

  const handleLimitedEdition = () => {
    setLimitedEdition((current) => !current);
  };
  const handleSpecialEdition = () => {
    setSpecialEdition((current) => !current);
  };
  const handleExclusiveEdition = () => {
    setExclusiveedition((current) => !current);
  };
  return (
    <>
      {isloading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            background: "var(--background)",
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
        <>
          <div style={{ background: "var(--background)", padding: "5%" }}>
            <h1 style={{ color: "var(--background2)", fontFamily: "Fright" }}>
              Add new collection
            </h1>
          </div>
          <div>
            <div>
              <div
                style={{
                  backgroundImage: "url(/images/bannercreateCollection.png)",
                  height: "56vh",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    className="photoDiv"
                    style={{
                      marginLeft: "5%",
                      marginTop: "10%",
                      padding: "3%",
                      width: "22%",
                      height: "10%",
                      padding: "0%",
                    }}
                  >
                    <img src="/images/productimg.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              paddingRight: "5rem",
              paddingTop: "5%",
              background: "var(--background)",
              height: "fit-content",
            }}
          >
            <div
              style={{
                width: "100%",
                background: "var(--background)",
                paddingTop: "5%",
                paddingBottom: "0%",
              }}
            >
              <div
                style={{
                  background: "var(--background)",
                  marginTop: "5%",
                  padding: "5%",
                }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "80%", marginLeft: "10%" }}
                >
                  <div className="form-group">
                    <label
                      style={{
                        color: "white",
                        fontSize: "0.8rem",
                      }}
                      htmlFor="exampleInputEmail1"
                    >
                      {" "}
                      COLLECTION TITLE
                    </label>
                    <input
                      onChange={(e) => {
                        setcollection_title(e.target.value);
                      }}
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderColor: "var(--borderColor)",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background3)",
                      }}
                      placeholder="COLLECTION TITLE"
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
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
                      COLLECTION URL{" "}
                    </label>
                    <input
                      onChange={(e) => {
                        setcollection_url(e.target.value);
                      }}
                      style={{
                        height: "2rem",
                        padding: "1.2rem",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        borderColor: "var(--borderColor)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background3)",
                      }}
                      placeholder="https:nftmarketplace.cxess.com/collection/ "
                      type="text"
                      className="form-control"
                      id="exampleInputtext1"
                    />
                  </div>

                  <div style={{ color: "white" }} className="form-group">
                    <label
                      style={{
                        color: "white",
                        marginTop: "3%",
                        marginBottom: "1%",
                        fontSize: "0.8rem",
                      }}
                      htmlFor="exampleInputtext1"
                    >
                      SELECT REGION{" "}
                    </label>
                    <br></br>
                    <select
                    onChange={(e)=>selectRegion(e.target.value)} 
                      style={{
                        color: "var(--background2)",
                        padding: "1%",
                        width: "100%",
                        background: "var(--background3)",
                        borderColor: "var(--borderColor)",
                      }}
                      name="cars"
                      id="cars"
                    >
                      {countries.map((item)=>(
                      <option 
                      value={item.name}>{item.name}</option>
                      ))}

                    </select>
                  </div>
                  <div style={{ color: "white" }} className="form-group">
                    <label
                      style={{
                        color: "white",
                        marginTop: "3%",
                        marginBottom: "1%",
                        fontSize: "0.8rem",
                      }}
                      htmlFor="exampleInputtext1"
                    >
                     SELECT AWARDS
                    </label>
                    <br></br>
                    <select
                    onChange={(e)=>setAward(e.target.value)} 
                      style={{
                        color: "var(--background2)",
                        padding: "1%",
                        width: "100%",
                        background: "var(--background3)",
                        borderColor: "var(--borderColor)",
                      }}
                      name="cars"
                      id="cars"
                    >
                      {awardsArray.map((item)=>(
                      <option 
                      value={item}>{item}</option>
                      ))}

                    </select>
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
                      BOTTLE NUMBER{" "}
                    </label>
                    <input
                      onChange={(e) => {
                        setbottleNumber(e.target.value);
                      }}
                      style={{
                        width:"100%",
                        height: "2rem",
                        padding: "1.2rem",
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        borderColor: "var(--borderColor)",
                        marginTop: "0.8rem",
                        backgroundColor: "var(--background3)",
                      }}
                      placeholder="Enter bottle number "
                      type="number"
                      className="form-control"
                      id="exampleInputtext1"
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
                      COLLECTION DESCRIPTION{" "}
                    </label>{" "}
                    <textarea
                      onChange={(e) => {
                        setcollection_description(e.target.value);
                      }}
                      placeholder="write our collection description"
                      style={{
                        borderWidth: "0.2rem",
                        color: "var(--background2)",
                        borderColor: "var(--borderColor)",
                        backgroundColor: "var(--background3)",
                        resize:"none",

                      }}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={5}
                      defaultValue={""}
                    />
                  </div>
                  {data.map((val, i) => (
                    <>
                      <div className="form-group">
                        {i == 0 && (
                          <label
                            style={{
                              color: "white",
                              marginTop: "3%",
                              marginBottom: "1%",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="exampleInputtext1"
                          >
                            ATTRIBUTES{" "}
                          </label>
                        )}
                        <div style={{ display: "flex" }}>
                          <input
                            name={`attribute${i + 1}`}
                            value={val.attribute}
                            onChange={(e) => handleChange(e, i)}
                            style={{
                              height: "2rem",
                              padding: "1.2rem",
                              borderWidth: "0.2rem",
                              color: "var(--background2)",
                              borderRight: "none",
                              borderRadius: "1px",
                              borderColor: "var(--borderColor)",
                              marginTop: "0.8rem",
                              backgroundColor: "var(--background3)",
                            }}
                            placeholder={`ATTRIBUTE ${i + 1}`}
                            type="text"
                            className="form-control"
                            id="exampleInputtext1"
                          />
                          {i !== 0 && (
                            <button
                              style={{
                                width: "50px",
                                height: "44px",
                                marginTop: "13px",
                                background: "var(--background3)",
                                fontWeight: "500",
                                color: "var(--background2)",
                                border: "3px solid var(--borderColor)",
                                borderLeft: "none",
                              }}
                              onClick={() => handleDelete(i)}
                            >
                              X
                            </button>
                          )}
                          {i == 0 && (
                            <button
                              style={{
                                width: "50px",
                                height: "44px",
                                marginTop: "13px",
                                background: "var(--background3)",
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "var(--background2)",
                                border: "3px solid var(--borderColor)",
                                borderLeft: "none",
                              }}
                              onClick={handleClick}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",marginTop:"5%",marginBottom:"5%"}}>

                      <div>
                        {" "}
               
                        <p style={{ color: "var(--background2)" }}>
                        LIMITED EDITION BOTTLING
                        </p>
                      </div>
                      <div  >
                        <Form >
                          <Form.Check
                            disabled={specialEdition||exclusiveEdition}
                            type="switch"
                            id="custom-switch"
                            onClick={() =>
                             handleLimitedEdition()
                            }
                          />
                         </Form>
                      </div>
                      </div>
                 <div style={{display:"flex",justifyContent:"space-between"}}>
                 <div>
                        {" "}
               
                        <p style={{ color: "var(--background2)"}}>
                        SPECIAL EDITION BOTTLING
                        </p>
                      </div>
                      <div>
                        <Form >
                          <Form.Check
                            disabled={limitedEdition||exclusiveEdition}
                            type="switch"
                            id="custom-switch"
                            onClick={() =>
                               handleSpecialEdition()
                            }
                          />
                        </Form>
                      </div>
                 </div>

                 <div style={{display:"flex",justifyContent:"space-between",marginTop:"5%"}}>

                      <div>
                        {" "}
               
                        <p style={{ color: "var(--background2)" }}>
                        EXCLUSIVE EDITION BOTTLING
                        </p>
                      </div>
                      <div >
                        <Form >
                          <Form.Check
                            disabled={limitedEdition||specialEdition}
                            type="switch"
                            id="custom-switch"
                            onClick={() =>
                               handleExclusiveEdition()
                            }
                          />
                        </Form>
                      </div>
                      </div>
                      <div></div>
                    </>
                  ))}

                  <button
                    onClick={() => Handler()}
                    style={{
                      color: "white",
                      width: "100%",
                      borderRadius: "1%",
                      background: "var(--background2)",
                      marginTop: "5%",
                      border: "none",
                    }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    CREATE COLLECTION{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
