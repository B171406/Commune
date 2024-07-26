import React from 'react'

export const SelectPopUp = (props) => {
  return (
    <div>
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column",height:"890px"}}>
          <p style={{fontWeight:"normal",fontSize:"23px"}}>{props.name}</p>
          </div>
    </div>
  )
}
