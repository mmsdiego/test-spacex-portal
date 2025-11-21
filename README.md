# 🚀 SpaceX Launch Portal

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/seu-usuario/spacex-portal/actions)  
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/seu-usuario/spacex-portal/actions)

Uma aplicação web construída com **Next.js** que funciona como um portal de lançamentos da **SpaceX**, consumindo a **API GraphQL pública**.  


---

## 📝 Tecnologias Utilizadas

- **Next.js (App Router)** – framework React moderno  
- **TypeScript** – tipagem estática  
- **Tailwind CSS v4** – estilização responsiva  
- **shadcn/ui** – biblioteca de componentes  
- **Apollo Client** – consumo de API GraphQL da SpaceX  
- **Vitest** – testes unitários  
- **Cypress** – testes E2E  

---

## 🖥️ Funcionalidades

1. **Página Inicial**  
   - Apresentação do portal  
   - Destaque para a marca SpaceX  

2. **Catálogo de Lançamentos**  
   - Listagem paginada de missões  
   - Infinite scroll (carregamento progressivo)  
   - Informações importantes: nome da missão, data e status  

3. **Detalhes do Lançamento**  
   - Nome da missão  
   - Descrição completa  
   - Foguete utilizado  
   - Imagens e vídeos (se disponíveis)  
   - Links adicionais: Wikipedia, YouTube  

4. **Responsividade**  
   - Layout adaptável para desktop, tablet e mobile  

5. **Renderização**  
   - SSR (Server-side rendering) e CSR (Client-side rendering)  

6. **Testes**  
   - Unitário: Vitest  
   - E2E: Cypress 

---

## 📂 Estrutura do Projeto

app/ # Páginas e App Router
components/ # Componentes reutilizáveis
lib/ # Configurações, Apollo Client, utilitários
tests/
├─ unit/ # Testes Vitest
└─ e2e/ # Testes Cypress

---

## ⚙️ Instalação e Setup

```bash
# Clonar o repositório
git clone https://github.com/mmsdiego/test-spacex-portal.git
cd spacex-portal

# Instalar dependências
npm install

# Rodar o projeto localmente
npm run dev
```

A aplicação estará disponível em: ```http://localhost:3000```

---

## 🧪 Testes

Unitários (Vitest)

```bash
# Rodar todos os testes unitários
npm run test:unit

# Rodar testes unitários em modo watch
npm run test:unit:watch
```

E2E (Cypress)
```bash
# Abrir interface do Cypress
npm run test:e2e

# Rodar E2E headless
npm run test:e2e:run
```

---

## 📌 Scripts Disponíveis

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test:unit": "vitest run",
  "test:unit:watch": "vitest",
  "test:e2e": "cypress open",
  "test:e2e:run": "cypress run",
  "test": "npm run test:unit && npm run test:e2e:run"
},
```


