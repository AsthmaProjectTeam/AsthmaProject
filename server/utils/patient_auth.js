/**
 * Created by tengzhongwei on 6/7/17.
 */
let jwt  = require('jsonwebtoken');
var assert = require('assert')
function patientAuth(req, res, next) {
    try {
        let dec = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
        assert(dec._doc.role==="patient");
        req.user = dec._doc;
        next();
    }
    catch (err){
        res.clearCookie('token');
        res.status(401).send({err});
    }
}

module.exports = patientAuth;