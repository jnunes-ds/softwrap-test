import { Header } from "../components/Header";
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
  }
`;


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalStyle/>
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
