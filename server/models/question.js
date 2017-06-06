/**
 * Created by tengzhongwei on 5/24/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

let Result = new Schema({
    "key":{type:String, required:true},
    "value": {type:String, required:true, default:null}
});

let Question = new Schema({
    "author" : {type:Schema.Types.ObjectId, ref: "Doctor", required:true},
    "content": {type:String, required:true},
    "results": {type: [Result]},
    "type": {type: String, required:true, enum:[
       "choice", "completion", "slide_bar"
    ]},
    "created_date":{ type: Date, default:Date.now},
    "version":{type: Number, default:0},
    "is_start_q":{type: Boolean, default:false},    //start q will be documented in flowset
});

Question.plugin(autoIncrement.plugin, 'Question');

module.exports = mongoose.model('Question', Question);