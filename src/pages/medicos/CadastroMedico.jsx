import React from 'react'
import styles from '../../styles/pages/medicos/CadastroMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import MedicosCrud from '../../CRUD/MedicosCrud.jsx'

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

  const isValidCPF = (cpf) => {
      // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF tem 11 dígitos
      return cpf.length === 11;
  };

  const isValidCEP = (cep) => {
      // Remove caracteres não numéricos
    cep = cep.replace(/\D/g, '');

    // Verifica se o CEP tem 8 dígitos
    return cep.length === 8;
  };

  const isValidEmail = (email) => {
    // Expressão regular para validar o e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async () => {

     // Validação dos campos
    if (
      !nome ||
      !crm ||
      !cpf ||
      !idade ||
      !dataNascimento ||
      !sexo ||
      !email ||
      !telefone ||
      !cidade ||
      !cep ||
      !numero
    ) {
      alert('Preencha todos os campos!');
      return;
    }

    if (isNaN(idade) || parseInt(idade) <= 0) {
      alert('Idade deve ser um número válido!');
      return;
    }

    if (!isValidCPF(cpf)) {
      alert('CPF inválido!');
      return;
    }

    if (!isValidCEP(cep)) {
      alert('CEP inválido!');
      return;
    }

    if (!isValidEmail(email)) {
      alert('E-mail inválido!');
      return;
    }
      

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
      }

      try {
        const medicosCrud = new MedicosCrud()
        const response = await medicosCrud.create(dataNewUser)
        console.log(response)
        if (response.status === 201) {
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
          <InputCommon id="nome" type="text" textLabel="Nome completo" textSpan="*" onchangeInputSet={setNome}/>
          <InputCommon id="crm" type="text" textLabel="CRM" textSpan="*" onchangeInputSet={setCrm}/>
          <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" onchangeInputSet={setCpf} maxLength={11}/>
          <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" onchangeInputSet={setIdade}/>
          <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*" onchangeInputSet={setDataNascimento}/>
          <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" onchangeInputSet={setSexo}/>
          <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail}/>
          <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*" onchangeInputSet={setTelefone}/>
          <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" onchangeInputSet={setCidade}/>
          <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" onchangeInputSet={setCep} maxLength={8}/>
          <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*" onchangeInputSet={setNumero}/>
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={() => handleSubmit()}/>
        </div>
      </div>

    </section>
  )
}

export default CadastroMedico