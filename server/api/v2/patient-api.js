/**
 * Created by tengzhongwei on 6/12/17.
 */
let Patient             = require('../../models/patient-model'),
    patientAuth         = require('../../utils/patient_auth'),
    Joi                 = require('joi'),
    QUESTION_CONTEXT    = require('../../utils/QUESTION_CONTEXT');

module.exports = app => {

    /**
     * Upload patient's result
     *
     * @param {req.params.uuid} uuid of patient
     * @param {req.body.pain_level} pain level of  patient
     * @param {req.body.context} context of this pain level check
     * @return {object} Return profile object
     */
    app.post('/v2/patients/:id/results', patientAuth, (req, res)=>{
        if(req.params.uuid != req.user.uuid) res.status(403).send('You can not access this');
        const schema = Joi.object().keys({
            pain_level: Joi.number().min(0).max(10).required(),
            context:    Joi.string().required,
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                // Patient.findOne({uuid:req.par}, (err, patient)=>{
                //     if(err) res.status(401).send({err});
                //     else {
                //TODO:May be problem(can we use req.user to save() directly?)
                if(req.user.result_set.pain_check === null){
                    req.user.result_set.pain_check = [data];
                } else {
                    req.user.result_set. push(data);
                }
                req.user.save(err=>{
                    if(err) res.status(401).send({err});
                    else res.status(200).send(patient);
                })
            }
        });
    });

    /**
     * GET all results of a patient;
     *
     * @param {req.params.uuid} uuid of patient
     *
     * @param {req.query.context} optional: query specific results set based on context
     *
     * @return {object} Return profile object
     */
    app.get('/v2/patients/:id/results', patientAuth, (req, res)=>{
        if(req.params.uuid != req.user.uuid) res.status(403).send('You can not access this');
        else {
            if (req.query.context){
                // if(!QUESTION_CONTEXT.CONTEXT.includes(req.query.context)){
                //     res.status(400).send("Invalid Query Request!");
                // }
                // else {
                Patient.findOne({_id:req.params.id},(err, patient)=>{
                    if(err) res.status(401).send({err});
                    else res.status(200).send(patient.result_set[req.query.context]);
                });
                //}
            } else {
                Patient.findOne({_id:req.params.id},(err, patient)=>{
                    if(err) res.status(401).send({err});
                    else res.status(200).send(patient.result_set);
                });
            }
        }
    });



};