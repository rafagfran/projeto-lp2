import React from 'react'
import styles from '../../styles/components/common/Button.module.css'
import { useNavigate } from 'react-router-dom'

const Button = ({text, action}) => {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/medicos/cadastrar')
  }
  return (
    <button className={styles.button_base} onClick={handleClick}>
            {text}
    </button>
  )
}

export default Button