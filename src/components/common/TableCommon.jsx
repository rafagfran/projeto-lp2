import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/common/TableCommon.module.css'
import voltarIcon from '../../assets/voltar-white-icon.png'
import avancarIcon from '../../assets/avancar-white-icon.png'
import doubleLeftIcon from '../../assets/double-left-icon.png'
import doubleRightIcon from '../../assets/double-right-icon.png'
import AgendamentosCrud from '../../CRUD/AgendamentosCrud'

const TableCommon = ( ) => {

  const [dados, setDados] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [ultimaPagina, setUltimaPagina] = useState(1)

  // const handleClickPageLeft = () => {
  //   onPageLeft(); 
  // };

  // const handleClickPageRight = () => {
  //   onPageRight();
   
  // };

  // const handleClickFirstPage = () => {
  //   onFirstPage();
  // }

  // const handleClickLastPage = () => {
  //   onLastPage();
  // }

  // useEffect(() => {
  //   onFirstPage();
  // }, [pageSize])

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


  return (
    <>
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr className={styles.tr}>
                    <th className={styles.th}>Nome do paciente</th>
                    <th className={styles.th} >Nome do médico</th>
                    <th className={styles.th}>data</th>
                </tr>
            </thead>
                    
            <tbody className={styles.tbody}>
                {dados.map((agendamento, rowIndex) => (
                    <tr className={styles.tr} key={rowIndex}>
                          <td className={styles.td}>{agendamento.paciente.nome}</td>
                          <td className={styles.td}>{agendamento.medico.nome}</td>
                          <td className={styles.td}>{agendamento.dataHora}</td>
                    </tr>  
                ))}
            </tbody>
        </table>
        <div className={styles.pagination}>
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
    </>
  )
}

export default TableCommon
