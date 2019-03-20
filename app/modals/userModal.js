var sql = require('./db.js')

var User = function(user){
    this.id = user.id
    this.name = user.name    
    this.username = user.username
    this.password = user.password
    this.email = user.email
    this.isTrainer = user.isTrainer
    this.profilePicURL = user.profilePicURL
}

User.createUser = function createUser(newUser, result){
    sql.query("INSERT INTO users (id, name, username, password, email, isTrainer, profilePicURL) VALUES (?)", newUser, function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
}

User.getAllUsers = function getAllUsers(result){
    sql.query("SELECT * FROM users", function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("Users:")
            result(null, res);
        }
    });   
}

User.getUserbyID = function getUserbyID(UserID, result){
    sql.query("SELECT name FROM users WHERE id = ?", UserID, function(err,res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res)
            result(null, res)
        }
    })
}

//needs work, need better way to update user
User.updateUserInfo = function updateUserInfo(id, existingUser, result){
    sql.query("UPDATE users SET ? where id = ?", [existingUser, id], function(err,res){
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log(res)
            result(null, res)
        }
    })
}

User.removeUser = function removeUser(id, result){
    sql.query("DELETE FROM users WHERE id = ?", [id], function(err,res){
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log(res)
            result(null, res)
        }
    })
}

module.exports = User