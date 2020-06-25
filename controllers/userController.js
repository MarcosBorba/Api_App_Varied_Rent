const UserModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    create_user: async(req, res, next) => {
        try {
            const { name, genre, landlord_type, cpf_cnpj, email, phones, address, password } = req.body;
            const newUser = new UserModel({
                name,
                genre,
                landlord_type,
                cpf_cnpj,
                email,
                phones,
                address,
                password
            });
            newUser.password = await newUser.encryptPassword(newUser.password);
            await newUser.save()
                .then(user => {
                    res.status(200).send({ message: 'create successfully' });
                })
                .catch(error => {
                    throw new ErrorHandler(500, 'Registration error - ' + error.errors[Object.keys(error.errors)[0]])
                })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }

    },
    login_user: async(req, res, next) => {
        try {
            const { email, password } = req.body;
            const userLogin =
                await UserModel.findOne({ 'email': email });
            if (!userLogin) {
                throw new ErrorHandler(404, "The email doesn't exists");
            }
            const validPassword = await userLogin.validatePassword(password, userLogin.password);
            if (!validPassword) {
                throw new ErrorHandler(401, "incorrect password");
            }
            const token = jwt.sign({ id: userLogin._id }, config.secret, {});
            res.status(200).send({ auth: true, token: token });
        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }

        }

    },
    update_user: async(req, res, next) => {
        const { name, genre, landlord_type, cpf_cnpj, email, phones, address, password } = req.body;
        const newUserUpdate = new UserModel({
            name,
            genre,
            landlord_type,
            cpf_cnpj,
            email,
            phones,
            address,
            password
        });
        newUserUpdate.password = await newUserUpdate.encryptPassword(password);
        await UserModel.updateOne({ 'email': email }, {
                $set: {
                    'name': newUserUpdate.name,
                    'genre': newUserUpdate.genre,
                    'landlord_type': newUserUpdate.landlord_type,
                    'cpf_cnpj': newUserUpdate.cpf_cnpj,
                    'email': newUserUpdate.email,
                    'phones': newUserUpdate.phones,
                    'address': newUserUpdate.address,
                    'password': newUserUpdate.password
                }
            })
            .then(user => {
                res.status(200).send({ auth: true, msg: "updated successfully" });
            })
            .catch(error => {
                res.status(400).send({ auth: true, msg: "unsuccessful update" });
            });
    },
    logout_user: (req, res, next) => {
        res.status(200).send({ auth: false, token: null, msg: "logged out" });
    }
}