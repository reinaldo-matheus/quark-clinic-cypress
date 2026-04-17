Cypress.Commands.add("loginComUsuario", () => {
  cy.fixture("usuario").then((user) => {
    cy.intercept("POST", "**/auth/login").as("loginReq");
    cy.visit("/");
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="form-login"]').should("be.visible");
    cy.get("#user").type(user.email);
    cy.get("#password").type(user.senha);
    cy.get('[data-cy="checkbox-aceita-politicas"]')
      .find("input")
      .check({ force: true });
    cy.get('[data-cy="btn-submit-login"]').click();
    cy.wait("@loginReq").its("response.statusCode").should("eq", 200);
  });
});
