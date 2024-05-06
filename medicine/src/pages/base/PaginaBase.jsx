import React from 'react'

import Sidebar from '../../components/layout/sidebar/Sidebar.jsx'
import Container from '../../components/layout/container/Container.jsx'
import Header from '../../components/layout/header/Header.jsx'
import { Outlet } from 'react-router-dom'
import styles from '../../styles/pages/base/PaginaBase.module.css'

const PaginaBase = () => {
  return (
    <main>
        <Sidebar />
        <div className={styles.page}>
          <Header />
          <Container>
              <Outlet />
          </Container>
        </div>
       
    </main>
  )
}

export default PaginaBase
