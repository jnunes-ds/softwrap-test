import { firestore } from "./firebase";

const ref = firestore.collection("tabela");

export function postNewRegister(newRegister){
    if(newRegister && newRegister != undefined){
        ref
        .doc(newRegister.ID)
        .set(newRegister)
        .catch(err => {
            console.log(err)
        });
    }
        
}