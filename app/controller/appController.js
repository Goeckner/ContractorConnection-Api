var User =  require("../modals/userModal.js")
var Trainer = require("../modals/trainerModal")

//////////USER CONTROLLERS//////////
exports.get_all_users = function(req, res) {
    User.getAllUsers(function(err, user){
        console.log("Controller: getAllUsers")
        if (err)
            res.send(err);
            console.log('res',user);
        res.send(user);
    })
}

exports.create_user = function(req, res) {
    var new_user = new User(req.body)
    var user_query = [[new_user.id, new_user.name, new_user.username, new_user.password, new_user.email, new_user.isTrainer]]

    if(!new_user.name || !new_user.username || !new_user.password || !new_user.email){
        res.status(400).send({ error:true, message: "Incomplete trainer information" })
    }
    else{
        User.createUser(user_query, function(err, user) {
            if (err){
                res.send(err)
            }
            else{
                res.json(user)
            }
        })
    }
}

//////////TRAINER CONTROLLERS//////////
exports.create_instructor = function(req, res) {
    var new_trainer = new Trainer(req.body)
    var trainer_query = [[new_trainer.address, new_trainer.isCertified, new_trainer.fullDesc, new_trainer.company, new_trainer.phone,
    new_trainer.city, new_trainer.state, new_trainer.zipcode, new_trainer.latitude, new_trainer.longitude, new_trainer.shortDesc, new_trainer.trainerID]]

    if(!new_trainer){
        res.status(400).send({error:true, message: "Incomplete trainer information"})
    }
    else{
        Trainer.createTrainer(trainer_query, function(err, trainer){
            if(err){
                res.send(err)
            }
            else{
                res.json(trainer)
            }
        })
    }
}

exports.get_all_instructors = function(req, res) {
    Trainer.getAllTrainers(function(err, trainer){
        console.log("Controller: getAllUsers")
        if (err)
            res.send(err);
            console.log('res',trainer);
        res.send(trainer);
    })
}