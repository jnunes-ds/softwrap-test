import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRegisters } from '../utils/firebase';
import Loader from "react-loader-spinner";

import Button from '../components/Button';
import Link from 'next/link';
import { IRegisters } from '../types/IRegisters';


const InitialRegisters: IRegisters[] = [
  {
    Name: '',
    Age: 0,
    MaritalStatus: '',
    CPF: '',
    City: '',
    State: '',
    ID: ''
  }
];


export default function Home() {
  //Estado que armazena arrei de cadastros do firestore
  const [showRegisters, setShowRegisters] = useState<IRegisters[]>(InitialRegisters);
  //Índice do cadastro atual (primieio), ex: se estiver mostrando de 0 a 6 o Índice é 0
  const [currentIndex, setCurrentIndex] = useState(0);
  //Estado que determina se a tabela deverá mostrar que está em loading
  const [loading, setLoading] = useState(false);
  //Máximo de itens cadastros que podem ser mostrados por vez na tela
  const maxItems = 6;
  //Array de registros puxados do firestore
  const {registers} = getRegisters();

  //Armazena os registros puxados no estado
  function changeRegisters(){
    setShowRegisters(registers);
  }

  //Simula a volta de uma página diminuindo o valor do índice
  function previousPage(){
    let previous = currentIndex - maxItems;
    if((currentIndex - maxItems) <= 0){
      if(currentIndex === 0){
        return;
      }else{
        setCurrentIndex(0);
      }
    }else{
      setCurrentIndex(previous);
    }
    changeRegisters();
  }

  //Simula o avanço de uma página aumentando o valor do índice
  function nextPage(){
    let max = registers.length - maxItems;
    let next = currentIndex + maxItems;
    if((currentIndex + maxItems) >= max){
      setCurrentIndex(max);
    }else{
      setCurrentIndex(next);
    }
    
    changeRegisters();
  }


  //Chama a função para puxar os cadastros do firebase
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      changeRegisters();
      setLoading(false);
    }, 1000)
  }, []);




  return (
    <Container>
      <div className="App">
        <div className="Titulo">
          <h1>Visualizar Cadastros</h1>
        </div>
        <div className="tableContainer">
          <div className="container">
          <table>
            <thead>
              <tr>
                <td className="name">NOME</td>
                <td className="age">IDADE</td>
                <td className="maritalStatus">ESTADO CIVIL</td>
                <td className="cpf">CPF</td>
                <td className="city">CIDADE</td>
                <td className="regionState">ESTADO</td>
              </tr>
            </thead>
            <tbody>
            {
              loading
              ? (                    
                  <tr>
                      <td className="name">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={60}
                          timeout={3000}
                        />
                      </td>
                      <td className="age">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td className="maritalStatus">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td className="cpf">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td className="city">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td className="regionState">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td className="tableButtons">
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                  </tr>
                  )
              : showRegisters.slice(currentIndex, (currentIndex + maxItems)).map(register => {
                return(
                  <tr key={register.ID}>
                    <td className="name">{register.Name}</td>
                    <td className="age">{register.Age}</td>
                    <td className="maritalStatus">{register.MaritalStatus}</td>
                    <td className="cpf">{register.CPF}</td>
                    <td className="city">{register.City}</td>
                    <td className="regionState">{register.State}</td>
                    <td className="edit">
                      <Link href={`/register/${register.ID}`}>
                        <a href="#">Editar</a>
                      </Link>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
            <tfoot>
              <tr>
                <td>Mostrando {currentIndex} até {currentIndex + maxItems} de {showRegisters.length} resultados</td>
                <td className="nulltd"></td>
                <td className="nulltd"></td>
                <td className="nulltd"></td>
                <td className="nulltd"></td>
                <td className="tableButtons">
                  <Button 
                    onClick={previousPage}
                    name="Anterior" 
                  />
                </td>
                <td>
                  <Button 
                    onClick={nextPage}
                    name="Próximo"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.section`
  .tableContainer{
    display: flexbox;
    align-items: center;
    justify-content: center;
    height: 80vh;
    border-radius: 50%;

    .container{
      border-radius: 20px;
      border: 1px solid #E8E8E8;
      border-bottom: 2px solid #D7D7D7;

      table{
        align-items: flex-start;
        padding: .5rem;
        width: 100%;

        thead{
          font-size: .75rem;
          text-align: start;
          td{
            margin-top: 0;
            padding-bottom: 10px;
          }
        }
        
        tr{
          td{
            color: #A3A3A3;
            padding: 10px;
          }
        }

        .name{
          color: black
        }

        tbody{
          
        }

        tfoot{
          padding: 10px;
          tr{
            td{
              border-top: 1px outset #E8E8E8;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 770px){
    
    .container{
      display: flex;
      flex-direction: row;
      width: 100vw;
      height: 80vh;
      justify-content: center;

      table{
        padding: 0;
        tbody{
          width: 100%;
          height: 100%;

          td{
            width: 100%;
            font-size: 25px;
          }
        }
      }

      .maritalStatus,
      .cpf,
      .city,
      .regionState,
      .nulltd{
        display: none;
      }
    }
  }
`;