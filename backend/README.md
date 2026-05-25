# Backend NestJS

API NestJS para consumir o banco PostgreSQL descrito em `create_db.sql` e `inserts_farmacia.sql`.

## 1. Instalar dependencias

Se o `npm` da maquina continuar com o launcher quebrado, rode pelo Node:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' install
```

## 2. Configurar ambiente

Copie `.env.example` para `.env` e ajuste os dados do PostgreSQL.

## 3. Criar o banco

Execute os dois SQLs fornecidos pelo projeto nesta ordem:

1. `create_db.sql`
2. `inserts_farmacia.sql`

## 4. Subir a API

```powershell
& 'C:\Program Files\nodejs\node.exe' '.\node_modules\@nestjs\cli\bin\nest.js' start --watch
```

## Endpoints principais

- `GET /api/health`
- `GET /api/bootstrap`
- `GET /api/medicines`
- `GET /api/medicines/:id`
- `GET /api/pharmacies`
- `GET /api/pharmacies/:id`
- `GET /api/cids`
