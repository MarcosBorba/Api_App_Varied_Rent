const mongoose = require('mongoose')
var connection = mongoose;
//FIXME: database da crash quando o mongodb nao esta iniciado, tratar para retornar uma response caso der crash
//TODO: olhar sessoes, para conectar somente uma vez e querys serem mais rapidas
connection.connect('mongodb://localhost:27017/varied_rent', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


connection.connection.on('connected', function() {
    console.log('connected to db');
});

connection.connection.on('disconnected', function() {
    console.log('disconnected to db');
});

connection.connection.on('error', err => {
    console.log(err);
});

process.on('SIGINT', function() {
    connection.connection.close(function() {
        console.log('db connection closed due to process termination');
        process.exit(0);
    });
});

module.exports = connection;