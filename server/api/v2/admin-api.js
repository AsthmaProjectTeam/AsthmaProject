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

    app.get('/v2/admin/patients', (req, res)=>{
        Patient.find({}, (err, patients)=>{
            res.status(200).send({patients});
        })
    });

    app.get('/v2/admin/initiators', (req, res)=>{
        Initiator.find({}, (err, initiators)=>{
            res.status(200).send({initiators});
        })
    });

    app.get('/v2/admin/questions',(req, res)=>{
        Question.find({}, (err, questions)=>{
            res.status(200).send({questions});
        });
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

    app.get('/v2/admin/fake-patient', (req,res)=>{
       let patient = new Patient({uuid:uuid.v4()});
       patient.save((err)=>{
           if(err) res.status(500).send('Internal Server Error');
           else {
               const token = jwt.sign(patient, process.env.SECRET_KEY, {
                   expiresIn: "365d",
               });
               res.status(200).send({token});
           }
       })
    });

    app.get('/v2/admin/refresh', (req,res)=>{
        const originalDecoded = jwt.decode(req.headers.authorization.split(' ')[1], {complete: true});
        const refreshed = jwt.refresh(originalDecoded, '365d', process.env.SECRET_KEY);
        res.status(200).send({refreshed});
    })



};