require("dotenv").config();
var axios = require("axios");
var mapquestKey = process.env.MAPQUEST_KEY;

var bandCall = function (bandName) {
  axios({
    method: "get",
    url:
      "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp&date=upcoming"
  }).then(function (response) {
    var array = response.data;
    console.log(array);
    array.forEach(function (el) {
      var dateArray = el.datetime.split("T");
      var location = [el.latitude, el.longitude];
      // axios.get("http://www.mapquestapi.com/geocoding/v1/reverse?key=" + mapquestKey + "&location=" + location[0] + "," + location[1])
      //   .then(function (res) { console.log(res.results.locations.street) })
      console.log(
        "venue Name: " +
        el.venue.name +
        ",\nDate: " +
        dateArray[0] +
        ", Time: " +
        dateArray[1].substring(0, dateArray[1].length - 3)
      );
    });
  });
};

module.exports = { bandCall: bandCall };
