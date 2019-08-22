require("dotenv").config();
var keys = require("./key.js");
var bandCall = require("./Packages/BandinTown.js");
var axios = require("axios");
var fs = require("fs");
var operator = process.argv[2];
var workIt = process.argv[3];

// var spotify = new Spotify(keys.spotify);

// var bandCall = function(bandName) {
//   axios({
//     method: "get",
//     url:
//       "https://rest.bandsintown.com/artists/Electric%20Six/events?app_id=codingbootcamp&date=upcoming"
//   }).then(function(response) {
//     var array = response.data;
//     array.forEach(function(el) {
//       console.log("venue Name: " + el.venue.name + ", Date: " + el.datetime);
//     });
//   });
// };

switch (operator) {
  // Connect to Bands in Town and output information based on the README file (Line 142)
  case "concert-this":
    // AXIOS connect to the "Bands in Town Artists events API"
    // Render Name of venue, Venue Location and event date

    bandCall(workIt);
    break;

  // Connect to Spotify and output information based on the README file (Line 152)
  case "spotify-this-song":
    break;

  // Connect to OMDB and output information based on the README file (Line 178)
  case "movie-this":
    break;

  // Run the Liribot using commands stored in the random.txt file
  case "do-what-it-says":
    break;
}
