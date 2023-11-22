const express = require('express');
const app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');
const dotenv  = require('dotenv');
const cors = require('cors');
const { connectToMongo } = require('./config/db.js');
var options = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem'),
};
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const config = JSON.parse(process.env.CONFIG);
const port = config.PORT || 3000;

app.use('/iiest', require('./routers/employeeRoute.js'));
app.use('/iiest', require('./routers/fboRoute.js'));

connectToMongo();

var server = http.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});

/*app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})*/