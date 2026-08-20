# 📊 Dashboard Financeiro API

[![Node.js](https://img.shields.io/badge/Node.js-v20+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-v5.2+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v7.9+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)
[![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

Uma API RESTful robusta e escalável para **gestão e análise financeira pessoal e empresarial**. A aplicação resolve o problema do controle desorganizado de receitas e despesas através de autenticação segura JWT, isolamento de dados multi-usuário, persistência com Prisma ORM e SQLite, filtros dinâmicos e relatórios analíticos avançados de fluxo de caixa e distribuição percentual por categorias.

---

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript server-side.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado para maior confiabilidade, produtividade e manutenibilidade do código.
- **[Express](https://expressjs.com/)**: Framework web minimalista e flexível para criação de rotas e middlewares.
- **[Prisma ORM](https://www.prisma.io/)**: ORM de última geração para modelagem, migração e consultas seguras ao banco de dados.
- **[SQLite](https://www.sqlite.org/) & [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3)**: Banco de dados relacional leve e embutido com alta performance via driver adapter.
- **[Bcryptjs](https://github.com/dcodeIO/bcrypt.js)**: Hash criptográfico seguro de senhas com algoritmo salt/rounds.
- **[JSON Web Tokens (JWT)](https://jwt.io/)**: Geração e validação de tokens para autenticação stateless.
- **[Vitest](https://vitest.dev/)**: Framework ultrarrápido para testes unitários.
- **[TSX](https://github.com/privatenumber/tsx)** & **[tsup](https://tsup.egoist.dev/)**: Execução em desenvolvimento com hot-reload e build otimizado para produção.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu ambiente:

- **[Node.js](https://nodejs.org/)** (versão `18.x` ou superior, recomendado `20.x` LTS)
- **[npm](https://www.npmjs.com/)** (geralmente instalado junto com o Node.js) ou **[yarn](https://yarnpkg.com/)** / **[pnpm](https://pnpm.io/)**
- **[Git](https://git-scm.com/)** para versionamento de código

---

## 🔧 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/ViktorGabriel/dashboard-financeiro.git
cd dashboard-financeiro
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (caso não exista):

```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_jwt_super_segura"
```

### 4. Executar Migrações do Banco de Dados

Gere o Prisma Client e execute as migrações do SQLite:

```bash
npx prisma migrate dev
```

### 5. Iniciar o Servidor

#### Modo de Desenvolvimento (com Watch/Hot-Reload):
```bash
npm run start:watch
```

#### Modo de Desenvolvimento (Execução Única):
```bash
npm run start:dev
```

O servidor iniciará em: `http://localhost:3000`

### 6. Executar Testes Unitários

Para rodar a suíte de testes com o Vitest:

```bash
npx vitest run
```

---

## 📁 Estrutura do Projeto

O projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, desacoplando regras de negócio, infraestrutura de banco de dados e camada HTTP:

```text
dashboard-financeiro/
├── prisma/
│   ├── migrations/             # Histórico de migrações relacionais
│   └── schema.prisma           # Modelos de dados (User, Transaction)
├── src/
│   ├── domain/                 # Entidades, DTOs e Contratos de domínio
│   │   ├── analytics.ts        # Interfaces para relatórios (CashFlowPoint, CategoryBreakdown)
│   │   ├── transaction.ts      # Entidade Transaction e DTOs de criação e filtros
│   │   └── user.ts             # Entidade User e DTOs de autenticação
│   ├── middlewares/            # Interceptadores HTTP
│   │   └── ensure-authenticated.ts # Validação de token Bearer JWT
│   ├── repositories/           # Camada de abstração e acesso a dados
│   │   ├── i-transaction-repository.ts
│   │   ├── transaction-repository.ts
│   │   ├── in-memory-transaction-repository.ts  # Repositório em memória para testes
│   │   ├── prisma-transaction-repository.ts     # Repositório persistido com Prisma
│   │   ├── i-user-repository.ts
│   │   └── prisma-user-repository.ts
│   ├── use-cases/              # Casos de uso (Regras de Negócio da aplicação)
│   │   ├── authenticate-user.ts       # Login e geração de JWT
│   │   ├── create-transaction.ts      # Validação e criação de transações
│   │   ├── get-cash-flow.ts           # Agrupamento temporal de fluxo de caixa
│   │   ├── get-category-breakdown.ts  # Agrupamento e cálculo percentual por categoria
│   │   ├── get-summary.ts             # Resumo consolidado (receitas, despesas, saldo)
│   │   └── register-user.ts           # Registro de novo usuário com hash de senha
│   ├── tests/                  # Testes unitários com Vitest
│   │   └── get-summary.spec.ts
│   └── server.ts               # Ponto de entrada da aplicação e configuração de rotas Express
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📖 Guia de Uso da API

> 💡 **Dica sobre valores monetários:** Todos os valores (`amount`, `incomes`, `expenses`, `balance`, `total`) são trafegados e armazenados em **centavos** como números inteiros (ex: R$ 150,00 = `15000`), evitando imprecisões de ponto flutuante.

### 🔐 1. Autenticação

#### `POST /auth/register`
Cadastra um novo usuário no sistema.

**Body (JSON):**
```json
{
  "name": "Maria Silva",
  "email": "maria@example.com",
  "password": "senhaSegura123"
}
```

**Resposta (201 Created):**
```json
{
  "id": "c8a4d715-e01c-4b95-a226-5b4c1074a3f1",
  "name": "Maria Silva",
  "email": "maria@example.com",
  "createdAt": "2026-08-20T13:00:00.000Z"
}
```

---

#### `POST /auth/login`
Autentica o usuário e retorna o token JWT para uso nas demais rotas.

**Body (JSON):**
```json
{
  "email": "maria@example.com",
  "password": "senhaSegura123"
}
```

**Resposta (200 OK):**
```json
{
  "user": {
    "id": "c8a4d715-e01c-4b95-a226-5b4c1074a3f1",
    "name": "Maria Silva",
    "email": "maria@example.com",
    "createdAt": "2026-08-20T13:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 💳 2. Transações (Requer Cabeçalho `Authorization: Bearer <TOKEN>`)

#### `POST /transactions`
Cria uma nova transação financeira vinculada ao usuário autenticado.

**Body (JSON):**
```json
{
  "description": "Supermercado Semanal",
  "amount": 15000,
  "type": "EXPENSE",
  "category": "Alimentação"
}
```

**Resposta (201 Created):**
```json
{
  "id": "e8d64192-8022-4217-a068-07e155bcbf1e",
  "title": "Supermercado Semanal",
  "amount": 15000,
  "type": "EXPENSE",
  "category": "Alimentação",
  "userId": "c8a4d715-e01c-4b95-a226-5b4c1074a3f1",
  "createdAt": "2026-08-20T13:05:00.000Z"
}
```

---

#### `GET /transactions`
Lista transações do usuário com suporte a filtros combináveis na URL query string:
- `?type=INCOME` ou `?type=EXPENSE`
- `?category=Alimentação`
- `?startDate=2026-08-01`
- `?endDate=2026-08-31`

**Exemplo de Requisição:**
```http
GET /transactions?type=EXPENSE&category=Alimentação
Authorization: Bearer <TOKEN>
```

**Resposta (200 OK):**
```json
[
  {
    "id": "e8d64192-8022-4217-a068-07e155bcbf1e",
    "title": "Supermercado Semanal",
    "amount": 15000,
    "type": "EXPENSE",
    "category": "Alimentação",
    "userId": "c8a4d715-e01c-4b95-a226-5b4c1074a3f1",
    "createdAt": "2026-08-20T13:05:00.000Z"
  }
]
```

---

#### `GET /summary`
Retorna o resumo financeiro consolidado (total de receitas, despesas e saldo).

**Resposta (200 OK):**
```json
{
  "incomes": 500000,
  "expenses": 150000,
  "balance": 350000
}
```

---

### 📈 3. Relatórios e Dashboard (Requer Cabeçalho `Authorization: Bearer <TOKEN>`)

#### `GET /dashboard/cash-flow`
Retorna os pontos do fluxo de caixa agrupados cronologicamente por período (ano/mês).

**Resposta (200 OK):**
```json
[
  {
    "period": "2026-07",
    "incomes": 450000,
    "expenses": 120000,
    "balance": 330000
  },
  {
    "period": "2026-08",
    "incomes": 500000,
    "expenses": 150000,
    "balance": 350000
  }
]
```

---

#### `GET /dashboard/categories`
Retorna a distribuição percentual de despesas por categoria, ordenada do maior gasto para o menor.

**Resposta (200 OK):**
```json
[
  {
    "category": "Alimentação",
    "total": 90000,
    "percentage": 60.0
  },
  {
    "category": "Transporte",
    "total": 45000,
    "percentage": 30.0
  },
  {
    "category": "Lazer",
    "total": 15000,
    "percentage": 10.0
  }
]
```

---

## 🤝 Como Contribuir

Contribuições são super bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um **Fork** do projeto
2. Crie uma **Branch** para sua Feature/Fix:
   ```bash
   git checkout -b feature/minha-nova-feature
   ```
3. Realize seus commits seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   ```bash
   git commit -m "feat: adiciona exportacao de relatorios em PDF"
   ```
4. Envie sua branch para o seu repositório remoto:
   ```bash
   git push origin feature/minha-nova-feature
   ```
5. Abra um **Pull Request** detalhando as alterações propostas

---

## 📄 Licença

Este projeto está sob a licença [ISC](LICENSE).

---

Feito com ☕ e dedicação por [Viktor Gabriel](https://github.com/ViktorGabriel).
