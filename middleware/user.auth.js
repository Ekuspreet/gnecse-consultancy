const {verifyToken, decodeToken} = require('../services/token');


function authMiddleware(roles, type) {
    return function (req, res, next) {
        const token = req.cookies['auth-token'];
        if(!token) {
            res.redirect('/');
            return;
        }
        if(!verifyToken(token)) {
            res.redirect('/');
            return;
        }

        const user = decodeToken(token);
        if (!roles.includes(user.role)) {
            res.redirect('/');
            return;
        }
        req.user = user;
        next();
    };
}

module.exports = authMiddleware;
