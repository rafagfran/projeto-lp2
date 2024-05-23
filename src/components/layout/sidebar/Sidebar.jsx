import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../../../styles/components/layout/sidebar/Sidebar.module.css'

import homeIcon from '../../../assets/home-icon.png'
import medicoIcon from '../../../assets/icons/medico.png'
import pacienteIcon from '../../../assets/icons/paciente.png'
import agendamentoIcon from '../../../assets/icons/agenda.png'
import internacaoIcon from '../../../assets/icons/internacao.png'
import configIcon from '../../../assets/config-icon.png'

const Sidebar = () => {
  return (
    <div className={Style.sidebar}>
      <div className={Style.logo}>       
        <Link to='home'>Healthplus</Link>
      </div>
      <div className={Style.links}>
        <nav>
          <ul>
            <li>
              <Link to="/"><img src={homeIcon} alt="icon-home" />Home</Link>
            </li>
            <li>
              <Link to="/medicos"><img src={medicoIcon} alt="icon-medico" />Medicos</Link>
            </li>
            <li>
              <Link to="/pacientes"><img src={pacienteIcon} alt="icon-medico" />Pacientes</Link>
            </li>
            <li>
              <Link to="/agendamentos"><img src={agendamentoIcon} alt="icon-medico" />Agendamentos</Link>
            </li>
            <li>
              <Link to="/internacoes"><img src={internacaoIcon} alt="icon-medico" />Internações</Link>
            </li>
            <li>
              <Link to="/configuracoes"><img src={configIcon} alt="icon-config" />Configurações</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar