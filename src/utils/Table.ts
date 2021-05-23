import { firestore } from "./firebase";

const getRecords = async () => {
    const snapshot = await firestore.collection("tabela").get();
    snapshot.docs.forEach(record => console.log(record.data()));
};

export {getRecords };