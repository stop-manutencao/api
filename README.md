# Stop da Cidadania  
> Jogo com foco na educação de jovens e adultos sobre questões sociais e de cidadania

## Tecnologias Utilizadas
- NodeJS - [saiba mais](https://nodejs.org/en/docs/)
- ExpressJS - [saiba mais](https://expressjs.com/)
- Postman - [documentação](https://stopdacidadania.postman.co/workspaces/7121c60d-cc56-4131-9200-b9e8ed8dd335/collections)
- Javascipt - [ES6](https://www.w3schools.com/js/js_es6.asp)
- Jest - [saiba mais](https://jestjs.io/)


## Pré-Requisitos
- NodeJs e NPM - [como instalar](https://www.npmjs.com/get-npm)
- MongoDB - [como instalar](https://docs.mongodb.com/manual/administration/install-community/)


## Documentação
- Postman: [documentação](https://stopdacidadania.postman.co/workspaces/7121c60d-cc56-4131-9200-b9e8ed8dd335/collections)


## Testes
- Cobertura de testes: http://localhost:3000/coverage 
> Para acessar a cobertura de testes da aplicação, por enquanto, é necessário iniciar o servidor.


## Iniciando
- Clone o repositório:  
`git clone http://www.tools.ages.pucrs.br/StopCidadania/api.git`

- Entre no diretório:  
`cd api`

- Instale as dependências:  
`npm install`

- Iniciando o projeto:  
`npm start`

- Acesse no navegador:  
`http://localhost:3000`


> Os comandos acima iniciam apenas o **servidor** da aplicação.  
> Para uma experiência completa inicie também o Frontend, saiba mais [aqui](http://www.tools.ages.pucrs.br/StopCidadania/front).

## Estrutura

```
public/
bin/
├─ server.js
src/
├─ config/
├─ controllers/
│  ├─ status/
│     ├─ status.js
│     ├─ status.test.js
│  ├─ game/
│     ├─ game.js
│     ├─ game.test.js
├─ models/
|  ├─ game.js
├─ routes/
│  ├─ index.js
│  ├─ game.js
│  ├─ status.js
├─ test/
│  ├─ routes.test.js
├─ app.js

```

## Comandos

``` bash
# instalar dependências
npm install

# executar eslint (qualidade do código)
npm run lint

# executar testes
npm test

# server em localhost:3000
npm start
```


## Saiba mais
- RESTful APIs: [tutorial](https://www.oreilly.com/learning/how-to-design-a-restful-api-architecture-from-a-human-language-spec)

- Wiki: [repositório](http://www.tools.ages.pucrs.br/StopCidadania/Wiki)

- Modelo de documentação para arquitetura: [site](https://www.infoq.com/br/articles/C4-architecture-model)

- Mobis: [site](mobis.org.br)
