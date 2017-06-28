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
    app.post('/v2/patients/results', patientAuth, (req, res)=>{
        const schema = Joi.object().keys({
            app:        Joi.string().required(),
            results:    Joi.array().items({
                q_id:   Joi.number().required(),
                value: Joi.any().required(),
            }).min(1).required(),
        });
        // const schema =Joi.array().items({
        //         q_id:   Joi.number().required(),
        //         value: Joi.any().required(),
        //     }).min(1);
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Patient.findById(req.user._id, (err, patient)=>{
                   if(err) res.status(500).send('Internal Server Error');
                   else {
                       patient.previous_answer.push(data);
                       patient.save(err=>{
                           console.log(err);
                           if(err) res.status(500).send('Internal Server Error');
                           else res.status(200).send({previous_answer:patient.previous_answer});
                       });
                   }
                });
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
    app.get('/v2/patients/results', patientAuth, (req, res)=>{
        if (req.query.context){
            // if(!QUESTION_CONTEXT.CONTEXT.includes(req.query.context)){
            //     res.status(400).send("Invalid Query Request!");
            // }
            // else {
            res.status(200).send(req.user.result_set[req.query.context])
            //}
        } else {
            res.status(200).send(req.user.result_set)
        }

    });


    /**
     * GET a patient's profile via jwt
     *
     * @return {object} Return profile object
     */
    app.get('/v2/patients/profile',patientAuth, (req, res)=>{
        Patient.findById(req.user._id,(err,patient)=>{
            if(err) res.status(401).send('Database Error');
            else {
                res.status(200).send({patient});
            }
        });
    });



};