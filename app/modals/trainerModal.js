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
    this.numRatings = trainer.numRatings
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

Trainer.updateTrainerQuiz = function createTrainer(body, result){
    var up = "UPDATE trainers SET quizes = " + body.num + " WHERE trainerID = " + body.id
    sql.query(up, function(err, res){
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

Trainer.getRatingInfo = function getRatingInfo(body, result){
    sql.query("SELECT numRatings, rating FROM trainers WHERE trainerID = ?", body.id, function(err, res){
        if(err){
            console.log("error: ", err)
            res
        }
        else{
            console.log(res)
            result(null, res)
        }
    })
}

Trainer.updateRating = function updateRating(body, result){
    sql.query("UPDATE trainers SET numRatings = " + body.numRatings + ", rating = " + body.rating + " WHERE trainerID = ?", body.id, function(err, res){
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

Trainer.deleteTrainerByID = function deleteTrainerByID(trainerID, result){
    sql.query("DELETE FROM trainers WHERE trainerID = ?", trainerID, function(err, res){
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
    sql.query("SELECT * FROM users INNER JOIN trainers ON users.id = trainers.trainerID WHERE trainers.isCertified = 1", function(err, res){
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