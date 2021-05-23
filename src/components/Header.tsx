import styled from "styled-components"

export function Header(){
    return (
        <TopBar>
            <a href="#">Visualizar</a>
            <a href="#">Novo Cadastro</a>
        </TopBar>
    )
}

const TopBar = styled.section`
    display: flexbox;
    flex-direction: row;
    background-color: red;
`;