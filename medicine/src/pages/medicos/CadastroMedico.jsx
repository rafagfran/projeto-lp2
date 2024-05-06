import React from 'react'
import styles from '../../styles/pages/medicos/CadastroMedico.module.css'
import InputCommon from '../../components/common/InputCommon.jsx'

const CadastroMedico = () => {
  return (
    <section className={styles.cadastro_medico}>
      <div className={styles.cadastro_medico_container}>
        <div className={styles.form}>
          <InputCommon id="nome" type="text" textLabel="Nome completo" textSpan="*"/>
          <InputCommon id="crm" type="text" textLabel="CRM" textSpan="*"/>
          <InputCommon id="cpf" type="text" textLabel="CPF" textSpan="*"/>
          <InputCommon id="idade" type="text" textLabel="Idade" textSpan="*"/>
          <InputCommon id="dataNascimento" type="text" textLabel="Data de Nascimento" textSpan="*"/>
          <InputCommon id="sexo" type="text" textLabel="Sexo" textSpan="*"/>
          <InputCommon id="email" type="text" textLabel="Email" textSpan="*"/>
          <InputCommon id="telefone" type="text" textLabel="Telefone" textSpan="*"/>
          <InputCommon id="cidade" type="text" textLabel="Cidade" textSpan="*"/>
          <InputCommon id="cep" type="text" textLabel="CEP" textSpan="*"/>
          <InputCommon id="numero" type="text" textLabel="Numero" textSpan="*"/>
          <InputCommon id="status" type="text" textLabel="Status" textSpan="*"/>
        </div>
      </div>
    </section>
  )
}

export default CadastroMedico