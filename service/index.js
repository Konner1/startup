const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');


//this is my code
const express = require('express');
const app = express();


const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let users = [];

app.post('/api/register', express.json(), (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});


app.post('/api/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful' });
});


app.post('/api/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});



// end of my code





app.use(express.json());

let users = [];
let scores = [];


const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// this is the part of the code for simon TODO: Edit to libbuddies functions

let apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  });
  
  // GetAuth login an existing user
  apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth logout a user
  apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // Middleware to verify that the user is authorized to call an endpoint
  const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  };
  
  // GetScores
  apiRouter.get('/scores', verifyAuth, (_req, res) => {
    res.send(scores);
  });
  
  // SubmitScore
  apiRouter.post('/score', verifyAuth, (req, res) => {
    scores = updateScores(req.body);
    res.send(scores);
  });
  
  // Default error handler
  app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  // Return the application's default page if the path is unknown
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

  // THIS IS THE NEXT PART OF THE CODE: Helper FUNCTIONS


  // updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore) {
    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }
  
    if (!found) {
      scores.push(newScore);
    }
  
    if (scores.length > 10) {
      scores.length = 10;
    }
  
    return scores;
  }
  
  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    users.push(user);
  
    return user;
  }
  
  async function findUser(field, value) {
    if (!value) return null;
  
    return users.find((u) => u[field] === value);
  }
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  // Secure Endpoints

  // Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  };

// next block of new code

// GetScores
apiRouter.get('/scores', verifyAuth, (_req, res) => {
    res.send(scores);
  });

