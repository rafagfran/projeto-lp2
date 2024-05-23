import React from 'react'
import styles from '../../styles/pages/medicos/CadastroMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import axios from 'axios'

const CadastroPaciente = () => {
  const [nome, setNome] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [idade, setIdade] = React.useState(0)
  const [dataNascimento, setDataNascimento] = React.useState('')
  const [sexo, setSexo] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const [cidade, setCidade] = React.useState('')
  const [cep, setCep] = React.useState('')
  const [numero, setNumero] = React.useState('')
  const [nomeContatoEmergencia, setNomeContatoEmergencia] = React.useState('')
  const [telefoneContato, setTelefoneContato] = React.useState('')

  const handleSubmit = async () => {
      const url = 'http://localhost:8080/api/v1/patient/create'

      if(nome === '' ||  cpf === '' || idade === 0 || dataNascimento === '' || sexo === '' || email === '' || telefone === '' || cidade === '' || cep === '' || numero === '' || nomeContatoEmergencia === '' || telefoneContato === ''){
        alert('Preencha todos os campos!')
        return
      }

      if(isNaN(idade)){
        alert('Idade deve ser um número!')
        return
      }

      const dataNewUser = {
        nome: nome, //String
        cpf: cpf, //String
        idade: parseInt(idade), //int
        dataNascimento: dataNascimento,//String
        sexo: sexo, //String
        email: email,//String
        telefone: telefone,//String
        cidade: cidade,//String
        cep: cep,//String
        numero: numero,//String
        nomeContatoEmergencia: nomeContatoEmergencia,//String
        telefoneContato: telefoneContato,//String
      }

      try {
        const response = await axios.post(url, dataNewUser)
        console.log(response.status)
        if (response.status === 200) {
          alert('Paciente cadastrado com sucesso!')
        }
      } catch (error) { 
        console.error('Erro ao cadastrar o paciente:', error) 
        alert('Erro ao cadastrar o médico, tente novamente!')
    }
  }
  
  return (
    <section className={styles.cadastro_medico}>
      <div className={styles.cadastro_medico_container}>
        <div className={styles.form}>
          <InputCommon id="nome" type="text" textLabel="Nome completo" textSpan="*" onchangeInputSet={setNome}/>
          <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" onchangeInputSet={setCpf} maxLength={11}/>
          <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" onchangeInputSet={setIdade}/>
          <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*" onchangeInputSet={setDataNascimento}/>
          <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" onchangeInputSet={setSexo}/>
          <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail}/>
          <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*" onchangeInputSet={setTelefone}/>
          <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" onchangeInputSet={setCidade}/>
          <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" onchangeInputSet={setCep} maxLength={9}/>
          <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*" onchangeInputSet={setNumero}/>
          <InputCommon id="contato_emergencia" type="text" textLabel="Nome do contato de emergencia" textSpan="*" onchangeInputSet={setNomeContatoEmergencia}/>
          <InputCommon id="numero_contato" type="text" textLabel="Numero contato de emergencia" textSpan="*" onchangeInputSet={setTelefoneContato}/>
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={() => handleSubmit()}/>
        </div>
      </div>

    </section>
  )
}

export default CadastroPaciente