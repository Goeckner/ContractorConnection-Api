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
            console.log(res);
            result(null, "success");
        }
    })
}