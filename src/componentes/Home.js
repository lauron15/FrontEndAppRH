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
            <h2>Bem-vindo ao meu mais novo Projeto Full Stack</h2>
            <p>Na construção deste projeto, utilizamos:</p>
            <ol>
                <li>BACKEND: Java e Spring Boot </li>
                <li>FrotEnd: ReactJs - HTML - CSS - Bootstrap - MaterialUI Data Grid</li>
                <li>Ferramentas: Intellij (Java) - Visual Studio Code(Js/Reactjs) </li>
                <p>Link do Repositório: https://github.com/lauron15/FrontEndAppRH</p>
            </ol>

            <p>O intuito desse projeto foi a melhoria das minhas competências na utilização de ReactJs e Java/SpringBoot.
                <br></br> Como o meu intuito é de ser um desenvolvedor full stack, eu venho priorizando a melhorando de ambas habilidades:
                <br></br> Backend e Frontend.
            </p>

        </div>
    );
};

export default Home;
