import React from "react";

const Home = () => {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            padding: '20px'
        }}>


            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
            </head>

            <h2><i class="fas fa-rocket"></i> Bem-vindo ao meu mais novo Projeto Full Stack</h2>

            <p>
                O <strong>App RH de Cadastro de Vagas</strong> foi desenvolvido utilizando uma stack full-stack,
                combinando as melhores ferramentas e tecnologias para oferecer uma solução moderna e funcional.
                <i class="fas fa-laptop-code"></i>
            </p>

            <p>
                A aplicação foi construída com <strong>Bootstrap, HTML e CSS</strong> no front-end, proporcionando uma interface
                intuitiva e responsiva. <i class="fas fa-paint-brush"></i>
            </p>

            <p>
                Para o backend, utilizamos <strong>Java com Spring Boot</strong>, garantindo robustez e escalabilidade na
                manipulação de dados e lógica de negócios. O <strong>banco de dados MySQL</strong> foi escolhido para armazenar
                de forma segura as informações de vagas e candidatos. <i class="fas fa-database"></i>
            </p>

            <p>
                No front-end, o <strong>framework ReactJS</strong> foi utilizado para garantir uma experiência de usuário dinâmica
                e interativa, com funcionalidades como visualização, cadastro, edição e exclusão de vagas e candidatos, além de
                possibilitar a navegação eficiente entre as diferentes seções do aplicativo. <i class="fab fa-react"></i>
            </p>

            <p>
                Com essa arquitetura <strong>full-stack</strong>, a aplicação permite que os usuários possam facilmente visualizar
                todas as vagas disponíveis, cadastrar novos candidatos, editar ou excluir registros e gerenciar o fluxo de
                informações de forma ágil e eficiente. <i class="fas fa-cogs"></i>
            </p>

            <p>
                Este projeto é um exemplo claro de como a integração entre tecnologias modernas pode resultar em soluções
                completas e aplicáveis ao mercado de trabalho. <i class="fas fa-rocket"></i> 🚀
            </p>


        </div>
    );
};

export default Home;
