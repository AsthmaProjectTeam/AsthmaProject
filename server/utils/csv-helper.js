/**
 * Created by tengzhongwei on 7/7/17.
 */
const json2csv = require('json2csv');
const path     = require('path');
const formidable      = require('formidable');
const fs              = require('fs');

function refractorPatientJson(patient_list) {
    let csv = [];
    for(let patient of patient_list){
        if(patient.result_set){
            for(let result_set of patient.result_set){
                for(let result of result_set.results){
                    let cur = {};
                    cur.first_name=patient.first_name;
                    cur.last_name = patient.last_name;
                    cur.mrn = patient.mrn;
                    cur.date = result_set.created_date;
                    cur.question_id = result.q_id;
                    cur.value = result.value;
                    cur.question_set_app = result_set.app;
                    csv.push(cur);
                }
            }
        }
    }
    const fields = ['first_name', 'last_name', 'mrn', 'date', 'question_id', 'value', 'question_set_app'];
    csv = json2csv({data:csv, fields: fields});
    return csv;
}

function uploadAndSaveCsv(req, res, next) {

    // create an incoming form object
    let form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/../uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        next();
    });

    // parse the incoming request containing the form data
    form.parse(req);
}




module.exports ={
    refractorPatientJson,
    uploadAndSaveCsv,
};