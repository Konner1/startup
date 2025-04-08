const {connectDB} = require('./database');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const http = require('http');
const WebSocket = require('ws');
app.use(express.static('public'));


app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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


  return user;
}


async function getUser(field, value) {
  const collection = db.collection('users');
  return await collection.findOne({ [field]: value });
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
server.listen(port, () => {
  console.log(`HTTP & WS server listening on port ${port}`);
});


let clients = {};
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = JSON.parse(data);

    if (msg.type === 'register') {
      clients[msg.email] = ws;
    }

    if (msg.type === 'status') {
      for (const [email, client] of Object.entries(clients)) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'status-update',
            email: msg.email,
            inLibrary: msg.inLibrary
          }));
        }
      }
    }
    
  });

  ws.on('close', () => {
    for (const [email, socket] of Object.entries(clients)) {
      if (socket === ws) {
        delete clients[email];
      }
    }
  });
});

