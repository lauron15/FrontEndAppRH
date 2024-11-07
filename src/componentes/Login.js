import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        //Pedir uma explicação nessa parte. 

        try {
            // Realiza uma requisição ao backend para verificar as credenciais
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate('/home'); // Redireciona para a página Home
            } else {
                alert('Usuário ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            alert('Erro ao fazer login. Tente novamente.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>Login - Projeto RH</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label>
                    Usuário: <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required
                    />
                </label>
                <label>
                    Senha:<input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '8px', marginBottom: '20px', marginTop: '5px' }}
                        required
                    />
                </label>
                <button type="submit" style={{ padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                    Entrar
                </button>
            </form>

            <p>
                Esse projeto é a complementação de um projeto de um APP de RH. <br />
                Utilizei o ReactJs no Front end e Java - Spring Boot no BackEnd.
            </p>
        </div>
    );
}

export default Login;
