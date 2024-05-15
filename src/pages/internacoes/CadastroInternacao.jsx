import React, { useEffect } from 'react'
import styles from '../../styles/pages/medicos/CadastroMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import axios from 'axios'
import InternacoesCrud from '../../CRUD/InternacoesCrud.jsx'
import SelectCommon from '../../components/common/SelectCommon.jsx'
import MedicosCrud from '../../CRUD/MedicosCrud.jsx'
import PacientesCrud from '../../CRUD/PacientesCrud.jsx'

const CadastroInternacao = () => {
  const [dataInternacao, setDataInternacao] = React.useState('')
  const [diagnostico, setDiagnostico] = React.useState('')
  const [medicoResponsavel, setMedicoResponsavel] = React.useState('')
  const [paciente, setPaciente] = React.useState('')
  const [listaMedicos, setListaMedicos] = React.useState([])
  const [listaPacientes, setListaPacientes] = React.useState([])

  const handleSubmit = async () => {
      const internacaoCrud = new InternacoesCrud()

      if(!dataInternacao || !diagnostico || !medicoResponsavel || !paciente){
        alert('Preencha todos os campos!')
        return
      }

      const dadosInternacao = {
        dataInternacao: dataInternacao,
        diagnostico: diagnostico,
        medicoResponsavel: medicoResponsavel,
        paciente: paciente
      }

      try {
        const response = await internacaoCrud.create(dadosInternacao)
        console.log(response.status)
        if (response.status === 200) {
          alert('Internação cadastrada com sucesso!')
        }
      } catch (error) { 
        console.error('Erro ao cadastrar a internação:', error) 
        alert('Erro ao cadastrar a internação, tente novamente!')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const medicosCrud = new MedicosCrud()
      try {
        const medicos = await medicosCrud.getAll()
        setListaMedicos(medicos.map(medico => ({ value: medico.id, text: medico.nome })))

        const pacientesCrud = new PacientesCrud()
        const pacientes = await pacientesCrud.getAll()
        setListaPacientes(pacientes.map(paciente => ({ value: paciente.id, text: paciente.nome })))

      } catch (error) {
        console.error('Erro ao buscar os médicos:', error)
      }
    }
    fetchData()
  }, []) 

  return (
    <section className={styles.cadastro_medico}>
      <div className={styles.cadastro_medico_container}>
        <div className={styles.form}>
          <InputCommon id="data_internacao" type="text" textLabel="Data da internação" textSpan="*" onchangeInputSet={setDataInternacao}/>
          <InputCommon id="diagnostico" type="text" textLabel="Diagnóstico" textSpan="*" onchangeInputSet={setDiagnostico}/>
          <SelectCommon id='medicos'  options={listaMedicos} onchangeSet={setMedicoResponsavel} textLabel="Médico reponsável"/>
          <SelectCommon id='pacientes'  options={listaPacientes} onchangeSet={setPaciente} textLabel="Paciente"/>
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={() => handleSubmit()}/>
        </div>
      </div>

    </section>
  )
}

export default CadastroInternacao