'use strict';
//favicon = require('serve-favicon');
let path            = require('path'),
    express         = require('express'),
    session         = require('express-session'),
    RedisStore      = require('connect-redis')(session),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    mongoose        = require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment'),
    uuid            = require('uuid'),
    cookieParser    = require('cookie-parser');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
//process.env.SECRET_KEY = uuid.v4();
process.env.SECRET_KEY = 'test111';

/**********************************************************************************************************/


// Setup our Express pipeline
let app = express();
// Setup pipeline logging
if (env !== 'test') app.use(logger('dev'));
app.use(cookieParser());
// Finish pipeline setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup pipeline support for server-side templates
app.engine('pug', require('pug').__express);
app.set('views', __dirname);

// Connect to mongoBD
let options = { promiseLibrary: require('bluebird') };
mongoose.connect('mongodb://127.0.0.1:32768/asthma', options, err => {
    if (err) console.log(err);
    else console.log('\t MongoDB connected');
});

// Auto Increment ID
autoIncrement.initialize(mongoose.connection);

// Import our Data Models
app.models = {
    Doctor: require('./models/nurse'),
    Patient: require('./models/patient'),
    Question: require('./models/backup/question'),
    Flow: require('./models/backup/flow'),
};

// Import our API Routes
require('./api/v1/nurse')(app);
require('./api/v1/patient')(app);
require('./api/v1/accounts')(app);
require('./api/v1/pain_check')(app);


/**********************************************************************************************************/

// Give them the SPA base page
app.get('*', (req, res) => {
    res.render('base.pug', {});
});

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Example app listening on ' + server.address().port);
});
