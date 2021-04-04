/// <reference types="cypress" />

context('Listagem', () => {
    it('Listagem sem registros', () => {
       cy.intercept({
          method: 'GET',
          url: '**/api/1/databases/userdetails/collections/newtable?**', 
          status: 200,
          response: 'fx:webtable-get-vazio'
        }).as('getNewtable')

        cy.visit('/WebTable.html')

        cy.get('div[role=row]').should('have.length', 1)
    });

    it('Listagem com apenas um registro', () => {
        cy.server()
        cy.route({
          method: 'GET',
          url: '**/api/1/databases/userdetails/collections/newtable?**', 
          status: 200,
          response: 'fixture:webtable-get-unico'
        }).as('getNewtable')

        cy.visit('/WebTable.html')
        cy.get('div[role=row]').should('have.length', 2)
    });
});