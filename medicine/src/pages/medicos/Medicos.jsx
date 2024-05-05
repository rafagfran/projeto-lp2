import React from 'react';
import styles from '../../styles/pages/medicos/Medicos.module.css';
import Button from '../../components/common/Button';

const Medicos = () => {
  return (
    <section className={styles.medicos}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Registro de médicos</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.add}>
            <Button text="+ Add" />
          </div>
          <div className={styles.filters}>
            <div className={styles.first_line}>
              <div className={styles.filter}>
                <label htmlFor="especialidade">Especialidade</label>
                <select name="especialidade" id="especialidade">
                  <option value="all">All</option>
                </select>
              </div>
              <div className={styles.filter}>
                <label htmlFor="status">Status</label>
                <select name="status" id="status">
                  <option value="all">All</option>
                </select>
              </div>
            </div>
            <div className={styles.second_line}>
              <div className={styles.pagination}>
                <label htmlFor="itemsPerPage">Items per page</label>
                <select name="itemsPerPage" id="itemsPerPage">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
                </div>
                <div className={styles.search}>
                  <input type="text" placeholder="Buscar" />
                </div>
              </div>
            </div>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th id={styles.th_nome}>Nome</th>
                  <th id={styles.th_especialidade}>Especialidade</th>
                  <th id={styles.th_status}>Status</th>
                  <th id={styles.th_acoes}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. João</td>
                  <td>Cardiologista</td>
                  <td id={styles.td_status}>Ativo</td>
                  <td id={styles.td_acoes}>
                    <button>Editar</button>
                    <button>Deletar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Medicos;
