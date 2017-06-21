/**
 * Created by tengzhongwei on 6/12/17.
 */
let jwt  = require('jsonwebtoken');
var assert = require('assert')
function tempAuth(req, res, next) {
    try {
        let dec = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
        assert(dec.role === 'temp');
        req.user = dec;
        next();
    }
    catch (err){
        res.clearCookie('token');
        res.status(401).send({err});
    }
}

module.exports = tempAuth;