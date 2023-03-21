let express = require('express');
let app = express();
console.log("Hello World")
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
app.use((__dirname + '/public'), express.static());
 module.exports = app;
