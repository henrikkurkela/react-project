const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Login', () => {
    it('POST /api/login should reject wrong credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({ email: 'fake@user.com', password: 'wrongpassword' })
            .end((error, response) => {
                response.should.have.status(401)
                response.text.should.equal('Incorrect email or password.')
                done()
            })
    })

    it('POST /api/login should accept correct credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({ email: 'demo@user.com', password: 'demouser' })
            .end((error, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.all.keys('id', 'username', 'auth', 'avatar', 'createdAt', 'email', 'type', 'updatedAt')
                done()
            })
    })
})
