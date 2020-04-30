
describe('input testing', ()=>{

    beforeEach(()=>{
        cy.visit('http://localhost:3000/')
    })

    it('should test inputs', ()=>{
        cy.get('[data-cy="username"]').type('Alex').should('have.value', 'Alex')
        cy.get('[data-cy="email"]').type('alex@alex.com').should('have.value', 'alex@alex.com')
        cy.get('[data-cy="password"]').type('password').should('have.value', 'password')
        cy.get('[data-cy="tos"]').check()
        cy.contains('Submit').click()

    })

    it('should not submit an empty form', ()=>{
        cy.contains('Submit').click()
        cy.get('[data-cy="usernameError"]')
    })
})