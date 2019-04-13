var User =  require("../modals/userModal")
var Trainer = require("../modals/trainerModal")
var Classes = require("../modals/classesModal")
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
    var user_query = [[new_user.id, new_user.name, new_user.username, new_user.password, new_user.email, new_user.isTrainer, new_user.profilePicURL]]

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

exports.make_user_inst = function(req, res) {
    var id = req.params.userid

    if(!id){
        res.status(400).send({error:true, message: "Incomplete userid information"})
    }
    else{
        User.changeToInst(id, function(err, user){
            if(err){
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
    new_trainer.city, new_trainer.state, new_trainer.zipcode, new_trainer.latitude, new_trainer.longitude, new_trainer.shortDesc,
    new_trainer.trainerID, new_trainer.rating, new_trainer.numRatings, new_trainer.quizes]]

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

exports.get_trainer_by_id = function(req, res){
    var id = req.params.instid

    if(!id)
    {
        res.status(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Trainer.getTrainerByID(id, function(err, inst){
            console.log("Controller: getinstbyid")
            if(err)
                res.send(err);
                console.log('res', inst)
            res.send(inst)
        })
    }
}

exports.update_quiz_num = function(req, res){
    var body = {
        id: req.body.id,
        num: req.body.quizes
    }
    if(!body.id)
    {
        res.status(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Trainer.updateTrainerQuiz(body, function(err, inst){
            console.log("Controller: update quizes")
            if(err)
                res.send(err);
                console.log('res', inst)
            res.send(inst)
        })
    }
}

exports.update_trainer_rating = function(req, res){
    var body = {
        id: req.body.id,
        rate: req.body.rate
    }
    if(!body.id)
    {
        res.status(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Trainer.getRatingInfo(body, function(err, inst){
            var newinfo = {
                id: body.id,
                numRatings: inst[0].numRatings+1,
                rating: (((inst[0].numRatings * inst[0].rating) + body.rate) / (inst[0].numRatings+1))
            }
            Trainer.updateRating(newinfo, function(err, inst){
                console.log("Controller: update rating")
                if(err)
                    res.send(err)
                    console.log('res', inst)
                res.send(inst)
            })
        })
    }
}

exports.certify_instructor = function(req, res){
    var id = req.params.instid

    if(!id)
    {
        res.starus(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Trainer.certify(id, function(err, inst){
            console.log("Contoller: certifly inst")
            if(err)
                res.send(err)
                console.log('res', inst)
            res.send(inst)
        })
    }
}

exports.delete_instructor = function(req, res){
    var id = req.params.instid

    if(!id)
    {
        res.starus(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Trainer.deleteTrainerByID(id, function(err, inst){
            console.log("Controller: delete inst")
            if(err)
                res.send(err);
                console.log('res', inst)
            res.send(inst)
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

exports.get_all_classes = function(req, res) {
    var id = req.params.instid

    if(!id)
    {
        res.status(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Classes.getAllClasses(id, function(err, classes){
            console.log("Controller: getAllClasses")
            if (err)
                res.send(err);
                console.log('res',classes);
            res.send(classes);
        })
    }
}


exports.create_class = function(req, res) {
    var new_class = new Classes(req.body)
    var class_query = [[new_class.className, new_class.classDesc, new_class.trainerID]]

    if(!new_class){
        res.status(400).send({error:true, message: "Incomplete class information"})
    }
    else{
        Classes.createClass(class_query, function(err, classData){
            if(err){
                res.send(err)
            }
            else{
                res.json(classData)
            }
        })
    }
}

exports.delete_classes = function(req, res) {
    var id = req.params.instid

    if(!id)
    {
        res.status(400).send({error:true, message: "ID missing in fetch"})
    }
    else{
        Classes.deleteClasses(id, function(err, result){
            if(err){
                res.send(err)
            }
            else{
                res.json(result)
            }
        })
    }
}


//////////FILTER CONTROLLERS//////////

exports.get_filtered_inst = function(req, res) {
    var new_filter = req.body
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
                var user_query = [[0, newlogin.name, "NULL", "NULL", newlogin.email, false, newlogin.profilePicURL]]
                User.createUser(user_query, function(err, user) {
                    if (err){
                        res.send(err)
                    }
                    else{
                        var usr = {
                            info: {
                                id: user,
                                name: newlogin.name,
                                username: "NULL",
                                password: "NULL",
                                email: newlogin.email,
                                isTrainer: 0,
                                profilePicURL: newlogin.profilePicURL
                            },
                            new: true
                        }
                        res.json(usr)
                    }
                })
            }
            else{
                var usr = {
                    info: userid[0],
                    new: false
                }
                res.json(usr)
            }
        })
    }
    else{
        var failure = {
            info: -1,
            new: false
        }
        res.json(failure)
    }
}