# Base de dados de alunos

## Instruções para execução
Tendo o Docker configurado no PC, basta executar o arquivo run.sh no terminal. A aplicação está utilizando algumas portas por padrão (5432, 3000 e 8080). Para não ter que modificar o docker-compose, verifique se elas estão disponíveis.

## Testes 

Foi utilizado a metodologia TDD tanto no frontend quanto no backend.
Para verificar a taxa de cobertura de teste acesse a aplicação desejada pelo terminal, e execute o seguinte comando: 

```
npm run test:Ci

```

Ou, se utiliza o Yarn: 

```
yarn test:ci

```

## Metodologias e Designs

Foi utilizado no desenvolvimento metodologias, princípios de programação e design patterns tais como: 
- Clean Architecture
- TDD
- SOLID
- Factory
 - Adapter
 - Composite
 - Builder
 - entre outras

## Algumas das tecnlogias utilizadas
 - React
 - Node
 - Typescript
 - Postgres
 - Typeorm
 - Recoil
 - Jest
 - Bootstrap/React Bootstrap
 - Webpack
 - Docker
 - Express
 - entre outras
