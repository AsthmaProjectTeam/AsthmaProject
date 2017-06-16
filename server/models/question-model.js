/**
 * Created by tengzhongwei on 6/16/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

let Result = new Schema({
    'key':{type:String, required:true},
    'value': {type:String, required:true, default:null}
},
    { _id : false }
);

let Question = new Schema({
    'author':               {type:Number, ref: 'Initiator', required:true},
    'app':                  {type:String, required:true},
    'type':                 {type:String, required:true},
    'description':          {type:String, required:true},
    'created_date':         {type:Date, default:Date.now},
    'options':             {type:[Result]}
});

Question.plugin(autoIncrement.plugin, 'Question');

module.exports = mongoose.model('Question', Question);