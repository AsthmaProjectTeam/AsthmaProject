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
    QuestionSet         = require('../../models/question-set-model'),
    generalAuth         = require('../../utils/general-auth');

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
       const schema = Joi.object().keys({
           app:         Joi.string().required(),
           type:        Joi.string().required(),
           description: Joi.string().required(),
           options: Joi.array().items({
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
               Initiator.findById(req.user.id, (err,initiator)=>{
                   if(err) res.status(500).send('Error Occur when find initiator');
                   let question = Question(data);
                   question.author = initiator;
                   question.save( err=>{
                       if(err) res.status(500).send('Error Occur when save question');
                       else {
                           res.status(200).send({question});
                       }
                   })
               });


           }
       })
    });

    /**
     * Query a question
     *
     * @param {req.query.id} Application this question below to
     * @return {200, {question }} Return created question
     */
    app.get('/v2/questions/', generalAuth, (req, res)=>{
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
        const schema = Joi.object().keys({
                app: Joi.string().required(),
                title: Joi.string().required(),
                //private_question: Joi.boolean().required(),
                content: Joi.array().items(
                    Joi.object().keys({
                        question:       Joi.number().required(),
                        end_question:   Joi.boolean().required(),
                        next_question: Joi.array().items(
                            Joi.object().keys({
                                question_id:  Joi.number().required(),
                                prerequisite: Joi.object().keys({
                                    option:   Joi.string(),
                                    value:    Joi.number(),
                                    interval: Joi.object().keys({
                                        greater_than: {type: Joi.number().required()},
                                        less_than: {type: Joi.number().required()},
                                        left_close: {type: Joi.boolean().required()},
                                        right_close: {type: Joi.boolean().required()},
                                    }),
                                    greater_than: Joi.object().keys({
                                        value:        {type:Joi.number()},
                                        include_value:{type:Joi.boolean().required()},
                                    }),
                                    less_than:    Joi.object().keys({
                                        value:        {type:Joi.number()},
                                        include_value:{type:Joi.boolean().required()},
                                    }),
                                    all:    Joi.boolean(),
                                }).length(1).required(),
                            })
                        ).required(),
                    })),
            }
        );
        Joi.validate(req.body, schema, (err, data)=>{
            if (err) {
                const message = err.details[0].message;
                res.status(400).send({error: message});
            } else {
                Initiator.findById(req.user.id, (err,initiator)=> {
                    if (err) res.status(500).send('Error Occur when find initiator');
                    else {
                        let question_set = QuestionSet(data);
                        question_set.author = initiator;
                        question_set.save( err=>{
                            if(err) res.status(500).send('Error Occur when save question set');
                            else {
                                question_set.author = null;
                                res.status(200).send({question_set});
                            }
                        })
                    }
                });


            }
        });
    });

    /**
     * GET a Question Set by ID
     *
     * @param {req.params.id} Array of question flow
     * @return {200, {username,token}} Return username and json web token
     */
    app.get('/v2/question-set/:id', generalAuth,(req,res)=>{
       const id = req.params.id;
       QuestionSet.findById(id)
           .populate('content.question')
           .exec((err, question_set)=>{
               if(err) res.status(500).send('Internal Database Error');
               else {
                   if(question_set){
                       res.status(200).send({question_set});
                   }
                   else res.status(400).send('question set does not exist');
               }
           });


    });







};