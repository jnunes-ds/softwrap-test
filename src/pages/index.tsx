import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRegisters } from '../utils/getRegisters';
import Loader from "react-loader-spinner";

import Button from '../components/Button';
import { IRegisters } from '../types/IRegister';

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
  const [showRegisters, setShowRegisters] = useState<IRegisters[]>(InitialRegisters);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const {registers} = getRegisters();

  function changeRegisters(){
    setShowRegisters(registers);
  }

  function previousPage(){
    let previous = currentIndex - 6;
    if((currentIndex - 6) <= 0){
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

  function nextPage(){
    let max = registers.length - 6;
    let next = currentIndex + 6;
    if((currentIndex + 6) >= max){
      setCurrentIndex(max);
    }else{
      setCurrentIndex(next);
    }
    
    changeRegisters();
  }


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
                <td>NOME</td>
                <td>IDADE</td>
                <td>ESTADO CIVIL</td>
                <td>CPF</td>
                <td>CIDADE</td>
                <td>ESTADO</td>
              </tr>
            </thead>
            <tbody>
            {
              loading
              ? (                    
                  <tr>
                      <td>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={60}
                          timeout={3000}
                        />
                      </td>
                      <td>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={20}
                          timeout={3000}
                        />
                      </td>
                      <td>
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
              : showRegisters.slice(currentIndex, currentIndex+6).map(register => {
                return(
                  <tr key={register.ID}>
                    <td className="name">{register.Name}</td>
                    <td>{register.Age}</td>
                    <td>{register.MaritalStatus}</td>
                    <td>{register.CPF}</td>
                    <td>{register.City}</td>
                    <td>{register.State}</td>
                    <td><a href="#">Editar</a></td>
                  </tr>
                );
              })
            }
            </tbody>
            <tfoot>
              <tr>
                <td>Mostrando {currentIndex} até {currentIndex + 6} de {showRegisters.length} resultados</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
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
`;