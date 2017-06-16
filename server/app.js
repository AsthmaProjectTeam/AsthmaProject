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
    cookieParser    = require('cookie-parser'),
    socketRoute     = require('./api/v2/socket');

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
    Doctor: require('./models/initiator-model'),
    Patient: require('./models/patient-model'),
    Question: require('./models/backup/question'),
    Flow: require('./models/backup/flow'),
};
// Import our API Routes
require('./api/v2/account-api')(app);

/**********************************************************************************************************/
// Give them the SPA base page
// app.get('*', (req, res) => {
//     res.render('base.pug', {});
// });
app.get('*', socketRoute.foo, function(req, res){
    res.sendFile(__dirname+'/socket-test.html');
});

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Example app listening on ' + server.address().port);
});

//Setup Socket.io
const io = require('socket.io')(server);
app.set('socketio', io);
//var io = req.app.get('socketio');