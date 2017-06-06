/**
 * Created by tengzhongwei on 6/6/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    Patient = require('../../models/patient');

let pain_check = new Schema({
    patient:{type:Number, ref:'Patient'},
});