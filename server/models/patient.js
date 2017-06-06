/**
 * Created by tengzhongwei on 5/24/17.
 */


"use strict";

let crypto              = require('crypto'),
    mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

/***************** Patient Model *******************/
const makeSalt = () => (
    Math.round((new Date().valueOf() * Math.random())) + ''
);

const encryptPassword = (salt, password) => (
    crypto.createHmac('sha512', salt).update(password).digest('hex')
);

let Result = new Schema({
        _id: {type: Number, required:true},
        value: {type: Number, required:true},
    },
    { _id : false }
);

let ResultSet = new Schema({
    title: {type:String, required:true},
    results:{type:[Result]}
},
    { _id : false }
);

let Patient = new Schema({
    'username':     {type: String, required: true, index: { unique: true } },
    'doctors':[
                    {type: String, ref: 'Doctor' }
    ],
    'result_set':   {type:[ResultSet]},
    "created_date": {type: Date, default:Date.now},
    'first_name':   { type: String, required: true },
    'last_name':    { type: String, required: true },
    "phone":        {type:String, unique:true},
    'email':        { type: String, unique: true },
    'hash':         { type: String, required: true },
    'salt':         { type: String, required: true },
});

Patient.virtual('password').set(function(password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
    this._id            = this.username;
});

Patient.method('authenticate', function(plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});


/***************** Registration *******************/

Patient.plugin(autoIncrement.plugin, 'Patient');

module.exports = mongoose.model('Patient', Patient);
