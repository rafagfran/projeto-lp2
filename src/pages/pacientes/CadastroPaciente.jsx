import React, { useState } from 'react';
import styles from '../../styles/pages/pacientes/CadastroPaciente.module.css';
import InputCommon from '../../components/common/InputCommon.jsx';
import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import PacientesCrud from '../../CRUD/PacientesCrud.jsx';

const CadastroPaciente = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [idade, setIdade] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [nomeContatoEmergencia, setNomeContatoEmergencia] = useState('');
    const [telefoneContato, setTelefoneContato] = useState('');

    const isValidCPF = (cpf) => {
        return /^\d{11}$/.test(cpf);
    };

    const isValidCEP = (cep) => {
        return /^\d{8}$/.test(cep);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validarCampos = () => {
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
            return false;
        }

        if (isNaN(idade) || parseInt(idade) <= 0) {
            alert('Idade deve ser um número válido!');
            return false;
        }

        if (!isValidCPF(cpf)) {
            alert('CPF inválido!');
            return false;
        }

        if (!isValidCEP(cep)) {
            alert('CEP inválido!');
            return false;
        }

        if (!isValidEmail(email)) {
            alert('E-mail inválido!');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validarCampos()) {
            return;
        }

        const dataNewUser = {
            nome,
            cpf,
            idade: parseInt(idade),
            dataNascimento,
            sexo,
            email,
            telefone,
            cidade,
            cep,
            numero,
            nomeContatoEmergencia,
            telefoneContato,
        };

        try {
            const pacientesCrud = new PacientesCrud();
            const response = await pacientesCrud.create(dataNewUser);
            console.log(response);
            if (response.status === 201) {
                alert('Paciente cadastrado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar o paciente:', error);
            alert('Erro ao cadastrar o paciente, tente novamente!');
        }
    };

    return (
        <section className={styles.cadastro_paciente}>
            <div className={styles.cadastro_paciente_container}>
                <div className={styles.form}>
                    <InputCommon id="nome" type="text" textLabel="Nome completo" textSpan="*" onchangeInputSet={setNome} />
                    <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*" onchangeInputSet={setCpf} maxLength={11} />
                    <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*" onchangeInputSet={setIdade} />
                    <InputCommon
                        id="dataNascimento"
                        type="text"
                        textLabel="Data de Nascimento"
                        textSpan="*"
                        onchangeInputSet={setDataNascimento}
                    />
                    <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*" onchangeInputSet={setSexo} />
                    <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail} />
                    <InputCommon
                        id="telefone"
                        type="text"
                        textLabel="Telefone"
                        textSpan="*"
                        onchangeInputSet={setTelefone}
                    />
                    <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*" onchangeInputSet={setCidade} />
                    <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*" onchangeInputSet={setCep} maxLength={9} />
                    <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*" onchangeInputSet={setNumero} />
                    <InputCommon
                        id="contato_emergencia"
                        type="text"
                        textLabel="Nome do contato de emergencia"
                        textSpan="*"
                        onchangeInputSet={setNomeContatoEmergencia}
                    />
                    <InputCommon
                        id="numero_contato"
                        type="text"
                        textLabel="Numero contato de emergencia"
                        textSpan="*"
                        onchangeInputSet={setTelefoneContato}
                    />
                </div>
                <div className={styles.action}>
                    <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={handleSubmit} />
                </div>
            </div>
        </section>
    );
};

export default CadastroPaciente;
