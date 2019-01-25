module.exports = function(app) {
    var react_app = require("../controller/appController.js")

    app.route('/users')
        .get(react_app.get_all_users)
        .post(react_app.create_user)

    // app.route('/users/:userid')
    //     .get(react_app.list_user_info)
    //     .put(react_app.update_user_info)
    //     .delete(react_app.delete_user)

    app.route('/trainers')
        .get(react_app.get_all_instructors)
        .post(react_app.create_instructor)

    // app.route('/trainers/:instid')
    //     .get(react_app.list_instructor_info)
    //     .put(react_app.update_instructor_info)
    //     .delete(react_app.delete_instructor)

    // app.route('/dist')
    //     .post(react_app.calculate_distance)
}