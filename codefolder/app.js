const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mysqltest = require('./src/workWithMySql.js');
const extnote = require('./src/operations.js');
const logfile = require('./src/workWithJson.js');
const etheriumtest = require('./src/workWithEthereum.js');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'templates'); // set folder that include *.ejs files
process.env.FILES_ROOT_FOLDER = '.';

async function getRecords() {
  const myData = [];
  const tempData = await mysqltest.readFromDbCorrect();
  tempData.forEach((result) => {
    myData.push(result); })
  return myData;
}
app.use(bodyParser.urlencoded({extended: false}));
// Required to all static files.
app.use(express.static('templates'));

app.get('/About', (req, res, next) => {
  console.log('In another middleware About!');
  const pathAbout = path.join(__dirname, 'templates', 'About.html');
  res.sendFile(pathAbout);
});

app.get('/PrevResult', (req, res, next) => {
  console.log('Start working with DataBase');
  getRecords().then((tempData) => {
    res.render('table', { data: tempData });
  });
});

app.get('/', (req, res, next) => {
  console.log('In the middleware!');
  res.render('table');
  //const pathIndex = path.join(__dirname, 'templates', 'index.html');
  //res.sendFile(pathIndex);
  //next(); // Allows the request to continue to the next middleware in line
});

app.post('/', (req, res, next) => {
  const bodyReq = JSON.stringify(req.body);
  const [showingResult, number] = extnote.parseAndCheckInput(bodyReq);
  const walletAdress = etheriumtest.generateWalleteAddress(number);
  console.log('In the middleware Post!');
  res.render('index', { dataCard: showingResult, EthereumAddress: walletAdress });
  logfile.saveToLogFile(showingResult, number);
  mysqltest.writeToDb(number, showingResult, walletAdress);
 // next(); // Allows the request to continue to the next middleware in line
});
// 404 section
app.use((req, res, next) => {
  console.log('In the 404 middleware!');
  const path404 = path.join(__dirname, 'templates', 'error404.html');
  console.log(path404);
  res.status(404).sendFile(path404);
});

const server = http.createServer(app);

server.listen(8080);
