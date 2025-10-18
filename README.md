# Frontend - CRUD de Produtos

Frontend desenvolvido com **Angular 19** e **Angular Material** para gerenciamento de produtos, consumindo a API REST do backend.

## 🚀 Tecnologias Utilizadas

- **Angular**
- **Angular Material**
- **TypeScript**
- **RxJS**
- **SCSS**

## 📁 Estrutura do Projeto

## ⚙️ Instalação e Configuração

### 1. Instalar dependências

### 2. Configurar URL da API

Edite o arquivo `src/environments/environment.ts` e configure a URL do backend:

**Importante:** Certifique-se de que o backend está rodando antes de iniciar o frontend.

### 3. Executar o servidor de desenvolvimento

### 4. Build para produção

## 🎨 Componentes Implementados

### ProductListComponent

Componente principal que exibe a lista de produtos em uma tabela.

**Funcionalidades:**
- Listagem de todos os produtos
- Botão para adicionar novo produto
- Botões de ação para editar e excluir
- Indicador de carregamento
- Estado vazio quando não há produtos
- Mensagens de feedback (snackbar)

**Funcionalidades:**
- Formulário reativo com validação
- Modo criação e edição
- Validações de campos obrigatórios
- Mensagens de erro personalizadas
- Feedback visual de salvamento

## 🔧 Serviços

### ProductService

Serviço responsável pela comunicação com a API REST.

**Métodos:**
- `getAllProducts()` - Buscar todos os produtos
- `getProductById(id)` - Buscar produto por ID
- `createProduct(product)` - Criar novo produto
- `updateProduct(id, product)` - Atualizar produto
- `deleteProduct(id)` - Deletar produto

## 🎯 Funcionalidades Implementadas

### ✅ CRUD Completo

- **Create (Criar):** Formulário para adicionar novos produtos
- **Read (Ler):** Listagem de todos os produtos em tabela
- **Update (Atualizar):** Edição de produtos existentes
- **Delete (Deletar):** Exclusão de produtos com confirmação

### ✅ Interface Responsiva

- Layout adaptável para diferentes tamanhos de tela
- Componentes Material Design
- Tema Indigo-Pink do Angular Material

### ✅ Validações

- Campos obrigatórios (nome, preço, estoque)
- Validação de valores mínimos
- Feedback visual de erros
- Desabilitação de botão de envio quando formulário inválido

**Endpoints utilizados:**
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

## 🎨 Customização de Estilos

### Estilos Customizados

Classes CSS customizadas para snackbar:
- `.snackbar-success` - Notificações de sucesso (verde)
- `.snackbar-error` - Notificações de erro (vermelho)

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:

## 🧪 Testando a Aplicação

### Pré-requisitos

1. Backend rodando em `http://localhost:3000`
2. Banco de dados Supabase configurado
3. Dados de exemplo inseridos (opcional)

### Fluxo de Teste

1. **Listar produtos:** Ao abrir a aplicação, os produtos são carregados automaticamente
2. **Criar produto:** Clique em "Novo Produto", preencha o formulário e salve
3. **Editar produto:** Clique no ícone de editar, modifique os dados e salve
4. **Deletar produto:** Clique no ícone de deletar e confirme a exclusão

## 🔐 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Tratamento adequado de erros
- HTTPS recomendado em produção

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para demonstração de CRUD completo com Angular, Angular Material e integração com API REST.
