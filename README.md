# appointment-system

## tech stack

- Mongo
- Docker
- Docker Compose
- NestJS

## How To set up your development

if you dont have any mongo db in your local run this

```
docker compose up -d
```

copy `env.example` to `.env`

install node modules

```
yarn
```

run migrations

```
yarn migrate-mongo up
```

run nextjs

```
yarn start:dev
```