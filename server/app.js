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

console.log(uuid.v4());
//process.env.SECRET_KEY = uuid.v4();
process.env.SECRET_KEY = 'test222';

/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
app.use(express.static(path.join(__dirname, 'public')));
// Setup pipeline logging
if (env !== 'test') app.use(logger('dev'));
app.use(cookieParser());
// Finish pipeline setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup pipeline support for server-side templates
app.engine('pug', require('pug').__express);
app.set('views', __dirname);

//
function enableCORSMiddleware (req,res,next) {
    // You could use * instead of the url below to allow any origin,
    // but be careful, you're opening yourself up to all sorts of things!
    res.setHeader('Access-Control-Allow-Origin',  "http://localhost:8000");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization,X-Requested-With');
    next()
}
app.use(enableCORSMiddleware);





// Connect to mongoBD
let options = { promiseLibrary: require('bluebird') };
mongoose.connect('mongodb://asthma:123456@ds131512.mlab.com:31512/asthma', options, err => {
    if (err) console.log(err);
    else console.log('\t MongoDB connected');
});

// Auto Increment ID
autoIncrement.initialize(mongoose.connection);

// Import our Data Models
app.models = {
    Initiator: require('./models/initiator-model'),
    Patient: require('./models/patient-model'),
    Question: require('./models/question-model'),
    QuestionSet: require('./models/question-set-model'),
};
// Import our API Routes
require('./api/v2/account-api')(app);
require('./api/v2/initiator-api')(app);
require('./api/v2/patient-api')(app);
require('./api/v2/question-api')(app);
require('./api/v2/admin-api')(app);
require('./api/v2/csv-api')(app);
/**********************************************************************************************************/
// Give them the SPA base page
// app.get('*', (req, res) => {
//     res.render('base.pug', {});
// });
app.get('/upload', function(req, res){
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