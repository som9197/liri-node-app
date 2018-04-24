require("dotenv").config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var userInput1 = process.argv[2];
var userInput2 = process.argv[3];

switch (userInput1) {
    case 'my-tweets':
    client.get('statuses/home_timeline', function(error, tweets, response) {
        if(error) throw error;
        for (var i = 0; i < 20; i++){
            console.log(tweets[i].text);
            
        }
      });
    break;

    case "spotify-this-song":
    spotify.search({ type: 'track', query: userInput2, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }else
        console.log("--------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song title: " + data.tracks.items[0].name);
        console.log("Preview link:")
        console.log(data.tracks.items[0].external_urls);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("--------");
    });
    break;

    case "movie-this":
    var request = require("request");
        request("http://www.omdbapi.com/?t=" + userInput2 +"&y=&plot=short&apikey=5ef039b2", function(error, response, body) {
        if (!error && response.statusCode === 200 && userInput2 != undefined) {
            console.log("--------")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release date: " + JSON.parse(body).Released);
            console.log("IMDB rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Rotton Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country produced in: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("--------");
            
        }else{
            var request = require("request");
            request("http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&apikey=5ef039b2", function(error, response, body) {
                console.log("-------------------")
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release date: " + JSON.parse(body).Released);
                console.log("IMDB rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Rotton Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
                console.log("Country produced in: " + JSON.parse(body).Country);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("-------------------");
                });
            }
        });
    break;

    case "do-what-it-says":
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            var jSpot =JSON.stringify(data, null, 2)
            console.log("-------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song title: " + data.tracks.items[0].name);
            console.log("Preview link:")
            console.log(data.tracks.items[0].external_urls);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("-------------------");
        });  
    }); 
    break;
    default:
    console.log("-------------------");
    console.log(
        "Please enter one of these commands:\nmy-tweets\nspotify-this-song '<song title>\nmovie-this '<movie title>'\ndo-what-it-says");
    console.log("-------------------");
}
