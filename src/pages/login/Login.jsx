import React, { useState } from 'react';
import style from '../../styles/pages/login/Login.module.css'
import { useNavigate } from 'react-router-dom';
import UserCrud from '../../CRUD/UserCrud';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    async function handleLogin () {
        const userCrud = new UserCrud();
        const dadosDoUsuario = {
            username: username,
            password: password
        };

        try {
           const response = await userCrud.getByLogin(dadosDoUsuario);
              if (response.status == 200) {
                sessionStorage.setItem('isAuthenticated', 'true')
                navigate('/');
           
              } else {
                alert('Senha incorreta');

              }
              console.log(response);
            
        } catch (erro) {
            console.error('Erro ao fazer login:', erro);
        }
    };
    
    return (
        <div className={style.login}>
            <div className={style.container}>
                <h1>LOGIN</h1>
                <div className={style.username}>
                    <input
                        type='text'
                        placeholder='Usuario'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className={style.password}>
                    <input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className={style.bottom}>
                    <p className={style.forgot}><a href='#'>Esqueceu a senha?</a></p>
                    <div className={style.action}>
                        <button onClick={handleLogin}>Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;