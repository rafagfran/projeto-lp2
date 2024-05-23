import React from 'react'
import styles from '../../styles/pages/home/Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className={styles.home}>
     <div className={styles.container}>
      <h1>Seja bem-vindo!</h1>
      <div className={styles.nav}>
        <Link to={'/medicos'}>Registro de médicos</Link>
        <Link to={'/pacientes'}>Registro de pacientes</Link>
        <Link to={'/consultas'}>Registro de consultas</Link>
        <Link to={'/internações'}>Registro de internações</Link>    
      </div>
     </div>
    </section>
  )
}

export default Home