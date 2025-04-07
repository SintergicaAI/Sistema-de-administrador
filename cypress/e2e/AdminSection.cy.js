describe('Admin Section Test On The Home Page', () => {
    it('user should can to see the admin section', () => {
        cy.visit('http://localhost:5173/login')

        // Interceptar el primer refreshToken con datos falsos
        cy.intercept('POST', '/users/refreshToken', {
            statusCode: 200,
            body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
        }).as('initialRefreshToken')

        // Interceptar GET /users/1 usando el token real
        cy.intercept('GET', '/users/1', (req) => {
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
            })
            req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
        }).as('getUser')

        // Realizar login
        cy.url().should('include', '/login')
        cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
        cy.get('[placeholder="******"]').type('123456')
        cy.contains('Enviar').click()
        cy.wait(2000)

        // Verificar tokens en localStorage
        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            expect(user?.token).to.not.be.null
            expect(user?.refreshToken).to.not.be.null
        })

        // Interceptar la segunda solicitud de refreshToken con tokens reales
        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: user?.token, refreshToken: user?.refreshToken }
            }).as('realRefreshToken')
        })

        // Validar segunda solicitud de refreshToken
        cy.wait('@realRefreshToken')

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
        cy.visit('http://localhost:5173/login')

        cy.intercept('POST', '/users/refreshToken', {
            statusCode: 200,
            body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
        }).as('initialRefreshToken')

        cy.intercept('GET', '/users/1', (req) => {
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
            })
            req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
        }).as('getUser')

        cy.url().should('include', '/login')
        cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
        cy.get('[placeholder="******"]').type('123456')
        cy.contains('Enviar').click()
        cy.wait(2000)

        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            expect(user?.token).to.not.be.null
            expect(user?.refreshToken).to.not.be.null
        })

        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: user?.token, refreshToken: user?.refreshToken }
            }).as('realRefreshToken')
        })

        cy.wait('@realRefreshToken')

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
        cy.contains('td', 'Dueño')
        cy.contains('td', 'bob@gmail.com')
        cy.contains('td', '0 grupo')
    })

    describe('Invite users', () => {
        it('user should see an error message if the invitation was not sent ', () => {
            cy.visit('http://localhost:5173/login')

            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
            }).as('initialRefreshToken')

            cy.intercept('GET', '/users/1', (req) => {
                cy.window().then((win) => {
                    const user = JSON.parse(win.localStorage.getItem('user'))
                    if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
                })
                req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
            }).as('getUser')

            cy.url().should('include', '/login')
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
            cy.wait(2000)

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                expect(user?.token).to.not.be.null
                expect(user?.refreshToken).to.not.be.null
            })

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                cy.intercept('POST', '/users/refreshToken', {
                    statusCode: 200,
                    body: { token: user?.token, refreshToken: user?.refreshToken }
                }).as('realRefreshToken')
            })

            cy.wait('@realRefreshToken')

            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.wait(3000)
            cy.contains('Nuevo usuario').should('be.visible').click()
            cy.get('.ant-modal-content').should('be.visible')
            cy.get('[placeholder="ejemplo@mail.com"]').should('be.visible').type('test01@gmail.com')
            cy.get('.ant-select.ant-select-outlined.ant-select-in-form-item.css-dev-only-do-not-override-ij5sg8.ant-select-single.ant-select-show-arrow').should('be.visible').click()
            cy.get('.ant-select-dropdown').should('be.visible').contains('Usuario').click()
            cy.get('[id="invitaton_TextArea"]').should('be.visible').type('Este es un texto de prueba :)')
            cy.contains('Enviar invitación').should('be.visible').click()
            cy.get('.ant-alert-message').should('be.visible').contains('Invitacion no enviada')
        })

        it('user should can add a new admin to their team', () => {
            cy.visit('http://localhost:5173/login')

            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
            }).as('initialRefreshToken')

            cy.intercept('GET', '/users/1', (req) => {
                cy.window().then((win) => {
                    const user = JSON.parse(win.localStorage.getItem('user'))
                    if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
                })
                req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
            }).as('getUser')

            cy.url().should('include', '/login')
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
            cy.wait(2000)

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                expect(user?.token).to.not.be.null
                expect(user?.refreshToken).to.not.be.null
            })

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                cy.intercept('POST', '/users/refreshToken', {
                    statusCode: 200,
                    body: { token: user?.token, refreshToken: user?.refreshToken }
                }).as('realRefreshToken')
            })

            cy.wait('@realRefreshToken')

            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.wait(3000)
            cy.contains('Nuevo usuario').should('be.visible').click()
            cy.get('.ant-modal-content').should('be.visible')
            cy.get('[placeholder="ejemplo@mail.com"]').should('be.visible').type('test02@gmail.com')
            cy.get('.ant-select.ant-select-outlined.ant-select-in-form-item.css-dev-only-do-not-override-ij5sg8.ant-select-single.ant-select-show-arrow').should('be.visible').click()
            cy.get('.ant-select-dropdown').should('be.visible').contains('Administrador').click()
            cy.get('[id="invitaton_TextArea"]').should('be.visible').type('Este es un texto de prueba :)')
            cy.contains('Enviar invitación').should('be.visible').click()
            cy.get('.ant-alert-message').should('be.visible').contains('Invitacion enviada correctamente')
        })
    })

    describe('Search User', () => {
        it('user should see the searched user if it exists', () => {
            cy.visit('http://localhost:5173/login')

            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
            }).as('initialRefreshToken')

            cy.intercept('GET', '/users/1', (req) => {
                cy.window().then((win) => {
                    const user = JSON.parse(win.localStorage.getItem('user'))
                    if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
                })
                req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
            }).as('getUser')

            cy.url().should('include', '/login')
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
            cy.wait(2000)

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                expect(user?.token).to.not.be.null
                expect(user?.refreshToken).to.not.be.null
            })

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                cy.intercept('POST', '/users/refreshToken', {
                    statusCode: 200,
                    body: { token: user?.token, refreshToken: user?.refreshToken }
                }).as('realRefreshToken')
            })

            cy.wait('@realRefreshToken')

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
            cy.visit('http://localhost:5173/login')

            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
            }).as('initialRefreshToken')

            cy.intercept('GET', '/users/1', (req) => {
                cy.window().then((win) => {
                    const user = JSON.parse(win.localStorage.getItem('user'))
                    if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
                })
                req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
            }).as('getUser')

            cy.url().should('include', '/login')
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
            cy.wait(2000)

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                expect(user?.token).to.not.be.null
                expect(user?.refreshToken).to.not.be.null
            })

            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                cy.intercept('POST', '/users/refreshToken', {
                    statusCode: 200,
                    body: { token: user?.token, refreshToken: user?.refreshToken }
                }).as('realRefreshToken')
            })

            cy.wait('@realRefreshToken')

            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.wait(3000)
            cy.get('[placeholder="Buscar miembros"]').should('be.visible').type('jesus')
            cy.get('.ant-input-suffix').should('be.visible').click()
            // Se verifica que regresa nada
            cy.get('table tbody td').get('.ant-empty-description').contains('No data')
        })
    })

    it('user should can to see the users who are within a specific group', () => {
        cy.visit('http://localhost:5173/login')

        cy.intercept('POST', '/users/refreshToken', {
            statusCode: 200,
            body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
        }).as('initialRefreshToken')

        cy.intercept('GET', '/users/1', (req) => {
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
            })
            req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
        }).as('getUser')

        cy.url().should('include', '/login')
        cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
        cy.get('[placeholder="******"]').type('123456')
        cy.contains('Enviar').click()
        cy.wait(2000)

        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            expect(user?.token).to.not.be.null
            expect(user?.refreshToken).to.not.be.null
        })

        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: user?.token, refreshToken: user?.refreshToken }
            }).as('realRefreshToken')
        })

        cy.wait('@realRefreshToken')

        cy.contains('li', 'Admin').click()
        cy.url().should('include', '/administration')
        cy.wait(3000)
        cy.get('.button-filter').contains('Informaticos y vendedores nuevo').click()
    })

    it('user should can to switch the view of active users to the view of guest users', () => {
        cy.visit('http://localhost:5173/login')

        cy.intercept('POST', '/users/refreshToken', {
            statusCode: 200,
            body: { token: 'fakeToken', refreshToken: 'fakeRefreshToken' }
        }).as('initialRefreshToken')

        cy.intercept('GET', '/users/1', (req) => {
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'))
                if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`
            })
            req.reply({ statusCode: 200, body: { id: 1, name: 'bob' } })
        }).as('getUser')

        cy.url().should('include', '/login')
        cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
        cy.get('[placeholder="******"]').type('123456')
        cy.contains('Enviar').click()
        cy.wait(2000)

        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            expect(user?.token).to.not.be.null
            expect(user?.refreshToken).to.not.be.null
        })

        cy.window().then((win) => {
            const user = JSON.parse(win.localStorage.getItem('user'))
            cy.intercept('POST', '/users/refreshToken', {
                statusCode: 200,
                body: { token: user?.token, refreshToken: user?.refreshToken }
            }).as('realRefreshToken')
        })

        cy.wait('@realRefreshToken')

        cy.contains('li', 'Admin').click()
        cy.url().should('include', '/administration')
        cy.wait(3000)
        cy.get('.ant-tabs-tab-btn').contains('Invitados').click()
    })
})
