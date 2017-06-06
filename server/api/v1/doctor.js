"use strict";


let Doctor                      = require('../../models/doctor'),
    jwt_parser                  = require('../../utils/auth'),
    jwt                         = require('jsonwebtoken'),
    Question                    = require('../../models/question'),
    Joi                         = require('joi'),
    mongoose                    = require('mongoose'),
    filterPrivateInformation    = require('../../utils/filterPrivate'),
    Patient                     = require('../../models/patient');

module.exports = app => {

    /***************** Show All doctor *******************/
    app.get('/v1/doctor', (req, res)=>{
        Doctor.find({}, (err, doctors)=>{
            console.log(err);
            res.status(200).send({doctors});
        })
    });

    /***************** Delete All doctor *******************/
    app.delete('/v1/doctor', (req, res)=>{
        Doctor.remove({}, (err)=>{
            res.status(200).send("delete success");
        })
    });


    /***************** Doctor Add new Question *******************/
    app.post('/v1/doctor/question', (req, res)=>{
        Doctor.findOne({username:"test"},(err, doctor)=>{
            let question = new Question(req.body);
            question.author = doctor;
            question.save((err)=>{
                if(err) return res.status(404).send({err});
                res.status(200).send({question});
            });
        });
    });

    /***************** Doctor list all Question *******************/
    app.get('/v1/doctor/question', (req, res)=>{
        Question
            .find({})
            .populate('author','username')
            .exec(
                (err, questions)=>{
                    res.status(200).send({questions});
                }
            )
    });


    /***************** Doctor delete Question *******************/
    app.delete('/v1/doctor/question', (req,res)=>{
        Question.remove({}, err=>{
            if(err) res.status(403).send({err});
            Question.find({}, (err, questions)=>{
                res.status(200).send({questions});
            });
        })
    });

    /***************** New *******************/
    /***************** New *******************/
    /***************** New *******************/
    /***************** New *******************/

    /***************** Get a doctor's profile *******************/
    app.get('/v1/doctor/:id/profile', jwt_parser, (req, res)=>{
        if(req.params.id!=req.user._id) res.status(403).send('You can not access this');
        else{
            Doctor.findOne({_id:req.params.id})
                .populate('patients','_id username')
                .exec((err,doctor)=>{
                    if(err) res.status(500).send("Internal Database Error");
                    else {
                        res.status(200).send(filterPrivateInformation(doctor._doc));
                    }
                });
        }
    });

    /***************** Update Doctor Profile *******************/
    app.patch('/v1/doctor/:id/profile', jwt_parser, (req, res)=>{
        //TODO: Doctor should have access to their patient. Patients themselvies can access
        //TODO: Currently, we allow any user to update profile
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
                Doctor.findByIdAndUpdate(req.params.id, {$set:data}, (err, doctor)=>{
                    if(err) {res.status(500).send({err})}
                    else{
                        if(doctor){
                            res.status(200).send(filterPrivateInformation(doctor._doc));
                        }
                        else {
                            res.status(400).send("doctor doesn't exist")
                        }
                    }
                })
            }
        });
    });

    /***************** Append a patient to Doctor *******************/
    app.post('/v1/doctor/:id/patient/add',jwt_parser,(req, res)=>{
        if(req.params.id != req.user._id) res.status(403).send('You can not access this');
        else{
            let schema = Joi.object().keys({
                patient_id: Joi.string().regex(/^[0-9]+$/).required()
            });
            Joi.validate(req.body, schema, (err, data) =>{
                if (err) {
                    const message = err.details[0].message;
                    res.status(400).send({error: message});
                } else {
                    Patient.findOne({_id:data.patient_id})
                        .exec( (err,patient)=>{
                        if(!err){
                            if(patient){
                                Doctor.findById(req.params.id, (err, doctor)=>{
                                    if(!err){
                                        if(!doctor.patients.includes(patient._id)){
                                            doctor.patients.push(patient);
                                        }
                                        if(!patient.doctors.includes(doctor._id)){
                                            patient.doctors.push(doctor);
                                        }
                                        patient.save();
                                        doctor.save();
                                        res.status(200).send(filterPrivateInformation(doctor._doc));
                                    }
                                    else res.status(500).send({err})
                                })
                            }
                            else res.status(400).send("patient doesn't exist")
                        }
                        else res.status(500).send({err})
                    })
                }
            })
        }
    });




    /***************** Get a doctor's questions *******************/
    app.get('/v1/doctor/:id/questions', jwt_parser, (req, res)=>{
        Doctor.findOne({_id:req.params.id})
            .exec((err,doctor)=>{
                if(err) res.status(500).send("Internal Database Error");
                else {

                }
            });

        if(String(req.user._id) != String(req.params.id)){
            res.status(403).send('You can not access this');
        }
        Question.find({author:req.user._id})
                .exec((err, questions)=>{
                    if(err) res.status(500).send("Internal Database Error");
                    res.status(200).send({questions});
                })
    })



};


