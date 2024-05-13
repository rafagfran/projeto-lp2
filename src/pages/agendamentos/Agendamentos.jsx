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
import TableCommon from '../../components/common/TableCommon.jsx';

const Agendamentos = () => {
  const navigate = useNavigate()


  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('all')
  const [filtroCpf, setfiltroCpf] = useState('')

  const [dados, setDados] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const paginaAtual = pageNumber + 1
  const ultimaPagina = totalPages


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
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  const handlePageNumberChange = (newPage) => {
    setPageNumber(newPage);
  }

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
          </div>
          <TableCommon 
            alterPageSize={handlePageSizeChange}
            alterPageNumber={handlePageNumberChange}
            totalPages={totalPages}
            header={[
              {name: 'tipo_consulta', text: 'Tipo de consulta'},
              {name: 'nome_médico', text: 'Nome do médico'},
              {name: 'nome_paciente', text: 'Nome do paciente'},
              {name: 'cpf_paciente', text: 'CPF do paciente'},
              {name: 'telefone_paciente', text: 'Telefone do paciente'},
              {name: 'acoes', text: 'Ações'}
            ]}
            dados={dados.map((agendamento, index) => {
              return {
                id: agendamento.id,
                tipo_consulta:agendamento.tipoConsulta,
                nome_médico: agendamento.medico.nome,
                nome_paciente: agendamento.paciente.nome,
                cpf_paciente: agendamento.paciente.pessoa.cpf,
                telefone_paciente: agendamento.paciente.pessoa.telefone,
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

export default Agendamentos;
