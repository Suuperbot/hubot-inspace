// Description:
//   Who is currently in orbit in space?
//
// Dependencies:
//   node-request
//   http://api.open-notify.org/ API
//
// Configuration:
//   None
//
// Commands:
//   hubot in space now
//
// Author:
//   @jorgeepunan

var request = require('request');
var url = 'http://api.open-notify.org/astros.json';

var emojis = [":space_invader:",":stars:",":alien:",":star2:"]

function rand(items){
  return emojis[~~(Math.random() * emojis.length)];
}

module.exports = function(robot) {
  robot.respond(/in space now/i, function(res) {

    request(url, function (error, response, body) {

      if (!error && response.statusCode == 200) {

        var data = JSON.parse(body);
        var whom = data.number;

        res.send( "There are currently *" + whom + "* humans in space right now " + rand(emojis) + "!" );

        data.people.forEach(function(d) {

          var where = d.craft;
          var who = d.name;

          res.send( " · " + who + " (" + where + ")" );

        });


      } else {
        res.send("Error: ", error);
      }

    });
  });
};