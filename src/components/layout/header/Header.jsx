import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa o hook useLocation do React Router

import styles from '../../../styles/components/layout/header/Header.module.css';

const Header = () => {
  const location = useLocation();
  const rotaAtual = location.pathname.replace(/\//g, " / ");// Obtém a localização atual

  return (
    <header className={styles.header}>
      <h1>Header</h1>
      <hr />
      <span id={styles.rota_atual}>home{rotaAtual}</span>
    </header>
  );
}

export default Header;
