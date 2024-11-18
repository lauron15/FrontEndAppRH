import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página

        if (!username || !password) {
            setErrorMessage('Por favor, preencha os campos de usuário e senha.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: username, senha: password }),
            });


            if (response.ok) {
                console.log("Chegou aqui");
                navigate('/vagas');
            } else {
                setErrorMessage('Usuário ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            setErrorMessage('Erro ao fazer login. Tente novamente.');
        }
    };

    const redirectCadastro = () => {
        navigate('/vagas')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>Login - Projeto RH</h2>
            {/* Usa o onSubmit no formulário */}
            <form
                style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
                onSubmit={handleLogin}
            >
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
                {/* Botão sem onClick, já que o onSubmit cuida disso */}
                <button
                    type="submit"
                    style={{ padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
                >
                    Entrar
                </button>

                <button
                    type="button"
                    style={{ padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
                    onClick={redirectCadastro}
                >
                    Cadastrar
                </button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <p>
                Esse projeto é a complementação de um projeto de um APP de RH. <br />
                Utilizei o ReactJs no Front end e Java - Spring Boot no BackEnd.
            </p>
        </div>
    );
}

export default Login;
