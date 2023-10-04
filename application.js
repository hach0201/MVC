const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'hajar99',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/login', (req, res) => {
    res.render('login', { message: '' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user && user.password === password) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        res.render('login', { message: 'Invalid username or password' });
    }
});

app.get('/home', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.render('home', { username: user.username });
    } else {
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
