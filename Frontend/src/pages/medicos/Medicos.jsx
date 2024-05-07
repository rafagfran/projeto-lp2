import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/medicos/Medicos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';

import MedicosCrud from '../../CRUD/medicos/MedicosCrud.jsx';

const Medicos = () => {
  const navigate = useNavigate()

  const [dados, setDados] = useState([])
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCrm, setFiltroCrm] = useState('')

  const optionsFilterPagination = [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50},
  ]

  const optionsFilterStatus = [
    {value: 'all', text: 'All'},
    {value: 'ativo', text: 'Ativo'},
    {value: 'inativo', text: 'Inativo'},
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicosCrud = new MedicosCrud()
        const response = await medicosCrud.getAll()
        setDados(response)
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
            <ButtonCommon text="+ Add" paddingButton="5px 15px" handleClick={() => navigate("cadastro")}/>
          </div>
          <div className={styles.filters}>
            <div className={styles.filter_nome} >
              <InputCommon  type="text" id='filter_nome' textLabel="Buscar nome" onchangeInputSet={setFiltroNome} />
            </div>
            <div className={styles.filter_crm}>
              <InputCommon  className={styles.filter_crm} type="text" id='filter_crm' textLabel="Buscar CRM" onchangeInputSet={setFiltroCrm} />
            </div>
            <div className={styles.pagination}>
              <SelectCommon id="pagination" defaultValue="10" textLabel="Itens por página" onchangeSet={""} options={optionsFilterPagination} />
            </div>
            <div className={styles.filter_status}>
              <SelectCommon id="filter_status" defaultValue="all" textLabel="Status" onchangeSet={setFiltroStatus} options={optionsFilterStatus} />
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
                  const filterByName = filtroNome.toLowerCase() === ''? item : item.nome.toLowerCase().includes(filtroNome)
                  const filterByStatus = filtroStatus === 'all' ? item : item.status === (filtroStatus === 'ativo' ? true : false)
                  const filterByCrm = filtroCrm.toLowerCase() === '' ? item : item.crm.toLowerCase().includes(filtroCrm)

                  return filterByName && filterByStatus && filterByCrm
                }).map(medico => (
                  <tr key={medico.id}>
                    <td id={styles.td_nome}>{medico.nome}</td>
                    <td id={styles.td_crm}>{medico.crm}</td>
                    <td id={styles.td_status}>{medico.status ? "Ativo" : "Inativo"}</td>
                    <td id={styles.td_acoes}>
                        <button><img src={EditIcon} alt="" /></button>
                        <button><img src={DeleteIcon} alt="" /></button>
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
