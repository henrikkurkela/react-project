const { should } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

const testHeadline = '[Mocha] Test Headline string'
const testContent = '[Mocha] Test content string'

describe('News', () => {
	it('GET /api/news should return all news', (done) => {
		chai.request(app)
			.get('/api/news')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				response.body[0].should.have.all.keys('id', 'headline', 'content', 'category', 'likes', 'userId', 'createdAt', 'updatedAt')
				done()
			})
	})

	it('PATCH /api/news/:id should allow liking and disliking a news story', (done) => {
		chai.request(app)
			.get('/api/news')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')

				const newsId = response.body[0].id
				const oldLikes = response.body[0].likes

				chai.request(app)
					.patch(`/api/news/${newsId}`)
					.send({ action: 'like' })
					.end((error, response) => {
						response.should.have.status(200)
						should().equal(response.body.likes, oldLikes + 1)

						chai.request(app)
							.patch(`/api/news/${newsId}`)
							.send({ action: 'unlike' })
							.end((error, response) => {
								response.should.have.status(200)
								should().equal(response.body.likes, oldLikes)
								done()
							})
					})
			})
	})

	it('PATCH /api/news/:id should reject unauthorized requests', (done) => {
		chai.request(app)
			.get('/api/news')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')

				const newsId = response.body[0].id

				chai.request(app)
					.patch(`/api/news/${newsId}`)
					.send({ likes: 9001 })
					.end((error, response) => {
						response.should.have.status(401)
						response.text.should.equal('Unauthorized.')
						done()
					})
			})
	})

	it('PATCH /api/news/:id should allow authorized requests', (done) => {
		chai.request(app)
			.post('/api/login')
			.set('content-type', 'application/json')
			.send({ email: 'admin@localhost.com', password: process.env.BACKEND_PASSWORD })
			.end((error, response) => {
				response.should.have.status(200)

				const token = response.body.auth

				chai.request(app)
					.get('/api/news')
					.end((error, response) => {
						response.should.have.status(200)
						response.body.should.be.a('array')

						const newsId = response.body[0].id
						const oldNews = response.body[0]

						chai.request(app)
							.patch(`/api/news/${newsId}`)
							.set('Authorization', `Bearer ${token}`)
							.end((error, response) => {
								response.should.have.status(200)
								response.body.should.deep.equal(oldNews)
								done()
							})
					})
			})
	})

	it('POST /api/news, DELETE /api/news/:id should allow administrators to post and delete news stories', (done) => {
		chai.request(app)
			.post('/api/login')
			.set('content-type', 'application/json')
			.send({ email: 'admin@localhost.com', password: process.env.BACKEND_PASSWORD })
			.end((error, response) => {
				response.should.have.status(200)

				const token = response.body.auth
				const userId = response.body.id

				chai.request(app)
					.post('/api/news')
					.set('Authorization', `Bearer ${token}`)
					.send({ headline: testHeadline, content: testContent, userId: userId, category: 9001 })
					.end((error, response) => {
						response.should.have.status(201)
						response.body.should.have.all.keys('id', 'headline', 'content', 'category', 'likes', 'userId', 'createdAt', 'updatedAt')

						const newsId = response.body.id

						chai.request(app)
							.delete(`/api/news/${newsId}`)
							.set('Authorization', `Bearer ${token}`)
							.end((error, response) => {
								response.should.have.status(204)
								done()
							})
					})
			})
	})
})
