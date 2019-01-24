var User =  require("../model/userModal.js")

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
        res.status(400).send({ error:true, message: new_user.isTrainer });
    }
    else{
        User.createUser(user_query, function(err, user) {
            if (err){
                res.send(err);
            }
            else{
                res.json(user);
            }
        })
    }
}