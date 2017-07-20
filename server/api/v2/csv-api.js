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
     *
     * @param mrn
     * @param first_name
     * @param last_name
     * @param start_date
     * @param end_date
     */
    app.get('/v2/csv/patients/results', (req, res)=>{
        //transfer parameters to regular expression

        const mrn = req.query.mrn;
        const first_name =
            req.query.first_name?new RegExp('.*'+req.query.first_name+'.*', 'i'): null;
        const last_name =
            req.query.last_name?new RegExp('.*'+req.query.last_name+'.*', 'i'): null;

        //generate dynamic query options
        let query = {};
        if(mrn) query.mrn = mrn;
        if(first_name) query.first_name= first_name;
        if(last_name) query.last_name=last_name;
        if(req.query.start_date ||req.query.end_date)  query['result_set.created_date'] = {};
        if(req.query.start_date) query['result_set.created_date']['$gte'] = new Date(req.query.start_date);
        if(req.query.end_date) query['result_set.created_date']['$lt'] = new Date(req.query.end_date);

        Patient.find(query,(err,patients)=>{
            if(err) res.status(500).send('Error occurs when searching patients');
            let csv = csvHelp.refractorPatientJson(patients);
            res.status(200).type('csv').send(new Buffer(csv));
        });
    });

    /**
     * Upload patient information csv file and save them into database;
     */
    app.post('/v2/csv/patients/profile', csvHelp.uploadAndSaveCsv, (req, res)=>{
        const csvFilePath = path.join(__dirname, '/../../uploads/pa.csv');
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