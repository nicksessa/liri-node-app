require("dotenv").config();
var moment = require("moment")
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var fs = require("fs")

// accept a parameter from the command line:
var parm1 = process.argv[2];
var parm2 = process.argv[3];

checkParm()

function checkParm() {
    if (parm1 == "concert-this") {
        if (parm2) {
            logFile(parm1, parm2)
            concertThis(parm2)
        } else {
            logFile(parm1, "The Rolling Stones")
            concertThis("The Rolling Stones")
        }
    } else if (parm1 == "spotify-this-song") {
        if (parm2) {
            logFile(parm1, parm2)
            spotifyThis(parm2)
        } else {
            logFile(parm1, "Ring of Fire")
            spotifyThis("Ring of Fire")
        }
    } else if (parm1 == "movie-this") {
        if (parm2) {
            logFile(parm1, parm2)
            movieThis(parm2)
        } else {
            logFile(parm1, "The Terminator")
            movieThis("The Terminator")
        }
    } else if (parm1 == "do-what-it-says") {
        logFile(parm1, "")
        readFile()
    } else {
        return
    }
}

function concertThis(theBand) {
    //console.log("Parm2: " + parm2)
    var band = theBand.split(' ').join('+')

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


function movieThis(theMovie) {
    //console.log("Parm2: " + parm2)
    var title = theMovie.split(' ').join('+')
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            console.log("------------------------------------------------")
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Metascore: " + response.data.Metascore)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)

            console.log("------------------------------------------------")
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

function spotifyThis(theSong) {
    // access the key info:
    var spotify = new Spotify(keys.spotify);

    //console.log("Parm2: " + parm2)
    var songName = theSong.split(' ').join('+')
    var queryURL = "https://api.spotify.com/v1/search?q=track: " + songName + "&type=track&limit=10";

    spotify.request(queryURL, function (error, response) {
        if (error) {
            return console.log(error)
        }
        console.log("Artist: " + response.tracks.items[0].artists[0].name)
        console.log("Song: " + response.tracks.items[0].name)
        console.log("URL: " + response.tracks.items[0].preview_url)
        console.log("Album: " + response.tracks.items[0].album.name)
    })
}

function readFile() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Error reading file! " + error)
        }
        var output = data.split(",")
        console.log("New Parm1: " + output[0])
        console.log("New Parm2: " + output[1])
        parm1 = output[0]
        parm2 = output[1]

        checkParm()
    })
}

function logFile(text, text2) {
    var curDate = moment().format("YYYY-MM-DD HH:mm:SS")
    //console.log(`[${curDate}]`)

    var newText = `[${curDate}] ${text} ${text2}\n`

    fs.appendFile("./log.txt", newText, function (error) {
        if (error) {
            return console.log("Error writing to file! " + error)
        }
    })
}