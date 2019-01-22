var sql = require('./db.js')

var User = function(user){
    this.user = user.user
    this.status = user.status
}
var Instructor = function(inst){
    this.inst = inst.inst
    this.status = inst.status
}

User.createUser = function createUser(newUser, result){
    sql.query("INSERT INTO users (name, username, password, email, isTrainer) VALUES ?", newUser, function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertID);
            result(null, res.insertID);
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
User.updateUserInfo = function updateUserInfo(existingUser, result){
    sql.query("UPDATE users SET", existingUser, function(err,res){
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