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
        images: [],
        value: "2.00",
        description: "ads test of test test result",
        category: "cars",
    }
    /* 
    evaluations: [],
    reservations: [],
    questions: [], */
let getAds = {
    _locator_fk: "5ebc83a7c2159307500e7f9c",
}
let ad_fk;

describe('Teste de adsTest', () => {
    /* it('adsTest', (done) => {
        chai.request(base_url)
            .post('/adRoute/create_ad')
            .send(adsTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("user")
                expect(res.body).to.have.property("message")
                ad_fk = res.body.user;
                done();
            })
    }) */
    /* it('get_ads_one_user', (done) => {
        chai.request(base_url)
            .get('/adRoute/get_ads_one_user')
            .send(getAds)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("ads")
                done();
            })
    }) */
    it('get_info_ad', (done) => {
            let getInfoJson = {
                _user_id: "5f43b1ec49984d149c28d0c0",
                _ad_fk: "5fcf87edc160dc34e053eeb5",
                _locator_fk: "5fcefc46d4048a0e3c2f3576",
            }
            chai.request(base_url)
                .get('/adRoute/get_info_ad')
                .query(getInfoJson)
                .end((err, res) => {
                    console.log("body finds ", res.body)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property("userLocator")
                    expect(res.body).to.have.property("favoriteAd")
                    expect(res.body).to.have.property("questionsAndAnswers")
                    expect(res.body).to.have.property("evaluations")
                    done();
                })
        })
        /* it('delete one ad', (done) => {
            let query = {
                _id: "5fcb2ddd2594d454c4b30ede",
            }
            console.log("query -> ", query);
            chai.request(base_url)
                .delete('/adRoute/delete_ads')
                .query(query)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property("message")
                    done();
                })
        })
        after(done => {
            let AdsModel = require('./models/adsModel')
            AdsModel.deleteOne({ "_id": ad_fk })
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