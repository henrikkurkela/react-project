const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Login', () => {
    it('POST /api/login should reject wrong credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({ email: 'fake@user.com', password: 'wrongpassword' })
            .end((error, response) => {
                response.should.have.status(401)
                done()
            })
    })

    it('POST /api/login should accept correct credentials', (done) => {

        chai.request(app)
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({ username: 'demouser', email: 'demo@user.com', password: 'demouser' })
            .end((error, response) => {
                response.status.should.be.oneOf([201, 400])
            })

        chai.request(app)
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({ email: 'demo@user.com', password: 'demouser' })
            .end((error, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                done()
            })
    })
})
