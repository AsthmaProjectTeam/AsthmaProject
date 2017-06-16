/**
 * Created by tengzhongwei on 6/6/17.
 */
let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

/**
 * This is schema for Pain-check
 *
 * @model PainCheck
 * @param {String}          patient:    A unique identifier for patients
 * @param {[Initiator]}     initiators: A array indicates all doctor/nurse who in charge of this patient
 * @param {[ResultSet]}     result_set: A array show all results this patient has made
 * @param {String}          first_name: Personal information
 * @param {String}          last_name:  Personal information
 * @param {String}          phone:      Personal information
 * @param {String}          email:      Personal information
 * @param {String}          role:       Used for Permission. Can only be 'Patient'
 */

let PainCheck = new Schema({
    patient:{type:Number, ref:'Patient', required:true},
    nurse:{type:Number, ref:'Nurse', required:true},
    pain_level:{type:Number, enum:[1,2,3,4,5,6,7,8,9,10], required:true},
    context:{type:String}
});


PainCheck.plugin(autoIncrement.plugin, 'PainCheck');

module.exports = mongoose.model('PainCheck', PainCheck);
