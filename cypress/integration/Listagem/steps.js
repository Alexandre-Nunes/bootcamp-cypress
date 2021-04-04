/// <reference types="cypress" />

//Scenario: Listagem sem registros
Given(/^que o site não possui registros$/, () => {
    cy.intercept({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**', 
        status: 200,
        response: 'fx:webtable-get-vazio'
      }).as('getNewtable')
});

When(/^acessar a listagem$/, () => {
	cy.visit('/WebTable.html')
});

Then(/^devo visualizar a listagem vazia$/, () => {
    cy.get('div[role=row]').should('have.length', 1)
});

// Scenario: Listagem com apenas um registro

Given(/^que o site possui apenas um registro$/, () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '**/api/1/databases/userdetails/collections/newtable?**', 
      status: 200,
      response: 'fixture:webtable-get-unico'
    }).as('getNewtable')
});

Then(/^devo visualizar apenas um registro$/, () => {
    cy.get('div[role=row]').should('have.length', 2)
});
