import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/medicos/Medicos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';
import voltarIcon from '../../assets/voltar-white-icon.png'
import avancarIcon from '../../assets/avancar-white-icon.png'
import doubleLeftIcon from '../../assets/double-left-icon.png'
import doubleRightIcon from '../../assets/double-right-icon.png'

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
  const [itemNumber, setItemNumber] = useState(0)


  const paginaAtual = pageNumber + 1
  const ultimaPagina = totalPages


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

  useEffect(() => {
    const btnFirst = document.getElementById('btn-first');
    const btnLast = document.getElementById('btn-last');
    const btnPageLeft = document.getElementById('btn-page-left');
    const btnPageRight = document.getElementById('btn-page-right');
    const paginaAnterior = document.getElementById('pagina_anterior');
    const paginaPosterior = document.getElementById('pagina_posterior');

    if(paginaAtual === 1){
      btnFirst.disabled = true;
      btnPageLeft.disabled = true;
      paginaAnterior.style.visibility = 'hidden';
      paginaAnterior.disabled = true;
    }else{
      btnFirst.disabled = false;
      btnPageLeft.disabled = false;     
      paginaAnterior.disabled = false;
      paginaAnterior.style.visibility = 'visible';
    }

    if(paginaAtual === ultimaPagina){
      btnLast.disabled = true;
      btnPageRight.disabled = true;
      paginaPosterior.style.visibility = 'hidden';
      paginaPosterior.disabled = true;
    }else{
      btnLast.disabled = false;
      btnPageRight.disabled = false;
      paginaPosterior.style.visibility = 'visible';
      paginaPosterior.disabled = false;
    }

  }, [paginaAtual, totalPages])

   const handlePageLeft = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1);
  };

  const handlePageRight = () => {
    if (pageNumber === ultimaPagina ) return;
    setPageNumber(pageNumber + 1);
  };

  const handleFirstPage = () => {
    setPageNumber(0);
  }

  const handleLastPage = () => {
    setPageNumber(ultimaPagina-1);
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
          <div className={styles.table_container}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                  <tr className={styles.tr}>
                    <th className={styles.column_number}>#</th>
                      <th className={styles.column_nome}>Nome</th>
                      <th className={styles.column_crm} >CRM</th>
                      <th className={styles.column_cpf}>CPF</th>
                      <th className={styles.column_telefone}>Telefone</th>
                      <th className={styles.column_email}>Email</th>
                      <th className={styles.column_status}>Status</th>
                      <th className={styles.column_acoes}>Ações</th>
                  </tr>
              </thead>
                      
              <tbody className={styles.tbody}>
                  {dados.filter((item) => {
                    const nome = filtroNome.toLowerCase() === '' ? item : item.nome.toLowerCase().includes(filtroNome)
                    const crm = filtroCrm.toLowerCase() === '' ? item : item.crm.toLowerCase().includes(filtroCrm)
                    const status = filtroStatus === 'all' ? item : item.status === (filtroStatus === 'ativo' ? true : false)

                    return nome && crm && status
                  }).map((medico, rowIndex) => (
                      <tr className={styles.tr} key={rowIndex}>
                            <td className={styles.column_number}>{}</td>
                            <td className={styles.column_nome}>{medico.nome}</td>
                            <td className={styles.column_crm}>{medico.crm}</td>
                            <td className={styles.column_cpf}>{medico.pessoa.cpf}</td>
                            <td className={styles.column_telefone}>{medico.pessoa.telefone}</td>
                            <td className={styles.column_email}>{medico.pessoa.email}</td>
                            <td className="column_status">{medico.status === true ? "Ativo" : "Inativo"}</td>
                            <td className="column_acoes">
                              <div id="td_acoes">
                                <button onClick={() => handleClickEdit(medico.id)}><img src={EditIcon} alt="" /></button>
                                <button onClick={() => handleClickDelete(medico.id)}><img src={DeleteIcon} alt="" /></button>
                              </div>
                            </td>
                      </tr>  
                  ))}
              </tbody>
            </table>
          </div>
        <div className="pagination_action">
          <div className="action">
            <button className="btn_first"  id="btn-first" onClick={handleFirstPage}><img src={doubleLeftIcon} alt="" /></button>
            <button className="btn_left" id="btn-page-left" onClick={handlePageLeft}><img src={voltarIcon} alt="" /></button>
          </div>
          <div className="numero_pagina">
            <button id='pagina_anterior' className="pagina_anterior">{paginaAtual -1}</button>
            <button id='pagina_atual' className="pagina_atual">{paginaAtual}</button>
            <button id='pagina_posterior' className="">{paginaAtual +  1}</button>
          </div>
          <div className="action">
            <button className="btn_right "id="btn-page-right" onClick={handlePageRight}><img src={avancarIcon} alt="" /></button>
            <button className="btn_last " id="btn-last" onClick={handleLastPage}><img src={doubleRightIcon} alt="" /></button>
          </div>
          
        </div>
        <span>Página {paginaAtual} de {ultimaPagina}</span>
          </div>
    </section>
  );
};

export default Medicos;
