describe("Catálogo de lançamentos SpaceX", () => {
  beforeEach(() => {
    cy.visit("/launches");
  });

  it("exibe o título da página", () => {
    cy.get("h1").contains("Catálogo de Lançamentos");
  });

  it("navega para detalhes de um lançamento", () => {
    cy.get("[data-testid='launch-link']").first().click();
    cy.url().should("include", "/launches/");
    cy.get("h1").should("exist");
  });
});