describe('Home Page Sidebar Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    describe('When The User Login...', () => {
        beforeEach(() => {
            cy.url().should('include', '/login')
            cy.contains('Login')
            cy.intercept('GET', '/users/1', { statusCode: 200, body: { id: 1, name: 'test01' } })// Se simula la respuesat de la API
            cy.get('[placeholder="juan@gmail.com"]').type('test01@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
        })

        it('user should can to see sidebar', () => {
            cy.get('.ant-layout-sider-children').should('be.visible')
            cy.get('.ant-layout-sider-children').should('have.length', 1)
        })

        it('user should can to interact with the sidebar', () => {
            cy.contains('li', 'User').click()
            cy.url().should('include', '/profile')
            //entre estos dos va el espacio de trabajo
            // cy.contains('li', 'Knowledge').click()
            // cy.url().should('include', '/knowledge')
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
        })

        it('user should can navigate to sintergica.ai on click', () => {
            cy.get('a[href="https://sintergica.ai/"]').invoke('removeAttr', 'target').click()// .invoke('removeAttr', 'target') Evita que se abra en una nueva pestaña al dar click
            cy.origin('https://sintergica.ai', () => {
              cy.url().should('include', 'sintergica.ai')
            })
        })   
    })
})
