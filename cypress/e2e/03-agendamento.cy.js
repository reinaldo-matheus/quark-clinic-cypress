describe("Fluxo 3 - Agendamento de Consulta Presencial", () => {
  beforeEach(() => {
    cy.loginComUsuario();
  });

  it("deve agendar uma consulta presencial com sucesso", () => {
    cy.intercept("POST", "**/me/agendamentos**").as("agendamentoReq");
    // Passo 1 — Clica em Consulta Presencial
    cy.contains("Consulta Presencial").click();

    // Passo 2 — Seleciona convênio PARTICULAR
    cy.get('[data-cy="convenio-item-148"]')
      .find("input")
      .check({ force: true });

    // Passo 3 — Seleciona especialidade CARDIOLOGIA
    cy.get('[data-cy^="especialidade-item-"]')
      .contains("CARDIOLOGIA")
      .closest('[data-cy^="especialidade-item-"]')
      .find("input")
      .check({ force: true });

    // Passo 4 — Seleciona a clínica CYPRESS - UI
    cy.get('[for="clinica-363622231"]').click();

    // Passo 5 — Seleciona o primeiro horário disponível
    cy.get('[data-cy^="agenda-item-horario-"]').first().click();

    // Passo 6 — Seleciona o paciente
    cy.get('[data-cy="paciente-card-radio-input"]').check({ force: true });

    // Passo 7 — Valida dados na tela de confirmação
    cy.get('[data-cy="confirmacao-row-especialidade"]').should(
      "contain",
      "CARDIOLOGIA",
    );
    cy.get('[data-cy="confirmacao-row-paciente"]').should("contain", "Abigale");
    cy.get('[data-cy="confirmacao-row-profissional"]').should("contain", "Dr.");
    cy.get('[data-cy="confirmacao-row-datahora"]').should("be.visible");

    // Passo 8 — Confirma o agendamento
    cy.get('[data-cy="confirmacao-btn-confirmar"]').click();

    cy.wait("@agendamentoReq").its("response.statusCode").should("eq", 200);

    // Assert: mensagem de sucesso
    cy.contains("Agendamento efetuado com Sucesso!").should("be.visible");
  });
});
