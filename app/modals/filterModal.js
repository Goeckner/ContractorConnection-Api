var sql = require('./db.js')
var Trainer = require('./trainerModal')
var geolib = require('geolib')

var Filter = function(filter){
    this.rating = filter.rating
    this.latitude = filter.latitude
    this.longitude = filter.longitude
    this.dist = filter.dist
}

var fullTrainer = function(fulltrainer){
    this.id = fulltrainer.id
    this.name = fulltrainer.name    
    this.username = fulltrainer.username
    this.password = fulltrainer.password
    this.email = fulltrainer.email
    this.isTrainer = fulltrainer.isTrainer
    this.profilePicURL = fullTrainer.profilePicURL
    this.address = fulltrainer.address
    this.isCertified = fulltrainer.isCertified
    this.fullDesc = fulltrainer.fullDesc
    this.company = fulltrainer.company
    this.phone = fulltrainer.phone
    this.city = fulltrainer.city
    this.state = fulltrainer.state
    this.zipcode = fulltrainer.zipcode
    this.latitude = fulltrainer.latitude
    this.longitude = fulltrainer.longitude
    this.shortDesc = fulltrainer.shortDesc
    this.trainerID = fulltrainer.trainerID
    this.rating = fulltrainer.rating
    this.numRating = fullTrainer.numRating
}

//filters the full list of instructors with both ratings and distance
Filter.getFilterInst = function getFilterInst(new_filter, result){
    var endlist = new Array()
    var list

    //gets all trainers who meet the rating requirement
    sql.query("SELECT * FROM users INNER JOIN trainers ON users.id = trainers.trainerID WHERE trainers.rating >= ?", [[new_filter.rating]], function(err,res){
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log("Filter-rating query success")
            list = res

            //0 is the assumed null value, technically it's where the prime meridian meets the equator but thats in the
            //middle of the ocean, nobody should live there
            if(parseFloat(new_filter.latitude) == 0 || parseFloat(new_filter.longitude) == 0 || new_filter.dist == "No Max"){
                endlist = list
            }
            else{
                for(i = 0; i < list.length; i++)
                {
                    //try catch incase of error with coordinates, geolib is picky with values
                    try{
                        
                        if(list[i].latitude != "0.0" && list[i].longitude != "0.0" && list[i].latitude != '' && list[i].longitude != '')
                        {
                            var temp = new fullTrainer(list[i])

                            //uses geolib to get distance from each intructor
                            var dista = geolib.getDistance({latitude: parseFloat(new_filter.latitude), longitude: parseFloat(new_filter.longitude)},
                            {latitude: parseFloat(temp.latitude), longitude: parseFloat(temp.longitude)})

                            //converting meters to miles
                            dista = dista / 1609.34
                            console.log(dista)
                            if(dista <= parseFloat(new_filter.dist))
                            {
                                endlist.push(temp)
                            }
                        }            
                    }
                    catch(err){
                        console.log("Invalid coordinates in instructor:", list[i])
                    }                    
                }
            }            
            result(null, endlist)
        }
    })
}
module.exports = Filter, fullTrainer