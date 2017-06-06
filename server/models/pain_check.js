/**
 * Created by tengzhongwei on 6/6/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

let PainCheck = new Schema({
    patient:{type:Number, ref:'Patient', required:true},
    nurse:{type:Number, ref:'Nurse', required:true},
    pain_level:{type:Number, enum:[1,2,3,4,5,6,7,8,9,10], required:true},
    context:{type:String}
});


PainCheck.plugin(autoIncrement.plugin, 'PainCheck');

module.exports = mongoose.model('PainCheck', PainCheck);
