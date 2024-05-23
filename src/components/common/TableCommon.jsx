  import React, { useEffect, useState } from 'react';
  import styles from '../../styles/components/common/TableCommon.module.css';
  import voltarIcon from '../../assets/voltar-white-icon.png';
  import avancarIcon from '../../assets/avancar-white-icon.png';
  import doubleLeftIcon from '../../assets/double-left-icon.png';
  import doubleRightIcon from '../../assets/double-right-icon.png';
  import SelectCommon from './SelectCommon';

  const TableCommon = ({ header, dados, alterPageSize, alterPageNumber, totalPages, filterNome, filterCrm, filterStatus, filterCpf, filterTipoConsulta, filterData, filterNomePaciente, filterNomeMedico }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const paginaAtual = pageNumber + 1;

    useEffect(() => {
      alterPageSize(pageSize);
      setPageNumber(0);
    }, [pageSize]);

    useEffect(() => {
      alterPageNumber(pageNumber);
    }, [pageNumber]);

    const handlePageLeft = () => {
      if (pageNumber === 0) return;
      setPageNumber(pageNumber - 1);
    };

    const handlePageRight = () => {
      if (pageNumber === totalPages - 1) return;
      setPageNumber(pageNumber + 1);
    };

    const handleFirstPage = () => {
      setPageNumber(0);
    };

    const handleLastPage = () => {
      setPageNumber(totalPages - 1);
    };

    return (
      <>
        <div className={styles.pagination}>
          <SelectCommon id="" defaultValue="10" textLabel="Itens por página" onchangeSet={setPageSize} options={[{ value: 10, text: 10 }, { value: 20, text: 20 }, { value: 50, text: 50 }]} />
        </div>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                {header.map((column, columnIndex) => (
                  <th key={columnIndex} className={`column_${column.name}`}>{column.text}</th>
                ))}
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {dados.filter((item) => {
                const Nome = filterNome.toLowerCase() === "" ? item : item.nome.toLowerCase().includes(filterNome.toLowerCase())
                const NomePaciente = filterNomePaciente.toLowerCase() === "" ? item : item.nome_paciente.toLowerCase().includes(filterNomePaciente.toLowerCase())
                const NomeMedico = filterNomeMedico.toLowerCase() === "" ? item : item.nome_medico.toLowerCase().includes(filterNomeMedico.toLowerCase())
                const Crm = filterCrm.toLowerCase() === "" ? item : item.crm.toLowerCase().includes(filterCrm.toLowerCase())
                const Cpf = filterCpf.toLowerCase() === "" ? item : item.cpf.toLowerCase().includes(filterCpf.toLowerCase())
                const tipoConsulta = filterTipoConsulta.toLowerCase() === "" ? item : item.tipo_consulta.toLowerCase().includes(filterTipoConsulta.toLowerCase())
                const data = filterData.toLowerCase() === "" ? item : item.data.toLowerCase().includes(filterData.toLowerCase())
                const Status = filterStatus === 'all' || filterStatus === '' ? item : item.status === (filterStatus === 'ativo' ? "Ativo" : "Inativo")
                return Nome && Crm && Status && Cpf && tipoConsulta && data && NomePaciente && NomeMedico
              }).map((item, rowIndex) => (
                <tr className={styles.tr} key={rowIndex}>
                  {header.map((column, columnIndex) => (
                    <td key={columnIndex} className={`column_${column.name}`}>{item[column.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination_action}>
          <div className={styles.action}>
            <button className={styles.btn_first} onClick={handleFirstPage} disabled={paginaAtual === 1}><img src={doubleLeftIcon} alt="" /></button>
            <button className={styles.btn_left} onClick={handlePageLeft} disabled={paginaAtual === 1}><img src={voltarIcon} alt="" /></button>
          </div>
          <div className={styles.numero_pagina}>
            <button className={styles.pagina_anterior} onClick={handlePageLeft} disabled={paginaAtual === 1}>{paginaAtual - 1}</button>
            <button className={styles.pagina_atual}>{paginaAtual}</button>
            <button className={styles.pagina_posterior} onClick={handlePageRight} disabled={paginaAtual === totalPages}>{paginaAtual + 1}</button>
          </div>
          <div className={styles.action}>
            <button className={styles.btn_right} onClick={handlePageRight} disabled={paginaAtual === totalPages}><img src={avancarIcon} alt="" /></button>
            <button className={styles.btn_last} onClick={handleLastPage} disabled={paginaAtual === totalPages}><img src={doubleRightIcon} alt="" /></button>
          </div>
        </div>
        <span>Página {paginaAtual} de {totalPages}</span>
      </>
    );
  }

  export default TableCommon;
