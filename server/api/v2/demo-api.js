/**
 * Created by tengzhongwei on 6/27/17.
 */
/**
 * Created by tengzhongwei on 6/13/17.
 */
let Initiator                   = require('../../models/initiator-model'),
    initiatorAuth               = require('../../utils/initiator-auth'),
    Joi                         = require('joi'),
    mongoose                    = require('mongoose'),
    filterPrivateInformation    = require('../../utils/filterPrivate'),
    jwt                 = require('jsonwebtoken-refresh'),
    Patient                     = require('../../models/patient-model'),
    QuestionSet                 = require('../../models/question-set-model'),
    uuid            = require('uuid'),
    Question                    = require('../../models/question-model');
module.exports = app => {

    app.get('/v2/demo/patient/profile', (req, res)=>{
        Patient.findOne({_id:49}, (err, patient)=>{
            res.status(200).send({patient});
        })
    });

    app.get('/v2/admin/question-set', (req, res)=>{
        if(req.query.id){
            QuestionSet.findOne({_id:parseInt(req.query.id)} )
                .populate('content.question')
                .exec((err, question_set)=>{

                    res.status(200).send({question_set});
                });
        }
        else QuestionSet.find({}, (err, question_set)=>{
            res.status(200).send({question_set});
        })
    });




};