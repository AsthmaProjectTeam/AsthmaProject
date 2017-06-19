/**
 * Created by tengzhongwei on 6/13/17.
 */

let Initiator                   = require('../../models/initiator-model'),
    initiatorAuth               = require('../../utils/initiator-auth'),
    Joi                         = require('joi'),
    mongoose                    = require('mongoose'),
    filterPrivateInformation    = require('../../utils/filterPrivate'),
    Patient                     = require('../../models/patient-model');

module.exports = app => {
    /**
     * Get a Initiator's profile by ID
     *
     * @param {req.params.id} User id of initiator
     * @return {object} Return profile object
     */
    app.get('/v2/initiator/:id/profile', initiatorAuth, (req, res)=>{
        //TODO: Allowed coerce casting here
        if(req.params.id != req.user._id) res.status(403).send('You can not access this');
        else{
            Initiator.findOne({_id:req.params.id})
                .populate('patients','_id username')
                .exec((err,initiator)=>{
                    if(err) res.status(500).send("Internal Database Error");
                    else {
                        res.status(200).send({profile:filterPrivateInformation(initiator._doc)});
                    }
                });
        }
    });

    /**
     * Update a Initiator Profile by ID
     *
     * @param {req.params.id} User id of initiator
     * @param {req.body.first_name}
     * @param {req.body.last_name}
     * @param {req.body.email}
     * @param {req.body.phone}
     * @return {object} Return profile object
     */
    app.patch('/v2/initiator/:id/profile', initiatorAuth, (req, res)=>{
        if(req.params.id != req.user._id) res.status(403).send('You can not access this');
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
                Initiator.findByIdAndUpdate(req.params.id, {$set:data}, (err, initiator)=>{
                    if(err) {res.status(500).send({err})}
                    else{
                        if(initiator){
                            res.status(200).send(filterPrivateInformation({profile:initiator._doc}));
                        }
                        else {
                            res.status(400).send("Initiator doesn't exist")
                        }
                    }
                })
            }
        });
    });

    /**
     * Append/Add a patient to Initiator
     *
     * @param {req.params.id} User id of initiator
     * @param {req.body.uuid} uuid of a patient
     * @return {object} Return success
     */
    app.patch('/v2/initiator/:id/patients/add',initiatorAuth,(req, res)=>{
        if(req.params.id != req.user._id) res.status(403).send('You can not access this');
        else{
            let schema = Joi.object().keys({
                uuid:Joi.string().guid({
                    version: [
                        'uuidv4',
                        'uuidv5'
                    ]})
            });
            Joi.validate(req.body, schema, (err, data) =>{
                if (err) {
                    const message = err.details[0].message;
                    res.status(400).send({error: message});
                } else {
                    Patient.findOne({uuid:data.uuid})
                        .exec( (err,patient)=>{
                            if(!err){
                                if(patient){
                                    Initiator.findById(req.params.id, (err, initiator)=>{
                                        if(!err){

                                            if(!initiator.patients.includes(patient._id)){
                                                initiator.patients.push(patient);
                                            }
                                            if(!patient.initiators.includes(initiator._id)){
                                                patient.initiators.push(initiator);
                                            }
                                            patient.save();
                                            initiator.save();
                                            res.status(200).send("success");
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

    /**
     * Send a Notification to a user
     *
     */

    /**
     * Export patients result set to Excel
     *
     * @param {req.body.uuid} uuid of users whose results will be exported
     * @param {req.body.context} Context of questions which will be exported
     * @return {object} Return success
     */
    app.post('/v2/initiator/:id/patients/export', initiatorAuth,(req, res)=>{
        if(req.params.id != req.user._id) res.status(403).send('You can not access this');
        else {
            let schema = Joi.object().keys({
                uuid:Joi.array().items(
                    Joi.string().guid({
                        version: [
                            'uuidv4',
                            'uuidv5'
                        ]})
                ),
                context: Joi.array().items(
                    Joi.string()
                ),
            });
            Joi.validate(req.body, schema, (err,data) => {
                if (err) {
                    const message = err.details[0].message;
                    res.status(400).send({error: message});
                } else {

                }
            });







        }
    });

};
