var sql = require('./db.js')
var User = require('./userModal')
var Trainer = require('./trainerModal')
var fullTrainer = require('./filterModal')

var Login = function(login){
    this.name = login.name
    this.email = login.email
    this.newuser = true
}

Login.authUser = function authUser(newlogin, result){
    sql.query("SELECT id FROM users WHERE email = ?", [[newlogin.email]], function(err, res){
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            if(res == []){
                result(null, -1)
            }
            else{
                result(null, res)
            }
        }
    })
}

module.exports = Login