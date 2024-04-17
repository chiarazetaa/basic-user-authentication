const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const users = [
    {id: 1, username: 'admin', password: 'admin'},
    {id: 1, username: 'user', password: 'user'}
];

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // find user by username and password
    let user = users.find((u) => u.username === username && u.password === password );
    if (user) {
        // generate jwt token
        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).send({ success: true, token: token})
    } else {
        res.status(401).send({ success: false, message: 'Invalid username or password'})
    }
});

app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
})

module.exports = app;