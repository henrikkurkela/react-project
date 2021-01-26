const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Upload', () => {
    it('POST /api/upload should reject unauthorized requests', (done) => {
        chai.request(app)
            .post('/api/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('picture', './public/assets/img/photo1.jpg')
            .end((error, response) => {
                response.should.have.status(401)
                done()
            })
    })

    it('POST /api/upload should accept authorized requests', (done) => {
        chai.request(app)
            .post('/api/login')
            .set('content-type', 'application/json')
            .send({ email: 'admin@localhost.com', password: process.env.BACKEND_PASSWORD })
            .end((error, response) => {
                response.should.have.status(200)

                const token = response.body.auth

                chai.request(app)
                    .post('/api/upload')
                    .set('Authorization', `Bearer ${token}`)
                    .set('Content-Type', 'multipart/form-data')
                    .attach('picture', './public/assets/img/photo1.jpg')
                    .end((error, response) => {
                        response.should.have.status(201)
                        done()
                    })
            })
    })
})
