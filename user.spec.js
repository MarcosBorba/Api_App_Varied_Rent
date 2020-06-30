//importa toda aplicacao Express, colocando ela em execucao durante o teste
const app_varied = require('./bin/www');

let chai = require('chai'); //importa a biblioteca chai
let chaiHttp = require('chai-http'); //importa a biblioteca chai-http
let expect = chai.expect; //utiliza a interface expect
const base_url = 'http://localhost:3000';

//usa a biblioteca chaihttp para simular requisicoes na api
chai.use(chaiHttp);

let userTest = {
    name: "User Test Of Test",
    genre: "Male",
    landlord_type: "Particular",
    cpf_cnpj: "000.265.421-90",
    email: "usertester@gmail.com",
    phones: {
        telephone1: "64 99329-2527",
        telephone2: ""
    },
    address: {
        country: "Brasil",
        state: "Sao Paulo",
        city: "Sao Joao",
        zip_code: "65932-000",
        neighborhood: "Mina do Norte",
        street: "4th 144",
        number: "35621",
    },
    password: "User1234"
}

describe('Teste de usuarios da api', () => {
    it('Create new User in Api', (done) => {
        chai.request(base_url)
            .post('/userRoute/signup')
            .send(userTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Create new User in Api with error cpf_cnpj is already registered', (done) => {
        chai.request(base_url)
            .post('/userRoute/signup')
            .send(userTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Create new User in Api with error email is already registered', (done) => {
        userTest.cpf_cnpj = "364.526.247-02"
        chai.request(base_url)
            .post('/userRoute/signup')
            .send(userTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Login User in Api', (done) => {
        chai.request(base_url)
            .post('/userRoute/login')
            .send(userTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                expect(res.body).to.have.property("token")
                expect(res.body).to.have.property("name")
                expect(res.body).to.have.property("genre")
                expect(res.body).to.have.property("landlord_type")
                expect(res.body).to.have.property("cpf_cnpj")
                expect(res.body).to.have.property("phones")
                expect(res.body).to.have.property("address")
                done();
            })
    })
    it('Login User in Api with error email doesn\'t exists', (done) => {
        userTest.email = "usertester2009@gmail.com";
        chai.request(base_url)
            .post('/userRoute/login')
            .send(userTest)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(404)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                userTest.email = "usertester@gmail.com";
                done();
            })
    })

    after(done => {
        let Usuario = require('./models/userModel')
        Usuario.deleteOne({ "email": userTest.email })
            .then(ok => {
                console.log("ok => ", ok)
                console.log("Apagou User Test!")
                done()
            })
            .catch(error => {
                console.log("Error: ", error)
                done()
            })
    });
})