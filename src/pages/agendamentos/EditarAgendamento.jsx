import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/agendamentos/EditarAgendamento.module.css';
import InputCommon from '../../components/common/InputCommon.jsx';
import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import AgendamentosCrud from '../../CRUD/AgendamentosCrud.jsx';
import MedicosCrud from '../../CRUD/MedicosCrud.jsx';
import PacientesCrud from '../../CRUD/PacientesCrud.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';

const EditarAgendamento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataHora, setDataHora] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [pacienteNome, setPacienteNome] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const agendamentosCrud = new AgendamentosCrud();
  const medicosCrud = new MedicosCrud();
  const pacientesCrud = new PacientesCrud();

  const fetchData = useCallback(async () => {
    try {
      const response = await agendamentosCrud.getById(id);
      setDataHora(response.dataHora);
      setTipoConsulta(response.tipoConsulta);
      setMedicoId(response.medicoId);
      setPacienteId(response.pacienteId);

      const [medicosData, pacientesData] = await Promise.all([
        medicosCrud.getAll(),
        pacientesCrud.getAll()
      ]);

      setMedicos(medicosData);
      setPacientes(pacientesData);

      const paciente = pacientesData.find(paciente => paciente.id === response.pacienteId);
      if (paciente) {
        setPacienteNome(paciente.nome);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados do agendamento:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback(async () => {
    if (!dataHora || !tipoConsulta || !medicoId || !pacienteId) {
      alert('Preencha todos os campos!');
      return;
    }

    const updateData = {
      id: parseInt(id),
      dataHora: dataHora,
      tipoConsulta: tipoConsulta,
      medicoId: parseInt(medicoId),
      pacienteId: parseInt(pacienteId),
    };

    try {
      const response = await agendamentosCrud.update(updateData);
      if (response === 200) {
        alert('Agendamento atualizado com sucesso');
        navigate('/agendamentos');
      }
    } catch (error) {
      console.error('Erro ao atualizar o agendamento:', error);
      alert('Erro ao atualizar o agendamento, tente novamente!');
    }
  }, [dataHora, tipoConsulta, medicoId, pacienteId, id, agendamentosCrud, navigate]);

  return (
    <section className={styles.editar_agendamento}>
      <div className={styles.editar_agendamento_container}>
        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="dataHora">Data e Hora *</label>
            <input
              id="dataHora"
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>
          <InputCommon
            id="tipoConsulta"
            type="text"
            textLabel="Tipo de Consulta"
            textSpan="*"
            onchangeInputSet={setTipoConsulta}
            defaultValue={tipoConsulta}
          />
          <SelectCommon
            id="medicoId"
            defaultValue={medicoId}
            onchangeSet={setMedicoId}
            textLabel="Selecione o Médico *"
            options={[{ value: '', text: 'Selecione:' }, ...medicos.map(medico => ({ value: medico.id, text: medico.nome }))]}
          />
          <div className={styles.inputWrapper}>
            <label htmlFor="pacienteNome">Paciente</label>
            <input
              id="pacienteNome"
              type="text"
              value={pacienteNome}
              readOnly
            />
          </div>
          <input type="hidden" id="pacienteId" value={pacienteId} />
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Confirmar" paddingButton="5px 10px" handleClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default EditarAgendamento;
