'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var http        = require('http');
var JWT         = require('./lib/jwtDecoder');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');
//var trigger     = require('./routes/trigger');

var app = express();

// Register configs for the environments where the app functions
// , these can be stored in a separate file using a module like config
var APIKeys = {
    appId           : '80fa3e29-e586-4728-b728-59871a08991f',
    clientId        : 'bui8mm6pm8irb6hmfafzoavl',
    clientSecret    : 'twJkcPkfurzNSvpEnKaTygfy',
    appSignature    : 'h2lpme0xsotjjxthbifs3q4kfqrpmubq0ivld3poobgnrz5lf42cm0gfdr5lu0fwb1ywzpcs3uhbyacxiojv5ynami2campgdmzbehsjzdizu5ojkcvvt5ytkeoayfskhsw0zsbvshvkqek5ix2bc02oecemnejzlqorighdvodekmf3vncmfj1beicz131p1gdnoxxkkh0z11z1x4iiejmsuli4el25omlhd13fydjk1gxm1uli4dfzwuuz42s',
    authUrl         : 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
};

// Simple custom middleware
function tokenFromJWT( req, res, next ) {
    // Setup the signature for decoding the JWT
    var jwt = new JWT({appSignature: APIKeys.appSignature});
    
    // Object representing the data in the JWT
    var jwtData = jwt.decode( req );

    // Bolt the data we need to make this call onto the session.
    // Since the UI for this app is only used as a management console,
    // we can get away with this. Otherwise, you should use a
    // persistent storage system and manage tokens properly with
    // node-fuel
    req.session.token = jwtData.token;
    next();
}

// Use the cookie-based session  middleware
app.use(express.cookieParser());

// TODO: MaxAge for cookie based on token exp?
app.use(express.cookieSession({secret: "HelloWorld-CookieSecret"}));

// Configure Express
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.favicon());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', tokenFromJWT, routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/ixn/activities/hello-world/save/', activity.save );
app.post('/ixn/activities/hello-world/validate/', activity.validate );
app.post('/ixn/activities/hello-world/publish/', activity.publish );
app.post('/ixn/activities/hello-world/execute/', activity.execute );

// Custom Hello World Activity Route
app.post('/ixn/activities/hello-world/', activity.edit );

// Abstract Event Handler
app.post('/fireEvent/:type', function( req, res ) {
    var data = req.body;
    var triggerIdFromAppExtensionInAppCenter = 'srodriguezJBCustomHelloWorldApp';
    var JB_EVENT_API = 'https://kvader-developer-edition.na24.force.com/services/apexrest/myservice';
    var reqOpts = {};

    if( 'helloWorld' !== req.params.type ) {
        console.log("Dentro de if helloWord");
        res.send( 400, 'Unknown route param: "' + req.params.type +'"' );
    } else {
        // Hyd  rate the request
        reqOpts = {
            url: JB_EVENT_API,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + req.session.token
            },
            body: JSON.stringify({
                ContactKey: data.alternativeEmail,
                EventDefinitionKey: triggerIdFromAppExtensionInAppCenter,
                Data: data
            })
        };

        request( reqOpts, function( error, response, body ) {
            if( error ) {
                console.error( 'ERROR: ', error );
                res.send( response, 400, error );
            } else {
                res.send( body, 200, response);
            }
        }.bind( this ) );
    }
});

app.get('/clearList', function( req, res ) {
	// The client makes this request to get the data
	activity.logExecuteData = [];
	res.send( 200 );
});


// Used to populate events which have reached the activity in the interaction we created
app.get('/getActivityData', function( req, res ) {
	// The client makes this request to get the data
	if( !activity.logExecuteData.length ) {
		res.send( 200, {data: null} );
	} else {
		res.send( 200, {data: activity.logExecuteData} );
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
