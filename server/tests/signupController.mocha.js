const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Signup', () => {
    it('POST /api/signup create a new user or reject if usernmame or email reserved', (done) => {
        chai.request(app)
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({ username: 'demouser', email: 'demo@user.com', password: 'demouser' })
            .end((error, response) => {
                response.status.should.be.oneOf([201, 400])
            })

        chai.request(app)
            .post('/api/signup')
            .set('content-type', 'application/json')
            .send({ username: 'demouser', email: 'demo@user.com', password: 'demouser' })
            .end((error, response) => {
                response.should.have.status(400)
                response.text.should.equal('User already exists.')
                done()
            })
    })
})
