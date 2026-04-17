describe("Fluxo 2 - Login de Usuário", () => {
  it("deve fazer login com usuário existente", () => {
    cy.loginComUsuario();
    cy.contains("Bem-vindo").should("be.visible");
  });
});
