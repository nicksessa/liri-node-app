require("dotenv").config();
var keys=require("./keys.js");
// access the key info:
var spotify = new Spotify(keys.spotify);
// accept a parameter from the command line:
var parm1 = process.argv[2];

if (parm1 == "concert-this") {

} else if (parm1 == "spotify-this-song") {

} else if (parm1 == "movie-this") {

} else if (parm1 == "do-what-it-says") {

} else {
  return
}
