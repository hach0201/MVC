// controllers/authController.js
const UserModel = require('../models/userModel');

class AuthController {
    constructor() {
        this.userModel = new UserModel();
    }

    login(req, res) {
        const { username, password } = req.body;
        const user = this.userModel.getUserByUsername(username);

        if (user && user.password === password) {
            req.session.user = user;
            res.redirect('/home');
        } else {
            res.render('login', { message: 'Invalid username or password' });
        }
    }

    home(req, res) {
        const user = req.session.user;

        if (user) {
            res.render('home', { username: user.username });
        } else {
            res.redirect('/login');
        }
    }

    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
            }
            res.redirect('/login');
        });
    }
}

module.exports = AuthController;
