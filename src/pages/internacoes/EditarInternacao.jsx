import React from 'react'
import styles from '../../styles/pages/medicos/EditarMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import InternacaoCrud from '../../CRUD/InternacoesCrud.jsx'

const EditarInternacao = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [dataInternacao, setDataInternacao] = React.useState('')
    const [diagnostico, setDiagnostico] = React.useState('')
    const [medicoResponsavel, setMedicoResponsavel] = React.useState('')
    const [paciente, setPaciente] = React.useState('')
  

    useEffect(() => {
        const updateData = async () => {
            try {
                const internacaoCrud= new InternacaoCrud()
                const response = await internacaoCrud.getById(id)

                setDataInternacao(response.dataInternacao)
                setDiagnostico(response.diagnostico)
                setMedicoResponsavel(response.medico.nome)
                setPaciente(response.paciente.nome)
            } catch (error) {
          }
        }
        updateData()
    }, [])

    const handleSubmit = async () => {
      const updateData = {
        id: id,
        dataInternacao: dataInternacao,
        diagnostico: diagnostico,
        medicoResponsavel: medicoResponsavel,
        paciente: paciente
      }

        try {
          const internacaoCrud= new InternacaoCrud()
          const response = await internacaoCrud.update(updateData)

          if(response === 200){
            alert('Paciente atualizado com sucesso')
            navigate('/home/internacoes')
          }
        } catch (error) {
          console.log(error)
        }
    }
    
    return (
      <section className={styles.editar_medico}>
        <div className={styles.editar_medico_container}>
          <div className={styles.form}>
            <InputCommon id="nome" type="text" textLabel="Nome completo" textSpan="*" onchangeInputSet={setNome} defaultValue={nome}/>
            <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" onchangeInputSet={setCpf} defaultValue={cpf}/>
            <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" onchangeInputSet={setIdade} defaultValue={idade}/>
            <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*" onchangeInputSet={setDataNascimento} defaultValue={dataNascimento}/>
            <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" onchangeInputSet={setSexo} defaultValue={sexo}/>
            <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail} defaultValue={email}/>
            <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*" onchangeInputSet={setTelefone} defaultValue={telefone}/>
            <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" onchangeInputSet={setCidade} defaultValue={cidade}/>
            <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" onchangeInputSet={setCep} defaultValue={cep}/>
            <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*" onchangeInputSet={setNumero} defaultValue={numero}/>
            <InputCommon id="contato_emergencia" type="text" textLabel="Nome contato emergencia" textSpan="*" onchangeInputSet={setNomeContatoEmergencia} defaultValue={nomeContatoEmergencia}/>
            <InputCommon id="numero_contato" type="text" textLabel="Numero contato emergencia" textSpan="*" onchangeInputSet={setTelefoneContato} defaultValue={telefoneContato}/> 
          </div>
          <div className={styles.action}>
            <ButtonCommon text="Confirmar" paddingButton="5px 10px" handleClick={() => handleSubmit()}/>
          </div>
        </div>
      </section>
    )
  }

export default EditarInternacao