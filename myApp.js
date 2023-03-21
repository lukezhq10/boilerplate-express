require('dotenv').config()
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
let express = require('express');
let app = express();
console.log("Hello World");

var middlewareLogger = (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
};
app.use(middlewareLogger);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.use("/public", express.static(__dirname + '/public'));
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({"message": "HELLO JSON"});
    }   
    else {
        res.json({"message": "Hello json"});
    }
});

// time server
app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time});
});

// echo server
app.get('/:word/echo', (req, res) => {
    res.json({"echo":req.params.word});
});

// get query parameter input from client
app.route('/name')
    .get((req, res) => {
        var firstName = req.query.first;
        var lastName = req.query.last;
        res.json({"name": `${firstName} ${lastName}`});
    })
    .post((req, res) => {
        res.json({"name": `${firstName} ${lastName}`});
    });

module.exports = app;
