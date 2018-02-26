/**
 * Created by tengzhongwei on 6/12/17.
 */
let Patient             = require('../../models/patient-model'),
    patientAuth         = require('../../utils/patient_auth'),
    generalAuth         = require('../../utils/general-auth'),
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
                key:    Joi.any().required(),
                value:  Joi.any().required(),
                description: Joi.any().required(),
            }).min(1).required(),
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Patient.findById(req.user.id, (err, patient)=>{
                   if(err) res.status(500).send('Internal Server Error');
                   else {
                       //data.answer_by = -1;
                       patient.result_set.push(data);
                       patient.save(err=>{
                           console.log(err);
                           if(err) res.status(500).send('Error Occurs When save Data');
                           else res.status(200).send({result_set:patient.result_set});
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
    // app.get('/v2/patients/results', patientAuth, (req, res)=>{
    //     if (req.query.context){
    //         // if(!QUESTION_CONTEXT.CONTEXT.includes(req.query.context)){
    //         //     res.status(400).send("Invalid Query Request!");
    //         // }
    //         // else {
    //         res.status(200).send(req.user.result_set[req.query.context])
    //         //}
    //     } else {
    //         res.status(200).send(req.user.result_set)
    //     }
    //
    // });

    /**
     * GET a patient's profile via jwt
     *
     * @return {object} Return profile object
     */
    app.get('/v2/patients/profile',patientAuth, (req, res)=>{
        Patient.findById(req.user.id)
            //.populate({path:'question_set',select:'title', match:{private_question: {$ne: true}}})
            .populate({path:'question_set',select:'title'})
            .exec((err,patient)=>{

                if(err) res.status(401).send('Database Error');
                else res.status(200).send({patient});
        });
    });

  /**
   * Get a patient's pain level
   *
   */
  app.get('/v2/patients/:id/pain-level', generalAuth,  (req, res)=>{
    let pain_level_report = [];
    let patient_id = parseInt(req.params.id);
    console.log(patient_id);
    Patient.findById(patient_id)
      .exec( (err, patient)=>{
        if(err)  res.status(500).send("Error Occurs When Query Patient");
        else {
          if(patient) {
            if(patient.result_set){
              for(let result_set of patient.result_set){
                for(let result of result_set.results){
                  //The id of pain level is 8
                  if(result.q_id===8){
                    pain_level_report.push({
                      date: result_set.created_date,
                      pain: result.value,
                    })
                  }
                }
              }
            }
            res.status(200).send({pain_level: pain_level_report});
          }
          else res.status(400).send("Can not Find Target Patient");
        }});
  });



};