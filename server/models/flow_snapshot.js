/**
 * Created by tengzhongwei on 5/31/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

let FlowSnapshot = new Schema({
    start_node: {type:Number, ref:"Question"},
    related_question: [{type:Number, ref:"Question"}],
    related_flow: {type:Number, ref:"Flow"}
});