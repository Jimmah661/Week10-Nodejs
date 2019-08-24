require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
// External module calls
var bandCall = require("./Packages/BandinTown.js");
var omdbCall = require("./Packages/omdbCall")
var operator = process.argv[2];
var workIt = process.argv.slice(3).join(" ");

// var spotify = new Spotify(keys.spotify);

switch (operator) {
  // Connect to Bands in Town and output information based on the README file (Line 142)
  case "concert-this":


    bandCall.bandCall(workIt);
    break;

  // Connect to Spotify and output information based on the README file (Line 152)
  case "spotify-this-song":
    spotify.search({ type: 'track', query: workIt }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var response = data.tracks.items[0]
      var string = ["Artist Name: " + response.artists[0].name,
      "Song Name: " + response.name,
      "Link: " + response.album.external_urls.spotify,
      "Album Title: " + response.album.name
      ].join('\n\n')
      console.log(string);
    });
    break;

  // Connect to OMDB and output information based on the README file (Line 178)
  case "movie-this":
    omdbCall.call(workIt)
    break;

  // Run the Liribot using commands stored in the random.txt file
  case "do-what-it-says":
    break;
}
