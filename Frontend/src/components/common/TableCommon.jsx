import React from 'react'
import styles from '../../styles/components/common/TableCommon.module.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const TableCommon = ({columns, data}) => {
  

  const styleColumns = {
    textAlign: 'center',
  }

  const handleClickPageLeft = () => {
    pageNumber
  }

  const handleClickPageRight = () => {
  }

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
        <div className={styles.action_pagination}>
          <button onClick={handleClickPageLeft}>Anterior</button>
          <button onClick={handleClickPageRight}>Próximo</button>
        </div>
    </>
  )
}

export default TableCommon
{/* <table>
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
</table> */}