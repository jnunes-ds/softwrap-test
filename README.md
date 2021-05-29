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

Devido ao comportamento de navegação peculiar do NextJS, a página pincipal que exibe todos os arquivos fica no próprio <b>index.tsx</b> e não numa página separada (<i>provavelmente seria </i>) <b>All.tsx</b> como faria se fosse utilizando o react-router.

#
###### Libs:

Utilizei também a lib react-bootstrap para facilitar na hora de fazer os alerts que seriam exibidos na págia. Junto com essa biblioteca também instalei para fins similares as libs:

#

* <b>react-icons</b> - Para facilitar a utilização dos ícones burger-menu;
* <b>react-loader-spinner</b> - Para informar ao usuário que ele deve aguardar um momento antes que as informações apareçam na página principal;
* <b>react-text-mask</b> - Para adicionar uma máscara ao input de CPF para que assim o usuário só possa fornecer um tipo específico de dado;
* <b>uuid</b> - Para fazer bons id's para os registros e de forma mais rápida e mais prática.

#
###### Em relação a tipagem:
Embora tenha profundo apreço pelo typescript e pela segurança que ele tras à aplicação, nessa em específico não houve uma super utilização das tipagens, isso pelo fato de que muitos estados foram utilizados e esses estados, em sua maioria, já recebia um valor inicial que, por sua vez, determinava a sua tipagem para o intellisense do editor.

Além disso, embora não seja unanimidade, a maioria esmagadora das funções feitas nesse projeto foram funções que não recebiam argumentos e retornaval <b>void</b>.

#

###### Exportação com index.ts:

Das tipagens que foram feitas, todas foram posteriormente colcadas numa pasta de nome types melhor organização. Todas elas são exportadas por um único arquivo index.ts afim de melhora não só a organização, mas facilitar também a importação.

Esse mesmo padrão é seguido pelos arquivos que guardam as funções responsáveis por fazer requisições para o firestore. A princípio estavam todas dispostas na página <i>'./src/utils/'</i>, mas depois foram realocadas para <i>'./src/utils/firebase'</i>.

Dentro dessa pasta também há um index.ts para facilitar a importação dessas funções quando necessário. A pasta utils não foi removida visando simular a escalabilidade que projetos reais precisam. <b>Hoje</b> há apenas a pasta firebase nele, não se tem como saber do futuro.

#

###### Language, why Portuguese:

Embora eu não seja (<i>Ainda! Estou estudando pra mudar isso.</i>) fluente em inglês, passando longe disso, é uma prática minha colocar todos os commits do git e comentários no código em inglês. 

Essa regra foi quebrada nesse projeto e o motivo é simples: a entrevista foi feita em português e as instruções passadas em português. 

#

#### Possíeis melhorias

Sendo um trabalho com um prazo não tão longo, não tenho como deixar de notar que existem coisas que eu faria diferente se o prazo fosse maior.

#

###### Requisições ao firestore:

Houve uma certa "gambiarra" que fiz para que as páginas com as informações vindas do firestore. Uma vez que elas não estavam sendo renderizadas pelo fato de o estado receber as informações apenas APÓS a renderização, eu estabeleci que determinadas requisições seriam feitas dentro de um setTimeOut de um segundo (Partindo do pressuposto que não demoraria mais que isso para conseguir as informações do servidor).

Acredito haver uma proposta mais elegante para solucionar essa questão, possivelmente uma solução simples inclusive. Entretanto, após algumas horas de pesquisa sem sucesso, o medo de que a busca por outra alternativa afetasse o prazo da entrega me fez não prosseguir por esse caminho.

#

###### Comentários:
Os commits do git não estão da melhor maneira, percebi também um que em alguns momentos há um hiato entre alguns commits. Isso não se deve a uma interrupção, mas ao fato de que em alguns momentos houve pesquisa e pequenas experimentações. Essas experiências geraram modificações nos arquivos, mas não tinha de verdade o que comentar.

#

###### Componente Button:
Acostumado a utilizar o SASS no nextjs, utilizar o styled-components foi uma novidade para mim. Gostei bastante dessa tecnologia, entretanto, houve um incidente que só percebi mais tarde.

O meu costume <b>no NextJS</b> era com arquivos scss, ao ver então o styled-components a minha mente associou imediatamente essa tecnologia ao StyleSheet do react native. Essa associação rendeu um problema que só fui perceber mais tarde. Na tentativa de definir a estilização do componente botão através de propriedades eu optei por criar um componente estilizado <b>dentro</b> da função Button.

Isso não quebrou a aplicação, mas gerou um warning que eu só fui perceber quando já estava com o prazo muito apertado para pensar numa segunda solução. Portanto entra para a lista de coisas que eu melhoraria.

#

#### Conclusão

Ainda que existam pontos de melhora considero a aplicação um sucesso uma vez que ela cumpre o que é solicitado: se comunicar com o firestore, criar registros de pessoas, visualizar a lista desses registros com paginação e um limite de 6 registros por página e, além disso, conseguir alterar e deletar registros que já foram criados.

A experiência de cumprir essa missão foi muito animadora e deixou uma expectativa muito boa. Agradeço pela provocação feita para que eu pudesse passar por esse processo.