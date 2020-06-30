const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const newUser = new mongoose.Schema({
    name: { type: String, required: [true, 'Name user is required'] }, //nome
    genre: { type: String, required: [true, 'Gender user is required'] }, //genero
    landlord_type: { type: String, required: [true, 'LandLord Type user is required'] }, //tipo do locador
    cpf_cnpj: { type: String, required: [true, 'Cpf or Cnpj user is required'], unique: 'Cpf or Cnpj {VALUE} is already registered' }, //numero de registro brasileiro
    email: { type: String, required: [true, 'Email user is required'], unique: 'Email {VALUE} is already registered' },
    phones: { //telefones
        telephone1: { type: String, required: [true, '1 Telephone user is required'] },
        telephone2: { type: String }
    },
    address: { //endereco
        country: { type: String, required: [true, 'Country address user is required'] }, //país
        state: { type: String, required: [true, 'State address user is required'] }, //estado
        city: { type: String, required: [true, 'City address user is required'] }, //cidade
        zip_code: { type: String, required: [true, 'Zip Code address user is required'] }, //cep
        neighborhood: { type: String, required: [true, 'Neighborhood address user is required'] }, //bairro
        street: { type: String, required: [true, 'Street address user is required'] }, //rua
        number: { type: String, required: [true, 'Number address user is required'] } //numero da casa
    },
    password: { type: String, required: [true, 'Password user is required'] }
})
newUser.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with the user registration"
});

newUser.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

newUser.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('UserModel', newUser)