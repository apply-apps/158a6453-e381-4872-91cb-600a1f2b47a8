// Filename: app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

// Filename: routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);

module.exports = router;

// Filename: routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts);
router.post('/', postsController.createPost);

module.exports = router;

// Filename: controllers/usersController.js
exports.getAllUsers = (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ]);
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  // Add code to save the new user to the database here
  res.status(201).json(newUser);
};

// Filename: controllers/postsController.js
exports.getAllPosts = (req, res) => {
  res.json([
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' }
  ]);
};

exports.createPost = (req, res) => {
  const newPost = req.body;
  // Add code to save the new post to the database here
  res.status(201).json(newPost);
};