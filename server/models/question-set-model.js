/**
 * Created by tengzhongwei on 6/16/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    Question            = require('../models/question-model');


let NextQuestion = new Schema({
    'question_id':      {type:Number, required:true},
    'prerequisite':     {
        'option':{type:String},
        'value':  {type: Number},
        'interval':{
            greater_than: {type:Number},
            less_than: {type:Number},
            left_close:{type:Boolean},
            right_close:{type:Boolean}
        },
        'greater_than': {
            'value':{type:Number},
            'include_value':{type:Boolean},
        },
        'less_than':{
            'value':{type:Number},
            'include_value':{type:Boolean},
        }
    },
},
    { _id : false }
);

let QuestionFlow = new Schema({
    'question':         {type: Number, ref:'Question', required:true},
    'next_question':    {type:[NextQuestion]},
    'end_question':     {type:Boolean, default:true},
},
    { _id : false }

);


let QuestionSet = new Schema({
    'author':          {type:Number, ref: 'Initiator', required:true},
    'app':      {type:String, required:true},
    'content':         {type:[QuestionFlow]},
});

QuestionSet.plugin(autoIncrement.plugin, 'QuestionSet');

module.exports = mongoose.model('QuestionSet', QuestionSet);