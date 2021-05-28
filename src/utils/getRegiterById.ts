import { IRegisters } from "../types/IRegister";
import { firestore } from "./firebase";

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

const ref = firestore.collection("tabela");

export function getRegisterById(id: string){
   let register: IRegisters = InitialRegisters[0];

    // guardando dados do firestore em lista temporária 
    ref.onSnapshot((querySnapshot) => {
       querySnapshot.forEach((doc) => {
          if(doc.get('ID') == id){
              register.Name = doc.get('Name');
              register.Age = doc.get('Age');
              register.MaritalStatus = doc.get('MaritalStatus');
              register.CPF = doc.get('CPF');
              register.City = doc.get('City');
              register.State = doc.get('State');
              register.ID = doc.get('ID');
        }
      });
    });
    //Setando estado registers com lista temporária
    return { register };
}
