/**
 * Created by tengzhongwei on 6/13/17.
 */

let Initiator                   = require('../../models/initiator-model'),
    initiatorAuth               = require('../../utils/initiator-auth'),
    Joi                         = require('joi'),
    mongoose                    = require('mongoose'),
    filterPrivateInformation    = require('../../utils/filterPrivate'),
    Patient                     = require('../../models/patient-model'),
    QuestionSet                 = require('../../models/question-set-model'),
    bulk_update                 = require('../../service/bulk-update'),
    fs                          = require('fs');

module.exports = async app => {
    /**
     * Get a Initiator's profile
     *
     * @return {object} Return profile object
     */
    app.get('/v2/initiators/profile', initiatorAuth, (req, res)=>{
        Initiator.findById(req.user.id)
            //.populate('patients','first_name last_name date_of_birth mrn question_set')
            .populate({path:'patients', populate:{path:'question_set', select:'title'}, select:'first_name last_name date_of_birth mrn question_set'})
            .exec((err,initiator)=>{
                if(err) res.status(500).send("Internal Database Error");
                else {
                    res.status(200).send({profile:filterPrivateInformation(initiator._doc)});
                }
            });

    });

    /**
     * Update a Initiator Profile
     *
     * @param {req.body.first_name}
     * @param {req.body.last_name}
     * @param {req.body.email}
     * @param {req.body.phone}
     * @return {object} Return profile object
     */
    app.patch('/v2/initiators/profile', initiatorAuth, (req, res)=>{
        let schema = Joi.object().keys({
            first_name: Joi.string().regex(/^[a-zA-Z]+$/).required(),
            last_name:  Joi.string().regex(/^[a-zA-Z]+$/).required(),
            email:      Joi.string().email().required(),
            phone:      Joi.string().regex(/^[0-9]{10}$/).required(),
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Initiator.findByIdAndUpdate(req.user.id, {$set:data}, (err, initiator)=>{
                    if(err) {res.status(500).send({err})}
                    else{
                        if(initiator){
                            res.status(200).send(filterPrivateInformation({profile:initiator._doc}));
                        }
                        else {
                            res.status(400).send("Initiator doesn't exist")
                        }
                    }
                })
            }
        });
    });

    /**
     * Append/Add patients to Initiator
     *
     * @param {req.body.patients_id} list of id of patients
     * @return {object} Return success
     */
    app.patch('/v2/initiators/patients/add',initiatorAuth,(req, res)=>{
        let schema = Joi.object().keys({
            patients_id:Joi.array().items(Joi.number()).min(1).required(),
        });
        Joi.validate(req.body, schema, (err, data) =>{
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                bulk_update.addPatient(data.patients_id, req,res);
            }
        })
    });

    /**
     * Initiator append list of questions set to list of patients
     *
     * @param {req.body.patient_id} id of patient
     * @param {req.body.q_id} id of question set
     * @return {object} Return success
     */
    app.patch('/v2/initiators/patients/question-set', initiatorAuth, (req,res)=>{
        let schema = Joi.object().keys({
            patient_list: Joi.array().items(Joi.number()).required().min(1),
            q_list      : Joi.array().items(Joi.number()).required().min(1),
        });
        Joi.validate(req.body, schema, (err, data)=>{
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                bulk_update.addQuestionSet(req,res, data);
            }
        })


    });

    /**
     * Create a new patient in database
     *
     * @param {req.body.first_name}
     * @param {req.body.last_name}
     * @param {req.body.mrn}
     * @param {req.body.date_of_birth}
     * @return {200, {patient}} Return updated patient profile
     */
    app.post('/v2/initiators/patients/new', initiatorAuth, (req, res)=>{
        let schema = Joi.object().keys({
            first_name:         Joi.string().regex(/^[a-zA-Z]*$/).required(),
            last_name:          Joi.string().regex(/^[a-zA-Z]*$/).required(),
            mrn:                Joi.string().required(),
            date_of_birth:      Joi.date().required(),
        });
        Joi.validate(req.body, schema, (err,data)=>{
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                data.first_name = data.first_name.toLowerCase();
                data.last_name  = data.last_name.toLowerCase();
                let patient = new Patient(data);
                patient.save(err=>{
                    console.log(err);
                    if(err) res.status(500).send('Error occurs when save data');
                    else {
                        res.status(200).send({patient});
                    }
                });

            }
        });
    });

    /**
     * Initiator update a patient profile.
     */
    app.patch('/v2/initiators/patients/:id/profile', initiatorAuth, (req,res)=>{
        let schema = Joi.object().keys({
            first_name:         Joi.string().regex(/^[a-zA-Z]*$/).required(),
            last_name:          Joi.string().regex(/^[a-zA-Z]*$/).required(),
            mrn:                Joi.string().required(),
            date_of_birth:      Joi.date().required(),
        });
        Joi.validate(req.body, schema, (err,data)=>{
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Patient.findById(req.params.id, (err, patient)=>{
                   if(err)  res.status(500).send('Error occurs when query patient');
                   else{
                       if(patient){
                           patient.first_name = data.first_name;
                           patient.last_name = data.last_name;
                           patient.mrn = data.mrn;
                           patient.date_of_birth = data.date_of_birth;
                           patient.save(err=>{
                               if(err) res.status(500).send('Error occurs when save data');
                               else res.status(200).send({patient});
                           })
                       }
                       else  res.status(400).send('Patient does not exist');
                   }
                });
            }
        });
    });

    /**
     * Initiator remove a patient
     */
    app.delete('/v2/initiators/patients/:id', initiatorAuth, (req, res)=>{
       const patient_id = parseInt(req.params.id);
       Initiator.findById(req.user.id,(err, initiator)=>{
          if(err) res.status(500).send("Error Occurs When Query Initiator");
          else {
              if(initiator){
                  let i=0;
                  while(i<initiator.patients.length){
                    if(initiator.patients[i]===patient_id){
                        initiator.patients.splice(i,1);
                    } else i++;
                  }
                  initiator.save(err=>{
                      if(err) res.status(500).send("Error Occurs When Query Initiator");
                      else res.status(200).send({profile:initiator});
                  })

              }
              else res.status(400).send("Can not Find Target Initiator");
          }
       });
    });

    /**
     * Initiator delete a patient's question set
     */
    app.delete('/v2/initiators/patients/:id/question-set', initiatorAuth, (req, res)=>{
        const patient_id = parseInt(req.params.id);
        let schema = Joi.object().keys({
            q_list      : Joi.array().items(Joi.number()).required().min(1),
        });
        Joi.validate(req.body, schema, (err, data)=> {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Initiator.findById(req.user.id, (err, initiator)=>{
                    if(err) res.status(500).send("Error Occurs When Query Initiator");
                    else {
                        if(initiator) {
                            if(!initiator.patients.includes(patient_id)){
                                res.status(403).send("You can not access this patient");
                            }
                            else {
                                Patient.findById(patient_id, (err, patient)=>{
                                    if(err)  res.status(500).send("Error Occurs When Query Patient");
                                    else {
                                        if(patient){
                                            for(let q_id of data.q_list){
                                                let index = patient.question_set.indexOf(q_id);
                                                if(index !== -1){
                                                    patient.question_set.splice(index,1);
                                                }
                                            }
                                            patient.save(err=>{
                                                if(err) res.status(500).send("Error Occurs When Save Data");
                                                else res.status(200).send({patient});
                                            })

                                        }
                                        else res.status(400).send("Can not Find Target Patient");
                                    }
                                });
                            }
                        }
                        else res.status(400).send("Can not Find Target Initiator");
                    }
                })
            }
        });

    });

    /**
     * Initiator get a patient's(under his patients list) detailed profile
     */
    app.get('/v2/initiators/patients/:id/profile', initiatorAuth, (req, res)=>{
        const patient_id = parseInt(req.params.id);
        Initiator.findById(req.user.id, (err, initiator)=> {
            if (err) res.status(500).send("Error Occurs When Query Initiator");
            else {
                if (initiator) {
                    if (!initiator.patients.includes(patient_id)) {
                        res.status(403).send("You can not access this patient");
                    }
                    else{
                         Patient.findById(patient_id)
                                .populate('question_set','title')
                                .exec( (err, patient)=>{
                                    if(err)  res.status(500).send("Error Occurs When Query Patient");
                                    else {
                                        if(patient) {
                                            res.status(200).send({profile:patient});
                                        }
                                        else res.status(400).send("Can not Find Target Patient");
                                }});
                    }
                }
            }
        });
    });

    /**
     * Initiator answer a patient's(under his patients list) question set
     */
    app.post('/v2/initiators/patients/:id/results', initiatorAuth, (req, res)=>{
        const schema = Joi.object().keys({
            app:        Joi.string().required(),
            results:    Joi.array().items({
                q_id:   Joi.number().required(),
                value: Joi.any().required(),
            }).min(1).required(),
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                const patient_id = parseInt(req.params.id);
                Initiator.findById(req.user.id, (err, initiator)=> {
                    if (err) res.status(500).send("Error Occurs When Query Initiator");
                    else {
                        if (initiator) {
                            if (!initiator.patients.includes(patient_id)) {
                                res.status(403).send("You can not access this patient");
                            }
                            else{
                                Patient.findById(patient_id)
                                    .exec( (err, patient)=>{
                                        if(err)  res.status(500).send("Error Occurs When Query Patient");
                                        else {
                                            if(patient) {
                                                patient.result_set.push(data);
                                                patient.save(err=>{
                                                    if(err) res.status(500).send('Error Occurs When save Data');
                                                    else res.status(200).send({result_set:patient.result_set});
                                                });
                                            }
                                            else res.status(400).send("Can not Find Target Patient");
                                        }});
                            }
                        }
                    }
                });
            }
        });
    })

    /**
     * Initiator query a patient
     */
    app.post('/v2/initiators/patients/query', initiatorAuth, (req, res)=>{
        const schema = Joi.object().keys({
            first_name: Joi.string(),
            last_name:  Joi.string(),
        }).min(1);

        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                if(data.first_name && data.last_name){
                    Patient.find({first_name:data.first_name,last_name:data.last_name},(err,patients)=>{
                        if(err){
                            res.status(500).send({err:"Error Occured when query patient"});
                        }
                        else {
                            res.status(200).send({patients});
                        }
                    } )
                }
                else{
                    if(data.first_name){
                        Patient.find({first_name:data.first_name},(err,patients)=>{
                            if(err){
                                res.status(500).send({err:"Error Occured when query patient"});
                            }
                            else {
                                res.status(200).send({patients});
                            }
                        } )
                    }
                    else {
                        Patient.find({last_name:data.last_name},(err,patients)=>{
                            if(err){
                                res.status(500).send({err:"Error Occured when query patient"});
                            }
                            else {
                                res.status(200).send({patients});
                            }
                        } )
                    }
                }

            }
        });
    })


};
