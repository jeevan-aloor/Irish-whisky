import React from 'react'

const VideoComponent = ({firstSectionToken}) => {
  return (
    <div>  {firstSectionToken&& firstSectionToken.type && firstSectionToken.type=="image" &&
    <img key={firstSectionToken &&firstSectionToken.imgpath &&firstSectionToken.imgpath}
    style={{ width: "90%", marginLeft: "10%",height:"600px",background:"black" }}
    src={`${firstSectionToken &&firstSectionToken.imgpath &&firstSectionToken.imgpath}
    `}
  /> }
  {firstSectionToken &&firstSectionToken.type && firstSectionToken.type=="video" &&

 <video key={firstSectionToken &&firstSectionToken.imgpath &&firstSectionToken.imgpath} src={firstSectionToken && firstSectionToken &&firstSectionToken.imgpath} style={{objectFit:"80%", width: "100%", marginLeft: "10%",height:"600px" }} controls>
 </video>

   }</div>
  )
}

export default VideoComponent