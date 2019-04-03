var sql = require('./db.js')

var Trainer = function(trainer){
    this.address = trainer.address
    this.isCertified = trainer.isCertified
    this.fullDesc = trainer.fullDesc
    this.company = trainer.company
    this.phone = trainer.phone
    this.city = trainer.city
    this.state = trainer.state
    this.zipcode = trainer.zipcode
    this.latitude = trainer.latitude
    this.longitude = trainer.longitude
    this.shortDesc = trainer.shortDesc
    this.trainerID = trainer.trainerID
    this.rating = trainer.rating
    this.numRating = trainer.numRating
    this.quizes = trainer.quizes
}

Trainer.createTrainer = function createTrainer(newTrainer, result){
    sql.query("INSERT INTO trainers VALUES (?)", newTrainer, function(err, res){
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

Trainer.getTrainerByID = function getTrainerByID(trainerID, result){
    sql.query("SELECT * FROM users INNER JOIN trainers ON users.id = trainers.trainerID WHERE users.id = ?", trainerID, function(err, res){
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

Trainer.getAllTrainers = function getAllTrainers(result){
    sql.query("SELECT * FROM users INNER JOIN trainers ON users.id = trainers.trainerID", function(err, res){
        if(err){
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log("Trainers: ")
            result(null, res)
        }
    })
}

module.exports = Trainer