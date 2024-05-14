import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/common/TableCommon.module.css'
import voltarIcon from '../../assets/voltar-white-icon.png'
import avancarIcon from '../../assets/avancar-white-icon.png'
import doubleLeftIcon from '../../assets/double-left-icon.png'
import doubleRightIcon from '../../assets/double-right-icon.png'
import SelectCommon from './SelectCommon'

const TableCommon = ({header, dados, alterPageSize, alterPageNumber, totalPages, filterNome, filterCrm, filterStatus, filterCpf}) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const paginaAtual = pageNumber + 1

  useEffect(() => {
    alterPageSize(pageSize)
    setPageNumber(0)
  }, [pageSize])

  useEffect(() => {
    alterPageNumber(pageNumber)
  }, [pageNumber])
  
  
  const handlePageLeft = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1); 
  };

  const handlePageRight = () => {
    if (pageNumber === totalPages ) return;
    setPageNumber(pageNumber + 1);
  };

  const handleFirstPage = () => {
    setPageNumber(0);
  }

  const handleLastPage = () => {
    setPageNumber(totalPages -1);
  }

  useEffect(() => {
    const btnFirst = document.getElementById('btn-first');
    const btnPageLeft = document.getElementById('btn-page-left');
    const btnPageRight = document.getElementById('btn-page-right');
    const btnLast = document.getElementById('btn-last');
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

  if(paginaAtual === totalPages){
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

  const optionsFilter = [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50},
  ]

  return (
    <>
        <div className={styles.pagination}>
          <SelectCommon id="" defaultValue="10" textLabel="Itens por página" onchangeSet={setPageSize} options={optionsFilter} />
        </div>
        <div className={styles.table_container}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                  <tr className={styles.tr}>
                    {header.map((column, columnIndex) => (
                      <th key={columnIndex} className={column.name}>{column.text}</th>
                    ))}
                  </tr>
              </thead>
                      
              <tbody className={styles.tbody}>
                  {dados.filter((item) => {
                    const Nome = filterNome.toLowerCase() === "" ? item : item.nome.toLowerCase().includes(filterNome.toLowerCase())
                    const Crm = filterCrm.toLowerCase() === "" ? item : item.crm.toLowerCase().includes(filterCrm.toLowerCase())
                    const Cpf = filterCpf.toLowerCase() === "" ? item : item.cpf.toLowerCase().includes(filterCpf.toLowerCase())
                    const Status = filterStatus === 'all' || filterStatus === '' ? item : item.status  === (filterStatus === 'ativo' ? "Ativo" : "Inativo")

                    return Nome && Crm && Status && Cpf

                  }).map((item, rowIndex) => (
                      <tr className={styles.tr} key={rowIndex}>
                        {header.map((column, columnIndex) => (
                          <td key={columnIndex} className={column.name}>{item[column.name]}</td>
                        ))}
                      </tr>  
                  ))}
              </tbody>
            </table>
          </div>
        <div className={styles.pagination_action}>
          <div className={styles.action}>
            <button className={styles.btn_first}  id="btn-first" onClick={handleFirstPage}><img src={doubleLeftIcon} alt="" /></button>
            <button className={styles.btn_left} id="btn-page-left" onClick={handlePageLeft}><img src={voltarIcon} alt="" /></button>
          </div>
          <div className={styles.numero_pagina}>
            <button id='pagina_anterior' className={styles.pagina_anterior}>{paginaAtual -1}</button>
            <button id='pagina_atual' className={styles.pagina_atual}>{paginaAtual}</button>
            <button id='pagina_posterior' className={styles.pagina_posterior}>{paginaAtual +  1}</button>
          </div>
          <div className={styles.action}>
            <button className={styles.btn_right} id="btn-page-right" onClick={handlePageRight}><img src={avancarIcon} alt="" /></button>
            <button className={styles.btn_last} id="btn-last" onClick={handleLastPage}><img src={doubleRightIcon} alt="" /></button>
          </div>
        </div>
        <span>Página {paginaAtual} de {totalPages}</span>
    </>
  )
}

export default TableCommon


