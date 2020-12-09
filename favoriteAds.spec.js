//importa toda aplicacao Express, colocando ela em execucao durante o teste
const app_varied = require('./bin/www');

let chai = require('chai'); //importa a biblioteca chai
let chaiHttp = require('chai-http'); //importa a biblioteca chai-http
const { set } = require('mongoose');
let expect = chai.expect; //utiliza a interface expect
const base_url = 'http://localhost:3000';

//usa a biblioteca chaihttp para simular requisicoes na api
chai.use(chaiHttp);
//5fcf87edc160dc34e053eeb5
let addFavoriteAd = {
    _ad_fk: "5fcefdb9d4048a0e3c2f3578",
    _locator_fk: "5f43b1ec49984d149c28d0c0",
}

let favorite_ad_fk;

describe('Teste de favorite Ads test', () => {
    it('Favorite Ads Test', (done) => {
        chai.request(base_url)
            .post('/favoriteAdsRoute/add_favorite_ad')
            .send(addFavoriteAd)
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("favorite")
                expect(res.body).to.have.property("message")
                favorite_ad_fk = res.body.favorite;
                done();
            });
    });
    it('get favorite ads one user', (done) => {
        chai.request(base_url)
            .get('/favoriteAdsRoute/get_favorite_ad_one_user')
            .query(addFavoriteAd)
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message")
                expect(res.body).to.have.property("ads")
                done();
            })
    })
    it('delete one favorite ad', (done) => {
        chai.request(base_url)
            .delete('/favoriteAdsRoute/delete_favorite_ad')
            .query(addFavoriteAd)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message")
                done();
            });
    });
    /* after(done => {
        let FavoriteAdsModel = require('./models/favoriteAdsModel')
        FavoriteAdsModel.deleteOne({ "_id": favorite_ad_fk })
            .then(ok => {
                console.log("ok => ", ok)
                done()
            })
            .catch(error => {
                console.log("Error: ", error)
                done()
            })
    }); */
});