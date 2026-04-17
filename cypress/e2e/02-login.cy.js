describe("Fluxo 2 - Login de Usuário", () => {
  it("deve fazer login com usuário existente", () => {
    cy.fixture("usuario").then((user) => {
      cy.intercept("POST", "**/auth/login**").as("loginReq");

      cy.visit("/");

      cy.get('[data-cy="btn-login"]').click();
      cy.get('[data-cy="form-login"]').should("be.visible");

      cy.get("#user").type(user.email);
      cy.get("#password").type(user.senha);

      // ← Marca o checkbox de política no login também!
      cy.get('[data-cy="checkbox-aceita-politicas"]')
        .find("input")
        .check({ force: true });

      cy.get('[data-cy="btn-submit-login"]').click();

      cy.wait("@loginReq").its("response.statusCode").should("eq", 200);

      cy.contains("Bem-vindo").should("be.visible");
    });
  });
});
