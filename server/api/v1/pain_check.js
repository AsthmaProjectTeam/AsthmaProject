/**
 * Created by tengzhongwei on 6/2/17.
 */
"use strict";

let Nurse                      = require('../../models/nurse'),
    jwt_parser                  = require('../../utils/auth'),
    jwt                         = require('jsonwebtoken'),
    Question                    = require('../../models/backup/question'),
    Joi                         = require('joi'),
    mongoose                    = require('mongoose'),
    Patient                     = require('../../models/patient'),
    PainCheck                   = require('../../models/pain_check'),
    export_xlsx                 = require('../../utils/export_xlsx');

module.exports = app => {
    /***************** test: create a check result *******************/
    app.post('/v1/test/pain-check/create',(req, res)=>{
        const example = {
            patient:    12,
            nurse:      2,
            pain_level: 3,
            context:    "after physical therapy",
        };

        let pain_check = new PainCheck(example);
        pain_check.save();
        res.status(200).send({pain_check});
    });

    /***************** create a check result *******************/
    app.post('/v1/pain-check/create', (req, res)=> {
        let schema = Joi.object().keys({
            patient: Joi.number().required(),
            nurse: Joi.number().required(),
            pain_level: Joi.number().min(0).max(10).required(),
            context: Joi.string().required(),
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Nurse.findById(data.nurse, (err,nurse)=>{
                    if(!err){
                        if (nurse){
                            Patient.findById(data.patient,(err,patient)=>{
                                if(!err){
                                    if(patient){
                                        let pain_check = new PainCheck(data);
                                        pain_check.save();
                                        res.status(200).send({pain_check});
                                    }
                                    else res.status(400).send("INVALID PATIENT INFORMATION")
                                }
                                else res.status(500).send('DATABASE ERROR');
                            })
                        }
                        else res.status(400).send("INVALID NURSE INFORMATION")

                    }
                    else res.status(500).send('DATABASE ERROR');
                });
            }
        });
    });

    /***************** get all check result *******************/
    app.get("/v1/test/pain-check", (req, res)=>{
       PainCheck.find({})
           .populate('nurse','username')
           .populate('patient','username')
           .exec( (err, results)=>{
               if(err) res.status(400).send({err});
                else res.status(200).send(results);
            });
    });

    /***************** Export all record of patients to Excel *******************/
    app.get("/v1/test/pain-check/export", (req, res)=>{
        PainCheck.find({})
            .populate('nurse','username')
            .populate('patient','username')
            .exec( (err, results)=>{
                if(err) res.status(400).send({err});
                else {
                    const data = results.map(result =>{
                       return {
                           patient: result.patient.username,
                           nurse: result.nurse.username,
                           pain_level: result.pain_level,
                           context: result.context
                       }
                    });
                    export_xlsx(data);
                    res.status(200).send(data);
                }
            });
    });

    /***************** test: Send a pain check to a patient *******************/

};
