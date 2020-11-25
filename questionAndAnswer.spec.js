//importa toda aplicacao Express, colocando ela em execucao durante o teste
const app_varied = require('./bin/www');

let chai = require('chai'); //importa a biblioteca chai
let chaiHttp = require('chai-http'); //importa a biblioteca chai-http
const { set } = require('mongoose');
let expect = chai.expect; //utiliza a interface expect
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

/* let questionAndAnswerTest = {
    _ad_fk: "5f6662d74f4b5021684a010c",
    _tenant_fk: "5fbe6c853f9f3d34147c7027",
    question: {
        tenant_name: "Maria Teixeira",
        tenant_email: "maria@gmail.com",
        question_date_time: "2020-11-25",
        question: "Qual o ano do carro?",
    },
    answer: {
        locator_name: "Marcos Flavio Ferreira Borba",
        locator_email: "mano@gmail.com",
        answer_date_time: "2020-11-25",
        answer: "Azul Copa",
    },
} */
/* let questionAndAnswerTest = {
    _ad_fk: "5f6662d74f4b5021684a010c",
    _tenant_fk: "5fbe6d0d3f9f3d34147c7028",
    question: {
        tenant_name: "Francisco da Paz",
        tenant_email: "Francisco@gmail.com",
        question_date_time: "2020-11-25",
        question: "O carro é espaçoso?",
    },
    answer: {
        locator_name: "Marcos Flavio Ferreira Borba",
        locator_email: "mano@gmail.com",
        answer_date_time: "2020-11-25",
        answer: "Azul Copa",
    },
} */
let questionAndAnswerTest = {
    _ad_fk: "5f6662d74f4b5021684a010c",
    _tenant_fk: "5fbe6c853f9f3d34147c7027",
    question: {
        tenant_name: "Maria Teixeira",
        tenant_email: "maria@gmail.com",
        question_date_time: "2020-11-25",
        question: "Qual o ano do carro?",
    },
    answer: {
        locator_name: "teste teste",
        locator_email: "test@gmail.com",
        answer_date_time: "2020-11-25",
        answer: "test question",
    },
}

let getQuestionsAndAnswers = {
    "_ad_fk": "5f6662d74f4b5021684a010c",
}

let idQuestionAndAnswerTest;

describe('Test QuestionsAndAnswerAd Test', () => {
    it('Add Question And Answer', (done) => {
        chai.request(base_url)
            .post('/questionAndAnswerRoute/add_question_and_answer')
            .send(questionAndAnswerTest)
            .end((err, res) => {
                console.log("body teste -> ", res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message")
                expect(res.body).to.have.property("id")
                idQuestionAndAnswerTest = res.body['id']
                done();
            })
    })
    it('get QuestionsAndAnswer one ad', (done) => {
        chai.request(base_url)
            .get('/questionAndAnswerRoute/get_questions_and_answers_one_ad')
            .send(getQuestionsAndAnswers)
            .end((err, res) => {
                console.log('teste get questions - > ', res.body)
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("question_and_answer")
                done();
            })
    })
    after(done => {
        let QuestionAndAnswer = require('./models/questionAndAnswerModel')
        QuestionAndAnswer.deleteOne({ "_id": idQuestionAndAnswerTest })
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