import React from "react";

const Home = () => {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'url("https://via.placeholder.com/1500x1000/cccccc/ffffff?text=Tecnologia+Futurista") no-repeat center center fixed',
            backgroundSize: 'cover',
            color: '#fff',
            padding: '20px',
            minHeight: '100vh',
        }}>
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
            </head>

            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginTop: '50px' }}>
                <i className="fas fa-rocket"></i> Bem-vindo ao meu mais novo Projeto Full Stack
            </h2>

            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '30px auto',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            }}>
                O <strong>App RH de Cadastro de Vagas</strong> foi desenvolvido utilizando uma stack full-stack,
                combinando as melhores ferramentas e tecnologias para oferecer uma solução moderna e funcional.
                <i className="fas fa-laptop-code"></i>
            </p>

            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '30px auto',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            }}>
                A aplicação foi construída com <strong>Bootstrap, HTML e CSS</strong> no front-end, proporcionando uma interface
                intuitiva e responsiva. <i className="fas fa-paint-brush"></i>
            </p>

            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '30px auto',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            }}>
                Para o backend, utilizamos <strong>Java com Spring Boot</strong>, garantindo robustez e escalabilidade na
                manipulação de dados e lógica de negócios. O <strong>banco de dados MySQL</strong> foi escolhido para armazenar
                de forma segura as informações de vagas e candidatos. <i className="fas fa-database"></i>
            </p>

            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '30px auto',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            }}>
                No front-end, o <strong>framework ReactJS</strong> foi utilizado para garantir uma experiência de usuário dinâmica
                e interativa, com funcionalidades como visualização, cadastro, edição e exclusão de vagas e candidatos, além de
                possibilitar a navegação eficiente entre as diferentes seções do aplicativo. <i className="fab fa-react"></i>
            </p>

            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '30px auto',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            }}>
                Com essa arquitetura <strong>full-stack</strong>, a aplicação permite que os usuários possam facilmente visualizar
                todas as vagas disponíveis, cadastrar novos candidatos, editar ou excluir registros e gerenciar o fluxo de
                informações de forma ágil e eficiente. <i className="fas fa-cogs"></i>
            </p>

            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                maxWidth: '800px',
                margin: '30px auto',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            }}>
                Este projeto é um exemplo claro de como a integração entre tecnologias modernas pode resultar em soluções
                completas e aplicáveis ao mercado de trabalho. <i className="fas fa-rocket"></i> 🚀
            </p>
        </div>
    );
};

export default Home;
