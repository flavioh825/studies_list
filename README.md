## Requisitos Funcionais

-[x] O usuário poderá se cadastrar no sistema com username, nome, sobrenome, email;
-[] O usuário poderá manter itens à sua lista de estudo;
-[] O usuário poderá lançar a data de início do estudo e a data final de estudo;
-[] Os usuários poderão somente ver listas de estudo de outros usuários;
-[] Os usuários poderão ver o que outros usuários estão estudando no momento;

## Requisitos não funcionais

-[x] Usar adonisjs como framework backend
-[] Usar reactjs no frontend
-[] Deverá ser um pwa;
-[] Usar swagger para documentar;
-[] Usar aws para hospedar;
-[] Banco de dados postgres;

## Regras de negócio

-[] Usuários só poderão editar seus próprios itens da lista estudo;
-[] Usuário poderá mostrar ou não seu status de estudo;

# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
