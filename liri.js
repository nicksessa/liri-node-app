require("dotenv").config();
var moment = require("moment")
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")

// access the key info:
var spotify = new Spotify(keys.spotify);


// accept a parameter from the command line:
var parm1 = process.argv[2];
var parm2 = process.argv[3];

console.log("Parm1: " + parm1)
//console.log("Parm2: " + parm2)

if (parm1 == "concert-this") {
    if (parm2) {
        concertThis()
    }
} else if (parm1 == "spotify-this-song") {

} else if (parm1 == "movie-this") {

} else if (parm1 == "do-what-it-says") {

} else {
    return
}

function concertThis() {
    console.log("Parm2: " + parm2)
    var band = parm2.split(' ').join('+')

    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue Name: " + response.data[i].venue.name)
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                console.log("------------------------------------------------")
            }
        }
    ).catch(function (error) {
        if (error.response) {
            console.log("----------------- DATA -----------------")
            console.log(error.response.data)
            console.log("---------------- STATUS ----------------")
            console.log(error.response.status)
            console.log("---------------- Headers ---------------")
            console.log(error.response.headers)
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log("Error: " + error.message)
        }
        console.log(error.config)
    })
}