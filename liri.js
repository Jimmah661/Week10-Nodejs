require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var axios = require('axios')
var fs = require('fs')
var spotify = new Spotify(keys.spotify);
// External module calls
var bandCall = require("./Packages/BandinTown.js");
var operator = process.argv[2];
var workIt = process.argv.slice(3).join(" ");

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
    var movieTitle = "Mr. Nobody";
    if (workIt) {
      movieTitle = workIt;
    }
    axios.get("http://www.omdbapi.com/?apikey=" + process.env.OMDB_Key + "&t=" + movieTitle)
      .then(function (response) {
        var data = response.data
        var string = [
          "Movie Title: " + data.Title,
          "Release Year: " + data.Year,
          'IMDB Rating: ' + data.Ratings[0].Value,
          'Rotten Tomatoes Rating: ' + data.Ratings[1].Value,
          'Production Country: ' + data.Country,
          'Language(s): ' + data.Language,
          'Plot: ' + data.Plot,
          'Actors: ' + data.Actors
        ].join("\n\n")
        console.log(string)
      })
    break;

  // Run the Liribot using commands stored in the random.txt file
  case "do-what-it-says":
    fs.readFile('random.txt', function (err, data) {
      if (err) throw err;
      console.log(data)
    })
    break;
}
