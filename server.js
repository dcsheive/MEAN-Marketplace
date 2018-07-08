var express = require('express');

var app = express();

var path = require('path');

app.use(express.static( __dirname + '/public/dist/public' ));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

var session = require('express-session')
app.use(session({
    secret: 'codingmojo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const flash = require('express-flash');
app.use(flash());


let bcrypt = require('bcrypt')

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(8000, function() {
    console.log("listening on port 8000");
})