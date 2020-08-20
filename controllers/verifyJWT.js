const jwt = require('jsonwebtoken');
//TODO: olhar seguranca do token, essas mensagens chegam na tela do usuario
module.exports = {
    verifyJWT: (req, res, next) => {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            req.userId = decoded.id;
            next();
        });
    }
}