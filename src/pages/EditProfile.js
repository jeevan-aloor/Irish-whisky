import React, { useState,useEffect,useRef} from 'react'
import {useDropzone} from 'react-dropzone';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../constants/userConstants';
import authActions from "../redux/auth/actions"
import { Button } from 'react-bootstrap'


const { updateUser,login } = authActions

const EditProfile = () => {
  let [isloading,setLoading] = useState(true)
  let [checkValue,setValue]=useState(true)
  let editForm1=useRef()
  let editForm2=useRef()
  let nameRef=useRef()
  let urlRef=useRef()
  let bioRef=useRef()
  useDropzone({    
    maxFiles:1
  });



  const handleClear=()=>{
    setData({
      url: '',
    name: '',
    bio:'',

    })
    
    editForm1.current.reset()
    editForm2.current.reset()
  }


  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  

  const  {user} = useSelector((state) => state.user);
  console.log(user,"user")
  const dispatch = useDispatch()

  const navigate=useNavigate()
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
    
  });
  console.log(files,"fileeee")
  
 
 
  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const [data, setData] = useState({
    url: '',
    name: '',
    bio:'',
    
    
   
  })
  
  useEffect(() => {
    setData({
      url: user && user.url,
      name: user && user.name,
      bio: user && user.bio,
      
     
    })
    setTimeout(() => {
       setLoading(false)
    }, 2000);
  }, []);

  const { url, name,bio } = data

  const handleChange = (e) => {
    const {name, value} = e.target
    setData({...data, [name]: value});
  };


   const addUserData = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!url || ! name) {
      setLoading(false)
      return toast.error("All fields are required");
    }
    if(!files[0]){
      setLoading(false)
      return toast.error("Please select profile picture");

    }
    if(bio.length > 150){
      setLoading(false)
      return toast.error("Bio cannot exceed more than 150.")
    }
    // if (!validateEmail(email)) {
    //   console.log("no validate");
    //   return toast.error("Please enter a valid email");
    // }

    var formData = new FormData();
    formData.append("photo", files[0]);
    formData.append("url", url);
    formData.append("name", name);
    formData.append("bio", bio);
    
    // dispatch(login({user: data}))
    // dispatch(updateUser({user: data}))
      const headers={"Content-Type": "multipart/form-data"}
      const res = await axios.put(`${API_URL}/profileupdate`, formData,{withCredentials:true}, headers);
      dispatch(updateUser({user: res.data.user}))
      setLoading(false)
      if(res.data.message === 'valid token'){
        window.location.href = "/profile"
      }
      if (res.data.status === 401 || !res.data) {
        console.log("errror")
      } else {
      }
  }

  return (
<>
{isloading ?   <div style={{height:"80vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--background)"}}>
  <ReactLoading type={'bubbles'} color={'var(--background2)'} height={'10%'} width={'10%'} />
</div>  
 :
 
<div style={{ background: "var(--background)"}}>
<div>
    
    <div style={{
       
        display:"flex",alignItems:"center",justifyContent:"space-between",paddingLeft:"5%",paddingRight:"5%"}}>
    <Button
            style={{
              color: "white",
              backgroundColor: "var(--background)",
              height: "2.5rem",
              marginTop: "0.8rem",
              marginRight: "1rem",
              borderColor: "var(--background2)",
              borderRadius:"0%",
              paddingLeft:"3%",
              paddingRight:"3%",
              borderWidth:"0.1rem",
              fontSize:"0.7rem"
              


            }}
            onClick={()=>navigate("/profile")}
          >
 <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M3.606 0.843797C3.33545 0.59406 2.91368 0.610928 2.66394 0.881474L0.510094 3.21478C0.274362 3.47015 0.27436 3.86378 0.510089 4.11915L2.66394 6.45251C2.91367 6.72306 3.33544 6.73994 3.60599 6.4902C3.87654 6.24047 3.89341 5.81869 3.64368 5.54815L2.52261 4.33364L8.99996 4.33364C9.36815 4.33364 9.66663 4.03516 9.66663 3.66697C9.66663 3.29878 9.36815 3.0003 8.99996 3.0003L2.52263 3.0003L3.64367 1.78585C3.89341 1.51531 3.87654 1.09353 3.606 0.843797Z" fill="#D2A163"/>
</svg>&nbsp;&nbsp;&nbsp;
      BACK TO PROFILE
          </Button>{" "}
          <div style={{display:"flex",marginTop:"2%"}}>
            <p style={{color:"var(--background2)",fontSize:"0.8rem"}}>PROFILE &nbsp;&nbsp;&nbsp;&nbsp;  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L3.58579 5L0.792893 7.79289C0.402369 8.18342 0.402369 8.81658 0.792893 9.20711C1.18342 9.59763 1.81658 9.59763 2.20711 9.20711L5.70711 5.70711C6.09763 5.31658 6.09763 4.68342 5.70711 4.29289L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893Z" fill="#D2A163"/>
</svg>
</p>      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <p style={{color:"white",fontSize:"0.8rem"}}>EDIT PROFILE 
</p>
          </div>

    </div>
    <hr style={{color:"var(--background2)"}}></hr>
     
    </div>
    <div  style={{ paddingLeft: "10%", paddingTop: "5%" ,paddingBottom:"5%"}}>
      <div >
        <h3 style={{ color: "white", fontFamily: "Freight Big Pro",fontSize:"48px" }}>Edit profile</h3>
        <p style={{ color: "var(--background2)" }}>
          You can set preferred display name, create <span style={{ color: "white" }}>YOUR PROFILE URL  </span> and manage other personal settings.</p>

      </div>
      <div style={{ display: "grid", gridTemplateColumns: "30% 50%", gap: "2%", marginTop: "5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "30% 50%", marginTop: "5%", gap: "15%" }}>
 {files.length?null : <img style={{width:"130px",height:"130px",borderRadius:"50%"}}   src={data &&data.imgpath?`${data.imgpath}`:user && user.imgpath ?`${user.imgpath}` : "/images/defaultpro.png"}/>}
 { files.map(file => (
    <div key={file.name}>
      <div >
        <img
          src={file.preview ? file.preview : user.imgpath}
          style={{borderRadius:"50%",width:"130px",height:"130px"}}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ))}        <div>                <p style={{ color: "white" }}>PROFILE PHOTO</p>

            <p style={{ color: "var(--background2)" }}>  We recommend an image<br></br>
              of at least 400x400.<br></br>Gifs work too 🙌 </p>
             
              <section className="container">
      <div    style={{
                            borderRadius: "0rem",
                            color: "var(--background2)",
                            borderColor: "var(--background2)",
                            borderStyle:"solid",
                            borderWidth:"0.1rem",
                            height: "2.5rem",
                            backgroundColor: "var(--background)",
                            width: "60%",
                            marginTop: "20%",
                            textAlign:"center",
                            cursor:"pointer"
                            

                          }} {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p style={{marginTop:"5%",color:"#FCFCFD"}}>UPLOAD</p>
      </div>
      
    </section>

           </div>
        </div>
        <div>
          <h4 style={{ fontSize: "1rem", color: "white", marginLeft: "9%", marginBottom: "5%" }}>ACCOUNT INFO</h4>

          <form style={{ width: "80%", marginLeft: "10%" }} onSubmit={addUserData} ref={editForm1}>
            <div className="form-group">
              <label style={{
                color: "#3D3028", fontSize: "0.8rem",
              }} htmlFor="exampleInputEmail1"> DISPLAY NAME *</label>
              <input style={{
                height: "2rem",
                padding: "1.2rem",
                borderColor: "var(--borderColor)",
                borderWidth: "0.2rem",
                color: "var(--background2)",
                marginTop: "0.8rem",
                backgroundColor: "var(--background)",
              }} placeholder='John Doe' type="text" className="form-control" id="exampleInputtext1" onChange={(e) => handleChange(e)} name='name' value={data.name} ref={nameRef}/>
            </div>
            <div className="form-group">
              <label style={{
                color: "#3D3028", marginTop: "3%", marginBottom: "1%", fontSize: "0.8rem",
              }} htmlFor="exampleInputtext1">CUSTOM URL *</label>
              <input  style={{
                height: "2rem",
                padding: "1.2rem",
                borderWidth: "0.2rem",
                color: "var(--background2)",
                borderColor: "var(--borderColor)",
                marginTop: "0.8rem",
                backgroundColor: "var(--background)",
               
              }} placeholder='IWC.NET/YOUR CUSTOM URL' type="text" className="form-control" id="exampleInputtext1" onChange={(e) => handleChange(e)}  name='url' value={data.url} ref={urlRef} />
            </div>

            <div className="form-group">
              <label style={{
                color: "#3D3028", marginTop: "3%", marginBottom: "1%", fontSize: "0.8rem",
              }} htmlFor="exampleInputtext1">BIO </label>        <textarea
                placeholder='A short bio about yourself' style={{
                  borderWidth: "0.2rem",
                  color: "var(--background2)",
                  borderColor: "var(--borderColor)",
                  backgroundColor: "var(--background)",
                  resize:"none"
                }} className="form-control" id="exampleFormControlTextarea1" rows={3}  name='bio' onChange={(e) => handleChange(e)} value={data.bio} />
            <p style={{color: "whitesmoke", marginTop: "8px"}}>Note: Bio cannot exceed more than 150 characters.</p>
            </div>
{/* <input style={{
  backgroundColor:'#d2a163' ,
  width:"80px",
  padding:"5px",
  marginTop:"20px",
  marginBottom:'5px'
}} type='submit' placeholder='submit' /> */}



          </form>
          <h4 style={{ fontSize: "1rem", color: "white", marginLeft: "9%", marginBottom: "5%", marginTop: "5%" }}>SOCIAL</h4>

          <form style={{ width: "80%", marginLeft: "10%" }} ref={editForm2}>
            <div className="form-group">
              <label style={{
                color: "#3D3028", fontSize: "0.8rem",
              }} htmlFor="exampleInputEmail1"> PORTFOLIO OR WEBSITE</label>
              <input  style={{
                height: "2rem",
                padding: "1.2rem",
                borderColor: "var(--borderColor)",
                borderWidth: "0.2rem",
                color: "var(--background2)",
                marginTop: "0.8rem",
                backgroundColor: "var(--background)",
              }} placeholder='Enter URL' type="text" className="form-control" id="exampleInputtext1" />
            </div>

            <label style={{
              color: "#3D3028", marginTop: "3%", marginBottom: "1%", fontSize: "0.8rem"
            }} htmlFor="exampleInputtext1">TWITTER</label>
            <div style={{
              borderWidth: "0.2rem",
              borderColor: "var(--borderColor)",
              borderStyle: "solid", padding: "0%"
              , display: "flex",
              margin: "1%"
            }} className="form-group">

              <input  style={{
                height: "2rem",
                padding: "1.2rem",
                borderWidth: "0.2rem",
                color: "var(--background2)",
                borderColor: "var(--background)",
                boxShadow: "none",
                backgroundColor: "var(--background)"
              }} placeholder='john.doe@example.com' type="text" className="form-control" id="exampleInputtext1" />
              <Button
                style={{
                  color: "white",
                  backgroundColor: "var(--background)",
                  height: "2.5rem",
                  marginRight: "1rem",
                  margin: "2%",
                  borderColor: "var(--borderColor)",
                  borderRadius: "0%",
                  width: "70%",
                  borderWidth: "0.1rem"
                }}
              >
                VERIFY ACCOUNT
              </Button>{" "}
            </div>



            <Button
              style={{
                color: "var(--background2)",
                backgroundColor: "var(--background)",
                height: "2.5rem",
                marginTop: "1rem",
                marginRight: "1rem",
                borderColor: "var(--borderColor)",
                borderRadius: "0%",
                width: "70%",
                borderWidth: "0.2rem"
              }}
            ><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.6673 6.99967C11.6673 9.577 9.57798 11.6663 7.00065 11.6663C4.42332 11.6663 2.33398 9.577 2.33398 6.99967C2.33398 4.42235 4.42332 2.33301 7.00065 2.33301C9.57798 2.33301 11.6673 4.42235 11.6673 6.99967ZM13.6673 6.99967C13.6673 10.6816 10.6825 13.6663 7.00065 13.6663C3.31875 13.6663 0.333984 10.6816 0.333984 6.99967C0.333984 3.31778 3.31875 0.333008 7.00065 0.333008C10.6825 0.333008 13.6673 3.31778 13.6673 6.99967ZM7.00065 2.66634C7.55294 2.66634 8.00065 3.11406 8.00065 3.66634V5.99967H10.334C10.8863 5.99967 11.334 6.44739 11.334 6.99967C11.334 7.55196 10.8863 7.99967 10.334 7.99967H8.00065V10.333C8.00065 10.8853 7.55294 11.333 7.00065 11.333C6.44837 11.333 6.00065 10.8853 6.00065 10.333V7.99967H3.66732C3.11503 7.99967 2.66732 7.55196 2.66732 6.99967C2.66732 6.44739 3.11503 5.99967 3.66732 5.99967H6.00065V3.66634C6.00065 3.11406 6.44837 2.66634 7.00065 2.66634Z" fill="#D2A163" />
              </svg> &nbsp;  &nbsp;  &nbsp;

              ADD MORE SOCIAL ACCOUNT
            </Button>{" "}
          </form>
          <p style={{ marginLeft: "10%", marginTop: "5%", color: "var(--background2)" }}>To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message</p>
          <hr style={{ color: "white", marginLeft: "10%", marginTop: "5%", marginBottom: "5%" }}></hr>

          <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10%", widht: "80%", paddingBottom: "20%" }}>
            <h6 style={{ color: "white",cursor:"pointer" }} onClick={addUserData}>UPDATE PROFILE</h6>
            <h6 style={{ color: "var(--background2)",cursor:"pointer" }} onClick={handleClear}> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#D2A163" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z" fill="#D2A163" />
            </svg> &nbsp;
              CLEAR ALL</h6>
          </div>
        </div>
      </div>
      </div>
    </div>}
</>
  )
}

export default EditProfile