import { ref } from "./firebase";

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