const UserModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');
const { ErrorHandler } = require('../controllers/errorHandler');
//TODO: otimizar para melhorar seguranca contra ataques
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
            res.status(200).send({
                id: userLogin._id,
                auth: true,
                token: token,
                name: userLogin.name,
                genre: userLogin.genre,
                email: userLogin.email,
                landlord_type: userLogin.landlord_type,
                cpf_cnpj: userLogin.cpf_cnpj,
                phones: userLogin.phones,
                address: userLogin.address
            });
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
    },
    check_user: async(req, res, next) => {
        try {
            const { email, password } = req.body;

            const userCheck = await UserModel.findOne({ 'email': email });
            if (userCheck == null) throw new ErrorHandler(404, "The email doesn't exists");

            const validPassword = await userCheck.validatePassword(password, userCheck.password);
            if (validPassword == false) throw new ErrorHandler(401, "incorrect password");

            res.status(200).send({ auth: true });
        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
    update_email: async(req, res, next) => {
        try {
            const { oldEmail, newEmail, newEmailConfirmed } = req.body;
            if (newEmail != newEmailConfirmed || newEmail == null) {
                throw new ErrorHandler(401, "The new email is different from the new verified email");
            } else {
                const userOld = await UserModel.findOne({ 'email': oldEmail })
                if (userOld == null) throw new ErrorHandler(404, "The current email was not found");

                const userEmailUpdate = await UserModel.updateOne({ 'email': oldEmail }, {
                    $set: { email: newEmail }
                });
                if (userEmailUpdate == null) throw new ErrorHandler(400, "The email update has not been completed");

                res.status(200).send({ auth: true });
            }
        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
    update_password: async(req, res, next) => {
        try {
            const { userEmail, newPassword, newPasswordConfirmed } = req.body;
            if (newPassword != newPasswordConfirmed || newPassword == null) {
                throw new ErrorHandler(401, "The new password is different from the new verified password");
            } else {
                const userOld = await UserModel.findOne({ 'email': userEmail })
                if (userOld == null) throw new ErrorHandler(404, "The current email was not found");

                let passwordEncrypt = await userOld.encryptPassword(newPasswordConfirmed);
                const userPasswordUpdate = await UserModel.updateOne({ 'email': userEmail }, {
                    $set: { password: passwordEncrypt }
                });
                if (userPasswordUpdate == null) throw new ErrorHandler(400, "The password update has not been completed");

                res.status(200).send({ auth: true });
            }
        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
    update_profile: async(req, res, next) => {
        try {
            const { name, genre, landlord_type, cpf_cnpj, phones } = req.body;

            const verifyUser = await UserModel.findOne({ 'cpf_cnpj': cpf_cnpj })
            if (verifyUser == null) throw new ErrorHandler(404, "Failed to update profile data");

            const userProfileUpdate = await UserModel.updateOne({ 'cpf_cnpj': cpf_cnpj }, {
                $set: {
                    name: name,
                    genre: genre,
                    landlord_type: landlord_type,
                    cpf_cnpj: cpf_cnpj,
                    phones: phones
                }
            });
            if (userProfileUpdate == null)
                throw new ErrorHandler(400, "The profile update has not been completed");

            res.status(200).send({ auth: true });

        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },

}