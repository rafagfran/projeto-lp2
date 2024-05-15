import React from 'react'


const SelectCommon = ({id, defaultValue, onchangeSet, textLabel, options}) => {

  const styleSelect = {
    display: 'flex',
    flexDirection: 'column',
  }


  return (
    <div style={styleSelect}>
        <label  htmlFor={id}>{textLabel}</label>
        <select name={id} id={id} defaultValue={defaultValue} onChange={(e) => {onchangeSet(e.target.value)}}>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.text}</option>
            ))}
            
        </select>
    </div>
  )
}

export default SelectCommon