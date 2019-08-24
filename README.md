# Liri Bot

## A brief summary
This application is designed to provide several pieces of information to the user at their request.
Namely:
 - Upcoming performances of a band
 - Information about a specific song
 - A summary of a film

 ## Requirements
 The application requires a user supplied .env file listing their personal Spotify ID and Secret as well as an OMDB API Key.
 The file should be formatted in the following way
 ```js
# Spotify API keys
SPOTIFY_ID=[Your Spotify ID]
SPOTIFY_SECRET=[Your Spotify Secret]

# OMDB API Key
OMDB_Key=[Your API Key]
 ```

 ## Running the application
 The application can be run with the following commands:

`node liri concert-this <Artist/Band Name>`
This will provide a list of upcoming shows for this Artist or Band
If no artist is provided it will default to the band "Electric Six"

`node liri spotify-this-song <Song Name>`
This will output information regarding a specific song
If no song name is provided it will default to "The Sign"

`node liri movie-this <movie name>`
This will provide information for the specified movie
The default search is set to "Toy Story" because its a great movie

Finally
`node liri do-what-it-says`
this will take an argument from an existing text file (random.txt) and process that argument