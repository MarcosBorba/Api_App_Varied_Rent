//importa toda aplicacao Express, colocando ela em execucao durante o teste
const app_varied = require('./bin/www');

let chai = require('chai'); //importa a biblioteca chai
let chaiHttp = require('chai-http'); //importa a biblioteca chai-http
const { set } = require('mongoose');
let expect = chai.expect; //utiliza a interface expect
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

/* let evaluationTest = {
        _ad_fk: "5fcb2ddd2594d454c4b30ede",
        _user_fk: "5fbe6c853f9f3d34147c7027",
        user_name: "Maria Teixeira",
        user_email: "maria@gmail.com",
        amount_stars: 5,
        objective_opition: "O carro é lindo e muito conservado",
        opinion: "Eu amei o carro, achei muito lindo, me relembrou de momentos marcantes da minha vida, meu marido queria muito comprar um se tivesse condição, meus parabéns pelo carro, nota mil!!!!",
        evaluation_date: "2020-11-25"
    } */
let evaluationTest = {
        _ad_fk: "5fcb2ddd2594d454c4b30ede",
        _user_fk: "5fbe6d0d3f9f3d34147c7028",
        user_name: "Francisco da Paz",
        user_email: "Francisco@gmail.com",
        amount_stars: 4,
        objective_opition: "O carro é lindo e muito conservado",
        opinion: "Gostei muito do carro, perfeito, porém o locador é meio sem educação",
        evaluation_date: "2020-11-25"
    }
    /* let evaluationTest = {
        _ad_fk: "5f6662d74f4b5021684a010c",
        _user_fk: "5f43b1ec49984d149c28d0c0",
        user_name: "Marcos Flavio",
        user_email: "mano@gmail.com",
        amount_stars: 5.0,
        objective_opition: "opinion",
        opinion: "opinion",
        evaluation_date: "2020-11-25"
    } */

let getEvaluations = {
    _ad_fk: "5f6662d74f4b5021684a010c",
}

let idEvaluationTest;

describe('Test EvaluationsAd Test', () => {
    it('Add evaluation', (done) => {
        chai.request(base_url)
            .post('/evaluationRoute/addEvaluation')
            .send(evaluationTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message")
                expect(res.body).to.have.property("id")
                expect(res.body).to.have.property("updateAds")
                idEvaluationTest = res.body['id']
                done();
            })
    })
    it('get evaluations one ad', (done) => {
            chai.request(base_url)
                .get('/evaluationRoute/get_evaluations_one_ad')
                .query(getEvaluations)
                .end((err, res) => {
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property("evaluation")
                    done();
                })
        })
        /* after(done => {
            let Evaluation = require('./models/evaluationModel')
            Evaluation.deleteOne({ "_id": idEvaluationTest })
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