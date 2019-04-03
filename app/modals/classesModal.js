var sql = require('./db.js')

var Classes = function(classData){
    this.className = classData.className,
    this.classDesc = classData.classDesc,
    this.trainerID = classData.trainerID
}

Classes.createClass = function createClass(newClass, result){
    sql.query("INSERT INTO classes VALUES (?)", newClass, function(err, res){
        if(err){
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log(res)
            result(null, res)
        }
    })
}

Classes.getAllClasses = function getAllClasses(trainerID, result){
    sql.query("SELECT * FROM classes WHERE classes.trainerID = ?", trainerID, function(err, res){
        if(err){
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log("Classes: ")
            result(null, res)
        }
    })
}

Classes.deleteClasses = function deleteClasses(id, result){
    sql.query("DELETE FROM classes WHERE classes.trainerID = ?", id, function(err, res){
        if(err){
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log("Classes: ")
            result(null, res)
        }
    })
}

module.exports = Classes