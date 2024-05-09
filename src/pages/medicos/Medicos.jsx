import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/medicos/Medicos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';
import TableCommon from '../../components/common/TableCommon.jsx';

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';

import MedicosCrud from '../../CRUD/MedicosCrud.jsx';

const Medicos = () => {
  const navigate = useNavigate()

  const [dados, setDados] = useState([])
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCrm, setFiltroCrm] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)


  const optionsFilter = [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50},
  ]

  const optionsFilterStatus = [
    {value: 'all', text: 'All'},
    {value: 'ativo', text: 'Ativo'},
    {value: 'inativo', text: 'Inativo'},
  ]

  const headerTableNames = [
    {id: 'column_nome', name: 'Nome'},
    {id: 'column_crm', name: 'CRM'},
    {id: 'column_status', name: 'Status'},
    {id: 'column_acoes', name: 'Ações'},
  ]

  const handleClickEdit = (id) => {
    navigate(`editar/${id}`)
    console.log(id)
  }

  const handleClickDelete = async (id) => {
    if (confirm("Você deseja realmente excluir este item?")) {
      const medicosCrud = new MedicosCrud()
      try {
        const response = await medicosCrud.delete(id)
        alert(response.data)
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else {
      // Código para cancelar a exclusão
    }
       
  }

  const dataTableValues = dados.filter((item) => {
      const filterByName = filtroNome.toLowerCase() === ''? item : item.nome.toLowerCase().includes(filtroNome)
      const filterByStatus = filtroStatus === 'all' ? item : item.status === (filtroStatus === 'ativo' ? true : false)
      const filterByCrm = filtroCrm.toLowerCase() === '' ? item : item.crm.toLowerCase().includes(filtroCrm)
      return filterByName && filterByStatus && filterByCrm
    }).map((medico) => {
      
    return {
      column_nome: medico.nome,
      column_crm: medico.crm,
      column_status: medico.status ? "Ativo" : "Inativo",
      column_acoes: (
        <div id={styles.td_acoes}>
          <button onClick={() => handleClickEdit(medico.id)}><img src={EditIcon} alt="" /></button>
          <button onClick={() => handleClickDelete(medico.id)}><img src={DeleteIcon} alt="" /></button>
      </div>
      )
    }
   })


   const handlePageLeft = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1); 
  };

  const handlePageRight = () => {
    if (pageNumber === totalPages - 1 ) return;
    setPageNumber(pageNumber + 1);
  };

  const handleFirstPage = () => {
    setPageNumber(0);
  }

  const handleLastPage = () => {
    setPageNumber(totalPages-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicosCrud = new MedicosCrud()
        const response = await medicosCrud.list(pageNumber, pageSize)
        setDados(response)

        const allData = await medicosCrud.getAll()
        const total = Math.ceil(allData.length / pageSize)
        setTotalPages(total)
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    }
    fetchData();
  }, [pageNumber, pageSize])

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
              <InputCommon  type="text" id='filter_nome' textLabel="Buscar nome" onchangeInputSet={setFiltroNome} placeholder="Buscar"/>
            </div>
            <div className={styles.filter_crm}>
              <InputCommon  className={styles.filter_crm} type="text" id='filter_crm' textLabel="Buscar CRM" onchangeInputSet={setFiltroCrm} placeholder="Buscar"/>
            </div>
            <div className={styles.pagination}>
              <SelectCommon id="" defaultValue="10" textLabel="Itens por página" onchangeSet={setPageSize} options={optionsFilter} />
            </div>
            <div className={styles.filter_status}>
              <SelectCommon id="filter_status" defaultValue="all" textLabel="Status" onchangeSet={setFiltroStatus} options={optionsFilterStatus} />
            </div>
          </div>
          <div className={styles.table}>
            <TableCommon columns={headerTableNames} data={dataTableValues}onPageLeft={handlePageLeft}
            onPageRight={handlePageRight} totalPages={totalPages} pageNumber={pageNumber} onFirstPage={handleFirstPage} onLastPage={handleLastPage} pageSize={pageSize}/>
          </div>
        </div>
    </section>
  );
};

export default Medicos;
