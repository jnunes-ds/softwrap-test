import { firestore } from "./firebase";

const ref = firestore.collection("tabela");

export function deleteRegister(register: string){
    if(register && register != ''){
        ref
        .doc(register)
        .delete()
        .catch((err) => {
            console.log(err);
        })
    }
        
}