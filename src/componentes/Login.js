import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [usernameCadastro, setUsernameCadastro] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCadastro, setPasswordCadastro] = useState('');
    const [email, setEmail] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageCadastro, setErrorMessageCadastro] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página

        if (!username || !password) {
            setErrorMessage('Por favor, preencha os campos de usuário e senha.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: username, senha: password, email: email }),
            });


            if (response.ok) {
                const data = await response.json(); // Captura os dados JSON da resposta
                localStorage.setItem("token", data); // Exemplo de uso do token
                window.alert("Usuário logado com sucesso.");
                navigate('/home');
                document.location.reload(); // Atualiza a página, se necessário
            } else {
                setErrorMessage('Usuário ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            setErrorMessage('Erro ao fazer login. Tente novamente.');
        }
    };


    const handleCadastro = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página

        if (!usernameCadastro || !passwordCadastro || !email) {
            setErrorMessageCadastro('Por favor, preencha os campos corretamente.');
            return;
        }

        if (loading == true)
            window.alert("Carregando.")
        else
            try {
                setLoading(true);

                const response = await fetch('http://localhost:8080/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome: usernameCadastro, senha: passwordCadastro, email: emailCadastro }),
                });


                if (response.ok) {
                    console.log(response);
                    setEmailCadastro("");
                    setUsernameCadastro("");
                    setPasswordCadastro("");
                    setLoading(false);
                    window.alert("Usuário criado com sucesso!.")

                } else {
                    setErrorMessageCadastro('Usuário ou senha incorretos!');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erro ao tentar logar:', error);
                setErrorMessage('Erro ao fazer login. Tente novamente.');
            }
    };


    useEffect(() => { }, [email, usernameCadastro, passwordCadastro])

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

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required />


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
                        value={usernameCadastro}
                        onChange={(e) => setUsernameCadastro(e.target.value)}
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required />


                    <input
                        type="password"
                        placeholder='Password'
                        value={passwordCadastro}
                        onChange={(e) => setPasswordCadastro(e.target.value)}
                        style={{ padding: '8px', marginBottom: '20px', marginTop: '5px' }}
                        required
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={emailCadastro}
                        onChange={(e) => setEmailCadastro(e.target.value)}
                        style={{ padding: '8px', marginBottom: '10px', marginTop: '5px' }}
                        required />
                    <button
                        type="button"
                        value={passwordCadastro}
                        onClick={handleCadastro}
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

                    {errorMessageCadastro && <p style={{ color: 'red' }}>{errorMessageCadastro}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;