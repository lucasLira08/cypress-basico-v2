it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.get('#title').contains('CAC TAT - Política de privacidade')
});