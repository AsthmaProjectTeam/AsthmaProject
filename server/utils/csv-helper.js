/**
 * Created by tengzhongwei on 7/7/17.
 */
const json2csv = require('json2csv');
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


module.exports ={
  refractorPatientJson
};