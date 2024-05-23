import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/agendamentos/Agendamentos.module.css';

import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import InputCommon from '../../components/common/InputCommon.jsx';
import AgendamentosCrud from '../../CRUD/AgendamentosCrud';

import EditIcon from '../../assets/edit-icon.png';
import DeleteIcon from '../../assets/delete-icon.png';
import TableCommon from '../../components/common/TableCommon.jsx';

const Agendamentos = () => {
  const navigate = useNavigate();

  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const [dados, setDados] = useState([]);
  const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 10, totalPages: 0 });

  const agendamentosCrud = new AgendamentosCrud();

  const fetchData = useCallback(async () => {
    try {
      const { pageNumber, pageSize } = pagination;
      const response = await agendamentosCrud.list(pageNumber, pageSize);
      setDados(response);

      const allData = await agendamentosCrud.getAll();
      const total = Math.ceil(allData.length / pageSize);
      setPagination(prev => ({ ...prev, totalPages: total }));
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error);
    }
  }, [pagination.pageNumber, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickEdit = (id) => {
    navigate(`editar/${id}`);
  };

  const handleClickDelete = async (id) => {
    if (confirm("Você deseja realmente excluir este item?")) {
      try {
        await agendamentosCrud.delete(id);
        fetchData();
        alert("Item excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPagination(prev => ({ ...prev, pageSize: newSize }));
  };

  const handlePageNumberChange = (newPage) => {
    setPagination(prev => ({ ...prev, pageNumber: newPage }));
  };

  return (
    <section className={styles.agendamentos}>
      <header className={styles.header}>
        <h2>Registro de agendamentos</h2>
      </header>
      <div className={styles.body}>
        <div className={styles.add}>
          <ButtonCommon text="+ Add" paddingButton="5px 15px" handleClick={() => navigate("cadastro")} />
        </div>
        <div className={styles.filters}>
          <div className={styles.filter_nome}>
            <InputCommon type="text" id='filter_tipo' textLabel="Buscar tipo" onchangeInputSet={setFiltroTipo} placeholder="Buscar" />
          </div>
          <div className={styles.filter_data}>
            <InputCommon type="text" id='filter_data' textLabel="Buscar data" onchangeInputSet={setFiltroData} placeholder="Buscar" />
          </div>
        </div>
        <TableCommon
          alterPageSize={handlePageSizeChange}
          alterPageNumber={handlePageNumberChange}
          totalPages={pagination.totalPages}
          filterNome={""}
          filterCrm={""}
          filterStatus={""}
          filterCpf={""}
          filterData={filtroData}
          filterTipoConsulta={filtroTipo}
          filterNomeMedico={""}
          filterNomePaciente={""}
          header={[
            { name: 'data', text: 'Data e hora' },
            { name: 'tipo_consulta', text: 'Tipo de consulta' },
            { name: 'nome_médico', text: 'Nome do médico' },
            { name: 'nome_paciente', text: 'Nome do paciente' },
            { name: 'cpf_paciente', text: 'CPF do paciente' },
            { name: 'telefone_paciente', text: 'Telefone do paciente' },
            { name: 'acoes', text: 'Ações' }
          ]}
          dados={dados.map((agendamento) => ({
            id: agendamento.id,
            data: agendamento.dataHora,
            tipo_consulta: agendamento.tipoConsulta,
            nome_médico: agendamento.medico.nome,
            nome_paciente: agendamento.paciente.nome,
            cpf_paciente: agendamento.paciente.pessoa.cpf,
            telefone_paciente: agendamento.paciente.pessoa.telefone,
            acoes: (
              <div id="td_acoes">
                <button onClick={() => handleClickEdit(agendamento.id)}><img src={EditIcon} alt="Editar" /></button>
                <button onClick={() => handleClickDelete(agendamento.id)}><img src={DeleteIcon} alt="Excluir" /></button>
              </div>
            )
          }))}
        />
      </div>
    </section>
  );
};

export default Agendamentos;
