/**
 * Created by tengzhongwei on 5/24/17.
 */


"use strict";

let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement       = require('mongoose-auto-increment');
   // QuestionSet         = require('../models/question-set-model');

/***************** Patient Model *******************/
let Result = new Schema({
        q_id: {type: Number, required:true},
        value: {type: String, required:true},
    },
    { _id : false }
);

let ResultSet = new Schema({
    app: {type:String, required:true},
    created_date:  { type: Date,       default:Date.now},
    results:{type:[Result]}
},
    { _id : false }
);



/**
 * This is schema for patient
 *
 * @model Patient
 * @param {String}          uuid:       A unique identifier for patients
 * @param {[Initiator]}     initiators: A array indicates all doctor/nurse who in charge of this patient
 * @param {[ResultSet]}     result_set: A array show all results this patient has made
 * @param {String}          first_name: Personal information
 * @param {String}          last_name:  Personal information
 * @param {String}          phone:      Personal information
 * @param {String}          email:      Personal information
 * @param {String}          role:       Used for Permission. Can only be 'Patient'
 */
let Patient = new Schema({
    'uuid':     {type: String, required: true, index: { unique: true } },
    "initiators":[
                    {type: Number, ref: 'Initiator' }
    ],
    "created_date": { type: Date,       default:Date.now},
    'first_name':   { type: String                      },
    'last_name':    { type: String                      },
    "phone":        { type: String  },
    'email':        { type: String },
    "role":         { type: String, enum:['patient'], default:'patient'},
    //TODO: Result set can contain different key according to the context of the question
    //TODO: Should limit types of key for result_set
    //'result_set':   { pain_check:[PainCheck]},
    'result_set': {type: [ResultSet]},
    'question_set': {type: [{type:Number, ref:'QuestionSet'} ]},
});


Patient.plugin(autoIncrement.plugin, 'Patient');

module.exports = mongoose.model('Patient', Patient);
