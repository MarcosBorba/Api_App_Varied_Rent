//importa toda aplicacao Express, colocando ela em execucao durante o teste
const app_varied = require('./bin/www');

let chai = require('chai'); //importa a biblioteca chai
let chaiHttp = require('chai-http'); //importa a biblioteca chai-http
const { set } = require('mongoose');
let expect = chai.expect; //utiliza a interface expect
const base_url = 'http://localhost:3000';

//usa a biblioteca chaihttp para simular requisicoes na api
chai.use(chaiHttp);

let evaluationTest = {
    _ad_fk: 2,
    _user_fk: "6000mi",
    user_name: "Particular",
    user_email: "000.265.421-90",
    amount_stars: 4,
    objective_opition: "User1234",
    opinion: "lalala no lala",
    evaluation_date: "2020-07-21"
}

let adsTest = {
        _locator_fk: "5ebc83a7c2159307500e7f9c",
        title: "ads test",
        images: "image",
        value: "2.00",
        description: "ads test of test test result",
        category: "cars",
    }
    /* 
    evaluations: [],
    reservations: [],
    questions: [], */

describe('Teste de adsTest', () => {
    it('adsTest', (done) => {
        chai.request(base_url)
            .post('/adRoute/create_ad')
            .send(adsTest)
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("message")
                evaluationTest._ad_fk = res.body.user;
                done();
            })
    })
    it('evaluationTest', (done) => {
            chai.request(base_url)
                .post('/evaluationRoute/addEvaluation')
                .send(evaluationTest)
                .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property("message")
                    done();
                })
        })
        /* after(done => {
            let Usuario = require('./models/userModel')
            Usuario.deleteMany({ "_id": { $in: [idUserTest, idUserTest2] } })
                .then(ok => {
                    console.log("ok => ", ok)
                    done()
                })
                .catch(error => {
                    console.log("Error: ", error)
                    done()
                })
        }); */
})