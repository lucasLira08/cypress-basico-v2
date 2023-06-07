// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    const longText = 'testetestetestetestetestetestetestetestetestetestetestetesteteste';
    beforeEach(() => {
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
        
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success')
            .should('not.be.visible')
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('input[name=firstName')
            .type('Pedro')

        cy.get('input[name=lastName]')
            .type('Pereira')

        cy.get('input[type=email]')
            .type('pedro@')

        cy.get('textarea[name=open-text-area]')
            .type('test')

        cy.get('button[type=submit]')
            .click()
        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error')
            .should('not.be.visible')
        
    });
    it('campo telefone são adicionados caracteres não numericos', () => {
        cy.get('#phone')
            .type('gfghkmjjlhjhb')
            .should('be.empty')
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {            
        cy.clock()
        cy.get('input[type="checkbox"][value="phone"]')
            .check()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error')
            .should('not.be.visible')
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[name=firstName')
            .type('Pedro')
            .should('have.value', 'Pedro')
            .clear().should('have.value', '')

        cy.get('input[name=lastName]')
            .type('Pereira')
            .should('have.value', 'Pereira')
            .clear().should('have.value', '')

        cy.get('input[type=email]')
            .type('pedro@yopmail.com')
            .should('have.value', 'pedro@yopmail.com')
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
        cy.clock()
        cy.get('button[type=submit]')
            .click()
        cy.get('.error')
            .contains('Valide os campos obrigatórios!')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
          .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria')
          .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check().should('be.checked')
            } )
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        // Marca todos os checkboxes de uma vez.
        cy.get('#check input[type="checkbox"]')
            .as('checkboxes')
            .check()
        // Verifica se realmente os checkboxes foram marcados.
        cy.get('@checkboxes')
            .each(checkbox => {
                expect(checkbox[0].checked).to.eq(true)
            })
        // Verifica se o último checkbox foi desmarcado.
        cy.get('@checkboxes')
            .last()
            .uncheck()
            .should('not.be.checked')
    });   
    
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.eq('example.json')
            })
    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
            .then(input => {
                expect(input[0].files[0].name).to.eq('example.json')
            })
    });
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
       cy.fixture('example.json').as('exampleFile')
       cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.eq('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click() 
        cy.get('#title').contains('CAC TAT - Política de privacidade')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const numberInTextArea = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', numberInTextArea)
            .should('have.value', numberInTextArea)
    });

    it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.statusText).to.eq('OK')
            expect(response.body).to.include('CAC TAT')
        })
    });

    it.only('Encontra o gato escondido na aplicação', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    });
})

