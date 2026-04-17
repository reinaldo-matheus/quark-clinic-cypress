describe("Fluxo 4 (Bônus) - Envio de Comprovante de Pagamento", () => {
  beforeEach(() => {
    cy.loginComUsuario();
  });

  it("deve enviar comprovante de pagamento com sucesso", () => {
    cy.intercept("POST", "**/comprovante**").as("comprovanteReq");

    // Passo 1 — Inicia agendamento e chega na tela de sucesso
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
    cy.get('[data-cy^="agenda-item-horario-"]')
      .should("have.length.greaterThan", 0)
      .first()
      .click();
    cy.get('[data-cy="paciente-card-radio-input"]').check({ force: true });
    cy.get('[data-cy="confirmacao-btn-confirmar"]').click();
    cy.contains("Agendamento efetuado com Sucesso!").should("be.visible");

    // Passo 2 — Clica em Pagamento por Transf. Bancária
    cy.get('[data-cy="finalizacao-btn-transferencia"]').click();

    // Passo 3 — Upload do comprovante
    cy.get("#comprovante").selectFile("cypress/fixtures/comprovante.png", {
      force: true,
    });

    // Passo 4 — Adiciona observação
    cy.get('[data-cy="pagamento-form-group-observacao"]')
      .find("textarea")
      .type("Comprovante de teste");

    // Passo 5 — Envia o comprovante
    cy.get('[data-cy="pagamento-form-btn-enviar"]').click();

    // Assert: mensagem de sucesso
    cy.contains("Obrigado por enviar! Iremos analisar!").should("be.visible");
  });
});
