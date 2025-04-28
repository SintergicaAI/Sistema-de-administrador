describe('Home Page Sidebar Test', () => {
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

    it('user should can to see sidebar', () => {
        cy.get('.ant-layout-sider-children').should('be.visible')
        cy.get('.ant-layout-sider-children').should('have.length', 1)
    })

    it('user should can to see the profile section', () => {
        cy.contains('li', 'User').click()
        cy.url().should('include', '/profile')
    })

    describe('user should can to see the workspace section', () => {
        it('user should can to see the Knowledge workspace', () => {
            cy.contains('li', 'Workspace').click()
            cy.get('.ant-menu-submenu-popup')
                .should('be.visible')
                .contains('li', 'Knowledge')
                .click()
            cy.url().should('include', '/workspace/knowledge')
        })

        it('user should can to see the Models workspace', () => {
            cy.contains('li', 'Workspace').click()
            cy.get('.ant-menu-submenu-popup')
                .should('be.visible')
                .contains('li', 'Models')
                .click()
            cy.url().should('include', '/workspace/models')
        })
    })

    it('user should can to see the knowledge section', () => {
        cy.contains('li', 'Knowledge').click()
        cy.url().should('include', '/knowledge')
    })

    it('user should can to see the admin section', () => {
        cy.contains('li', 'Admin').click()
        cy.url().should('include', '/administration')
    })

    it('user should can to see the groups section', () => {
        cy.contains('li', 'Groups').click()
        cy.url().should('include', '/groups')
    })

    it('user should can to logout', () => {
        cy.get('.button-logout').click()
        cy.contains('Cerrando sesión')
        cy.url().should('include', '/auth')
    })

    it('user should can to navigate to sintergica.ai on click', () => {
        cy.get('a[href="https://sintergica.ai/"]')
            .invoke('removeAttr', 'target') // Evita abrir en nueva pestaña
            .click()
        cy.origin('https://sintergica.ai', () => {
            cy.url().should('include', 'sintergica.ai')
        })
    })
})
