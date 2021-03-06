/**
 * Created by tengzhongwei on 7/3/17.
 */
const Patient                     = require('../models/patient-model');
const Initiator                   = require('../models/initiator-model');
const QuestionSet                 = require('../models/question-set-model');
async function addPatient(id_list,req,res) {
    try {
        let initiator = await Initiator.findById(req.user.id);
        if(initiator){
            for(let id of id_list){
                let patient = await Patient.findById(id);
                if(patient){

                    if(!initiator.patients.includes(patient._id)){
                        initiator.patients.push(patient._id);
                    }
                    if(!patient.initiators.includes(initiator._id)){
                        patient.initiators.push(initiator._id);
                    }
                    await patient.save();
                }
            }
            await initiator.save();
            res.status(200).send({profile:initiator});
        }
    } catch (err){
        res.status(500).send({err:err.message});
    }
}

async function addQuestionSet(req, res, data) {
    try {
        const patient_list = data.patient_list;
        const q_list = data.q_list;
        //filter question set list
        const filtered_q_list = [];
        for (let q_id of q_list) {
            let question_set = await QuestionSet.findById(q_id);
            if (question_set) filtered_q_list.push(q_id);
        }
        //add all existed question set to patient list
        await Patient.update({_id: {$in: patient_list}},{$pushAll:{question_set:filtered_q_list}},{"multi": true});
        const  patients = await Patient.find({_id: {$in: patient_list}});
        res.status(200).send({patients});
    }
        catch (err) {
        res.status(500).send({err});
    }


}

async function newPatientViaCsv(req, res, data) {
    try {
        for(let patient of data){
            let mrn = patient.mrn;
            if(patient.last_name && patient.first_name && patient.mrn && patient.date){
                let p = await Patient.findOne({mrn:mrn});
                if(p===null) {

                    patient.first_name = patient.first_name[0].toUpperCase()+patient.first_name.slice(1).toLowerCase();
                    patient.last_name  = patient.last_name[0].toUpperCase()+patient.last_name.slice(1).toLowerCase();
                    patient.question_set = [16];
                    p = new Patient(patient);
                    await p.save();
                }
            }

        }
        res.status(200).send('suc');
    }
    catch (err){

        res.status(500).send('err')
    }


}

module.exports = {
    addPatient,
    addQuestionSet,
    newPatientViaCsv
};