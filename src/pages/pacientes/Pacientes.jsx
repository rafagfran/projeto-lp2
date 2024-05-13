import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/pacientes/Pacientes.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';

import voltarIcon from '../../assets/voltar-white-icon.png'
import avancarIcon from '../../assets/avancar-white-icon.png'
import doubleLeftIcon from '../../assets/double-left-icon.png'
import doubleRightIcon from '../../assets/double-right-icon.png'

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';
import PacientesCrud from '../../CRUD/PacientesCrud.jsx';
import TableCommon from '../../components/common/TableCommon.jsx';

const Pacientes = () => {
  const navigate = useNavigate()

  const [dados, setDados] = useState([])
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCpf, setfiltroCpf] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const paginaAtual = pageNumber + 1
  const ultimaPagina = totalPages



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
      const pacientesCrud = new PacientesCrud()
      try {
        const response = await pacientesCrud.delete(id)
        alert(response.data)
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else {
      // Código para cancelar a exclusão
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesCrud = new PacientesCrud()
        const response = await pacientesCrud.list(pageNumber, pageSize)
        setDados(response)

        const allData = await pacientesCrud.getAll()
        const total = Math.ceil(allData.length / pageSize)
        setTotalPages(total)
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    }
    fetchData();
  }, [pageNumber, pageSize])

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  const handlePageNumberChange = (newPage) => {
    setPageNumber(newPage);
  }

  return (
    <section className={styles.pacientes}>
        <header className={styles.header}>
          <h2>Registro de pacientes</h2>
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
          </div>
          <TableCommon 
            alterPageSize={handlePageSizeChange}
            alterPageNumber={handlePageNumberChange}
            totalPages={totalPages}
            header={[
              {name: 'nome', text: 'Nome'},
              {name: 'cpf', text: 'CPF'},
              {name: 'sexo', text: 'Sexo'},
              {name: 'telefone', text: 'Telefone'},
              {name: 'acoes', text: 'Ações'},
            
            ]}
            dados={dados.map((paciente, index) => {
              return {
                nome: paciente.nome,
                cpf: paciente.pessoa.cpf,
                sexo: paciente.pessoa.sexo,
                telefone: paciente.pessoa.telefone,
                acoes:
                  <div id="td_acoes">
                    <button onClick={() => handleClickEdit(paciente.id)}><img src={EditIcon} alt="" /></button>
                    <button onClick={() => handleClickDelete(paciente.id)}><img src={DeleteIcon} alt="" /></button>
                  </div>
              }
            })}
          />
        </div>
    </section>
  );
};

export default Pacientes;
