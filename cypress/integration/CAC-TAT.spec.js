// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error')
            .should('be.visible')
    });
    it('campo telefone são adicionados caracteres não numericos', () => {
        cy.get('#phone')
            .type('gfghkmjjlhjhb')
            .should('be.empty')
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {        
        cy.get('input[value=phone]')
            .click()
            
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error')
            .should('be.visible')

    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[name=firstName')
            .type('LL')
            .should('have.value', 'LL')
            .clear().should('have.value', '')

        cy.get('input[name=lastName]')
            .type('this')
            .should('have.value', 'this')
            .clear().should('have.value', '')

        cy.get('input[type=email]')
            .type('ls@yopmail.com')
            .should('have.value', 'ls@yopmail.com')
            .clear().should('have.value', '')

        cy.get('textarea[name=open-text-area]')
            .type(longText, {delay: 0})
            .should('have.value', longText)
            .clear().should('have.value', '')

        cy.get('input[value=phone]')
            .click()
        
        cy.get('#phone')
            .type('988125869')
            .should('have.value', '988125869')
            .clear().should('have.value', '')
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type=submit]')
            .click()
        cy.get('.error')
            .contains('Valide os campos obrigatórios!')
    });
})

