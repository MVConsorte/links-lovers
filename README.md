# Links Lovers

![Expo](https://img.shields.io/badge/Expo-000000?style=flat&logo=expo&logoColor=white)
![React%20Native](https://img.shields.io/badge/React%20Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

Projeto final do curso de React Native (40 aulas). O app organiza links por categoria, com tela de listagem e fluxo de cadastro.

## Sumario

- [Sobre](#sobre)
- [Screenshots](#screenshots)
- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Aprendizados](#aprendizados)
- [Requisitos](#requisitos)
- [Como rodar](#como-rodar)
- [Scripts](#scripts)
- [Estrutura](#estrutura)
- [Licenca](#licenca)

## Sobre

Links Lovers e um app simples para salvar e consultar links favoritos. O foco do projeto foi praticar fundamentos de React Native com Expo, navegacao, componentes reutilizaveis e persistencia local.

## Screenshots

<table>
   <tr>
      <td><img src="docs/screenshots/01.jpeg" alt="Tela 1" width="320" /></td>
      <td><img src="docs/screenshots/02.jpeg" alt="Tela 2" width="320" /></td>
   </tr>
   <tr>
      <td><img src="docs/screenshots/03.jpeg" alt="Tela 3" width="320" /></td>
      <td><img src="docs/screenshots/04.jpeg" alt="Tela 4" width="320" /></td>
   </tr>
</table>

## Funcionalidades

- Cadastro de links com titulo, url e categoria
- Listagem por categoria
- Persistencia local via Async Storage
- Layout responsivo para mobile

## Stack

- React Native + Expo
- TypeScript
- Expo Router
- Async Storage
- ESLint / Prettier (opcional)

## Aprendizados

- Arquitetura de rotas com Expo Router
- Componentizacao e padronizacao visual
- Persistencia local com Async Storage
- Separacao de responsabilidades (componentes, estilos, storage)
- Organizacao de estado e efeitos na tela de listagem

## Requisitos

- Node.js 18+ (ou 20+)
- npm ou yarn
- Expo Go (no celular) ou emulador

## Como rodar

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Inicie o projeto:

   ```bash
   npm run start
   ```

3. Abra no celular com o Expo Go ou no emulador.

## Scripts

- `npm run start` - inicia o Expo
- `npm run android` - abre no Android
- `npm run ios` - abre no iOS
- `npm run web` - abre no navegador

## Estrutura

```
src/
  app/              # Rotas (Expo Router)
  assets/           # Assets do app
  components/       # Componentes reutilizaveis
  storage/          # Persistencia local
  styles/           # Cores e estilos compartilhados
  utils/            # Constantes e helpers
```

## Licenca

Este projeto e de uso educacional.
