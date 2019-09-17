const express = require('express');
const bodyParser = require('body-parser');
const restAPI = require('./restAPI');
const app = express();

//cors issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.use(bodyParser.json());
app.use('/api', restAPI);

app.listen(8888, () => {
    console.log('Server listening on port: 8888');
});