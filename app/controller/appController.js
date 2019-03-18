var User =  require("../modals/userModal")
var Trainer = require("../modals/trainerModal")
var Filter = require("../modals/filterModal")
var Login = require("../modals/loginModal")
var validator = require("email-validator");

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
    new_trainer.city, new_trainer.state, new_trainer.zipcode, new_trainer.latitude, new_trainer.longitude, new_trainer.shortDesc, new_trainer.trainerID, new_trainer.rating]]

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

//////////FILTER CONTROLLERS//////////

exports.get_filtered_inst = function(req, res) {
    var new_filter = new Filter(req.body)
    console.log("new filter here", new_filter)
    Filter.getFilterInst(new_filter, function(err, filter){
        console.log("Controller: getfilterinst")
        if(err)
            res.send(err)
        res.send(filter)
    })
}

//////////ACCOUNT AUTHENTICATION////////////

exports.account_login = function(req, res) {
    var newlogin = new Login(req.body)
    if(newlogin.name && validator.validate(newlogin.email)){
        Login.authUser(newlogin, function(err, userid){
            if(userid == -1){
                var user_query = [[0, newlogin.name, "NULL", "NULL", newlogin.email, false]]
                User.createUser(user_query, function(err, user) {
                    if (err){
                        res.send(err)
                    }
                    else{
                        var usr = {
                            id: user,
                            new: true
                        }
                        res.json(usr)
                    }
                })
            }
            else{
                var usr = {
                    id: userid[0].id,
                    new: false
                }
                res.json(usr)
            }
        })
    }
    else{
        var failure = {
            id: -1,
            new: false
        }
        res.json(failure)
    }
}