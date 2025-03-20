describe('Home Page Sidebar Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')

        // Se intercepta el refreshToken ya que Cypress limpia el estado de la aplicación entre pruebas, lo que puede
        // causar que no guarde el rT en las cookies o localStorage
        cy.intercept('POST', '/users/refreshToken', {
            statusCode: 200,
            body: { accessToken: 'test-refreshToken' }
        }).as('refreshToken')
    })

    describe('When The User Login...', () => {
        beforeEach(() => {
            cy.url().should('include', '/login')
            cy.contains('Login')
            cy.intercept('GET', '/users/1', { statusCode: 200, body: { id: 1, name: 'bob' } })// Se simula la respuesta de la API
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
            cy.wait(2000)// Esto evita que los test fallen por los loaders de la aplicaión
        })

        it('user should can to see sidebar', () => {
            cy.get('.ant-layout-sider-children').should('be.visible')
            cy.get('.ant-layout-sider-children').should('have.length', 1)
        })

        it('user should can to see the profile section', () => {
            cy.contains('li', 'User').click()
            cy.url().should('include', '/profile')
        })

        it('user should can to see the workspace section', () => {
            cy.contains('li', 'Workspace').click()
            cy.get('.ant-menu-submenu-popup').should('be.visible').contains('li', 'Knowledge').click()
            cy.url().should('include', '/workspace/knowledge')
            cy.contains('li', 'Workspace').click()
            cy.get('.ant-menu-submenu-popup').should('be.visible').contains('li', 'Models').click()
            cy.url().should('include', '/workspace/models')
        })

        it('user should can to see the knowledge section', () => {
            cy.contains('li', 'Knowledge').click()
            cy.url().should('include', '/knowledge')
        })

        it('user should can to see the admin section', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
        })

        it('user should can logout', () => {
            cy.intercept('POST', '/users/logout', { statusCode: 200 })// Se simula la respuesat de la API
            cy.get('.button-logout').click()
            cy.contains('Cerrando sesión')
            cy.url().should('include', '/login')
        })

        it('user should can navigate to sintergica.ai on click', () => {
            cy.get('a[href="https://sintergica.ai/"]').invoke('removeAttr', 'target').click()// .invoke('removeAttr', 'target') Evita que se abra en una nueva pestaña al dar click
            cy.origin('https://sintergica.ai', () => {
              cy.url().should('include', 'sintergica.ai')
            })
        })   
    })
})
