const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Users', () => {
	it('GET /api/users should return all users', (done) => {
		chai.request(app)
			.get('/api/users')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})

	it('PATCH /api/users/:id should reject unauthorized requests', (done) => {
		chai.request(app)
			.patch('/api/users/1')
			.send({ action: 'avatar', avatar: '/assets/avatar/default.jpg' })
			.end((error, response) => {
				response.should.have.status(401)
				done()
			})
	})

	it('PATCH /api/users/:id should accept authorized requests', (done) => {
		chai.request(app)
			.post('/api/signup')
			.set('content-type', 'application/json')
			.send({ username: 'demouser', email: 'demo@user.com', password: 'demouser' })
			.end((error, response) => {
				response.status.should.be.oneOf([201, 400])

				const userId = response.body.id

				chai.request(app)
					.post('/api/login')
					.set('content-type', 'application/json')
					.send({ email: 'demo@user.com', password: 'demouser' })
					.end((error, response) => {
						response.should.have.status(200)

						const token = response.body.auth

						chai.request(app)
							.patch(`/api/users/${userId}`)
							.set('Authorization', `Bearer ${token}`)
							.send({ action: 'avatar', avatar: '/assets/avatar/default.jpg' })
							.end((error, response) => {
								response.should.have.status(200)
								done()
							})
					})
			})
	})

	it('DELETE /api/users/:id should reject unauthorized requests', (done) => {
		chai.request(app)
			.delete('/api/users/1')
			.end((error, response) => {
				response.should.have.status(401)
				done()
			})
	})

	it('DELETE /api/users/:id should accept authorized requests', (done) => {
		chai.request(app)
			.post('/api/signup')
			.set('content-type', 'application/json')
			.send({ username: 'demouser', email: 'demo@user.com', password: 'demouser' })
			.end((error, response) => {
				response.status.should.be.oneOf([201, 400])

				const id = response.body.id

				chai.request(app)
					.post('/api/login')
					.set('content-type', 'application/json')
					.send({ email: 'demo@user.com', password: 'demouser' })
					.end((error, response) => {
						response.should.have.status(200)

						const token = response.body.auth

						chai.request(app)
							.delete(`/api/users/${id}`)
							.set('Authorization', `Bearer ${token}`)
							.end((error, response) => {
								response.should.have.status(204)
								done()
							})
					})
			})
	})
})
