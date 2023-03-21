require('dotenv').config()
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
let express = require('express');
let app = express();
console.log("Hello World");

var middleware_logger = (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
};
app.use(middleware_logger);

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
module.exports = app;
