const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Upload', () => {
    it('POST /api/upload should reject unauthorized requests', (done) => {
        chai.request(app)
            .post('/api/upload')
            .set('content-type', 'multipart/form-data')
            .attach('picture', './public/assets/img/photo1.jpg')
            .end((error, response) => {
                response.should.have.status(401)
                done()
            })
    })
})
