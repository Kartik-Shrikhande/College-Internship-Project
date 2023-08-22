const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./src/routes/route');
require('dotenv').config({path:".env"})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 mongoose.connect(process.env.MONGODB, { useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex : true})  

.then( () => console.log("MongoDb is Ready for you"))
.catch ( err => console.log(err));

app.use('/', route);


app.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + process.env.PORT)
});