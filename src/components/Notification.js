import React from 'react'

const style = {
  'border': '3px solid',
  'color': 'green',
  'background': 'lightgrey',
  'fontSize': 24,
  'padding': 10,
  'borderRadius': 10
}

const Notification = ({ message }) => (
  <div style={style}>
    {message}
  </div>
)

export { Notification, style }