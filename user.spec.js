//importa toda aplicacao Express, colocando ela em execucao durante o teste
const app_varied = require('./bin/www');

let chai = require('chai'); //importa a biblioteca chai
let chaiHttp = require('chai-http'); //importa a biblioteca chai-http
const { set } = require('mongoose');
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
    password: "User1234",
}
let userTest2 = {
    name: "User Test Of Test 2 ",
    genre: "Female",
    landlord_type: "Particular",
    cpf_cnpj: "000.265.200-14",
    email: "usertester2@gmail.com",
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
    password: "User1234",
}

let tokenLogin;
let idUserTest;
let tokenLoginUserTest2;
let idUserTest2;

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
    it('Create new User in Api ( create user test 2 )', (done) => {
        chai.request(base_url)
            .post('/userRoute/signup')
            .send(userTest2)
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
                userTest.cpf_cnpj = "000.265.421-90";
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
                expect(res.body).to.have.property("id")
                expect(res.body).to.have.property("auth")
                expect(res.body).to.have.property("token")
                expect(res.body).to.have.property("name")
                expect(res.body).to.have.property("genre")
                expect(res.body).to.have.property("email")
                expect(res.body).to.have.property("landlord_type")
                expect(res.body).to.have.property("cpf_cnpj")
                expect(res.body).to.have.property("phones")
                expect(res.body).to.have.property("address")
                tokenLogin = res.body['token']
                idUserTest = res.body['id']
                done();
            })
    })
    it('Login User in Api ( login user test 2 )', (done) => {
        chai.request(base_url)
            .post('/userRoute/login')
            .send(userTest2)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                expect(res.body).to.have.property("token")
                expect(res.body).to.have.property("name")
                expect(res.body).to.have.property("genre")
                expect(res.body).to.have.property("email")
                expect(res.body).to.have.property("landlord_type")
                expect(res.body).to.have.property("cpf_cnpj")
                expect(res.body).to.have.property("phones")
                expect(res.body).to.have.property("address")
                tokenLoginUserTest2 = res.body['token']
                idUserTest2 = res.body['id']
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
                userTest.email = "usertester@gmail.com"
                done();
            })
    })
    it('Check username and password to update email', (done) => {
        chai.request(base_url)
            .post('/userRoute/check_user')
            .set('x-access-token', tokenLogin)
            .send(userTest)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                done();
            })
    })
    it('Check username and password to update email with error no token provided', (done) => {
        chai.request(base_url)
            .post('/userRoute/check_user')
            .send(userTest)
            .end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Check username and password to update email with error failed authentication', (done) => {
        chai.request(base_url)
            .post('/userRoute/check_user')
            .set('x-access-token', null)
            .send(userTest)
            .end((err, res) => {
                expect(res).to.have.status(500)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                expect(res.body).to.have.property("message")
                done();
            })
    })

    it('Updating email', (done) => {
        let userTestUpdateEmailUser = {
            oldEmail: userTest.email,
            newEmail: "usertester1998@gmail.com",
            newEmailConfirmed: "usertester1998@gmail.com"
        }
        chai.request(base_url)
            .put('/userRoute/update_email')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                userTest.email = "usertester1998@gmail.com"
                done();
            })
    })
    it('Updating email with error email was not found', (done) => {
        let userTestUpdateEmailUser2 = {
            oldEmail: "usertester@gmail.com",
            newEmail: "usertester1998@gmail.com",
            newEmailConfirmed: "usertester1998@gmail.com"
        }
        chai.request(base_url)
            .put('/userRoute/update_email')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser2)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(404)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating email with error values nulls', (done) => {
        let userTestUpdateEmailUser2 = {
            oldEmail: userTest.email,
            newEmail: null,
            newEmailConfirmed: null
        }
        chai.request(base_url)
            .put('/userRoute/update_email')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser2)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(401)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating password', (done) => {
        let userTestUpdateEmailUser = {
            userEmail: userTest.email,
            newPassword: "Marcos11",
            newPasswordConfirmed: "Marcos11"
        }
        chai.request(base_url)
            .put('/userRoute/update_password')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                userTest.password = "Marcos11"
                done();
            })
    })
    it('Updating password with error newPassword is different from newPasswordConfirmed', (done) => {
        let userTestUpdateEmailUser = {
            userEmail: userTest.email,
            newPassword: "Marcos11",
            newPasswordConfirmed: "Marcos112"
        }
        chai.request(base_url)
            .put('/userRoute/update_password')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(401)
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating password with error newPassword null', (done) => {
        let userTestUpdateEmailUser = {
            userEmail: userTest.email,
            newPassword: null,
            newPasswordConfirmed: "Marcos11"
        }
        chai.request(base_url)
            .put('/userRoute/update_password')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(401)
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating password with error the current email was not found', (done) => {
        let userTestUpdateEmailUser = {
            userEmail: "userTesterTester@gmail.com",
            newPassword: "Marcos11",
            newPasswordConfirmed: "Marcos11"
        }
        chai.request(base_url)
            .put('/userRoute/update_password')
            .set('x-access-token', tokenLogin)
            .send(userTestUpdateEmailUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(404)
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating profile', (done) => {
        let userTestProfileUpdateUser = {
            old_cpf_cnpj: userTest.cpf_cnpj,
            name: "Name Tester Tester",
            genre: userTest.genre,
            landlord_type: userTest.landlord_type,
            cpf_cnpj: userTest.cpf_cnpj,
            phones: {
                telephone1: userTest.phones.telephone1,
                telephone2: userTest.phones.telephone2,
            },
        }
        chai.request(base_url)
            .put('/userRoute/update_profile')
            .set('x-access-token', tokenLogin)
            .send(userTestProfileUpdateUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                done();
            })
    })
    it('Updating profile with error failed to update ( cpf/cnpj not found )', (done) => {
        let userTestProfileUpdateUser = {
            old_cpf_cnpj: "000.265.200-13",
            name: "Name Tester Tester",
            genre: userTest.genre,
            landlord_type: userTest.landlord_type,
            cpf_cnpj: userTest.cpf_cnpj,
            phones: {
                telephone1: userTest.phones.telephone1,
                telephone2: userTest.phones.telephone2,
            },
        }
        chai.request(base_url)
            .put('/userRoute/update_profile')
            .set('x-access-token', tokenLogin)
            .send(userTestProfileUpdateUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(404)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating profile with error Cpf or Cnpj registered', (done) => {
        let userTestProfileUpdateUser = {
            old_cpf_cnpj: userTest.cpf_cnpj,
            name: "Name Tester Tester",
            genre: userTest.genre,
            landlord_type: userTest.landlord_type,
            cpf_cnpj: "000.265.200-14",
            phones: {
                telephone1: userTest.phones.telephone1,
                telephone2: userTest.phones.telephone2,
            },
        }
        chai.request(base_url)
            .put('/userRoute/update_profile')
            .set('x-access-token', tokenLogin)
            .send(userTestProfileUpdateUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(404)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    it('Updating address', (done) => {
        let userTestAddressUpdateUser = {
            email: userTest.email,
            country: userTest.address.country,
            state: userTest.address.state,
            city: userTest.address.city,
            zip_code: userTest.address.zip_code,
            neighborhood: userTest.address.neighborhood,
            street: "3th 144",
            number: "3500",
        }
        chai.request(base_url)
            .put('/userRoute/update_address')
            .set('x-access-token', tokenLogin)
            .send(userTestAddressUpdateUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("auth")
                done();
            })
    })
    it('Updating address with error email was not found', (done) => {
        let userTestAddressUpdateUser = {
            email: "userTesterTester@gmail.com",
            country: userTest.address.country,
            state: userTest.address.state,
            city: userTest.address.city,
            zip_code: userTest.address.zip_code,
            neighborhood: userTest.address.neighborhood,
            street: "3th 144",
            number: "3500",
        }
        chai.request(base_url)
            .put('/userRoute/update_address')
            .set('x-access-token', tokenLogin)
            .send(userTestAddressUpdateUser)
            .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(404)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("status")
                expect(res.body).to.have.property("statusCode")
                expect(res.body).to.have.property("message")
                done();
            })
    })
    after(done => {
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
    });
})