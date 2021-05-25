import styled from "styled-components";


export default function (){
    return (
        <Container>
            <div className="Titulo">
                <h1>Novo Cadastro</h1>
            </div>
        </Container>
    );
}

const Container = styled.section`
    .Titulo{
    border: 1px solid #E8E8E8;
    h1{
      font-size: 2rem;
      margin-left: 15rem;
    }
  }
`;