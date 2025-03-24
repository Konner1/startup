const {connectDB} = require('./database');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cookieParser());

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });
let db;
connectDB().then(database => {
  db = database;
});

  
const users = [];


async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
  };

  const collection = db.collection('users');
  await collection.insertOne(user);

  //users.push(user);

  return user;
}


async function getUser(field, value) {
  const collection = db.collection('users');
  return await collection.findOne({ [field]: value });
  //return users.find((user) => user[field] === value) || null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4(); 
  res.cookie('token', user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}


app.post('/api/auth', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' }); 
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user); 

    res.send({ email: user.email });
  }
});


app.put('/api/auth', async (req, res) => {
  const user = await getUser('email', req.body.email);


  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user); 
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    clearAuthCookie(res, user); 
  }

  res.send({});
});


app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);

  if (user) {
    res.send({ email: user.email }); 
  } else {
    res.status(401).send({ msg: 'Unauthorized' }); 
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

