import React from 'react'

const InputCommon = ({id, type, textLabel, textSpan}) => {

  const inputStyle = {
      display: 'flex',
      flexDirection: 'column',
  }

  const inputSpanStyle = {
      color: 'red',
 
  }

  return (
    <div style={inputStyle}>
        <label htmlFor={id}>{textLabel}<span style={inputSpanStyle}>&nbsp;{textSpan}</span></label>
        <input type={type} id={id} name={id}/>
    </div>
  )
}

export default InputCommon