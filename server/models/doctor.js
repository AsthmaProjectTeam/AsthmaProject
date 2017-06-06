/**
 * Created by tengzhongwei on 5/24/17.
 */

"use strict";

let crypto              = require('crypto'),
    mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** User Model *******************/

const makeSalt = () => (
    Math.round((new Date().valueOf() * Math.random())) + ''
);

const encryptPassword = (salt, password) => (
    crypto.createHmac('sha512', salt).update(password).digest('hex')
);

const reservedNames = ['password'];

let Doctor = new Schema({
    'username':{type: String, required: true, index: { unique: true } },
    'email':{ type: String, required: true, index: { unique: true } },
    'first_name':   { type: String, required: true },
    'last_name':    { type: String, required: true },
    'hash':         { type: String, required: true },
    'salt':         { type: String, required: true },
    _id:            { type: String, required: true, index: { unique: true } },
    'patients': [
                    { type: Number, ref: 'Patient' }
    ],
    "created_date": { type: Date, default:Date.now},
    "phone":        {type:String, required: true},
});

// User.path('_id').validate(function(value) {
//     if (!value) return false;
//     if (reservedNames.indexOf(value) !== -1) return false;
//     return (value.length > 5 && value.length <= 16 && /^[a-zA-Z0-9]+$/i.test(value));
// }, 'invalid username');

// Doctor.path('primary_email').validate(function(value) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// }, 'malformed address');

Doctor.virtual('password').set(function(password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
    this._id            = this.username;
});

Doctor.method('authenticate', function(plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});

// Doctor.pre('save', function(next) {
//     // Sanitize strings
//     // this._id            = this._id.toLowerCase();
//     // this.primary_email  = this.primary_email.toLowerCase();
//     this.first_name     = this.first_name.replace(/<(?:.|\n)*?>/gm, '');
//     this.last_name      = this.last_name.replace(/<(?:.|\n)*?>/gm, '');
//     this.city           = this.city.replace(/<(?:.|\n)*?>/gm, '');
//     next();
// });

/***************** Registration *******************/

module.exports = mongoose.model('Doctor', Doctor);
