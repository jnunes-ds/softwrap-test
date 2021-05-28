import {firestore} from "./firebase";
import { deleteRegister } from "./deleteRegister";
import { getRegisters } from "./getRegisters";
import { getRegisterById } from "./getRegiterById";
import { postNewRegister } from "./postRegister";
import { updateRegister } from "./updateRegister";

export { 
    firestore, 
    deleteRegister, 
    getRegisters, 
    getRegisterById,
    postNewRegister,
    updateRegister 
}