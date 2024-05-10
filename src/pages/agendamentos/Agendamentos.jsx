import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/agendamentos/Agendamentos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';
import voltarIcon from '../../assets/voltar-white-icon.png'
import avancarIcon from '../../assets/avancar-white-icon.png'
import doubleLeftIcon from '../../assets/double-left-icon.png'
import doubleRightIcon from '../../assets/double-right-icon.png'
import AgendamentosCrud from '../../CRUD/AgendamentosCrud'

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';

const Agendamentos = () => {
  const navigate = useNavigate()


  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCpf, setfiltroCpf] = useState('')

  const [dados, setDados] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [ultimaPagina, setUltimaPagina] = useState(1)

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agendamentosCrud = new AgendamentosCrud()
        const response = await agendamentosCrud.list(pageNumber, pageSize)
        setDados(response)

        const allData = await agendamentosCrud.getAll()
        const total = Math.ceil(allData.length / pageSize)
        setTotalPages(total)
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    }
    fetchData();
  }, [pageNumber, pageSize])

  

  const optionsFilter = [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50},
  ]

  // const handleClickEdit = (id) => {
  //   navigate(`editar/${id}`)
  //   console.log(id)
  // }

  // const handleClickDelete = async (id) => {
  //   if (confirm("Você deseja realmente excluir este item?")) {
  //     const agendamentosCrud = new AgendamentosCrud()
  //     try {
  //       const response = await agendamentosCrud.delete(id)
  //       alert(response.data)
  //     } catch (error) {
  //       console.error("Error deleting:", error);
  //     }
  //   } else {
  //     // Código para cancelar a exclusão
  //   }
       
  // }

  // const dataTableValues = dados.map((agendamento) => {
  //   return {
  
  //     column_acoes: (
  //       <div id={styles.td_acoes}>
  //         <button onClick={() => handleClickEdit(agendamento.id)}><img src={EditIcon} alt="" /></button>
  //         <button onClick={() => handleClickDelete(agendamento.id)}><img src={DeleteIcon} alt="" /></button>
  //     </div>
  //     )
  //   } 
  //  })

  //  const handlePageLeft = () => {
  //   if (pageNumber === 0) return;
  //   setPageNumber(pageNumber - 1); 
  // };

  // const handlePageRight = () => {
  //   if (pageNumber === totalPages - 1 ) return;
  //   setPageNumber(pageNumber + 1);
  // };

  // const handleFirstPage = () => {
  //   setPageNumber(0);
  // }

  // const handleLastPage = () => {
  //   setPageNumber(totalPages-1);
  // }

 

  return (
    <section className={styles.agendamentos}>
        <header className={styles.header}>
          <h2>Registro de agendamentos</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.add}>
            <ButtonCommon text="+ Add" paddingButton="5px 15px" handleClick={() => navigate("cadastro")}/>
          </div>
          <div className={styles.filters}>
            <div className={styles.filter_nome} >
              <InputCommon  type="text" id='filter_nome' textLabel="Buscar nome" onchangeInputSet={setFiltroNome} placeholder="Buscar"/>
            </div>
            <div className={styles.filter_cpf}>
              <InputCommon  className={styles.filter_cpf} type="text" id='filter_cpf' textLabel="Buscar CPF" onchangeInputSet={setfiltroCpf} placeholder="Buscar"/>
            </div>
            <div className={styles.pagination}>
              <SelectCommon id="" defaultValue="10" textLabel="Itens por página" onchangeSet={setPageSize} options={optionsFilter} />
            </div>
          </div>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Nome do paciente</th>
                        <th className={styles.th} >Nome do médico</th>
                        <th className={styles.th}>Data</th>
                        <th className={styles.th}>Ações</th>
                    </tr>
                </thead>
                        
                <tbody className={styles.tbody}>
                    {dados.map((agendamento, rowIndex) => (
                        <tr className={styles.tr} key={rowIndex}>
                            <td className={styles.td}>{agendamento.paciente.nome}</td>
                            <td className={styles.td}>{agendamento.medico.nome}</td>
                            <td className={styles.td}>{agendamento.dataHora}</td>
                            <td className={styles.td}>
                              <div id={styles.td_acoes}>
                                <button onClick={() => handleClickEdit(paciente.id)}><img src={EditIcon} alt="" /></button>
                                <button onClick={() => handleClickDelete(paciente.id)}><img src={DeleteIcon} alt="" /></button>
                              </div>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination_action}>
              <div className={styles.action}>
                <button className={styles.btn_first} id="btn-first" onClick={""}><img src={doubleLeftIcon} alt="" /></button>
                <button className={styles.btn_left} id="btn-page-left" onClick={""}><img src={voltarIcon} alt="" /></button>
              </div>
              <div className={styles.numero_pagina}>
                <button id='pagina_anterior' className={styles.pagina_anterior}>{paginaAtual - 1}</button>
                <button id='pagina_atual' className={styles.pagina_atual}>{paginaAtual}</button>
                <button id='pagina_posterior' className={styles.pagina_posterior}>{paginaAtual +  1}</button>
              </div>
              <div className={styles.action}>
                <button className={styles.btn_right} id="btn-page-right" onClick={""}><img src={avancarIcon} alt="" /></button>
                <button className={styles.btn_last}  id="btn-last" onClick={""}><img src={doubleRightIcon} alt="" /></button>
              </div>
              
            </div>
            <span>Página {paginaAtual} de {ultimaPagina}</span>
        </div>
    </section>
  );
};

export default Agendamentos;
