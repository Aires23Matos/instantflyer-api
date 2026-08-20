# InstantFlyer API

API para o projeto InstantFlyer – plataforma phygital para distribuição instantânea de flyers em eventos.

## Tecnologias
- Node.js + TypeScript
- Express
- Knex.js (MySQL e PostgreSQL)
- Multer
- Clean Architecture

## Instalação
1. Clone o repositório.
2. `npm install`
3. Configure o `.env` conforme exemplo.
4. Execute as migrações (opcional).
5. `npm run dev`

## Endpoints
| Método | Rota | Descrição |
|--------|------|-----------|
| POST   | /api/flyers | Cria flyer (multipart) |
| GET    | /api/flyers/:id | Obtém metadados |
| GET    | /api/flyers/:id/file | Baixa o arquivo |
| PUT    | /api/flyers/:id | Atualiza flyer |
| DELETE | /api/flyers/:id | Remove flyer |

## Variáveis de Ambiente
- `PORT` – porta do servidor (padrão 3001)
- `BASE_URL` – URL base para gerar links
- `DB_CLIENT` – `mysql2` ou `pg`
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

## Estrutura de Pastas
- `src/application` – use‑cases, DTOs, mappers
- `src/domain` – entidades e interfaces de repositório
- `src/infrastructure` – implementações concretas (banco, controllers, rotas)
- `src/shared` – utilitários e erros

## Como contribuir
1. Faça um fork.
2. Crie uma branch para sua feature.
3. Envie um pull request.

## Licença
MIT