import styled from "styled-components"

export function Header(){
    return (
        <TopBar>
            <div className="buttons">
                <a href="#">Visualizar</a>
                <a href="#">Novo Cadastro</a>
            </div>
        </TopBar>
    )
}

const TopBar = styled.section`
    display: flexbox;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #282a35;
    width: 100vw;
    height: 3rem;

    .buttons{
        margin-left: 15rem;
    }

    a{
        padding: 10px;
        color: white;
        font-size: 15px;
        text-decoration: none;
        margin-left: 2rem;
        border-radius: 10px;
    }

    a:hover{
        background-color: #16171e;
    }
`;