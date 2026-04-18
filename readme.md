# 🏥 Quark Clinic — Testes E2E com Cypress

Projeto de automação de testes End-to-End para o portal de agendamento online da **Quark Clinic**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                              | Versão | Finalidade                         |
| --------------------------------------- | ------ | ---------------------------------- |
| [Cypress](https://www.cypress.io/)      | 15.4.0 | Framework de testes E2E            |
| [@faker-js/faker](https://fakerjs.dev/) | latest | Geração de massa de dados dinâmica |
| Node.js                                 | 20+    | Ambiente de execução               |

---

## 📁 Estrutura do Projeto

```
quark-clinic-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── 01-cadastro.cy.js       # Fluxo 1: Cadastro de novo usuário
│   │   ├── 02-login.cy.js          # Fluxo 2: Login de usuário existente
│   │   ├── 03-agendamento.cy.js    # Fluxo 3: Agendamento de consulta presencial
│   │   └── 04-comprovante.cy.js    # Fluxo 4: Envio de comprovante
│   ├── fixtures/
│   │   ├── usuario.json            # Credenciais do usuário fixo para login
│   │   └── comprovante.png         # Imagem de comprovante para upload
│   └── support/
│       ├── commands.js             # Comandos customizados reutilizáveis
│       └── e2e.js                  # Arquivo de suporte global
├── cypress.config.js               # Configurações do Cypress
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v20 ou superior
- npm v10 ou superior

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/quark-clinic-cypress.git

# Acesse a pasta do projeto
cd quark-clinic-cypress

# Instale as dependências
npm install
```

---

## ▶️ Como Executar os Testes

### Modo interativo (recomendado para desenvolvimento)

```bash
npx cypress open
```

Selecione **E2E Testing** → **Chrome** → escolha o arquivo desejado.

### Modo headless (linha de comando)

```bash
# Todos os testes
npx cypress run

# Um fluxo específico
npx cypress run --spec "cypress/e2e/01-cadastro.cy.js"
```

---

## ✅ Fluxos Automatizados

| #   | Fluxo                                     | Arquivo                | Status          |
| --- | ----------------------------------------- | ---------------------- | --------------- |
| 1   | Cadastro de Novo Usuário                  | `01-cadastro.cy.js`    | ✅ Implementado |
| 2   | Login de Usuário                          | `02-login.cy.js`       | ✅ Implementado |
| 3   | Agendamento de Consulta Presencial        | `03-agendamento.cy.js` | ✅ Implementado |
| 4   | Envio de Comprovante de Pagamento (Bônus) | `04-comprovante.cy.js` | ✅ Implementado |

---

## 🧠 Decisões Técnicas

### Por que `data-cy` como seletor principal?

O portal da Quark Clinic utiliza atributos `data-cy` nos elementos, que são seletores criados especificamente para testes. São mais estáveis que `class` ou `id` visto que não mudam com refatorações de estilo — seguindo a recomendação oficial do Cypress.

### Comando customizado `cy.loginComUsuario()`

Os fluxos 2, 3 e 4 precisam de login como pré-condição. Para evitar duplicação de código, o login foi abstraído em um comando reutilizável definido em `cypress/support/commands.js`. Isso segue o princípio DRY (Don't Repeat Yourself) e facilita a manutenção.

### Geração de dados dinâmicos com Faker.js

O Fluxo 1 exige dados únicos a cada execução para evitar conflitos e duplicidade. A biblioteca `@faker-js/faker` gera o nome, e-mail e telefone aleatórios automaticamente em cada execução.

### Seleção dinâmica de horários

Os horários disponíveis na agenda usam timestamps Unix como identificadores (`data-cy="agenda-item-horario-1776438600000"`), que mudam diariamente. Para garantir que o teste funcione em qualquer dia, foi utilizado o seletor com operador `^=` (começa com):

```javascript
cy.get('[data-cy^="agenda-item-horario-"]')
  .should("have.length.greaterThan", 0)
  .first()
  .click();
```

---

---

## 📋 Pré-condição para execução dos Fluxos 2, 3 e 4

Os fluxos de Login, Agendamento e Comprovante dependem de um usuário já cadastrado no sistema. Antes de rodar esses fluxos, certifique-se de que o arquivo `cypress/fixtures/usuario.json` contém credenciais válidas:

```json
{
  "email": "seu-email-cadastrado@exemplo.com",
  "senha": "SuaSenha@123",
  "nome": "SeuNome"
}
```

---

## 🐛 Bugs Encontrados e Corrigidos

Durante o desenvolvimento, alguns comportamentos inesperados foram encontrados e corrigidos:

| Bug                                               | Causa                                                                             | Correção                                           |
| ------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| `cy.select()` falhou com valor `'M'`              | O select de Sexo usa `'MASCULINO'` em maiúsculo                                   | `cy.get('#sexo').select('MASCULINO')`              |
| `cy.wait()` travou — nenhuma requisição capturada | URL do `cy.intercept()` não correspondia à URL real da API                        | Inspeção da aba Network para descobrir a URL real  |
| Login não enviava requisição                      | Checkbox de Política de Privacidade é obrigatório — comportamento não documentado | Adição do `.check({ force: true })` no checkbox    |
| Assert falhou por diferença de maiúscula          | Texto real era `'Sucesso!'` com S maiúsculo                                       | Correção do texto no `cy.contains()`               |
| Upload falhou — arquivo não encontrado            | Arquivo salvo como `comprovante.png.jpg` pelo Windows                             | Renomeação correta para `comprovante.png`          |
| Horário não encontrado no dia seguinte            | Timestamps nos `data-cy` mudam diariamente                                        | Uso do seletor `[data-cy^="agenda-item-horario-"]` |

---

## 📄 Documentação Teórica

O documento com os **Fundamentos de Testes** (Atividade 2) está disponível em:
📎 [`docs/fundamentos-de-testes.docx`](./docs/fundamentos-de-testes.docx)

Aborda:

- **Plano de Testes**: o que é, importância e seções-chave aplicadas ao projeto QuarkClinic
- **Tipos de Testes**: Black Box, White Box e Gray Box com exemplos reais do projeto
- **Casos de Teste**: em formato BDD para o fluxo de Login (positivo, negativo e borda)
- **Lições Aprendidas**: decisões técnicas e bugs encontrados durante o desenvolvimento

---

## 👤 Autor

**Matheus Reinaldo** 🪄
