import React, { useEffect, useState, useCallback } from 'react';
import styles from '../../styles/pages/agendamentos/CadastroAgendamento.module.css';
import InputCommon from '../../components/common/InputCommon.jsx';
import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import AgendamentosCrud from '../../CRUD/AgendamentosCrud.jsx';
import MedicosCrud from '../../CRUD/MedicosCrud.jsx';
import PacientesCrud from '../../CRUD/PacientesCrud.jsx';
import SelectCommon from '../../components/common/SelectCommon.jsx';

const CadastroAgendamento = () => {
  const [dataHora, setDataHora] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const agendamentosCrud = new AgendamentosCrud();
  const medicosCrud = new MedicosCrud();
  const pacientesCrud = new PacientesCrud();

  const fetchMedicosEPacientes = useCallback(async () => {
    try {
      const [medicosData, pacientesData] = await Promise.all([
        medicosCrud.getAll(),
        pacientesCrud.getAll()
      ]);
      setMedicos(medicosData);
      setPacientes(pacientesData);
    } catch (error) {
      console.error('Erro ao recuperar médicos e pacientes:', error);
    }
  }, []);

  useEffect(() => {
    fetchMedicosEPacientes();
  }, [fetchMedicosEPacientes]);

  const handleSubmit = useCallback(async () => {
    if (!dataHora || !tipoConsulta || !medicoId || !pacienteId) {
      alert('Preencha todos os campos!');
      return;
    }

    const dataNewAppointment = {
      dataHora: dataHora,
      tipoConsulta: tipoConsulta,
      medicoId: parseInt(medicoId),
      pacienteId: parseInt(pacienteId),
    };

    try {
      const response = await agendamentosCrud.create(dataNewAppointment);
      if (response === 201) {
        alert('Agendamento cadastrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o agendamento:', error);
      alert('Erro ao cadastrar o agendamento, tente novamente!');
    }
  }, [dataHora, tipoConsulta, medicoId, pacienteId, agendamentosCrud]);

  return (
    <section className={styles.cadastro_agendamento}>
      <div className={styles.cadastro_agendamento_container}>
        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <InputCommon
              id="dataHora"
              type="datetime-local"
              textLabel="Data e Hora"
              textSpan="*"
              onchangeInputSet={setDataHora}
            />
          </div>
          <InputCommon
            id="tipoConsulta"
            type="text"
            textLabel="Tipo de Consulta"
            textSpan="*"
            onchangeInputSet={setTipoConsulta}
          />
          <SelectCommon
            id="medicoId"
            defaultValue=""
            onchangeSet={setMedicoId}
            textLabel="Selecione o Médico *"
            options={[{ value: '', text: 'Selecione' }, ...medicos.map(medico => ({ value: medico.id, text: medico.nome }))]}
          />
          <SelectCommon
            id="pacienteId"
            defaultValue=""
            onchangeSet={setPacienteId}
            textLabel="Selecione o Paciente *"
            options={[{ value: '', text: 'Selecione' }, ...pacientes.map(paciente => ({ value: paciente.id, text: paciente.nome }))]}
          />
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default CadastroAgendamento;
