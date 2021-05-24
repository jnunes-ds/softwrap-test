import { useEffect, useState } from 'react';

import { firestore } from '../utils/firebase';



export default function Home() {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firestore.collection("tabela");

  function getRegisters(){
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRegisters(items);
      console.log(registers)
      setLoading(false);
    });
  }

  useEffect(() => {
    getRegisters();
  }, []);

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <div>
        <h1>Visualizar Cadastros</h1>
      </div>
      <div>
        {
          registers.map(register => {
            return(
              <div key={register.id}>
                {register.Name}
              </div>
            );
          })
        }
      </div>
    </div>
  )
}
