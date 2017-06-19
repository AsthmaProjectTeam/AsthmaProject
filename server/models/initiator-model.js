/**
 * Created by tengzhongwei on 5/24/17.
 */

"use strict";

let crypto              = require('crypto'),
    mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement       = require('mongoose-auto-increment');

/***************** User Model *******************/

const makeSalt = () => (
    Math.round((new Date().valueOf() * Math.random())) + ''
);

const encryptPassword = (salt, password) => (
    crypto.createHmac('sha512', salt).update(password).digest('hex')
);


/**
 * This is schema for all possible initiator.
 *
 * @model Initiator
 * @param {String}      username:    A unique identifier for each initiator
 * @param {String}      email:       Contact email for initiator, should be unique
 * @param {String}      first_name:  Personal information
 * @param {String}      last_name:   Personal information
 * @param {String}      hash:        Hash code for authentication
 * @param {String}      salt:        Salt code for authentication
 * @param {[Patient]}   patients:    A array show patients this initiator in charge of
 * @param {Date}        created_data:The date this initiator created
 * @param {String}      phone:       Personal information
 * @param {String}      role:        Indicate the role. Can be 'doctor'/'nurse'/'admin'/'unknown'
 */
let Initiator = new Schema({
    'username':{type: String, required: true, index: { unique: true } },
    'email':{ type: String, required: true, index: { unique: true } },
    'first_name':   { type: String, required: true },
    'last_name':    { type: String, required: true },
    'hash':         { type: String, required: true },
    'salt':         { type: String, required: true },
    'patients': [
                    { type: Number, ref: 'Patient' }
    ],
    "created_date": { type: Date, default:Date.now},
    "phone":        {type:String, required: true},
    "role":         {type:String, enum:['nurse','doctor','admin'], default:'nurse'}
});

Initiator.virtual('password').set(function(password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
});

Initiator.method('authenticate', function(plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});


Initiator.plugin(autoIncrement.plugin, 'Initiator');

module.exports = mongoose.model('Initiator', Initiator);
