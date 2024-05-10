import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/agendamentos/Agendamentos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';
import TableCommon from '../../components/common/TableCommon.jsx';

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';
import AgendamentosCrud from '../../CRUD/AgendamentosCrud.jsx';

const Agendamentos = () => {
  const navigate = useNavigate()

  const [dados, setDados] = useState([])
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCpf, setfiltroCpf] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)


  const optionsFilter = [
    {value: 10, text: 10},
    {value: 20, text: 20},
    {value: 50, text: 50},
  ]


  const headerTableNames = [
    {id: 'column_nome', name: 'Nome'},
    {id: 'column_cpf', name: 'CPF'},
    {id: 'column_sexo', name: 'Sexo'},
    {id: 'column_telefone', name: 'Telefone'},
    {id: 'column_acoes', name: 'Ações'},
  ]

  const handleClickEdit = (id) => {
    navigate(`editar/${id}`)
    console.log(id)
  }

  const handleClickDelete = async (id) => {
    if (confirm("Você deseja realmente excluir este item?")) {
      const agendamentosCrud = new AgendamentosCrud()
      try {
        const response = await agendamentosCrud.delete(id)
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
      const filterByCpf = filtroCpf.toLowerCase() === '' ? item : item.cpf.toLowerCase().includes(filtroCpf)
      return filterByName  && filterByCpf
    }).map((agendamento) => {
    return {
      column_nome: agendamento.nome,
      column_cpf: agendamento.cpf,
      column_sexo: agendamento.pessoa.sexo,
      column_telefone: agendamento.pessoa.telefone,
      column_acoes: (
        <div id={styles.td_acoes}>
          <button onClick={() => handleClickEdit(agendamento.id)}><img src={EditIcon} alt="" /></button>
          <button onClick={() => handleClickDelete(agendamento.id)}><img src={DeleteIcon} alt="" /></button>
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
    <section className={styles.agendamentos}>
        <header className={styles.header}>
          <h2>Registro de agendamentos</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.resume_container}>
            <div className={styles.total_agendamentos}>
              <span>Total de agendamentos:</span>
              <span className={styles.total_data}>{dados.length}</span>
            </div>
            <div className={styles.agendamentos_diarios}>
              <span>Agendamentos para hoje:</span>
              <span className={styles.total_data}>15</span>  
            </div>
          </div>
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
          <div className={styles.table}>
            <TableCommon columns={headerTableNames} data={dataTableValues}onPageLeft={handlePageLeft}
            onPageRight={handlePageRight} totalPages={totalPages} pageNumber={pageNumber} onFirstPage={handleFirstPage} onLastPage={handleLastPage} pageSize={pageSize}/>
          </div>
        </div>
    </section>
  );
};

export default Agendamentos;
