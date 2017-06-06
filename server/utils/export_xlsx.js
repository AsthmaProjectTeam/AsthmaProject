/**
 * Created by tengzhongwei on 6/5/17.
 */
var mongoXlsx = require('mongo-xlsx');


function export_xlsx(data) {
    /* Generate automatic model for processing (A static model should be used) */
    let model = mongoXlsx.buildDynamicModel(data);
    mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
        console.log('File saved at:', data.fullPath);
    });
}

module.exports = export_xlsx;