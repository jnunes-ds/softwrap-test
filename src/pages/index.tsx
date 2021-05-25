import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { firestore } from '../utils/firebase';
import Button from '../components/Button';



export default function Home() {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firestore.collection("tabela");

  function getRegisters(){
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRegisters(items);
      console.log(registers)
      setLoading(false);
    });
  }

  useEffect(() => {
    getRegisters();
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
              registers.map(register => {
                return(
                  <tr key={register.id}>
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
                <td>Mostrando 1 até 6 de 20 resultados</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Button name="Anterior" />
                </td>
                <td>
                  <Button name="Próximo"/>
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
  .Titulo{
    border: 1px solid #E8E8E8;
    h1{
      font-size: 2rem;
      margin-left: 15rem;
    }
  }
  
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