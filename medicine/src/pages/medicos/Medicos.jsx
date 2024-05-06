import React, { useState, useEffect } from 'react';
import styles from '../../styles/pages/medicos/Medicos.module.css';
import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Medicos = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState([])
  const [search, setSearch] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCrm, setFiltroCrm] = useState('')

useEffect(() => {
  const fetchData = async () => {
    try {
      const url = 'http://localhost:8080/api/v1/doctor/getAll'
    const response = await axios.get(url)
    setDados(response.data)
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error);
    }
  }
  fetchData();
}, [])

  return (
    <section className={styles.medicos}>
      
        <header className={styles.header}>
          <h2>Registro de médicos</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.add}>
            <ButtonCommon text="+ Add" paddingButton="5px 15px" 
            handleClick={
              () => navigate("cadastro")
            }/>
          </div>
          <div className={styles.filters}>
            <div className={styles.first_line}>
              <div className={styles.filter}>
                <label htmlFor="buscarCrm">Buscar CRM</label>
                  <input name="buscarCrm" id="buscarCrm" onChange={(e) => setFiltroCrm(e.target.value)}>
                </input>
              </div>
              <div className={styles.filter}>
                <label htmlFor="status">Status</label>
                <select name="status" id="status" onChange={(e) => setFiltroStatus(e.target.value)}>
                  <option value="all">All</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
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
                  <label htmlFor="buscarNome">Buscar Nome</label>
                  <input type="text" id="buscarNome" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)}/>
                </div>
              </div>
            </div>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th id={styles.th_nome}>Nome</th>
                  <th id={styles.th_crm}>crm</th>
                  <th id={styles.th_status}>Status</th>
                  <th id={styles.th_acoes}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {dados.filter((item) => {
                  const filterByName = search.toLowerCase() === ''? item : item.nome.toLowerCase().includes(search)

                  const filterByStatus = filtroStatus === 'all' ? item : item.status === (filtroStatus === 'ativo' ? true : false)

                  const filterByCrm = filtroCrm.toLowerCase() === '' ? item : item.crm.toLowerCase().includes(filtroCrm)

                  return filterByName && filterByStatus && filterByCrm
                  
                }).map(medico => (
                  <tr key={medico.id}>
                    <td id={styles.td_nome}>{medico.nome}</td>
                    <td id={styles.td_crm}>{medico.crm}</td>
                    <td id={styles.td_status}>{medico.status ? "Ativo" : "Inativo"}</td>
                    <td id={styles.td_acoes}>
                      <ButtonCommon text="Edit" paddingButton="2px 10px"/>
                      <ButtonCommon text="Delete" paddingButton="2px 10px"/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </section>
  );
};

export default Medicos;
