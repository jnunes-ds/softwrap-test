import { firestore } from "./firebase";

const ref = firestore.collection("tabela");

export function updateRegister(register){
    if(register && register != undefined){
        ref
        .doc(register.ID)
        .delete()
        .catch((err) => {
            console.log(err);
        })
    }
        
}