describe('Admin Section Test On The Home Page', () => {
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
            cy.intercept('GET', '/users/1', { statusCode: 200, body: { id: 1, name: 'bob' } })// Se simula la respuesat de la API
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
            cy.wait(2000)// Esto evita que los test fallen por los loaders de la aplicaión
        })

        it('user should can to see the admin section', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.wait(3000)
            cy.contains('Mi equipo').should('be.visible')
            cy.contains('Nuevo usuario').should('be.visible')
            cy.get('[placeholder="Buscar miembros"]').should('be.visible')
            cy.get('.ant-table-content').should('be.visible')
            cy.get('.ant-table-tbody').should('be.visible')
            cy.get('.ant-pagination').should('be.visible')
        })

        it('if there are users, the table should show the users', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.wait(3000)
            // Muestra el head de la tabla
            cy.contains('th', 'Usuario')
            cy.contains('th', 'Rol')
            cy.contains('th', 'Correo')
            cy.contains('th', 'Grupos')
            // Muestra la data
            cy.contains('td', 'bob ford')
            cy.contains('td', 'Usuario')
            cy.contains('td', 'bob@gmail.com')
            cy.contains('td', '0 grupo')
        })

        describe('Invite users', () => {
            it('user should see an error message if the invitation was not sent ', () => {
                cy.contains('li', 'Admin').click()
                cy.url().should('include', '/administration')
                cy.wait(3000)
                cy.contains('Nuevo usuario').should('be.visible').click()
                cy.get('.ant-modal-content').should('be.visible')
                cy.get('[placeholder="ejemplo@mail.com"]').should('be.visible').type('test01@gmail.com')
                cy.get('[placeholder="Juan..."]').should('be.visible').type('userTest01')
                cy.get('.ant-select-selector').should('be.visible').click()
                cy.get('.ant-select-dropdown').should('be.visible').contains('Usuario').click()
                cy.get('[id="invitaton_TextArea"]').should('be.visible').type('Este es un texto de prueba :)')
                cy.intercept('GET', '/invitaton', { statusCode: 200 })// Se simula la respuesat de la API
                cy.contains('Enviar invitación').should('be.visible').click()
                cy.get('.ant-alert-message').should('be.visible').contains('Invitacion enviada correctamente')
            })

            it('user should can add a new admin to their team', () => {
                cy.contains('li', 'Admin').click()
                cy.url().should('include', '/administration')
                cy.wait(3000)
                cy.contains('Nuevo usuario').should('be.visible').click()
                cy.get('.ant-modal-content').should('be.visible')
                cy.get('[placeholder="ejemplo@mail.com"]').should('be.visible').type('test02@gmail.com')
                cy.get('[placeholder="Juan..."]').should('be.visible').type('userTest02')
                cy.get('.ant-select-selector').should('be.visible').click()
                cy.get('.ant-select-dropdown').should('be.visible').contains('Administrador').click()
                cy.get('[id="invitaton_TextArea"]').should('be.visible').type('Este es un texto de prueba :)')
                cy.contains('Enviar invitación').should('be.visible').click()
                cy.get('.ant-alert-message').should('be.visible').contains('Invitacion no enviada')
            })
        })

        describe('Search User', () => {
            it('user should see the searched user if it exists', () => {
                cy.contains('li', 'Admin').click()
                cy.url().should('include', '/administration')
                cy.wait(3000)
                cy.get('[placeholder="Buscar miembros"]').should('be.visible').type('bob')
                cy.get('.ant-input-suffix').should('be.visible').click()
                // Se verifica que solo exista un resultado en la tabla
                cy.get('table tbody tr').should('have.length', 1)
                // Se verifica que los datos obtenidos sean los deseados
                cy.get('table tbody tr')
                    .first()
                    .within(() => {
                        cy.contains('td', 'bob ford')
                        cy.contains('td', 'bob@gmail.com')
                    })
            })

            it('if the user searches for a user who is not part of their team, they should see nothing', () => {
                cy.contains('li', 'Admin').click()
                cy.url().should('include', '/administration')
                cy.wait(3000)
                cy.get('[placeholder="Buscar miembros"]').should('be.visible').type('jesus')
                cy.get('.ant-input-suffix').should('be.visible').click()
                // Se verifica que regresa nada
                cy.get('table tbody td').get('.ant-empty-description').contains('No data')
            })
        })
    })
})