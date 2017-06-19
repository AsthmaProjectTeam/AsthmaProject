/**
 * Created by tengzhongwei on 6/16/17.
 */
"use strict";
let Initiator           = require('../../models/initiator-model'),
    initiatorAuth       = require('../../utils/initiator-auth'),
    jwt                 = require('jsonwebtoken'),
    Joi                 = require('joi'),
    Patient             = require('../../models/patient-model'),
    tempAuth            = require('../../utils/temp-auth'),
    Question            = require('../../models/question-model'),
    QuestionSet         = require('../../models/question-set-model');

module.exports = app => {
    /**
     * Initiator Create a Question
     *
     * @param {req.body.app} Application this question below to
     * @param {req.body.type} Type of this question
     * @param {req.body.description} Description of this question
     * @param {req.body.options} Options of this question(only exist when)
     * @return {200, {question }} Return created question
     */
    app.post('/v2/questions/create', initiatorAuth, (req, res)=>{
       const initiator = req.user;
       const schema = Joi.object().keys({
           app:         Joi.string().required(),
           type:        Joi.string().required(),
           description: Joi.string.required(),
           options: Joi.object().keys({
                key:    Joi.string().required(),
                value:  Joi.string().required(),
               }
           ),
       });
       Joi.validate(req.body, schema, (err, data)=>{
           if (err) {
               const message = err.details[0].message;
               res.status(400).send({error: message});
           } else {
               let question = Question(data);
               question.author = initiator;
               question.save( err=>{
                 if(err) res.status(500).send('Internal Database Error');
                 else {
                     res.status(200).send({question});
                 }
               })
           }
       })
    });

    /**
     * Query a question
     *
     * @param {req.query.id} Application this question below to
     * @return {200, {question }} Return created question
     */
    app.get('/v2/questions/', initiatorAuth, (req, res)=>{
        const id = req.query.id;
        if(id){
            Question.findById(id, (err, question)=>{
                if(err) res.status(500).send('Internal Database Error');
                else {
                    res.status(200).send({question});
                }
            });
        }
        else {
            Question.find({}, (err, questions)=>{
                if(err) res.status(500).send('Internal Database Error');
                else {
                    res.status(200).send({questions});
                }
            });
        }
    });

    /**
     * Create a Question Set
     *
     * @param {req.body.content} Array of question flow
     * @return {200, {username,token}} Return username and json web token
     */
    app.post('/v2/question-set/create', initiatorAuth, (req,res)=>{
        const initiator = req.user;
        const schema = Joi.object.keys({
                content: Joi.array().items(
                    Joi.object.keys({
                        question:       Joi.number(),
                        end_question:   Joi.boolean().required(),
                        next_question: Joi.array().items(
                            Joi.object().keys({
                                question_id:  Joi.number.required(),
                                prerequisite: Joi.object.keys({
                                    option:   Joi.string(),
                                    value:    Joi.number(),
                                    interval: Joi.object.keys({
                                        range: {type: [Joi.number()].length(2)},
                                        left_close: {type: Joi.boolean().required()},
                                        right_close: {type: Joi.boolean().required()},
                                    }),
                                    greater_than: Joi.object.keys({
                                        value:        {type:Joi.number()},
                                        include_value:{type:Joi.boolean().required()},
                                    }),
                                    less_than:    Joi.object.keys({
                                        value:        {type:Joi.number()},
                                        include_value:{type:Joi.boolean().required()},
                                    }),
                                }).length(1),
                            })
                        ),
                    })),
            }
        );
        Joi.validate(req.body, schema, (err, data)=>{
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                let question_set = QuestionSet(data);
                question_set.author = initiator;
                question_set.save( err=>{
                    if(err) res.status(500).send('Internal Database Error');
                    else {
                        res.status(200).send({question_set});
                    }
                })
            }
        });
    });

    /**
     * GET a Question Set by ID
     *
     * @param {req.params.id} Array of question flow
     * @return {200, {username,token}} Return username and json web token
     */
    app.get('/v2/question-set/:id', initiatorAuth, (req,res)=>{
       const id = req.params.id;
       QuestionSet.findById(id, (err, question_set)=>{
           if(err) res.status(500).send('Internal Database Error');
           else {
               if(question_set){
                   res.status(200).send({question_set});
               }
               else res.status(400).send('question set does not exist');
           }
       })
    });

};