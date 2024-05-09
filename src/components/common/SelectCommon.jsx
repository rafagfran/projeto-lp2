import React from 'react'

const SelectCommon = ({id, defaultValue, onchangeSet, textLabel, options}) => {
  return (
    <>
        <label htmlFor={id}>{textLabel}</label>
        <select name={id} id={id} defaultValue={defaultValue} onChange={(e) => {onchangeSet(e.target.value)}}>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.text}</option>
            ))}
            
        </select>
    </>
  )
}

export default SelectCommon