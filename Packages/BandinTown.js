var bandCall = function(bandName) {
  axios({
    method: "get",
    url:
      "https://rest.bandsintown.com/artists/Electric%20Six/events?app_id=codingbootcamp&date=upcoming"
  }).then(function(response) {
    var array = response.data;
    array.forEach(function(el) {
      console.log("venue Name: " + el.venue.name + ", Date: " + el.datetime);
    });
  });
};

module.exports = { bandCall: bandCall };
