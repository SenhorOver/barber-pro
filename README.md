# BarberPRO

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/SenhorOver/barber-pro/blob/master/LICENSE)

# Sobre o projeto

BarberPRO é um sistema de barbearia completo.

O sistema conta com cadastro de cortes de cabelo e agendamento de clientes, além da possiblidade de se tornar um usuário premium e acessar os recursos protegidos.

## WEB

/login
![login](https://i.ibb.co/zhBsyjC3/Screenshot-from-2025-10-14-21-21-27.png)

/dashboard
![dashboard](https://i.ibb.co/6JcvyqZL/Screenshot-from-2025-10-14-21-21-50.png)

/new
![new](https://i.ibb.co/RtsHpFs/Screenshot-from-2025-10-14-21-21-57.png)

/haircut
![haircut](https://i.ibb.co/hFKNd5yz/Screenshot-from-2025-10-14-21-22-05.png)

/profile
![profile](https://i.ibb.co/XrkdFBLF/Screenshot-from-2025-10-14-21-22-19.png)

/planos
![planos](https://i.ibb.co/N26kQvqv/Screenshot-from-2025-10-14-21-22-24.png)

Entre outras páginas...

## Backend

O Backend que recebe todas as requisições WEB, seja de login, cadastro, adicionar cortes de cabelo. Também processa as informações de pagamento ao fazer integração com o serviço do Stripe.

[Arquivo](https://github.com/SenhorOver/barber-pro/blob/master/backend/Insomnia_2025-10-14.yaml)

- Para acessar os endpoints é necessário primeiro fazer o cadastro e depois o login, dessa forma o token já vai ser colocado em uma variável de ambiente o resto da aplicação automaticamente vai poder acessar os endpoints protegidos.

# Tecnologias utilizadas

## Back end

- PostgreSQL
- NodeJS
- ExpressJS
- PrismaORM
- JWT
- BCrypt
- Stripe

## Front end

- HTML / CSS / JS / TypeScript
- ReactJS
- NextJS
- ChakraUI
- Nookies
- Axios

# Como executar o projeto

IMPORTANTE:

- Necessário criar arquivo .env na pasta "/backend/" com o conteúdo:

```.env
# Por padrão o backend estará rodando na porta :3333
DATABASE_URL=valor

JWT_SECRET=valor

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=valor
STRIPE_API_KEY=valor

STRIPE_SUCCESS_URL=valor
STRIPE_CANCEL_URL=valor
STRIPE_WEBHOOK_SECRET=valor
```

- Necessário criar arquivo .env na pasta "/frontend/" com o conteúdo:

```.env-local
# Por padrão o backend estará rodando na porta :3333
NEXT_PUBLIC_API_URL=valor
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=valor
```

## Inicialização individual:

### 1° Terminal - Frontend

Pré-requisitos: npm / node / postgreSQL

```bash
# clonar repositório
git clone https://github.com/SenhorOver/barber-pro.git

# entrar na pasta do projeto
cd barber-pro

# entrar na pasta do frontend
cd frontend

# instalar dependências
npm install

# executar o projeto (desenvolvimento)
npm run dev
```

### 2° Terminal - Back end

Pré-requisitos: node / npm

```bash
# entrar na pasta do projeto
cd barber-pro

# entrar na pasta do backend
cd backend

# instalar dependências
npm install

# criar as migrations e criar as tabelas da database
npx prisma migrate dev

# criar prisma client
npx prisma generate

# executar o projeto (desenvolvimento)
npm run dev
```

# Autor

Marcos Vinicius Silva

https://www.linkedin.com/in/marcos-v-s/
