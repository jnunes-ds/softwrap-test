import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import Button from '../../components/Button';
import { IRegisters } from '../../types/IRegister';
import { v4 as uuidv4} from 'uuid';
import { postNewRegister } from "../../utils/postRegister";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MaskedInput from 'react-text-mask';
import { useRouter } from 'next/router';
import { getRegisters } from "../../utils/getRegisters";
import { getRegisterById } from '../../utils/getRegiterById';

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

export default function (){
    const [loading, setLoading] = useState(false);
     
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [regionState, setRegionState] = useState('');
    
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    
    const router = useRouter();
    
    function getRegister(){
        setLoading(true)
    
        const slug = String(router.query.slug);
        console.log(slug);
        
        const {register} = getRegisterById(slug);
        if(register.Age > 0){
            console.log('FOI!')
        }else{
            console.log('NÃO FOI!')
        }
        
        setTimeout(() => {
            setName(register.Name);
            setAge(register.Age);
            setMaritalStatus(register.MaritalStatus);
            setCpf(register.CPF);
            setCity(register.City);
            setRegionState(register.State);

            setLoading(false);
        }, 1000)
    }

    function sendPost(){
        let checkInputs = checkInputValues();

        if(!checkInputs){
            setShowDangerAlert(true);

            return; 
        }
        const newRegister = createNewRegister();
            
        postNewRegister(newRegister);

        setShowSuccessAlert(true);
            
        cleanInputs();
            
    }

    function checkInputValues(): boolean{
        let isAllCorrect = false;
        if(name && age && maritalStatus && cpf && city && regionState){
            if(
                name != ''
                && age != 0
                && maritalStatus != ''
                && cpf != ''
                && city != ''
                && regionState != ''
            ){
                isAllCorrect = true;
            }
        }

        return isAllCorrect;
    }

    function createNewRegister(){
        let newId = uuidv4();
        let aNewRegister: IRegisters = {
            Name: name,
            Age: age,
            MaritalStatus: maritalStatus,
            CPF: cpf,
            City: city,
            State: regionState,
            ID: newId
        };

        return aNewRegister;
    }

    function cleanInputs(){
        setName('');
        setAge(0);
        setMaritalStatus('Solteio(a)');
        setCpf('');
        setCity('');
        setRegionState('AC');
    }

    const cpfNumberMask = [
            /[1-9]/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/
    ];

    const DangerAlertContent: React.FC = () => {
        let numberOfErrors = 0;
        (!name || name == '') && numberOfErrors++;
        (!age || age == 0) && numberOfErrors++;
        (!cpf || cpf == '') && numberOfErrors++;
        (!city || city == '') && numberOfErrors++;

        (numberOfErrors == 0) && setShowDangerAlert(false);

        return (
            <>    
                <h6> ❌ Existe(m) {numberOfErrors} erro(s) ao adicionar uma nova pessoa.</h6>
                <ul>
    
                    {(!name || name == '') && <li>O campo Nome é obrigatório</li>}
                    {(!age || age == 0) && <li>O campo Idade é obrigatório</li>}
                    {(!cpf || cpf == '') && <li>O campo CPF é obrigatório</li>}
                    {(!city || city == '') && <li>O campo Cidade é obrigatório</li>}
                    
                </ul>
            </>
        );
    }

    useEffect(() => {
        if(showDangerAlert){
            setTimeout(() => {
                setShowDangerAlert(false);
            }, 5000)
        }
        if(showSuccessAlert){
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000)
        }
    }, [showDangerAlert, showSuccessAlert]);

    useEffect(() => {
        getRegister();
    }, [])
    

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <Fragment>
            <div className="Titulo">
                <h1>Novo Cadastro</h1>
            </div>
            <Container>
                {
                showDangerAlert
                && <Alert
                    className="alert dangerAlert"
                    variant="danger"
                   >
                       <div>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close alert"
                            onClick={() => setShowDangerAlert(false)}
                        ></button>
                        </div>
                        <DangerAlertContent/>
                    </Alert>
                }
                {
                    showSuccessAlert
                    && <Alert className="alert successAlert" variant="success">
                            ✅ Cadastro realizado com sucesso!
                            <div>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    aria-label="Close alert"
                                    onClick={() => setShowSuccessAlert(false)}
                                ></button>
                            </div>
                        </Alert>
                }
                <div className="registerContainer">

                    <div className="registerSubtitle">
                        <h3>Informações pessoais</h3>
                        <p>Adicione aqui as informações da nova pesoa.</p>
                    </div>
                    <div className="registerForms">

                        <div className="form formName">
                            <label>Nome</label>
                            <input
                                value={name} 
                                onChange={event => setName(event.target.value)}
                                name="name" 
                                type="text" 
                                placeholder="Digite o nome"
                            />
                        </div>
                        <div className="form formAge">
                            <label>Idade</label>
                            <input 
                                value={age}
                                onChange={event => setAge(Number(event.target.value))}
                                name="Age" 
                                type="number" 
                                placeholder="Dgite a idade em anos"
                            />
                        </div>
                        <div className="form formMS">
                            <label>Estado Civil</label>
                            <select
                                value={maritalStatus} 
                                onChange={event => setMaritalStatus(event.target.value)}
                            >
                                <option value="Solteiro(a)">Solteiro(a)</option>
                                <option value="Casado(a)">Casado(a)</option>
                                <option value="Viúvo(a)">Viúvo(a)</option>
                                <option value="Divorciado(a)">Divorciado(a)</option>
                            </select>
                        </div>
                        <div className="form formCPF">
                            <label>CPF</label>
                            <MaskedInput
                                name="CPF" 
                                type="tel" 
                                placeholder="000.000.000-00"
                                mask={cpfNumberMask}
                                value={cpf}
                                onChange={event => setCpf(event.target.value)}
                            />
                        </div>
                        <div className="form formCity">
                            <label>Cidade</label>
                            <input
                                value={city}
                                onChange={event => setCity(event.target.value)} 
                                name="name" 
                                type="text" 
                                placeholder="Digite o nome da cidade"
                            />
                        </div>
                        <div className="form formState">
                            <label>Estado</label>
                            <select
                                value={regionState}
                                onChange={event => setRegionState(event.target.value)}
                            >
                                <option value="AC">Acre (AC)</option>
                                <option value="AL">Alagoas (AL)</option>
                                <option value="AP">Amapá (AP)</option>
                                <option value="AM">Amazonal (AM)</option>
                                <option value="BA">Bahia (BA)</option>
                                <option value="CE">Ceará (CE)</option>
                                <option value="DF">Distrito Federal (DF)</option>
                                <option value="ES">Espírito Santo (ES)</option>
                                <option value="GO">Goiás (GO)</option>
                                <option value="MA">Maranhão (MA)</option>
                                <option value="MT">Mato Grosso (MT)</option>
                                <option value="MS">Mato Grosso do Sul (MS)</option>
                                <option value="MG">Minas Gerais (MG)</option>
                                <option value="PA">Pará (PA)</option>
                                <option value="PB">Paraíba (PB)</option>
                                <option value="PR">Paraná (PR)</option>
                                <option value="PE">Pernambuco (PE)</option>
                                <option value="PI">Piauí (PI)</option>
                                <option value="RJ">Rio de Janeiro (RJ)</option>
                                <option value="RN">Rio Grande do Norte (RN)</option>
                                <option value="RS">Rio Grande do Sul (RS)</option>
                                <option value="RO">Rondônia (RO)</option>
                                <option value="RR">Roraima (RR)</option>
                                <option value="SC">Santa Catarina (SC)</option>
                                <option value="SP">São Paulo (SP)</option>
                                <option value="SE">Sergipe (SE)</option>
                                <option value="TO">Tocantins (TO)</option>
                            </select>
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
                                onClick={sendPost   }
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

    .alert{
        position: absolute;
        float: left;
        top: 3.5rem;
        right: .75rem;

        div{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
    }

    .successAlert{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 40%;
    }

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

                select{
                    height: 2rem;
                    border-radius: 10px;
                    border: 1px solid #D7D7D7;
                    padding: 0%.5rem;
                    background: transparent;
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