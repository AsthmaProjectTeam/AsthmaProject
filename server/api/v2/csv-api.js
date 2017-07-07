/**
 * Created by tengzhongwei on 7/7/17.
 */
const Patient = require('../../models/patient-model');
const csvHelp = require('../../utils/csv-helper');
const fs      = require('fs');


module.exports = app=> {
    /**
     * Export all patients result set to csv;
     */
    app.get('/v2/csv/patients/results', (req, res)=>{
        Patient.find({},(err,patients)=>{
            if(err) res.status(500).send('Error occurs when searching patients');
            let csv = csvHelp.refractorPatientJson(patients);
            res.status(200).type('csv').send(new Buffer(csv));
        });
    });


};