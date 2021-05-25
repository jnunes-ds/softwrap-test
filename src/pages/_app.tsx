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
`;

export default MyApp
