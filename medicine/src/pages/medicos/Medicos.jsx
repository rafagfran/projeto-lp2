import React from 'react';
import styles from '../../styles/pages/medicos/Medicos.module.css';

const Medicos = () => {
  return (
    <section className={styles.medicos}>
      <div className={styles.container}>
        <header className={styles.top}>
          <h2>Registro de médicos</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.add}>
            <button>+ Add</button>
          </div>
          <div className={styles.filters}>
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
            <div className={styles.filter}>
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
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Especialidade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. João</td>
                  <td>Cardiologista</td>
                  <td>Ativo</td>
                  <td>
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
