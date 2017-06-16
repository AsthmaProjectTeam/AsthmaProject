/**
 * Created by tengzhongwei on 5/24/17.
 */
"use strict";


let Patient = require('../../models/patient-model'),
    jwt_parser = require('../../utils/initiator-auth'),
    jwt  = require('jsonwebtoken');

module.exports = app => {
    /***************** List All Patient *******************/
    app.get('/v1/patient', (req, res)=>{
        Patient.find({}, (err, patients)=>{
            res.status(200).send({patients});
        })
    });

    /***************** Delete All Patient *******************/
    app.delete('/v1/patient', (req, res)=>{
        Patient.remove({},err=>{
            if(err){
                res.status(403).send({err});
            }
            else res.status(200).send("deleted all user")
        })
    });


    /***************** Patient upload results *******************/
    app.post('/v1/patient/:id/result', (req, res)=>{
       let re = [{_id: 11, value:1},{_id: 12, value:2}] //result should be this form
        const result_title = 'my first q set';
        Patient.findOne({username:'patient1'}, (err, patient)=>{
           if(err) res.status(401).send({err});
           else {
               let result_set ={title:result_title, results:re};
               patient.result_set.push(result_set);
               patient.save(err=>{
                   if(err) res.status(401).send({err});
                   else res.status(200).send(patient);
               })
           }
        })
    });

    /***************** GET a patient all results *******************/
    app.get('/v1/patient/:id/result', (req, res)=>{
        Patient.findOne({_id:req.params.id},(err, patient)=>{
            if(err) res.status(401).send({err});
            else res.status(200).send(patient.result_set);
        });
    })




};


