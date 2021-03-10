# Bem vindo ao Document Analysis, uma API que analisa documentos para prever possíveis fraudes
### Esse projeto foi feito como teste da empresa LUPPA.

# Tecnologias
### As tecnologias utilizadas no projeto foram:
### Node.js com Express para criar a API;
### PostgreSQL como banco de dados;
### Redis para armazenar o cache das requisições;
### TypeORM para fazer toda a comunicação com o banco  de dados;
### Docker para separar a aplicação por contêineres;


# Estrutura
### O projeto segue o padrão _Data Mapper Pattern_ que tem como objetivo abstrair e separar as responsabilidades da aplicação da seguinte maneira:
### _Controllers_ são responsáveis por receber a requisição, tratá-la se necessário e chamar o service;

### _Repositories_ são responsáveis pela ponte entre a aplicação e o banco de dados, fazendo as queries necessárias utilizando um ORM ou driver de BD;

### _Services_ são responsáveis pela regra de negócio da aplicação, tratamento de possíveis erros e retorno ao usuário.

### Também foram seguidos alguns principíos do SOLID, como 'Single Responsability Principle', 'Liskov Substitution Principle' e 'Dependency Inversion Principle'.

# Instruções para instalação
### 1 - Clone o repositório rodando o comando: `git clone https://github.com/BrunoSantoni/document-analysis.git`;

### 2 - Instale as dependências com o comando: `yarn`;

### 3.1 - Crie um arquivo __.env__ na raíz do projeto e copie o conteúdo de __.env.example__ para ele;
### __PS: Caso alguma informação do seu contêiner do Redis seja diferente do exemplo, altere conforme necessário__

### 3.2 - Crie um arquivo __ormconfig.json__ na raíz do projeto e copie o conteúdo de __ormconfig.example.json__ para ele;
### __PS: Caso alguma informação do seu contêiner do Postgres seja diferente do exemplo, altere conforme necessário__

### 4 - Inicie os seus contêineres no Docker, ou execute o comando `docker compose up` para criar os contêineres automaticamente;

### 5 - Crie uma tabela no seu Postgres chamada `document_analysis`;

### 6 - Execute o comando: `yarn typeorm migration:run` para rodar as migrations e criar as tabelas no banco.

# Comandos

### `yarn test` = Roda os testes unitários que estão na pasta src/modules/analyses/services/&#95;&#95;tests&#95;&#95;
### `yarn test:watch` = Roda os testes unitários e fica observando as mudanças para testar em tempo real
### `yarn dev` = Roda o servidor na porta __3333__
### `yarn build` = Gera uma build com o Babel na pasta *dist*

# Rotas

### /analyses : Rota do tipo POST responsável por criar uma análise de documento, para cadastrar os documentos é preciso enviar a requisição no seguinte formato:

`
{
	"fullName": "Nome da pessoa",
	"cpf": "12345678910",
	"documents": [
		"https://arraycomurls.com",
    "https://coloquequantasdesejar.com",
    "https://separadasporvirgula.com
	]
}
`

### /analyses?page=__x__&limit=__x__ : Rota do tipo GET que recebe *query params* responsável por listar todas as análises no banco *ordenadas pelos nomes dos remetentes em ordem alfabética*.
### __IMPORTANTE__: O __x__ no page e no limit correspondem ao número da página desejado e ao limite de análises retornadas por página. Por exemplo: /analyses?page=1&limit=5 fará retornar as cinco primeiras análises. /analyses?page=2&limit=10 retornará a análise 11 - 20 se houverem e assim por diante.

### /analyses/__id-analise__ : Rota do tipo GET que recebe *route params* responsável por listar uma análise específica.
### __IMPORTANTE__: O __id-analise__ deve ser preenchido com um ID de uma análise já cadastrada previamente, os ID's das análises estão sempre no formato _UUID_.
