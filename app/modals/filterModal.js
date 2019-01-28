var sql = require('./db.js')
var geolib = require('geolib')

var Filter = function(filter){
    this.rating = filter.rating
    this.latitude = filter.latitude
    this.logitude = filter.longitude
    this.dist = filter.dist
}

Filter.getFilterInst = function getFilterInst(new_filter, result){
    var endlist = []
    var ret
    var list

    sql.query("SELECT * FROM trainers INNER JOIN users ON users.id = trainers.trainerID WHERE trainers.rating >= ?", [[new_filter.rating]], function(err,res){
        if(err) {
            ret = true
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log("Filter-rating query success")
            list = res

            for(i = 0; i < list.length; i++)
            {
                var dist = geolib.getDistance({latitude: parseFloat(new_filter.latitude), longitude: parseFloat(new_filter.longitude)},
                    {latitude: parseFloat(list[i].latitude), longitude: parseFloat(list[i].longitude)})

                if(dist <= new_filter.dist)
                {
                endlist.push(inst)
                }
            }
            console.log(endlist)
            result(null, endlist)
        }
    })    

    
}

module.exports = Filter