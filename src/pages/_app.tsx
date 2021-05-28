import { Header } from "../components/Header";
import { createGlobalStyle } from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { BsJustify, BsX } from "react-icons/bs";


function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <GlobalStyle/>
      <div className="allMenus">
        <div className="burgerButtons">
          <div className={showMenu && 'hide'}>
            <button
              onClick={() => setShowMenu(true)}
              ><BsJustify/></button>
          </div>
          <div className={!showMenu && 'hide'}>
            <button
              onClick={() => setShowMenu(false)}
            ><BsX /></button>
          </div>
        </div>
        <div className={!showMenu && 'hide'}>
          <Header/>
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
    .burgerButtons{
      display: flexbox;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background-color: #282a35;
      color: white;
      width: 100vw;
      height: 3rem;
      display: none;

      div{
        margin-right: 1rem;
        
        button{
          width: 2rem;
          height: 2rem;
          font-size: 30px;
          background-color: #282a35;
          color: #fff;
          border: none;
          box-shadow: none;
        }
      }
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
    .allMenus{
      position: sticky;
      top: 0;
    }

    .buttonsContainer{
      justify-content: space-around;
      align-items:flex-start;
      background-color: #282a35;
      min-width: 100vw;
      height: 7rem;
      margin: 0;

      .buttons{
        display: flex;
        flex-direction: column;
        margin-left: 0;
      } 
    }
    

    .burgerButtons{
      display: flex;
      justify-content: flex-end;

    }

    .hide{
      display: none;
    }

    .Titulo{
    border: 1px solid #E8E8E8;
    padding: 1.5rem;
    h1{
      font-size: 1.5rem;
      margin-left: 0;
    }
  }
      
  }
`;

export default MyApp
