import React from 'react';
import styles from '../../styles/pages/register/Register.module.css'
import InputCommon from '../../components/common/InputCommon.jsx';
import ButtonCommon from '../../components/common/ButtonCommon.jsx';
import UsuariosCrud from '../../CRUD/UserCrud.jsx';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const isValidEmail = (email) => {
    // Expressão regular para validar o e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Verifica se a senha tem pelo menos 6 caracteres
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    // Validação dos campos
    if (!email || !username || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!isValidEmail(email)) {
      alert('E-mail inválido!');
      return;
    }

    if (!isValidPassword(senha)) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    const dataNewUser = {
      email: email, // String
      username: username, // String
      password: senha, // String
    };

    try {
      const usuariosCrud = new UsuariosCrud();
      const response = await usuariosCrud.create(dataNewUser);
      console.log(response.status);
      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      alert('Erro ao cadastrar o usuário, tente novamente!');
    }
  };

  return (
    <section className={styles.cadastro_usuario}>
      <div className={styles.cadastro_usuario_container}>
        <div className={styles.form}>
          <InputCommon id="email" type="text" textLabel="Email" textSpan="*" onchangeInputSet={setEmail} />
          <InputCommon id="username" type="text" textLabel="Username" textSpan="*" onchangeInputSet={setUsername} />
          <InputCommon id="senha" type="password" textLabel="Senha" textSpan="*" onchangeInputSet={setSenha} />
        </div>
        <div className={styles.action}>
          <ButtonCommon text="Cadastrar" paddingButton="5px 10px" handleClick={() => handleSubmit()} />
        </div>
      </div>
    </section>
  );
};

export default Register;
