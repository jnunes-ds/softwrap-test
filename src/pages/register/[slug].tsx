import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import Button from '../../components/Button';
import { IRegisters } from '../../types';
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MaskedInput from 'react-text-mask';
import { useRouter } from 'next/router';
import { 
    getRegisterById, 
    updateRegister,
    deleteRegister 
} from '../../utils/firebase';



export default function (){
    //Estados referentes a informações de cadastro do usuário
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [regionState, setRegionState] = useState('');
    const [registerId, setRegisterId] = useState('');
    
    //Estados referentes a visibilidade dos alertas de erro, sucesso
    //e confirmação de deleção
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    
    //Constantes que armazenam o valor do id presente no slug
    const router = useRouter();
    const slug = String(router.query.slug);
    
    //registro do cadastro puxado do firestore a partir do id
    const {register} = getRegisterById(slug);
    
    //Armazena os dados coletados do cadastro nos estados anteriormente criados
    function getRegister(){
        
        /**
         * Aguardar um segundo para setar esses dados foi a forma que encontrei
         * de evitar o erro onde os dados aparecem vazios na tela.
         * Não consegui transformar getRegistersById numa função async await
         */
        setTimeout(() => {
            setName(register.Name);
            setAge(register.Age);
            setMaritalStatus(register.MaritalStatus);
            setCpf(register.CPF);
            setCity(register.City);
            setRegionState(register.State);
            setRegisterId(register.ID);
        }, 1000)
    }

    //Função chamada diretamente pelo usuário no click do botão
    function sendUpdate(){
        /*Checa se há algum dado sem preenchimento e retorna um booleano
         *O valor deve ser positivo para que a postagem aconteça.
         */
        let checkInputs = checkInputValues();

        /**Caso a função anterior retorne false aparecerá um alerta informando que
         *há dados sem preencher
         */
        if(!checkInputs){
            setShowDangerAlert(true);

            return; 
        }
        //Caso retorne true é criado um novo registro com todos os dados de cada input
        const newRegister = createNewRegister();
         
        //Esses registros são setados para o firestore
        updateRegister(newRegister);

        // É alterado o estado responsável por tornar visível o alert de sucesso
        setShowSuccessAlert(true);
            
    }

    /**Função chamada pelo usuário ao confirmar explusão, ela pega o id do usuário
     * e o envia como arguento para uma função que solicitará a deleção ao firestore 
     */ 
    function onDelete(){
        deleteRegister(registerId);
        router.push('/');
        
    }

    //Checa se todos os valores estão corretos e retorna um boolean.
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

    //Cria um novo registro a partir dos estados de cada informação e retorna esse registro
    function createNewRegister(){
        let aNewRegister: IRegisters = {
            Name: name,
            Age: age,
            MaritalStatus: maritalStatus,
            CPF: cpf,
            City: city,
            State: regionState,
            ID: registerId
        };

        return aNewRegister;
    }
    
    //Máscara para input CPF. 
    const cpfNumberMask = [
            /[0-9]/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/
    ];

    //Verifica quais itens estão em branco e, a partir deles retorna um alert personalizado.
    const DangerAlertContent: React.FC = () => {
        let numberOfErrors = 0;
        (!name || name == '') && numberOfErrors++;
        (!age || age == 0) && numberOfErrors++;
        (!cpf || cpf == '') && numberOfErrors++;
        (!city || city == '') && numberOfErrors++;

        (numberOfErrors == 0) && setShowDangerAlert(false);

        return (
            <>    
                <h6> ❌ Existe(m) {numberOfErrors} erro(s) ao modificar o cadastro dessa pessoa.</h6>
                <ul>
    
                    {(!name || name == '') && <li>O campo Nome é obrigatório</li>}
                    {(!age || age == 0) && <li>O campo Idade é obrigatório</li>}
                    {(!cpf || cpf == '') && <li>O campo CPF é obrigatório</li>}
                    {(!city || city == '') && <li>O campo Cidade é obrigatório</li>}
                    
                </ul>
            </>
        );
    }

    /**Verifica se há algum alert sendo exibido (Salvo a pergunta sobre deletar usuário) 
     * e torna ele novamente invisível em 5s.
     */  
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

    /**verifica se houve alguma mudança na variável register, que é puxada do firestore,
     * e a partir disso chama a função getRegister.
     */ 
    useEffect(() => {
        getRegister();
    }, [register])
    


    return (
        <Fragment>
            <div className="Titulo">
                <h1>Alterar Cadastro</h1>
            </div>
            <Container>
                {
                    /**Alerta exibido para informar que existem campos obrigatórios do cadastro
                     * que não foram preenchidos
                     */ 
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
                    //Alerta de sucesso exibido quando a modificação do usuário ocorre corretamente
                    showSuccessAlert
                    && <Alert className="alert successAlert" variant="success">
                            ✅ Cadastro Modificado com sucesso!
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
                {
                    // Alerta para confirmar se usuário deve ser excluído 
                    showDeleteAlert
                    && <Alert
                            className="deleteAlert"
                            variant="danger"
                       >
                           <h4>Excluir</h4>
                           <p>Tem certeza que deseja excluir esse cadastro?</p>
                           <div className="deleteButtons">
                               <Button 
                                    name="cancelar"
                                    color={{
                                        bgNormal: 'white',
                                        borderNormal: 'none',
                                        textColorNormal: '#ff0000',
                                        bgHover: '#00ff00',
                                        borderHover: 'none'
                                    }}
                                    onClick={() => setShowDeleteAlert(false)}
                                />
                                <Button 
                                    name="Excluir"
                                    color={{
                                        bgNormal: '#ff0000',
                                        borderNormal: 'none',
                                        textColorNormal: 'white',
                                        bgHover: '#ff00009f',
                                        borderHover: 'none'
                                    }}
                                    onClick={onDelete}
                                />
                            </div>
                       </Alert>
                }
                <div className="registerContainer">

                    <div className="registerSubtitle">
                        <h3>Informações pessoais</h3>
                        <p>Modifique aqui as informações da pesoa em exibição.</p>
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
                                    bgNormal: '#00ffffff',
                                    borderNormal: '1px solid #00ffff',
                                    textColorNormal: 'blue',
                                    bgHover: 'red',
                                    borderHover: '1px solid red'
                                }}
                                onClick={() => setShowDeleteAlert(true)}
                                name="Excluir Cadastro"
                            />
                            <Button 
                                color={{
                                    bgNormal: 'blue',
                                    borderNormal: '1px solid blue',
                                    textColorNormal: '#FFF',
                                    bgHover: 'green',
                                    borderHover: '1px solid green'
                                }}
                                onClick={sendUpdate}
                                name="Alterar"
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

    .deleteAlert{
        position: absolute;
        top: 40%;
        right: 60%;
        left: 40%;
        bottom: 60%;
        align-self: center;
        float: none;
        width: 35rem;
        height: 15rem;

        p{
            margin-top: 2rem;
            font-size: larger;
        }

        .deleteButtons{
            width: 100%;
        }
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

    @media screen and (max-width: 770px){
        
        
            .alert{
                position: fixed;
                float: right;
                top: 50%;

            }

            .successAlert{
                width: 90%;
            }
        
        .registerContainer{
            flex-direction: column;

            .registerForms{
                display: flex;
                flex-direction: column;
                width: 90vw;
            }

        }

        .deleteAlert{
            right: 0;
            left: 0;
            bottom: 0;
            align-self: center;
            width: 100vw;
            height: 15rem;
        }
    }
`;