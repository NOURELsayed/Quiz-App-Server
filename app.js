const express = require('express');
const port = 3000
const app = express();

const { connectToDatabase } = require('./models');
const { Login, Register, GetAllQuestions } = require('./users.model');


connectToDatabase();

//middlewares
app.use(express.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', ` http://localhost:${port}`);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.post('/register', async (req, res) => {
    const user = req.body;
    let result = await Register(user);
    res.send(result);
});

app.post('/Login', async (req, res) => {
    let user = req.body;
    let result = await Login(user);
    res.send(result);
});

app.get('/Questions', async (req, res) => {

    let questions = await GetAllQuestions();

    res.send(questions);

});

app.get('/', async (req, res) => {
    res.send("this is home page");

});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})