import { faker } from "@faker-js/faker";

describe("Fluxo 1 - Cadastro de Novo Usuário", () => {
  it("deve cadastrar um novo paciente com sucesso", () => {
    const nome = faker.person.fullName();
    const celular = "84" + faker.string.numeric(9);
    const email = faker.internet.email();
    const senha = "Senha@123";

    cy.intercept("POST", "**/usuarios**").as("cadastroReq");

    cy.visit("/");

    cy.get('[data-cy="btn-cadastro"]').click();

    // Aguarda o modal abrir
    cy.get('[data-cy="form-cadastro-paciente"]').should("be.visible");

    cy.get("#nome").type(nome);
    cy.get("#telefone").type(celular);
    cy.get("#sexo").select("MASCULINO");
    cy.get("#datanascimento").type("01/01/2000");
    cy.get("#email").type(email);
    cy.get("#tipodocumento").select("CPF");
    cy.get("#numerodocumento").type("52998224725");
    cy.get("#senha").type(senha);
    cy.get("#confirmar-senha").type(senha);

    cy.get("#cb-cadastro").check({ force: true });

    cy.get('[data-cy="btn-criar-conta"]').click();

    cy.wait("@cadastroReq").its("response.statusCode").should("eq", 200);

    cy.contains(nome.split(" ")[0]).should("be.visible");
  });
});
