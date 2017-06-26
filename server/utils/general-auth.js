/**
 * Created by tengzhongwei on 6/26/17.
 */
let jwt  = require('jsonwebtoken');

function generalAuth(req, res, next) {
    try {
        let dec = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
        req.user = dec._doc;
        next();
    }
    catch (err){
        console.log(err);
        res.status(401).send('UnAuthorized User');
    }
}

module.exports = generalAuth;