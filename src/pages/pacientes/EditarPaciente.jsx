import React from 'react'
import styles from '../../styles/pages/medicos/EditarMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'
import ButtonCommon from '../../components/common/ButtonCommon.jsx'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import PacientesCrud from '../../CRUD/PacientesCrud.jsx'

const EditarPaciente = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [nome, setNome] = React.useState('')
    const [cpf, setCpf] = React.useState('')
    const [idade, setIdade] = React.useState("")
    const [dataNascimento, setDataNascimento] = React.useState('')
    const [sexo, setSexo] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [telefone, setTelefone] = React.useState('')
    const [cidade, setCidade] = React.useState('')
    const [cep, setCep] = React.useState('')
    const [numero, setNumero] = React.useState('')
    const [nomeContatoEmergencia, setNomeContatoEmergencia] = React.useState('')
    const [telefoneContato, setTelefoneContato] = React.useState('')

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

  

    useEffect(() => {
        const updateData = async () => {
            try {
                const pacientesCrud = new PacientesCrud()
                const response = await pacientesCrud.getById(id)

                setNome(response.nome)
                setCpf(response.pessoa.cpf)
                setIdade(response.pessoa.idade)
                setDataNascimento(response.pessoa.dataNascimento)
                setSexo(response.pessoa.sexo)
                setEmail(response.pessoa.email)
                setTelefone(response.pessoa.telefone)
                setCidade(response.pessoa.endereco.cidade)
                setCep(response.pessoa.endereco.cep)
                setNumero(response.pessoa.endereco.numero)
                setNomeContatoEmergencia(response.contatoEmergencia.nomeContato)
                setTelefoneContato(response.contatoEmergencia.telefoneContato)
            } catch (error) {
          }
        }
        updateData()
    }, [])

    const handleSubmit = async () => {


      if (
        !nome ||
        !cpf ||
        !idade ||
        !dataNascimento ||
        !sexo ||
        !email ||
        !telefone ||
        !cidade ||
        !cep ||
        !numero ||
        !nomeContatoEmergencia ||
        !telefoneContato
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


      const updateData = {
        id: id,
        nome: nome,
        cpf: cpf,
        idade: parseInt(idade),
        dataNascimento: dataNascimento,
        sexo: sexo,
        email: email,
        telefone: telefone,
        cidade: cidade,
        cep: cep,
        numero: numero,
        nomeContato: nomeContatoEmergencia,
        telefoneContato: telefoneContato
      }

        try {
          const pacientesCrud = new PacientesCrud()
          const response = await pacientesCrud.update(updateData)

          if(response === 200){
            alert('Paciente atualizado com sucesso')
            navigate('/pacientes')
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
            <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" onchangeInputSet={setCpf} defaultValue={cpf} maxLength={11}/>
            <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" onchangeInputSet={setIdade} defaultValue={idade}/>
            <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*" onchangeInputSet={setDataNascimento} defaultValue={dataNascimento}/>
            <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" onchangeInputSet={setSexo} defaultValue={sexo}/>
            <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail} defaultValue={email}/>
            <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*" onchangeInputSet={setTelefone} defaultValue={telefone}/>
            <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" onchangeInputSet={setCidade} defaultValue={cidade}/>
            <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" onchangeInputSet={setCep} defaultValue={cep} maxLength={8}/>
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

export default EditarPaciente