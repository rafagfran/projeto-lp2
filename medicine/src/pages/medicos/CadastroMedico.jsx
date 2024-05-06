import React from 'react'
import styles from '../../styles/pages/medicos/CadastroMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import axios from 'axios'

const CadastroMedico = () => {
  const [nome, setNome] = React.useState('')
  const [crm, setCrm] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [idade, setIdade] = React.useState(0)
  const [dataNascimento, setDataNascimento] = React.useState('')
  const [sexo, setSexo] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const [cidade, setCidade] = React.useState('')
  const [cep, setCep] = React.useState('')
  const [numero, setNumero] = React.useState('')
  const [status, setStatus] = React.useState('  ')

  const handleSubmit = async () => {
      const url = 'http://localhost:8080/api/v1/doctor/create'
      const dataNewUser = {
        nome: nome, //String
        crm: crm, //String
        cpf: cpf, //String
        idade: parseInt(idade), //int
        dataNascimento: dataNascimento,//String
        sexo: sexo, //String
        email: email,//String
        telefone: telefone,//String
        cidade: cidade,//String
        cep: cep,//String
        numero: numero,//String
        status: Boolean(status)//Boolean
      }

      try {
        const response = await axios.post(url, dataNewUser)
        console.log(response.status)
        if (response.status === 200) {
          alert('Médico cadastrado com sucesso!')
        }
      } catch (error) { 
        console.error('Erro ao cadastrar o médico:', error) 
        alert('Erro ao cadastrar o médico, tente novamente!')
    }
  }
  
  return (
    <section className={styles.cadastro_medico}>
      <div className={styles.cadastro_medico_container}>
        <div className={styles.form}>
          <InputCommon id="nome" type="text" textLabel="Nome completo" textSpan="*" inputSet={setNome}/>
          <InputCommon id="crm" type="text" textLabel="CRM" textSpan="*" inputSet={setCrm}/>
          <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" inputSet={setCpf}/>
          <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" inputSet={setIdade}/>
          <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*" inputSet={setDataNascimento}/>
          <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" inputSet={setSexo}/>
          <InputCommon id="email" type="text" textLabel="Email" textSpan="*" inputSet={setEmail}/>
          <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*" inputSet={setTelefone}/>
          <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" inputSet={setCidade}/>
          <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" inputSet={setCep}/>
          <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*" inputSet={setNumero}/>
          <InputCommon id="status" type="text" textLabel="Status" textSpan="*" inputSet={setStatus}/>
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={() => handleSubmit()}/>
        </div>
      </div>

    </section>
  )
}

export default CadastroMedico