import ReactEmojis from "@souhaildev/reactemojis";
import React,{useState} from 'react'

function Empty() {
  return (
    <>
    
    <ReactEmojis emoji="😁" style={{ width: 50, height: 50 }}/>
    <h2>No tasks pending!</h2>
    </>
  )
}

export default Empty