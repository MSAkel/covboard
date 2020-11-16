import React from "react"

const Bar = ({range, colour}) => {
  return(
    <div>
      <p>{range}</p>
      <div className="range-bar"></div>
    </div>
  )
}

export default Bar