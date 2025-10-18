# Backend - API CRUD de Produtos

Backend desenvolvido com **Node.js**, **Express** e **Supabase** (PostgreSQL) seguindo arquitetura moderna com separação de responsabilidades.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Supabase**
- **CORS**
- **dotenv**
- **Nodemon**

## 📁 Estrutura do Projeto

## 🗄️ Configuração do Banco de Dados

### 1. Criar projeto no Supabase

Acesse [supabase.com](https://supabase.com)

### 2. Criar tabela de produtos

## ⚙️ Instalação e Configuração

### 1. Instalar dependências

### 2. Configurar variáveis de ambiente

### 3. Executar o servidor

## 📡 Endpoints da API

### Base URL

**Resposta (404 Not Found):**
```json
{
  "error": "Produto não encontrado"
}
```

### Criar novo produto
```http
POST /api/products
Content-Type: application/json
```

### Atualizar produto
```http
PUT /api/products/:id
Content-Type: application/json
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "nome": "Produto Atualizado",
  "descricao": "Descrição original",
  "preco": 149.99,
  "estoque": 20,
  "updated_at": "2025-01-15T11:00:00Z"
}
```

### Deletar produto
```http
DELETE /api/products/:id
```

**Resposta (200 OK):**
```json
{
  "message": "Produto deletado com sucesso"
}
```

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** adaptado para APIs REST:

- **Routes** (`src/routes/`): Define os endpoints e mapeia para os controllers
- **Controllers** (`src/controllers/`): Recebe requisições, valida dados e retorna respostas HTTP
- **Services** (`src/services/`): Contém a lógica de negócio e comunicação com o banco de dados
- **Config** (`src/config/`): Configurações e conexões (Supabase)

### Fluxo de uma requisição

```
Cliente → Routes → Controller → Service → Supabase → Service → Controller → Cliente
```

## 🛡️ Tratamento de Erros

A API retorna os seguintes códigos de status HTTP:

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **400 Bad Request**: Dados inválidos ou faltando
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro no servidor

Todos os erros retornam um JSON no formato:

```json
{
  "error": "Descrição do erro",
  "message": "Detalhes adicionais"
}
```

## 📝 Nota Importante

- Certifique-se de que o arquivo `.env` está configurado corretamente

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para demonstração de CRUD completo com Node.js, Express e Supabase.
