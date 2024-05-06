import React from 'react'

const ButtonCommon = ({text,paddingButton, handleClick}) => {

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d36e1c',
    border: 'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    padding: paddingButton,
  }

  return (
    <button style={buttonStyle} onClick={() => handleClick()} >
            {text}
    </button>
  )
}

export default ButtonCommon