import React from 'react'

const InputCommon = ({id, type, textLabel, textSpan, onchangeInputSet, defaultValue, placeholder}) => {

  const divInputStyle = {
      display: 'flex',
      flexDirection: 'column',
  }

  const inputSpanStyle = {
      color: 'red',
  }

  const inputStyle = {
    paddingLeft: '10px',
  }

  return (
    <div style={divInputStyle}>
        <label htmlFor={id}>{textLabel}<span style={inputSpanStyle}>&nbsp;{textSpan}</span></label>
        <input type={type} id={id} name={id} onChange={(e) => {onchangeInputSet(e.target.value)}} defaultValue={defaultValue} style={inputStyle} placeholder={placeholder}/>
    </div>
  )
}

export default InputCommon