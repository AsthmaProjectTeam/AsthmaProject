/**
 * Created by tengzhongwei on 6/7/17.
 */

"use strict";
let Initiator           = require('../../models/initiator-model'),
    initiatorAuth       = require('../../utils/initiator-auth'),
    jwt                 = require('jsonwebtoken'),
    Joi                 = require('joi'),
    Patient             = require('../../models/patient-model'),
    tempAuth            = require('../../utils/temp-auth');

module.exports = app => {

    /**
     * Create a Initiator
     *
     * @param {req.body.username} Display name of the new user
     * @param {req.body.first_name} First name of the user
     * @param {req.body.last_name} Last name of the user
     * @param {req.body.phone} Phone number of the user
     * @param {req.body.email} Email address of the user
     * @param {req.body.password} Password for the user
     * @return {200, {username,token}} Return username and json web token
     */
    app.post('/v2/accounts/initiators', (req, res) => {
        let schema = Joi.object().keys({
            username:   Joi.string().alphanum().min(3).max(10).required(),
            first_name: Joi.string().regex(/^[a-zA-Z]+$/).required(),
            last_name:  Joi.string().regex(/^[a-zA-Z]+$/).required(),
            password:   Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email:      Joi.string().email().required(),
            phone:      Joi.string().regex(/^[0-9]{10}$/).required(),
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                let initiator = new Initiator(data);
                initiator.save((err)=>{
                    if(err){
                        res.status(500).send('Internal Database Error');
                    }
                    else {
                        const token = jwt.sign({id:initiator._id, role:initiator.role}, process.env.SECRET_KEY, {
                            expiresIn:"10h"
                        });
                        res.status(200).send({username: initiator.username, token:token});
                    }
                });
            }
        });
    });

    /**
     * Initiator Login
     *
     * @param {req.body.username} Username for authentication
     * @param {req.body.password} Password for authentication
     * @return {200, {patient}} Return updated patient profile
     */
    app.post('/v2/accounts/initiators/login',(req, res) => {
        let schema = Joi.object().keys({
            username:   Joi.string().alphanum().min(3).max(10).required(),
            password:   Joi.string().required(),
        });

        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Initiator.findOne({"username":req.body.username},(err, user)=>{
                    if(err) res.status(500).send('Internal Error with Database');
                    else {
                        if(user){
                            if(user.authenticate(req.body.password)){
                                const token = jwt.sign({id:user._id, role:user.role}, process.env.SECRET_KEY, {
                                    expiresIn:'10h'
                                });
                                res.status(200).send({username:user.username, id:user._id, token});
                            }
                            else res.status(401).send('password incorrect');
                        }
                        else res.status(401).send('user '+req.params.username+' doesnt exist');
                    }
                });
            }
        });
    });

    /**
     * Initiator create a temp token for patient registration
     *
     * @return {200, {token}} Return token for registration. token will expire in 30 seconds
     */
    app.get('/v2/accounts/patients/:id/register/temp-token', initiatorAuth, (req,res)=>{
       const temp_user = {
           initiator_id :  req.user.id,
           role:        "temp",
           patient_id:  req.params.id,
       };
       const token = jwt.sign(temp_user, process.env.SECRET_KEY, {
           expiresIn: '1h',
       });
       res.status(200).send({token});
    });

    /**
     * Register Patient's phone to database(connected phone with profile in database via QRCode).
     *
     * @param {req.body.uuid} new UUID of Patient
     * @return {token} Return json web token
     */
    app.patch('/v2/accounts/patients/register', tempAuth, (req, res)=>{
        const initiator_id      = req.user.initiator_id;
        const patient_id       = req.user.patient_id;
        let schema = Joi.object().keys({
            uuid:Joi.string().guid({
                version: [
                    'uuidv4',
                    'uuidv5'
                ]})
        });
        Joi.validate(req.body, schema, (err,data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Patient.findById(patient_id,(err, patient)=>{
                    if(err) res.status(500).send('Internal Error with Database');
                    else {
                        if(patient){
                            Initiator.findById(initiator_id, (err, initiator)=>{
                                if(err) res.status(500).send('Internal Error with Database');
                                else{
                                    if(initiator){
                                        patient.uuid =  data.uuid;
                                        if(!patient.initiators.includes(initiator_id)){
                                            patient.initiators.push(initiator);
                                        }
                                        if(!initiator.patients.includes(patient_id)){
                                            initiator.patients.push(patient);
                                        }
                                        patient.save((err)=>{
                                            if(err) res.status(500).send('Errors when save patient');
                                            else {
                                                initiator.save((err)=>{
                                                    if(err) res.status(500).send('Patient saved but failed to save initiators');
                                                    else {
                                                        const token = jwt.sign({id:patient_id,role:'patient'}, process.env.SECRET_KEY, {
                                                            expiresIn: "12h",
                                                        });
                                                        res.status(200).send({token});
                                                    }
                                                })
                                            }
                                        })

                                    }
                                    else res.status(400).send("Wrong Initiator ID");
                                }
                            });
                        }
                        else res.status(400).send("Wrong Patient ID");
                    }
                });
            }
        })
    });

    /**
     * Create a Patient account
     *
     * @param {req.body.uuid} Unique uuid of the user
     * @param {req.user.username} Username of the Initiator who generate the temp token
     * @return {200, {token}} Return json web token
     */
    // app.post('/v2/accounts/patients/register', tempAuth, (req,res)=>{
    //     let schema = Joi.object().keys({
    //         uuid:Joi.string().guid({
    //             version: [
    //                 'uuidv4',
    //                 'uuidv5'
    //             ]})
    //     });
    //     Joi.validate(req.body, schema, (err,data) =>{
    //         if (err) {
    //             const message = err.details[0].message;
    //             res.status(400).send({error: message});
    //         } else {
    //             const initiator_username = req.user.username;
    //             Initiator.findOne({username:initiator_username}, (err, initiator)=>{
    //                 if(err) res.status(500).send({err});
    //                 else {
    //                     Patient.findOne({uuid:data.uuid}, (err,patient)=>{
    //                         if(err) res.status(500).send('Internal Database Error');
    //                         else {
    //
    //                             if(patient){
    //                                 res.status(400).send('Duplicate Patient');
    //                             }
    //                             else {
    //                                 let patient = new Patient(data);
    //                                 patient.initiators.push(initiator);
    //                                 patient.save((err)=>{
    //                                     if(err) res.status(500).send('Internal Database Error');
    //                                     else{
    //                                         //TODO: May exist atomic update problem
    //                                         initiator.patients.push(patient);
    //                                         initiator.save(err=>{
    //                                             if(err) res.status(500).send({err});
    //                                             else{
    //                                                 const token = jwt.sign(patient, process.env.SECRET_KEY, {
    //                                                     expiresIn: "365d",
    //                                                 });
    //                                                 res.status(200).send({token});
    //                                             }
    //                                         })
    //                                     }
    //                                 });
    //                             }
    //                         }
    //                     });
    //                 }
    //             })
    //         }
    //     })
    // });
};