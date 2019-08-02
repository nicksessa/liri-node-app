// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var moment = require("moment")

var str = (process.argv[2])
var band = str.split(' ').join('+')
console.log("Name: " + band)

// Then run a request with axios to the OMDB API with the movie specified
var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
console.log("QueryURL: " + queryURL)
axios.get(queryURL).then(
  function(response) {
      console.log("got a response...")
      //console.log(response)
    for (var i = 0; i < response.data.length; i++) {
        console.log("Venue Name: " + response.data[i].venue.name)
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region)
        console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
        console.log("------------------------------------------------")
      }

  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
