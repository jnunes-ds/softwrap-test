Esse é um projeto [Next.js](https://nextjs.org/).

## Inicie com

Primeiro faça o clone do repositório com
```bash
git clone 'https://github.com/jnunes-ds/softwrap-test.git'
# Ou crie seu próprio repositório e depois vincule-o ao repositório atual
git remote add origin 'https://github.com/jnunes-ds/softwrap-test.git'
git pull
```
Depois, abra o terminal na página local do seu repositório e rode o comando:

```bash
npm install
# ou
yarn install
```

Por último, rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) wcom o seu Browser para ver o resultado.

-------------------------
## Relatório:

#### Objetivo
O objetivo dessa aplicação é mostrar consumir dados do <b>firestore</b> bem como alterar, acrescentar e apagar esses dados.

Os dados fornecidos pelo firestore são objetos contendo as seguintes informações:

>>Nome;
Idade;
Estado Civil;
CPF;
Cidade;
Estado.

Exceto pela idade que é um number, todos os outros elementos são strings, o que resulta na tipagem abaixo:


```typescript
    {
        Name: string;
        Age: number;
        MaritalStatus: string;
        CPF: string;
        City: string;
        State: string;
    }
```
#### Execução

O aplicativo foi iniciado com o comando:
```bash
yarn create next-app
```
O <b>yarn</b> foi o gerenciador de pacotes usado durante todo o processo.

Afim de ter maior organização e controle sobre os elementos a serem trabalhados optei pela utilização do typescript (Sempre como ferramenta de desenvolvimento).

Além disso houve a instalação das dependências Firebase, para a utilização do firestore e do styled-components (<i>E seus devitos <u>types</u></i>) para efetuar a estilização das páginas e dos seus componentes.

Devido ao comportamento de navegação peculiar do NextJS, a página pincipal que exibe todos os arquivos fica no próprio <b>index.tsx</b> e não numa página separada (<i>provavelmente</i>) <b>All.tsx</b> como faria se fosse utilizando o react-router.

## ...Em produção...