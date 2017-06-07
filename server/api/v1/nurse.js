"use strict";


let Nurse                      = require('../../models/nurse'),
    jwt_parser                  = require('../../utils/auth'),
    jwt                         = require('jsonwebtoken'),
    Question                    = require('../../models/backup/question'),
    Joi                         = require('joi'),
    mongoose                    = require('mongoose'),
    filterPrivateInformation    = require('../../utils/filterPrivate'),
    Patient                     = require('../../models/patient');

module.exports = app => {

    /***************** Show All Nurse *******************/
    app.get('/v1/nurse', (req, res)=>{
        Nurse.find({}, (err, Nurses)=>{
            console.log(err);
            res.status(200).send({Nurses});
        })
    });

    /***************** Delete All Nurse *******************/
    app.delete('/v1/nurse', (req, res)=>{
        Nurse.remove({}, (err)=>{
            res.status(200).send("delete success");
        })
    });


    /***************** Nurse Add new Question *******************/
    app.post('/v1/nurse/question', (req, res)=>{
        Nurse.findOne({username:"test"},(err, Nurse)=>{
            let question = new Question(req.body);
            question.author = Nurse;
            question.save((err)=>{
                if(err) return res.status(404).send({err});
                res.status(200).send({question});
            });
        });
    });

    // /***************** Nurse list all Question *******************/
    // app.get('/v1/Nurse/question', (req, res)=>{
    //     Question
    //         .find({})
    //         .populate('author','username')
    //         .exec(
    //             (err, questions)=>{
    //                 res.status(200).send({questions});
    //             }
    //         )
    // });
    //
    //
    // /***************** Nurse delete Question *******************/
    // app.delete('/v1/Nurse/question', (req,res)=>{
    //     Question.remove({}, err=>{
    //         if(err) res.status(403).send({err});
    //         Question.find({}, (err, questions)=>{
    //             res.status(200).send({questions});
    //         });
    //     })
    // });

    /***************** New *******************/
    /***************** New *******************/
    /***************** New *******************/
    /***************** New *******************/

    /***************** Get a Nurse's profile *******************/
    app.get('/v1/nurse/:id/profile', jwt_parser, (req, res)=>{
        if(req.params.id!=req.user._id) res.status(403).send('You can not access this');
        else{
            Nurse.findOne({_id:req.params.id})
                .populate('patients','_id username')
                .exec((err,Nurse)=>{
                    if(err) res.status(500).send("Internal Database Error");
                    else {
                        res.status(200).send(filterPrivateInformation(Nurse._doc));
                    }
                });
        }
    });

    /***************** Update Nurse Profile *******************/
    app.patch('/v1/nurse/:id/profile', jwt_parser, (req, res)=>{
        //TODO: Nurse should have access to their patient. Patients themselvies can access
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
                Nurse.findByIdAndUpdate(req.params.id, {$set:data}, (err, Nurse)=>{
                    if(err) {res.status(500).send({err})}
                    else{
                        if(Nurse){
                            res.status(200).send(filterPrivateInformation(Nurse._doc));
                        }
                        else {
                            res.status(400).send("Nurse doesn't exist")
                        }
                    }
                })
            }
        });
    });

    /***************** Append a patient to Nurse *******************/
    app.post('/v1/nurse/:id/patients/add',jwt_parser,(req, res)=>{
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
                                Nurse.findById(req.params.id, (err, nurse)=>{
                                    if(!err){

                                        if(!nurse.patients.includes(patient._id)){
                                            nurse.patients.push(patient);
                                        }
                                        if(!patient.nurses.includes(nurse._id)){
                                            patient.nurses.push(nurse);
                                        }
                                        patient.save();
                                        nurse.save();
                                        res.status(200).send(filterPrivateInformation(nurse._doc));
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




    // /***************** Get a Nurse's questions *******************/
    // app.get('/v1/Nurse/:id/questions', jwt_parser, (req, res)=>{
    //     Nurse.findOne({_id:req.params.id})
    //         .exec((err,Nurse)=>{
    //             if(err) res.status(500).send("Internal Database Error");
    //             else {
    //
    //             }
    //         });
    //
    //     if(String(req.user._id) != String(req.params.id)){
    //         res.status(403).send('You can not access this');
    //     }
    //     Question.find({author:req.user._id})
    //             .exec((err, questions)=>{
    //                 if(err) res.status(500).send("Internal Database Error");
    //                 res.status(200).send({questions});
    //             })
    // })



};


