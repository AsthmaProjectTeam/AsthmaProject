/**
 * Created by tengzhongwei on 7/7/17.
 */
const Patient         = require('../../models/patient-model');
const csvHelp         = require('../../utils/csv-helper');
const bulk_update     = require('../../service/bulk-update');
const fs              = require('fs');
const path            = require('path');
//const csv             = require('ya-csv');
const csv = require('csvtojson');


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

    /**
     * Upload patient information csv file and save them into database;
     */
    app.post('/v2/csv/patients/profile', csvHelp.uploadAndSaveCsv, (req, res)=>{
        const csvFilePath = path.join(__dirname, '/../../uploads/patients.csv');
        let patients = [];
        csv()
            .fromFile(csvFilePath)
            .on('json',(patient)=>{
                patients.push(patient);
            })
            .on('done',(error)=>{
                if(error) res.status(500).send({error});
                else bulk_update.newPatientViaCsv(req, res, patients);
            });
    });


};