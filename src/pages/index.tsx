import { useEffect } from 'react';
import { getRecords } from '../utils/Table';
import { Header } from '../components/Header';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
  }
`;

export default function Home() {

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="App">
      <GlobalStyle/>
        <Header/>
    </div>
  )
}
