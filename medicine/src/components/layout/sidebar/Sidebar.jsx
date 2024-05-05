import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../../../styles/components/layout/sidebar/Sidebar.module.css'

import homeIcon from '../../../assets/home-icon.png'
import medicoIcon from '../../../assets/medico-icon.png'

const Sidebar = () => {
  return (
    <div className={Style.sidebar}>
      <div className={Style.logo}>
        <h1>Medicine</h1>
      </div>
      <div className={Style.links}>
        <nav>
          <ul>
            <li>
              <Link to="/home"><img src={homeIcon} alt="icon-home" />Home</Link>
            </li>
            <li>
              <Link to="/home/medicos"><img src={medicoIcon} alt="icon-medico" />Medicos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar