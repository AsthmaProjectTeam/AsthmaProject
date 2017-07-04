/**
 * Created by tengzhongwei on 3/28/17.
 */
let jwt  = require('jsonwebtoken-refresh');
var assert = require('assert');
function initiatorAuth(req, res, next) {
    try {
        let dec = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
        assert(['nurse','doctor', 'admin'].includes( dec.role)===true);
        req.user = dec;
        next();
    }
    catch (err){
        res.status(401).send('UnAuthorized User');
    }
}

module.exports = initiatorAuth;