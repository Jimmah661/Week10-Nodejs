require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var axios = require('axios')
var moment = require('moment')
var fs = require('fs')
var spotify = new Spotify(keys.spotify);

var operator = process.argv[2];
var workIt = process.argv.slice(3).join(" ");



function movieSearch(movieTitle = "Toy Story") {
  axios.get("http://www.omdbapi.com/?apikey=" + process.env.OMDB_Key + "&t=" + movieTitle)
    .then(function (response) {
      var data = response.data
      // console.log(data)
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
}

function spotifySearch(workIt = "The Sign") {
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
}

function bandSearch(workIt = "Electric Six") {
  axios.get("https://rest.bandsintown.com/artists/" + workIt + "/events?app_id=codingbootcamp&date=upcoming")
    .then(function (response) {
      var data = response.data

      for (i = 0; i < data.length; i++) {
        var gig = {};
        gig.venueName = data[i].venue.name;
        gig.date = data[i].datetime.split("T");
        gig.realDate = moment(gig.date[0]).format("MM/DD/YYYY")
        gig.loc = data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country
        var string = [
          "Venue Name: " + gig.venueName,
          "Venue Location: " + gig.loc,
          "Show Date: " + gig.realDate + "\n----------"
        ].join("\n")
        console.log(string)
      }
    })
}


switch (operator) {
  // Connect to Bands in Town and output information based on the README file (Line 142)
  case "concert-this":

    if (workIt) { bandSearch(workIt) } else { bandSearch() }
    // bandCall.bandCall(workIt);
    break;

  // Connect to Spotify and output information based on the README file (Line 152)
  case "spotify-this-song":
    if (workIt) { spotifySearch(workIt) } else { spotifySearch() }
    break;

  // Connect to OMDB and output information based on the README file (Line 178)
  case "movie-this":
    if (workIt) { movieSearch(workIt) } else { movieSearch() }

    break;

  case "do-what-it-says":
    fs.readFile('random.txt', 'utf8', function (err, data) {
      if (err) {
        return console.log(err)
      };
      var dataArr = data.split(',')
      operator = dataArr[0];
      workIt = dataArr[1]
      switch (operator) {
        case "concert-this":
          bandSearch(workIt)
          break;
        case "spotify-this-song":
          spotifySearch(workIt)
          break;
        case "movie-this":
          movieSearch(workIt)
          break;
      }
    })
    break;
}
