
import { firestore } from './firebase';

export interface IRegisters{
  Name: string;
  Age: Number;
  MaritalStatus: string;
  CPF: string;
  City: string;
  State: string;
  ID: string;
}

const ref = firestore.collection("tabela");

  //Armazenando TODOS os dados em um estado "registers"
  export function getRegisters(){
    
    const registers = [];
    // guardando dados do firestore em lista temporária 
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        registers.push(doc.data());
      });
    });
    //Setando estado registers com lista temporária
    return {registers};
      
  }
