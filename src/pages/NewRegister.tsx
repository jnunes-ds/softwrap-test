import { Fragment, useState } from "react";
import styled from "styled-components";
import Button from '../components/Button';
import { IRegisters } from './index';


export default function (){
    const [newRegister, setNewRegister] = useState<IRegisters>();
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [regionState, setRegionState] = useState('');

    return (
        <Fragment>
            <div className="Titulo">
                <h1>Novo Cadastro</h1>
            </div>
            <Container>
                <div className="registerContainer">

                    <div className="registerSubtitle">
                        <h3>Informações pessoais</h3>
                        <p>Adicione aqui as informações da nova pesoa.</p>
                    </div>

                    <div className="registerForms">

                        <div className="form formName">
                            <label>Nome</label>
                            <input name="name" type="text" placeholder="Digite o nome"/>
                        </div>
                        <div className="form formAge">
                            <label>Idade</label>
                            <input name="Age" type="number" placeholder="Dgite a idade em anos"/>
                        </div>
                        <div className="form formMS">
                            <label>Estado Civil</label>
                            <input name="name" type="text" />
                        </div>
                        <div className="form formCPF">
                            <label>CPF</label>
                            <input name="CPF" type="text" placeholder="000.000.000-00"/>
                        </div>
                        <div className="form formCity">
                            <label>Cidade</label>
                            <input name="name" type="text" placeholder="Digite o nome da sua cidade"/>
                        </div>
                        <div className="form formState">
                            <label>Estado</label>
                            <input name="name" type="text"/>
                        </div>
                        <div className="btn">
                            <Button 
                                color={{
                                    bgNormal: 'blue',
                                    borderNormal: '1px solid blue',
                                    textColorNormal: '#FFF',
                                    bgHover: 'green',
                                    borderHover: '1px solid green'
                                }}
                                name="Cadastrar"
                            />
                        </div>

                    </div>

                </div>
            </Container>
        </Fragment>
    );
}

const Container = styled.section`
    display: flex;
    width: 100vw;
    height: 80vh;
    justify-content: center;
    align-items: center;


    .registerContainer{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 80vh;

        .registerSubtitle{
            display: flex;
            height: 60%;
            flex-direction: column;
            justify-content: flex-start;
            padding: 10px;
            h3{
                margin: 0;
                padding: 0;
            }
            p{
                margin: 0;
                padding: 0;
                color: #B5B5B5
            }
        }

        .registerForms{
            width: 60%;
            display: grid;
            border: 1px solid #D7D7D7;
            padding: 20px;
            border-radius: 10px;

            grid-template-areas: "a1 a1 a1 a1 a1 a2"
                                 "a3 a3 a3 a4 a4 a4"
                                 "a5 a5 a5 a6 a6 a6"
                                 "a7 a7 a7 a7 a7 a7";

            .form{
                display: flex;
                flex-direction: column;
                margin-bottom: .75rem;
                padding: .5rem;

                input{
                    height: 2rem;
                    border-radius: 10px;
                    border: 1px solid #D7D7D7;
                    padding: 0%.5rem;
                }
            }

            .formName{
                grid-area: a1;
            }
            .formAge{
                grid-area: a2;
            }
            .formMS{
                grid-area: a3;
            }
            .formCPF{
                grid-area: a4;
            }
            .formCity{
                grid-area: a5;
            }
            .formState{
                grid-area: a6;
            }

            .btn{
                width: 100%;
                display: flex;
                justify-content: flex-end;
                grid-area: a7;
            }
        }
    }
`;