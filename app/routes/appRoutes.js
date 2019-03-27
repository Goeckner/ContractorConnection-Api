const passport = require('passport')

module.exports = function(app) {
    var react_app = require("../controller/appController.js")

    app.route('/users')
        .get(react_app.get_all_users)
        .post(react_app.create_user)

    // app.route('/users/:userid')
    //     .get(react_app.list_user_info)
    //     .post(react_app.update_user_info)
    //     .delete(react_app.delete_user)

    app.route('/trainers')
        .get(react_app.get_all_instructors)
        .post(react_app.create_instructor)

    app.route('/trainers/:instid')
        .get(react_app.get_trainer_by_id)

    // app.route('/trainers/:instid')
    //     .get(react_app.list_instructor_info)
    //     .post(react_app.update_instructor_info)
    //     .delete(react_app.delete_instructor)

    app.route('/trainers/filter')
        .post(react_app.get_filtered_inst)

    // ////////FACEBOOK ROUTES///////
    // app.route('/auth/facebook')
    //     .get(passport.authenticate('facebook'))

    // app.route('/auth/facebook/callback')
    //     .get(passport.authenticate('facebook', {
            
    //         successRedirect: 'http://localhost:3000',
    //         failureRedirect: '/login'
    //     }),
    //     function(req, res) {
    //         res.redirect('/')
    //     })

    ////////AUTH ROUTES////////
    app.route('/auth')
        .post(react_app.account_login)

    app.route('/auth/callback')
        .post()
        // .get(passport.authenticate("google", { failureRedirect: "/login", session: false }),
        //     function(req, res) {
        //         var token = req.user.token;
        //         var user = req.user.name;
        //         res.redirect("http://localhost:3000?user=" + user + "&token=" + token);
        // })

    app.route('/logout')
        .get(function(req, res){
        req.logout();
        res.redirect('/');
    })
}