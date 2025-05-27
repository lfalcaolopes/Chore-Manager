# Gerenciador de Tarefas

Projeto fullstack desenvolvido como parte de um desafio técnico. Consiste em uma aplicação para gerenciamento de tarefas (chores), com backend em ASP.NET Core, frontend em React e banco de dados SQL Server.

---

## 🚀 Tecnologias utilizadas

### Backend
- ASP.NET Core 8
- Entity Framework Core
- SQL Server (Docker)
- AutoMapper
- FluentValidation
- xUnit, Moq, FluentAssertions

### Frontend
- React + Next.js + Styled Components

---

## ⚙️ Como rodar o projeto localmente

### ✅ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### 🔧 Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/lfalcaolopes/Chore-Manager.git
cd Chore-Manager
```

2. Suba todos os serviços com Docker Compose:

```bash
docker-compose up --build
```

Esse comando irá:
- Criar o banco SQL Server (`chore_sqlserver`)
- Subir a API em .NET (`chore_backend`)
- Subir o frontend em React (`chore_frontend`)

---

## 🌐 Endpoints e acesso

### 🧠 API (Swagger):
[http://localhost:5000/swagger](http://localhost:5000/swagger)

### 🖥️ Frontend (Interface Web):
[http://localhost:3000](http://localhost:3000)

---

## 🧪 Rodando os testes automatizados

Os testes de unidade do backend estão no projeto `Application.Tests`.

### Passo a passo:
1. Acesse a pasta de testes:

```bash
cd backend/tests/Application.Tests
```

2. Execute os testes:

```bash
dotnet test
```

⚠️ **Observação:**  
Para rodar os testes, você precisa do .NET SDK 8.0 instalado.  

---

## 🗃️ Banco de dados

- **Tipo:** SQL Server  
- **Rodando via Docker:** container `chore_sqlserver`  

As tabelas são criadas automaticamente via EF Core Migrations.

## 🦸 Autor

<a href="https://www.linkedin.com/in/lfalcaolopes/">
 <img src="https://user-images.githubusercontent.com/61370784/222877359-3b5bb1e2-2db1-4def-9a6b-d94ca5dece1e.png" width="100px;" alt=""/>
</a><br>

Desenvolvido por Lucas Falcão👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Lucas_Falcão-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/lfalcaolopes/)](https://www.linkedin.com/in/lfalcaolopes/) 
[![Gmail Badge](https://img.shields.io/badge/-lfalcaolopes.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:lfalcaolopes.dev@gmail.com)](mailto:lfalcaolopes.dev@gmail.com)
