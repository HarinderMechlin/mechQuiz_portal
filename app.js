//const http = require('http');
const express = require('express');
const app =express();
const monogoose =require('mongoose');
const cors =require('cors')
var bodyParser = require('body-parser');
const portNumber=5000;
require('dotenv/config');
//Middelware
app.use(cors());
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 }));

app.use('/common',require('./routes/common'))
.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
    response.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    response.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshToken"
    );
    next();
    });
//Connect to Db
monogoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
()=> console.log('connect to DB!')
);

//listen
app.listen(portNumber, () => console.info(`Server listening at http://localhost:${portNumber}/`));