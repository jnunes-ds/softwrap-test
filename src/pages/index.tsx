import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRegisters, visibleRegisters } from '../utils/getRegisters';

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

  async function changeRegisters(){
    setLoading(true);

    const {registers} = visibleRegisters(currentIndex);

    await setShowRegisters(registers);

    setTimeout(() => {
      setLoading(false);
    }, 500)

  }

  function previousPage(){
    let previous = currentIndex - 6;
    if((currentIndex - 6) <= 0){
      setCurrentIndex(0);
    }else{
      setCurrentIndex(previous);
    }
    changeRegisters()
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
    changeRegisters();
  }, []);

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <Container>
      <div className="App">
        <div className="Titulo">
          <h1>Visualizar Cadastros</h1>
        </div>
        <div className="tableContainer">
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
              showRegisters.slice(currentIndex, currentIndex+6).map(register => {
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
    </Container>
  )
}

const Container = styled.section`
  
  .tableContainer{
    display: flexbox;
    align-items: center;
    justify-content: center;
    height: 80vh;

    table{
      align-items: flex-start;
      padding: .5rem;
      border: 1px solid #E8E8E8;
      border-bottom: 2px solid #D7D7D7;
      border-radius: 10px;

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
`;