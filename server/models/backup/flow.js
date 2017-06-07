/**
 * Created by tengzhongwei on 5/24/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

let Flow = new Schema({
    current_q:{type:Number, ref: 'Question'},
    next_q:{type:Number, ref: 'Question'},
    type:{type:String, enum:["option","all",">","<",'==','>=',"<="]},
    value:{type:Number, required:true}
});

Flow.plugin(autoIncrement.plugin, 'Flow');

module.exports = mongoose.model('Flow',Flow);