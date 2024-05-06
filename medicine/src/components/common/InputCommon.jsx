import React from 'react'

const InputCommon = ({id, type, textLabel, textSpan, inputSet}) => {

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
        <input type={type} id={id} name={id} onChange={(e) => {inputSet(e.target.value)}}/>
    </div>
  )
}

export default InputCommon