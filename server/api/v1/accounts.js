/**
 * Created by tengzhongwei on 6/1/17.
 */
"use strict";
let Initiator           = require('../../models/initiator-model'),
    nurse_jwt_parser       = require('../../utils/initiator-auth'),
    jwt              = require('jsonwebtoken'),
    Joi              = require('joi'),
    Patient          = require('../../models/patient-model');

function filterPrivateInformation(data) {
    const secret= ['hash', 'salt'];
    const filtered = Object.keys(data)
        .filter(key => !secret.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    return filtered;
}


module.exports = app => {
    /***************** Create nurse Account *******************/
    app.post('/v1/accounts/nurse', (req, res) => {
        let schema = Joi.object().keys({
            username:   Joi.string().alphanum().min(5).max(10).required(),
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
                let nurse = new Initiator(data);
                //nurse._id = nurse.username;
                nurse.save((err)=>{
                    if(err){
                        res.status(400).send({err});
                    }
                    else {
                        const token = jwt.sign(nurse, process.env.SECRET_KEY, {
                            expiresIn:"10h"
                        });
                        res.status(200).send({nurse: nurse.username, token:token});
                    }
                });
            }
        });
    });

    /***************** Create Patient *******************/
    app.post('/v1/accounts/patient', jwt_parser, (req, res) => {
        let schema = Joi.object().keys({
            username:   Joi.string().alphanum().min(5).max(10).required(),
            first_name: Joi.string().regex(/^[a-zA-Z]*$/).required(),
            last_name:  Joi.string().regex(/^[a-zA-Z]*$/).required(),
            password:   Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email:      Joi.string().email(),
            phone:      Joi.string().regex(/^[0-9]{10}$/)
        });

        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                let patient = new Patient(data);
                patient.save((err)=>{
                    if(err){
                        res.status(400).send({err});
                    }
                    else {
                        res.status(200).send({patient: patient.username});
                    }
                });
            }
        });
    });

    /***************** nurse Login with Token *******************/
    app.post('/v1/oauth2/nurse/token', (req, res) => {
        let schema = Joi.object().keys({
            username:   Joi.string().alphanum().min(5).max(10).required(),
            password:   Joi.string().required(),
        });
        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Initiator.findOne({"username":req.body.username},(err, user)=>{
                    if(err){
                        res.status(500).send('Internal Error with Database');
                    }
                    else {
                        if(user){
                            if(user.authenticate(req.body.password)){
                                const token = jwt.sign(user, process.env.SECRET_KEY, {
                                    expiresIn:60*10*1000
                                });
                                //es.cookie('token',token,{ maxAge: 60*10*1000, path:'/'});
                                res.status(200).send({username:user.username, id:user._id, token});
                            }
                            else {
                                res.status(401).send('password incorrect');
                            }
                        }
                        else {
                            res.status(401).send('user '+req.params.username+' doesnt exist');
                        }
                    }
                });
            }
        });
    });

    /***************** Create Patient Account Via QRCode+UDID. Must have nurse Permission *******************/
    app.post('/v1/accounts/patient', nurse_jwt_parser, (req, res) => {
        let schema = Joi.object().keys({
            uuid:Joi.string().guid({version: ['uuidv4', 'uuidv5']}),
        });

        Joi.validate(req.body, schema, (err, data) => {
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                let patient = new Patient(data);
                patient.save((err)=>{
                    if(err){
                        res.status(400).send({err});
                    }
                    else {
                        res.status(200).send({patient: patient.username});
                    }
                });
            }
        });
    });


};