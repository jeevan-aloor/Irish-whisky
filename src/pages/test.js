// import React, { useEffect, useState }  from 'react'
// import DatePicker from "react-datepicker";
// import moment from "moment/moment";
 
// const test = () => {

//     const [current, setCurrent] = useState(((new Date()).getTime() / 1000));

//     let [endDateTimestamp, setendDateTimestamp] = useState();

//     const [enddate, setEndDate] = useState();
// useEffect(()=>{ 
//     // if(enddate === '5minute'){
//     //     console.log(endDateTimestamp)
//     //    return setendDateTimestamp((current+300))
//     // }
//     // if(enddate === '1hour'){
//     //     console.log(endDateTimestamp)
//     //     return  setendDateTimestamp((current+ 5000))
//     // }
//     // if(enddate === '2hour'){
//     //     console.log(endDateTimestamp)
//     //     return setendDateTimestamp((current+ 7000))
//     // }
//     console.log(moment.unix(endDateTimestamp).fromNow())

// console.log(endDateTimestamp)
//  },[endDateTimestamp])
//   return (
//     <div style={{height:"100vh"}}>
        
//         <select onChange={(e)=>e.target.value =="5minute"&& setendDateTimestamp(current+300)
//         || e.target.value =="1day"&& setendDateTimestamp(current+ 100000) || 
//             e.target.value =="2day"&& setendDateTimestamp(current+ 200000)
//             || e.target.value =="3day"&& setendDateTimestamp(current+ 300000)
//             || e.target.value =="4day"&& setendDateTimestamp(current+ 350000)
//             || e.target.value =="5day"&& setendDateTimestamp(current+ 450000)
//             || e.target.value =="6day"&& setendDateTimestamp(current+ 550000)
//             || e.target.value =="7day"&& setendDateTimestamp(current+ 600000)
//             || e.target.value =="8day"&& setendDateTimestamp(current+ 650000)
//             || e.target.value =="9day"&& setendDateTimestamp(current+ 750000)
//             || e.target.value =="10day"&& setendDateTimestamp(current+ 850000)

            
//     } name="cars" id="cars">
//                 <option value="select">select</option>
//         <option value="5minute">5minute</option>
//   <option value="1day">1 day</option>
//   <option value="2day">2 day</option>
//   <option value="3day">3 day</option>
//   <option value="4day">4 day</option>
//   <option value="5day">5 day</option>
//   <option value="6day">6 day</option>
//   <option value="7day">7 day</option>
//   <option value="8day">8 day</option>
//   <option value="9day">9 day</option>
//   <option value="10day">10 day</option>

// </select>
//     </div>
//   )
// }

// export default test