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
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
        }}>
            {/* Seção de Login */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#74b3b8',
                padding: '20px',
            }}>
                <h2>Welcome Back</h2>
                <p style={{ textAlign: 'center' }}>
                    To keep connected with us <br />
                    please login with your personal info
                </p>

                <form
                    style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
                    onSubmit={handleLogin}
                >


                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username:'
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required
                    />



                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password::'
                        style={{ padding: '8px', marginBottom: '20px', marginTop: '5px' }}
                        required
                    />

                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    >
                        SIGN IN
                    </button>
                </form>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            {/* Seção de Criação de Conta */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                padding: '20px',
            }}>
                <h2>Creat Account </h2>
                <p style={{ textAlign: 'center' }}>
                    Fill in the information below to create an account.
                </p>

                <form
                    style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
                >

                    <input type="text"
                        placeholder='Name'
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required />

                    <input type="email"
                        placeholder="E-mail"
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required />


                    <input
                        type="password"
                        placeholder='Password'
                        style={{ padding: '8px', marginBottom: '20px', marginTop: '5px' }}
                        required
                    />
                    <button
                        type="button"
                        onClick={redirectCadastro}
                        style={{
                            padding: '10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    >
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;