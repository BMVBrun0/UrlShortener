# URL Shortener (Expo + React Native + TypeScript)

App mobile para encurtar URLs usando a API proposta no desafio.

## Requisitos

-   Node.js 20.x
-   Yarn 1.x
-   Expo CLI

## Instalação

``` bash
yarn
```

## Rodar em desenvolvimento

``` bash
yarn expo start
```

Pressione: - a → Android - i → iOS (macOS)

## Rodar testes

``` bash
yarn test
```

## Estrutura principal

-   src/
    -   app/
    -   components/
    -   hooks/
    -   services/
    -   utils/
    -   state/
-   tests/

## API utilizada

POST https://url-shortener-server.onrender.com/api/alias

Body: { "url": "https://..." }

O histórico é mantido apenas em memória, conforme especificado no
enunciado.

O warmup.ts reduz o atraso da primeira requisição causado pelo cold start da API.