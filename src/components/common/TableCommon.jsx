import React, { useEffect } from 'react'
import styles from '../../styles/components/common/TableCommon.module.css'
import voltarIcon from '../../assets/voltar-white-icon.png'
import avancarIcon from '../../assets/avancar-white-icon.png'
import doubleLeftIcon from '../../assets/double-left-icon.png'
import doubleRightIcon from '../../assets/double-right-icon.png'

const TableCommon = ({columns, data, onPageLeft, onPageRight, totalPages, pageNumber, onFirstPage, onLastPage, pageSize}) => {

  const paginaAtual = pageNumber + 1;
  const ultimaPagina = totalPages

  const styleColumns = {
    textAlign: 'center',
}

  const handleClickPageLeft = () => {
    onPageLeft(); 
  };

  const handleClickPageRight = () => {
    onPageRight();
   
  };

  const handleClickFirstPage = () => {
    onFirstPage();
  }

  const handleClickLastPage = () => {
    onLastPage();
  }

  useEffect(() => {
    onFirstPage();
  }, [pageSize])

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

  return (
    <>
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr className={styles.tr}>
                    {columns.map((column, index) => (
                        <th 
                          className={styles.th}
                          key={index} 
                          id={column.id}
                          style={
                            column.id === 'column_status' 
                            || column.id === 'column_acoes' 
                            ? styleColumns : null} 
                            >{column.name}
                        </th>
                    ))}
                </tr>
            </thead>
                    
            <tbody className={styles.tbody}>
                {/* pra cada linha de dados, cria uma linha na tabela */}
                {data.map((row, rowIndex) => (
                    <tr className={styles.tr} key={rowIndex}>
                        {/* pra cada coluna, cria uma celula na linha */}
                        {columns.map((column, columnIndex) => (
                            // o valor da celula é o valor da linha concatenado com a coluna ex: 0-1
                            //explicação de {row[column.id]}: row é o objeto que contém os valores de cada linha, e column.id é o nome da chave que contém o valor que queremos exibir
                            //exemplo: row = {column_nome: 'Dr. João da Silva', column_crm: '123456', column_status: 'Ativo'}
                            //column.id = 'column_crm'
                            //row[column.id] = row['column_crm'] = '123456'
                            //ou seja, row[column.id] é o valor da coluna 'column_crm' da linha row
                            <td
                              className={styles.td}
                              id={column.id} 
                              key={`${rowIndex}-${columnIndex}`} 
                              style={
                                column.id === 'column_status' 
                                ? styleColumns 
                                : null
                              }>
                              {row[column.id]}
                            </td>
                        ))}
                    </tr>  
                ))}
            </tbody>
        </table>
        <div className={styles.pagination}>
          <div className={styles.action}>
            <button className={styles.btn_first} id="btn-first" onClick={handleClickFirstPage}><img src={doubleLeftIcon} alt="" /></button>
            <button className={styles.btn_left} id="btn-page-left" onClick={handleClickPageLeft}><img src={voltarIcon} alt="" /></button>
          </div>
          <div className={styles.numero_pagina}>
            <button id='pagina_anterior' className={styles.pagina_anterior}>{paginaAtual - 1}</button>
            <button id='pagina_atual' className={styles.pagina_atual}>{paginaAtual}</button>
            <button id='pagina_posterior' className={styles.pagina_posterior}>{paginaAtual +  1}</button>
          </div>
          <div className={styles.action}>
            <button className={styles.btn_right} id="btn-page-right" onClick={handleClickPageRight}><img src={avancarIcon} alt="" /></button>
            <button className={styles.btn_last}  id="btn-last" onClick={handleClickLastPage}><img src={doubleRightIcon} alt="" /></button>
          </div>
          
        </div>
        <span>Página {paginaAtual} de {ultimaPagina}</span>
    </>
  )
}

export default TableCommon
