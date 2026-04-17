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
│   │   └── 04-comprovante.cy.js    # Fluxo 4 (Bônus): Envio de comprovante
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

| #   | Fluxo                                     | Status                |
| --- | ----------------------------------------- | --------------------- |
| 1   | Cadastro de Novo Usuário                  | ✅ Implementado       |
| 2   | Login de Usuário                          | 🔄 Em desenvolvimento |
| 3   | Agendamento de Consulta Presencial        | 🔄 Em desenvolvimento |
| 4   | Envio de Comprovante de Pagamento (Bônus) | 🔄 Em desenvolvimento |

---

## 🧠 Decisões Técnicas

### Por que `data-cy` como seletor principal?

O portal da Quark Clinic utiliza atributos `data-cy` nos elementos, que são seletores criados especificamente para testes. São mais estáveis que `class` ou `id` visto que não mudam com refatorações de estilo — seguindo a recomendação oficial do Cypress.

### Por que `cy.intercept()` em vez de `cy.wait(ms)`?

Esperas estáticas (`cy.wait(3000)`) tornam os testes lentos e instáveis (flaky). O `cy.intercept()` aguarda a resposta real da rede, garantindo que o teste avance **somente quando a aplicação estiver pronta** — independente da velocidade da conexão.

### Por que `@faker-js/faker` para geração de dados?

O teste exige uma **nova massa de dados a cada execução** para o fluxo de cadastro. O Faker gera nome, email e telefone únicos automaticamente, evitando conflitos de um eventual usuário duplicado na API.

---

## 📋 Pré-condição para execução

O **Fluxo 2, 3 e 4** dependem de um usuário já cadastrado. Antes de rodar esses fluxos, certifique-se de que o arquivo `cypress/fixtures/usuario.json` contém credenciais válidas:

```json
{
  "email": "seu-email-cadastrado@exemplo.com",
  "senha": "SuaSenha@123",
  "nome": "Seu Nome"
}
```

---

## 📄 Documentação Teórica

O documento com os **Fundamentos de Testes** (Atividade 2) está disponível em:  
📎 `docs/fundamentos-de-testes.md` _(em desenvolvimento)_

Aborda:

- Plano de Testes para o projeto QuarkClinic
- Tipos de testes: Black Box, White Box e Gray Box
- Casos de teste manuais em BDD para o fluxo de Login

---

## 👤 Autor

**Matheus Reinaldo** 🪄
