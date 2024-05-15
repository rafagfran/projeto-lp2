import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/internacoes/Internacoes.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import InternacoesCrud from '../../CRUD/InternacoesCrud'

import EditIcon from '../../assets/edit-icon.png'
import DeleteIcon from '../../assets/delete-icon.png';
import TableCommon from '../../components/common/TableCommon.jsx';

const Internacoes = () => {
  const navigate = useNavigate()


  const [filtroMedico, setFiltroMedico] = useState('')
  const [filtroPaciente, setFiltroPaciente] = useState('')

  const [dados, setDados] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internacoesCrud = new InternacoesCrud()
        const response = await internacoesCrud.list(pageNumber, pageSize)
        setDados(response)

        const allData = await internacoesCrud.getAll()
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
      const internacoesCrud = new InternacoesCrud()
      try {
        const response = await internacoesCrud.delete(id)
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
    <section className={styles.internacoes}>
        <header className={styles.header}>
          <h2>Registro de Internacoes</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.add}>
            <ButtonCommon text="+ Add" paddingButton="5px 15px" handleClick={() => navigate("cadastro")}/>
          </div>
          <div className={styles.filters}>
            <div className={styles.filter_nome_paciente} >
              <InputCommon  type="text" id='filter_nome_paciente' textLabel="Buscar paciente" onchangeInputSet={setFiltroPaciente} placeholder="Buscar"/>
            </div>
            <div className={styles.filter_nome_medico}>
              <InputCommon type="text" id='filter_nome_medico' textLabel="Buscar medico" onchangeInputSet={setFiltroMedico} placeholder="Buscar"/>
            </div>
          </div>
          <TableCommon 
            alterPageSize={handlePageSizeChange}
            alterPageNumber={handlePageNumberChange}
            totalPages={totalPages}
            filterNome={""}
            filterCrm={""}
            filterStatus={""}
            filterCpf={""}
            filterData={""}
            filterTipoConsulta={""}
            filterNomeMedico={filtroMedico}
            filterNomePaciente={filtroPaciente}
            header={[
              {name: 'data_internacao', text: 'Data internação'},
              {name: 'data_alta', text: 'Data de alta'},
              {name: 'diagnostico', text: 'Diagnóstico'},
              {name: 'nome_medico', text: 'Nome do médico'},
              {name: 'nome_paciente', text: 'Nome do paciente'},
              {name: 'nome_contato_emergencia', text: 'Nome contato emergência'},
              {name: 'telefone_contato_emergencia', text: 'Telefone contato emergência'},
              {name: 'acoes', text: 'Ações'}
            ]}
            dados={dados.map((internacao, index) => {
              return {
                id: internacao.id,
                data_internacao: internacao.dataInternacao,
                data_alta: internacao.dataAlta === null ? 'Não teve alta' : internacao.dataAlta,
                diagnostico:internacao.diagnostico,
                nome_medico: internacao.medico.nome,
                nome_paciente: internacao.paciente.nome,
                nome_contato_emergencia: internacao.paciente.contatoEmergencia.nomeContato,
                telefone_contato_emergencia: internacao.paciente.contatoEmergencia.telefoneContato,
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

export default Internacoes;
