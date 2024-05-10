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
    {id: 'column_tipo_consulta', name: 'Tipo de consulta', width: '200px' },
    {id: 'column_data_consulta', name: 'Data da consulta', width: '200px'},
    {id: 'column_medico_nome', name: 'Médico'},
    {id: 'column_paciente_nome', name: 'Paciente'},
    {id: 'column_paciente_idade', name: 'Idade do paciente'},
    {id: 'column_paciente_telefone', name: 'Telefone do paciente'},
    {id: 'column_paciente_email', name: 'Email do paciente'},
    {id: 'column_paciente_sexo', name: 'Sexo do paciente'},
    {id: 'column_paciente_cpf', name: 'CPF do paciente'},
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

  const dataTableValues = dados.map((agendamento) => {
    return {
      column_tipo_consulta: agendamento.tipoConsulta,
      column_data_consulta: agendamento.dataHora,
      column_medico_nome: agendamento.medico.nome,
      column_paciente_nome: agendamento.paciente.nome,
      column_paciente_idade: agendamento.paciente.pessoa.idade, 
      column_paciente_telefone: agendamento.paciente.pessoa.telefone,
      column_paciente_email: agendamento.paciente.email,
      column_paciente_sexo: agendamento.paciente.pessoa.sexo,
      column_paciente_cpf: agendamento.paciente.cpf,
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
