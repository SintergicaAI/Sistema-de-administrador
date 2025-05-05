describe('Group Section Test', () => {
    beforeEach(() => {
        // Visitar la página de login
        cy.visit('http://localhost:5173/auth')

        // Interceptar GET /users/1 usando token real
        cy.intercept('GET', '/users/1', (req) => {
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                if (user?.token) {
                    req.headers['Authorization'] = `Bearer ${user.token}`
                }
            })
            req.reply({
                statusCode: 200,
                body: { id: 1, name: 'bob' }
            })
        }).as('getUser')

        // Realizar login
        cy.url().should('include', '/auth')
        cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
        cy.get('[placeholder="******"]').type('123456')
        cy.contains('Iniciar sesión').click()
        cy.wait(2000)

        // 🔹 Verificar tokens y preparar refreshToken intercept real
        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            expect(user?.token).to.not.be.null
            expect(user?.refreshToken).to.not.be.null

            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: {
                    token: user.token,
                    refreshToken: user.refreshToken
                }
            }).as('realRefreshToken')
        })
    })

    it('user should can to see the groups section', () => {
        cy.contains('li', 'Groups').click()
        cy.url().should('include', '/groups')
        cy.wait(3000)
        cy.contains('Nuevo grupo').should('be.visible')
        cy.get('[placeholder="Buscar grupos"]').should('be.visible')
        cy.get('section').should('be.visible')
    })

    describe('Search Group', () => {
        it('the user should see the groups they created with the name they searched for', () => {
            cy.contains('li', 'Groups').click()
            cy.url().should('include', '/groups')
            cy.wait(3000)
            cy.get('[placeholder="Buscar grupos"]').should('be.visible').type('ventas')

            cy.get('.groups__tag:visible').each(($e) => {
                cy.wrap($e)
                    .invoke('text')
                    .then((text) => {
                        expect(text.toLowerCase()).to.include('ventas')
                    })
            })
        })

        it('the system should display a message when the user does not have groups created with the name they are looking for', () => {
            cy.contains('li', 'Groups').click()
            cy.url().should('include', '/groups')
            cy.wait(3000)
            cy.get('[placeholder="Buscar grupos"]').should('be.visible').type('juegos')
            cy.get('.ant-input-suffix').should('be.visible').click()
            // Se verifica que exista el mensaje del sistema
            cy.contains('Aun no tienes grupos creados')
        })
    })


})