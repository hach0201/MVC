// models/userModel.js
class UserModel {
    constructor() {
        this.users = [
            { id: 1, username: 'user1', password: 'password1' },
            { id: 2, username: 'user2', password: 'password2' },
        ];
    }

    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}

module.exports = UserModel;
