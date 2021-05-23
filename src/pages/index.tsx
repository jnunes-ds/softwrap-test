import { useEffect } from 'react';
import { getRecords } from '../utils/Table';
import { Header } from '../components/Header';

export default function Home() {

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      <Header/>
    </div>
  )
}
