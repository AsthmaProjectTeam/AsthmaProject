/**
 * Created by tengzhongwei on 3/28/17.
 */
let jwt  = require('jsonwebtoken');
function jwt_parser(req, res, next) {
    try {
        let dec = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
        req.user = dec._doc;
        next();
    }
    catch (err){
        res.clearCookie('token');
        res.status(401).send({err});
    }
}

module.exports = jwt_parser;