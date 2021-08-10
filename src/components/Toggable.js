import React, { useState } from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)
  const showStyle = { display: visible ? '' : 'none' }
  const hideStyle = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideStyle}>
        <button onClick={toggleVisibility}>{props.buttonValue}</button>
      </div>

      <div style={showStyle}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>

    </div>
  )
}

export default Toggable