# Curso NWT Front-End

Este projeto é uma interface front-end para um sistema de gerenciamento de projetos, feito com HTML, CSS e JavaScript puro. Ele inclui páginas de login, listagem de projetos e criação/edição de projetos.

## Visão Geral

- `login.html` - página de autenticação de usuário.
- `list.html` - página que lista os projetos do cliente autenticado.
- `project-create-edit.html` - página para criar ou editar um projeto.
- `assets/` - imagens, logos e recursos estáticos.
- `styles/` - arquivos CSS organizados por configuração, componentes e páginas.
- `scripts/` - lógica de interação, requisições à API e validações.

## Funcionalidades

- Autenticação de usuário via API (`/api/users/login`).
- Exibição de projetos do cliente autenticado.
- Criação de novos projetos.
- Edição de projetos existentes.
- Exclusão de projetos.
- Seleção de freelancer para um projeto no formulário.
- Feedback visual com SweetAlert2.

## Estrutura do Projeto

- `login.html`
- `list.html`
- `project-create-edit.html`
- `assets/image/` - imagens de UI e background.
- `assets/logo/` - logo do projeto.
- `styles/settings/` - variáveis de design e estilos globais.
- `styles/generic/` - reset e box-sizing.
- `styles/base/` - estilos HTML base.
- `styles/objects/` - wrapper e objetos reutilizáveis.
- `styles/components/` - botões, inputs, headers, tabelas.
- `styles/pages/` - estilos específicos de página.
- `scripts/login.js` - lógica de login.
- `scripts/list.js` - listagem, exclusão e navegação de projetos.
- `scripts/project-create-edit.js` - criação/edição de projetos e validação.

## Como Executar

### Pré-requisitos

* Docker instalado para executar o SQL Server.
* .NET 8 SDK instalado para executar a API.

**Passos para executar a API do DevFreela**

* Inicie uma instância do SQL Server usando Docker:

```

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Guest@1234" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest

```

* Isso iniciará o SQL Server na porta 1433 com a senha Guest@1234 para o usuário sa.
* Clone ou navegue até o repositório da API DevFreela (localizado em DevFreela).
* Execute o comando para iniciar a API em modo de desenvolvimento:

```

dotnet watch run --project DevFreela.API/DevFreela.API.csproj

```

A API estará disponível em https://localhost:7261 (com Swagger para testes em https://localhost:7261/swagger).

## Requisitos

- Navegador moderno compatível com JavaScript.
- API backend disponível em `https://localhost:7261` com os seguintes endpoints:
  - `PUT /api/users/login`
  - `GET /api/projects`
  - `GET /api/projects/{id}`
  - `POST /api/projects`
  - `PUT /api/projects/{id}`
  - `DELETE /api/projects/{id}`
  - `GET /api/users/freelancers`
- Conexão com internet para carregar a fonte do Google Fonts e o SweetAlert2 CDN.

---

Projeto baseado no conteúdo de curso da plataforma [Next Wave Education](https://nextwave.education/), com foco em HTML, CSS e JavaScript.