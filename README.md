# Pocket Links

Aplicativo mobile feito com **Expo + React Native + TypeScript** para demonstrar uma abordagem mais autoral e publicável de um encurtador de URL.

O projeto nasceu a partir de um teste técnico antigo e foi evoluído para virar um **case público de arquitetura mobile**, com foco em:

- organização de pastas por feature;
- separação de responsabilidades;
- persistência local de histórico;
- fila offline simulada;
- navegação simples com header, bottom bar e drawer;
- testes unitários para regras centrais.

## Objetivo

Mais do que ser um produto comercial, a proposta aqui é servir como um projeto de estudo e portfólio para mostrar:

- estrutura de projeto em React Native;
- fluxo de criação e persistência de links;
- experiência offline-first;
- boas práticas de componentização e modelagem de estado;
- base pronta para futuras evoluções como autenticação, sync real e testes E2E.

## Principais funcionalidades

- criação de links curtos via provider local de demonstração;
- histórico persistido em cache local;
- modo offline com fila pendente para sincronização posterior;
- favoritos;
- busca por URL, alias ou link curto;
- contador de cópias;
- telas de Home, Histórico, Configurações e Sobre;
- menu lateral com navegação rápida.

## Estrutura

```text
.
├── App.tsx
├── app.config.ts
├── assets
│   ├── adaptive-icon.png
│   ├── icon.png
│   └── splash-icon.png
├── src
│   ├── app
│   │   ├── AppShell.tsx
│   │   └── screens
│   ├── features
│   │   └── links
│   │       ├── components
│   │       ├── hooks
│   │       ├── providers
│   │       ├── storage
│   │       ├── types.ts
│   │       └── utils
│   ├── infrastructure
│   │   └── storage
│   └── shared
│       ├── components
│       ├── theme
│       └── utils
└── tests
    └── unit
```

## Stack

- **Expo**
- **React Native**
- **TypeScript**
- **AsyncStorage** para persistência local
- **Jest** para testes unitários

## Executando

```bash
yarn
yarn start
```

## Testes unitários

```bash
yarn test
```

## Próximos passos pensados para o projeto

- autenticação e sincronização real de histórico;
- suporte a múltiplos providers de encurtamento;
- fila offline com retry exponencial;
- analytics local;
- testes E2E com Maestro ou equivalente;
- versão web com fluxo dedicado.
