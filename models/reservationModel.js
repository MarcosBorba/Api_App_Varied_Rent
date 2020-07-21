const mongoose = require('mongoose')
mongoose.set('debug', true)
const beautifyUnique = require('mongoose-beautiful-unique-validation');
//TODO: mudar no backend e frontend para trabalhar com do usuario
// para verificar relacoes do usuario com os anuncios e seus sub servicos
const newReservation = new mongoose.Schema({
    _ad_fk: { type: Number, required: [true, 'Ad Foreing Key is required'] },
    _tenant_fk: { type: Number, required: [true, 'Tenant is required'] },
    init_date_time: { type: Date, required: [true, 'Init date time is required'] },
    end_date_time: { type: Date, required: [true, 'End date time is required'] },
    value: { type: Number, required: [true, 'Value is required'] },
})

newReservation.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with the user registration"
});

module.exports = mongoose.model('ReservationModel', newReservation)