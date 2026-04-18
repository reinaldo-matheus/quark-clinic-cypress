describe("Fluxo 4 (Bônus) - Envio de Comprovante de Pagamento", () => {
  beforeEach(() => {
    cy.loginComUsuario();
  });

  it("deve enviar comprovante de pagamento com sucesso", () => {
    cy.intercept("POST", "**/comprovante**").as("comprovanteReq");

    cy.contains("Consulta Presencial").click();
    cy.get('[data-cy="convenio-item-148"]')
      .find("input")
      .check({ force: true });
    cy.get('[data-cy^="especialidade-item-"]')
      .contains("CARDIOLOGIA")
      .closest('[data-cy^="especialidade-item-"]')
      .find("input")
      .check({ force: true });
    cy.get('[for="clinica-363622231"]').click();

    cy.get('[data-cy^="agenda-item-horario-"]').should(
      "have.length.greaterThan",
      0,
    );
    cy.get('[data-cy^="agenda-item-horario-"]').first().click();

    cy.get('[data-cy="paciente-card-radio-input"]').check({ force: true });
    cy.get('[data-cy="confirmacao-btn-confirmar"]').click();
    cy.contains("Agendamento efetuado com Sucesso!").should("be.visible");

    cy.get('[data-cy="finalizacao-btn-transferencia"]').click();
    cy.get("#comprovante").selectFile("cypress/fixtures/comprovante.png", {
      force: true,
    });
    cy.get('[data-cy="pagamento-form-group-observacao"]')
      .find("textarea")
      .type("Comprovante de teste");
    cy.get('[data-cy="pagamento-form-btn-enviar"]').click();

    cy.contains("Obrigado por enviar! Iremos analisar!").should("be.visible");
  });
});
