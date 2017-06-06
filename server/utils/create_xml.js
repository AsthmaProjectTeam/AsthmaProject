/**
 * Created by tengzhongwei on 6/5/17.
 */
var mongoXlsx = require('mongo-xlsx');

var data = [ { name : "Peter", lastName : "Parker", isSpider : true } ,
    { name : "Remy",  lastName : "LeBeau", powers : ["kinetic cards"] }];

/* Generate automatic model for processing (A static model should be used) */
var model = mongoXlsx.buildDynamicModel(data);

/* Generate Excel */
mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
    console.log('File saved at:', data.fullPath);
});