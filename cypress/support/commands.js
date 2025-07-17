Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstname='default', lastname='default', email='default@default.com', msg='default') => {
    cy.get('#firstName').as('primeiroNome').should('be.visible').type(firstname, { delay: 0 })
    cy.get('@primeiroNome').should('have.value', firstname)
    cy.get('#lastName').as('ultimoNome').should('be.visible').type(lastname, { delay: 0 })
    cy.get('@ultimoNome').should('have.value', lastname)
    cy.get('#email').as('email').should('be.visible').type(email, { delay: 0 })
    cy.get('@email').should('have.value', email)
    cy.get('#open-text-area').as('comoAjudar').should('be.visible').type(msg, { delay: 0 })
    cy.get('@comoAjudar').should('have.value', msg)
    cy.contains('button', 'Enviar').click()

})