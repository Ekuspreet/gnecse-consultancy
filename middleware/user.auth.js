const {verifyToken, decodeToken} = require('../services/token');

function returnError(res,type,fallbackPath = "/",message = "Unauthorized For This Action") {
    if(type === "api") {
        return res.status(403).json({message});
    }
    if(type === "web") {
        return res.redirect(fallbackPath);
    }
}
function authMiddleware(roles, type) {

    return function (req, res, next) {
        const token = req.cookies['auth-token'];
        if(!token) {
            returnError(res,type,"/");
            return;
        }
        if(!verifyToken(token)) {
            returnError(res,type,"/");
            return;
        }

        const user = decodeToken(token);
        if (!roles.includes(user.role)) {
            returnError(res,type,"/","Invalid Role");
            return;
        }
        req.user = user;
        
        next();
    };
}

module.exports = authMiddleware;
