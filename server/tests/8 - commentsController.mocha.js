const { should } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

const testComment = '[Mocha] Test comment string'

describe('Comments', () => {
	it('POST /api/comments should allow anonymous commenting', (done) => {
		chai.request(app)
			.get('/api/news')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')

				const newsId = response.body[0].id

				chai.request(app)
					.post('/api/comments')
					.send({ content: testComment, newsId })
					.end((error, response) => {
						response.should.have.status(201)
						response.body.should.have.all.keys('id', 'content', 'newsId', 'userId', 'createdAt', 'updatedAt')
						should().equal(response.body.userId, null)
						done()
					})
			})
	})

	it('GET /api/comments should return all comments', (done) => {
		chai.request(app)
			.get('/api/comments')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				response.body[0].should.have.all.keys('id', 'content', 'newsId', 'userId', 'createdAt', 'updatedAt')
				done()
			})
	})

	it('POST /api/comments, DELETE /api/comments/:id should allow registered users to post and delete their comments', (done) => {
		chai.request(app)
			.post('/api/signup')
			.set('content-type', 'application/json')
			.send({ username: 'demouser', email: 'demo@user.com', password: 'demouser' })
			.end((error, response) => {
				response.status.should.be.oneOf([201, 400])

				chai.request(app)
					.post('/api/login')
					.set('content-type', 'application/json')
					.send({ email: 'demo@user.com', password: 'demouser' })
					.end((error, response) => {
						response.should.have.status(200)

						const token = response.body.auth
						const userId = response.body.id

						chai.request(app)
							.get('/api/news')
							.end((error, response) => {
								response.should.have.status(200)
								response.body.should.be.a('array')

								const newsId = response.body[0].id

								chai.request(app)
									.post('/api/comments')
									.set('Authorization', `Bearer ${token}`)
									.send({ content: testComment, newsId })
									.end((error, response) => {
										response.should.have.status(201)
										response.body.should.have.all.keys('id', 'content', 'newsId', 'userId', 'createdAt', 'updatedAt')
										should().equal(response.body.userId, userId)

										const commentId = response.body.id

										chai.request(app)
											.delete(`/api/comments/${commentId}`)
											.set('Authorization', `Bearer ${token}`)
											.end((error, response) => {
												response.should.have.status(204)
												done()
											})
									})
							})
					})
			})
	})

	it('DELETE /api/comments/:id should allow administrators to delete any comments', (done) => {
		chai.request(app)
			.post('/api/login')
			.set('content-type', 'application/json')
			.send({ email: 'admin@localhost.com', password: process.env.BACKEND_PASSWORD })
			.end((error, response) => {
				response.should.have.status(200)

				const token = response.body.auth

				chai.request(app)
					.get('/api/comments')
					.end((error, response) => {
						response.should.have.status(200)
						response.body.should.be.a('array')

						const commentId = response.body.filter((comment) => comment.content === testComment)[0].id

						chai.request(app)
							.delete(`/api/comments/${commentId}`)
							.set('Authorization', `Bearer ${token}`)
							.end((error, response) => {
								response.should.have.status(204)
								done()
							})
					})
			})
	})
})
