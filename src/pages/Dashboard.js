import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  } from 'recharts';
import "./contact.css"
const Login = () => {
    const data = [
        {
          name: 'Jan',
          uv: 4000,
          amount: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          uv: 3000,
          amount: 1398,
          amt: 2210,
        },
        {
          name: 'Mar',
          uv: 2000,
          amount: 9800,
          amt: 2290,
        },
        {
          name: 'Apr',
          uv: 2780,
          amount: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 1890,
          amount: 4800,
          amt: 2181,
        },
        {
          name: 'Jun',
          uv: 2390,
          amount: 3800,
          amt: 2500,
        },
        {
          name: 'Jul',
          uv: 3490,
          amount: 4300,
          amt: 2100,
        },
        {
            name: 'Aug',
            uv: 3490,
            amount: 4300,
            amt: 2100,
          },
          {
            name: 'Sep',
            uv: 3490,
            amount: 4300,
            amt: 2100,
          },
          {
            name: 'Oct',
            uv: 3490,
            amount: 3000,
            amt: 2100,
          },
          {
            name: 'Nov',
            uv: 3490,
            amount: 4000,
            amt: 2100,
          },
          {
            name: 'Dec',
            uv: 3490,
            amount: 800,
            amt: 2100,
          },
      ];
      
  return (
    <div style={{ width:"100%"  ,background:"var(--background)" ,paddingBottom:"0%"}}> 
    

    
    <div style={{background:"var(--background",padding:"3%"}}>
        <div style={{marginLeft:"9%"}}>
 <h1 style={{color:"var(--background2)",fontWeight:"380",fontFamily:"Fright"}}>Dashboard</h1>
 <p style={{color:"white" ,marginBottom:"5%"}}> Discover new whiskey gems handpicked by our AI system based on your taste preferences and purchase history.
</p></div>
<div style={{marginLeft:"8%",width:"80%", justifyContent:"center", padding:"3%", borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"2%"}}>
    <h1 style={{fontSize:"1.5rem",color:"white" ,fontFamily:"Fright"}}>Investment Tracking</h1>
    <h3 style={{color:"var(--background2)"}}>$10,000</h3>
</div>
<div style={{borderStyle:"solid",borderColor:"var(--background2)",padding:"1%",borderWidth:"0.1rem"}}>

<div style={{marginBottom:"3%",display:"flex",justifyContent:"space-between"}}>
    <div>
    <h4 style={{color:"white"}}>Growth: 50%</h4>
<p style={{color:"white"}}><span style={{color:"var(--background2)"}}>Current Value : </span>  $15,000</p>

    </div>

<select style={{background:"var(--background)" ,color:"var(--background2)",border:"none"}} name="cars" id="cars">
  <option value="volvo">1 year</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
    </div>
<ResponsiveContainer width="95%" height={400}>
  <LineChart
    width={700}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      bottom: 5,
    }}
  >
    <XAxis dataKey="name" axisLine={false} tickLine={false} />
    <YAxis axisLine={false} tickLine={false} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="amount"
      stroke="var(--background2)"
      activeDot={{ r: 8 }}
      dot={false}
      
      
    />
    <CartesianGrid strokeDasharray="3 3" opacity={0} />
  </LineChart>
</ResponsiveContainer>


    
        </div>
        </div>

        <div style={{marginTop:"5%",marginLeft:"8%",width:"80%", justifyContent:"center", padding:"3%", borderStyle:"solid",borderColor:"var(--borderColor)",borderWidth:"0.1rem"}}>
<div style={{marginBottom:"2%",display:"flex",justifyContent:"space-between"}}>
    <h1 style={{fontSize:"1.5rem",color:"white" ,fontFamily:"Fright"}}>Recent Transactions</h1>
    <div style={{marginRight:"30px"}}>
      <p style={{color:"#A17545"}}>All<span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<path d="M5.5 8.25L11 13.75L16.5 8.25" stroke="#E9B781" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span></p>
    </div>
</div>
<div
          style={{
            marginTop: "3%",
            paddingBottom: "10%",
            display: "grid",
            gridTemplateColumns: "25% 25% 25% ",
            gap: "8.5%",
            gridRowGap: "5%",
            height:"100%"
          }}
        >
   <div
            style={{
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              padding: "5%",
            }}
          >
            <img width={200} style={{width:"100%"}} src="/images/productimg.png" />

            <div>
              <div className="personalCard" style={{display:"flex",marginTop:"10px"}}>
                <div style={{width:"70%"}}>
                  <h4 style={{ color: "white", fontSize: "1rem" }}>
                    Ardbeg 25-Year -{" "}
                  </h4>{" "}
                  <h4 style={{ color: "white", fontSize: "1rem" }}>
                    Old Bourbon Oak
                  </h4>
                </div>
                <p style={{borderWidth:"0.1rem",height:"2%",padding:"2%", borderStyle:"solid",borderColor:"var(--background2)",color:"var(--background2)" ,textAlign:"center" ,fontSize:"0.6rem"}}>PURCHASE</p>

              </div>
            </div>
            <h4 style={{ color: "var(--background2)" }}>$900</h4>
          </div>

          <div
            style={{
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              padding: "5%",
            }}
          >
            <img width={200} style={{width:"100%"}} src="/images/productimg.png" />

            <div>
              <div className="personalCard" style={{display:"flex",marginTop:"10px"}}>
                <div style={{width:"70%"}}>
                  <h4 style={{ color: "white", fontSize: "1rem" }}>
                    Ardbeg 25-Year -{" "}
                  </h4>{" "}
                  <h4 style={{ color: "white", fontSize: "1rem" }}>
                    Old Bourbon Oak
                  </h4>
                </div>
                <p style={{borderWidth:"0.1rem",height:"2%",padding:"2%",paddingLeft:"4%", paddingRight:"4%",borderStyle:"solid",borderColor:"var(--background2)",color:"var(--background2)" ,textAlign:"center" ,fontSize:"0.6rem"}}>SALE</p>

              </div>
            </div>
            <h4 style={{ color: "var(--background2)" }}>$900</h4>
          </div>

          <div
            style={{
              borderStyle: "solid",
              borderColor: "var(--borderColor)",
              padding: "5%",
            }}
          >
            <img width={200} style={{width:"100%"}} src="/images/productimg.png" />

            <div>
              <div className="personalCard" style={{display:"flex",marginTop:"10px"}}>
                <div style={{width:"70%"}}>
                  <h4 style={{ color: "white", fontSize: "1rem" }}>
                    Ardbeg 25-Year -{" "}
                  </h4>{" "}
                  <h4 style={{ color: "white", fontSize: "1rem" }}>
                    Old Bourbon Oak
                  </h4>
                </div>
                <p style={{borderWidth:"0.1rem",height:"2%",padding:"2%", borderStyle:"solid",borderColor:"var(--background2)",color:"var(--background2)" ,textAlign:"center" ,fontSize:"0.6rem"}}>TRANSFER</p>

              </div>
            </div>
            <h4 style={{ color: "var(--background2)" }}>$900</h4>
        
            <div className="personalText2">
              <h4 style={{ color: "#CF9658", fontSize: "0.8rem" }}>
                Flavor Profile
              </h4>
              <h4 style={{ color: "white", fontSize: "0.8rem" }}>
                Peaty, Smoky, Floral
              </h4>
            </div>
          </div>



        
          
        </div>
        </div>
       </div>
    </div>
  )
}

export default Login