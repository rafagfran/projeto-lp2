import React from 'react'
import styles from '../../styles/pages/medicos/EditarMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import { useParams } from 'react-router-dom'
import MedicosCrud from '../../CRUD/medicos/MedicosCrud.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 

const EditarMedico = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [nome, setNome] = React.useState('')
    const [crm, setCrm] = React.useState('')
    const [cpf, setCpf] = React.useState('')
    const [idade, setIdade] = React.useState('')
    const [dataNascimento, setDataNascimento] = React.useState('')
    const [sexo, setSexo] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [telefone, setTelefone] = React.useState('')
    const [cidade, setCidade] = React.useState('')
    const [cep, setCep] = React.useState('')
    const [numero, setNumero] = React.useState('')
    const [status, setStatus] = React.useState('')

    useEffect(() => {
        const updateData = async () => {
            try {
                const medicosCrud = new MedicosCrud()
                const response = await medicosCrud.getById(id)

                setNome(response.nome)
                setCrm(response.crm)
                setCpf(response.pessoa.cpf)
                setIdade(response.pessoa.idade)
                setDataNascimento(response.pessoa.dataNascimento)
                setSexo(response.pessoa.sexo)
                setEmail(response.pessoa.email)
                setTelefone(response.pessoa.telefone)
                setCidade(response.pessoa.endereco.cidade)
                setCep(response.pessoa.endereco.cep)
                setNumero(response.pessoa.endereco.numero)
                setStatus(response.status)
            } catch (error) {
          }
        }
        updateData()
    }, [])

    const handleSubmit = async () => {
      const updateData = {
        id: id,
        nome: nome,
        crm: crm,
        cpf: cpf,
        idade: parseInt(idade),
        dataNascimento: dataNascimento,
        sexo: sexo,
        email: email,
        telefone: telefone,
        cidade: cidade,
        cep: cep,
        numero: numero,
        status: status
      }

        try {
          const medicosCrud = new MedicosCrud()
          const response = await medicosCrud.update(updateData)

          if(response === 200){
            alert('Médico atualizado com sucesso')
            navigate('/home/medicos')
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
            <InputCommon id="crm" type="text" textLabel="CRM" textSpan="*" onchangeInputSet={setCrm} defaultValue={crm}/>
            <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" onchangeInputSet={setCpf} defaultValue={cpf}/>
            <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" onchangeInputSet={setIdade} defaultValue={idade}/>
            <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*" onchangeInputSet={setDataNascimento} defaultValue={dataNascimento}/>
            <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" onchangeInputSet={setSexo} defaultValue={sexo}/>
            <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail} defaultValue={email}/>
            <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*" onchangeInputSet={setTelefone} defaultValue={telefone}/>
            <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" onchangeInputSet={setCidade} defaultValue={cidade}/>
            <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" onchangeInputSet={setCep} defaultValue={cep}/>
            <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*" onchangeInputSet={setNumero} defaultValue={numero}/>
            <InputCommon id="status" type="text" textLabel="Status" textSpan="*" onchangeInputSet={setStatus} defaultValue={status}/>
          </div>
          <div className={styles.action}>
            <ButtonCommon text="Confirmar" paddingButton="5px 10px" handleClick={() => handleSubmit()}/>
          </div>
        </div>
      </section>
    )
  }

export default EditarMedico