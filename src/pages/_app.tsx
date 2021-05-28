import { Header } from "../components/Header";
import { createGlobalStyle } from 'styled-components';


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyle/>
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-family: cursive;
  }
  

  .buttonsContainer{
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
        cursor: pointer;
    }

    a:active{
      background-color: #16171e;
    }
  }

  .Titulo{
    border: 1px solid #E8E8E8;
    padding: 1.5rem;
    h1{
      font-size: 2rem;
      margin-left: 15rem;
    }
  }

  @media screen and (max-width: 770px){
    body{
    }

    .maritalStatus,
    .cpf,
    .city,
    .regionState{
      display: none;
    }
  }
`;

export default MyApp
