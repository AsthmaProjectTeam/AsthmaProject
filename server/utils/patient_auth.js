/**
 * Created by tengzhongwei on 6/7/17.
 */
let jwt  = require('jsonwebtoken');
var assert = require('assert')
function patientAuth(req, res, next) {
    try {
        let dec = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
        assert(dec.role==="patient");
        req.user = dec;
        next();
    }
    catch (err){
        if(err.name==='TokenExpiredError'){
            var originalDecoded = jwt.decode(req.headers.authorization.split(' ')[1], {complete: true});
            var refreshed = jwt.refresh(originalDecoded, 3600, process.env.SECRET_KEY);
        }
        res.status(401).send('UnAuthorized User');
    }
}

module.exports = patientAuth;