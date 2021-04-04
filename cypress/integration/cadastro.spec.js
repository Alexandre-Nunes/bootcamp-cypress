/// <reference types="cypress" />

let Chance = require('chance')
let chance = new Chance()

context('Cadastro de usuario', () => {
    it('Cadasro de usuario com sucesso', () => {
        cy.visit('/Register.html')
        cy.get('input[placeholder="First Name"]').type(chance.first())
        cy.get('input[placeholder="Last Name"]').type(chance.last())
        cy.get('input[ng-model="EmailAdress"]').type(chance.email())
        cy.get('input[ng-model="Phone"]').type(chance.phone({ formatted: false }))
        cy.get('input[value="Male"]').check()
        cy.get('#checkbox2').check()
        cy.get('input[type="checkbox"]').check('Hockey')
        cy.get('#Skills').select('Javascript')
        cy.get('#countries').select('Algeria')
        cy.get('select#country').select('India', { force: true })
        cy.get('#yearbox').select('2000')
        cy.get('select[placeholder="Month"]').select('July')
        cy.get('#daybox').select('10')
        cy.get('#firstpassword').type('Teste@123')
        cy.get('#secondpassword').type('Teste@123')
        cy.get('#imagesrc').attachFile('vscode10.png')
        //cy.pause()
        //cy.wait(5000)
        cy.intercept('POST', '**/api/1/databases/userdetails/collections/newtable?**', {
        }).as('postNewtable');

        cy.intercept('POST', '**/api/1/databases/userdetails/collections/usertable?**', {
        }).as('postUsertable');

        cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {
        }).as('getNewtable');

        cy.get('#submitbtn').click()

        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.response.statusCode).to.eq(200)
        })

        cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.response.statusCode).to.eq(200)
        })

        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.response.statusCode).to.eq(200)
        })

        cy.url().should('contain', 'WebTable')
    })
})