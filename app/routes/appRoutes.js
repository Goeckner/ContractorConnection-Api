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

    // app.route('/trainers/:instid')the witcher wallpaper
    //     .get(react_app.list_instructor_info)
    //     .post(react_app.update_instructor_info)
    //     .delete(react_app.delete_instructor)

    app.route('/trainers/filter')
        .post(react_app.get_filtered_inst)

    app.route('/classes/:instid')
        .get(react_app.get_all_classes)
        .post(react_app.create_class)
        .delete(react_app.delete_classes)

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