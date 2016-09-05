var client = require('./keys');
var twitter = require('twitter');
var twitterClient = new twitter(client);
var params = {q: 'inClassProject', count:20};
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var argvArray = process.argv;
var command = process.argv[2];
// Gets items of array with index 3 onwards
var title = argvArray.slice(3);
// Joins these items into 1 string
var titleJoined = title.join(" ");
var toAppend = command +" " + titleJoined + ","; 

	if(command == 'my-tweets'){
	// Uses get function to search tweets with parameters defined in params variable
		twitterClient.get('search/tweets', params, function(error, data, response){
    var tweets = data.statuses;
    // Gets 20 tweets and the dates they were created
    for (var i = 0; i<20; i++) {
        console.log("Date and Time:" + tweets[0].created_at+ "  " + "Tweet:" + tweets[i].text);
    }
	});
	}
	else if(command =='spotify-this-song'){
	// If title is empty then it searches The Sign by Ace of Base
		if(titleJoined === ''){
			titleJoined = 'The Sign Ace of Base';
		}
	// uses search method to look for tracks with titleJoined as the song title
		spotify.search({ type: 'track', query: titleJoined }, function(err, data){
    	if(err){
        console.log('Error occurred: ' + err);
        return;
    	}else{
    	// Parses through JSON object to get song details
    	console.log("Artist:" + JSON.stringify(data.tracks.items[0].artists[0].name,null,3));
    	console.log("Song Name:" + JSON.stringify(data.tracks.items[0].name,null,3));
    	console.log("Preview Link:" + JSON.stringify(data.tracks.items[0].preview_url,null,3));
    	console.log("Album Name:" + JSON.stringify(data.tracks.items[0].album.name,null,3));
    	}
		});		
	}
	else if(command =='movie-this'){
	// If titleJoined is empty it searches for Mr Nobody 
		if(titleJoined === ''){
		   titleJoined = 'Mr Nobody';
		}
	// Uses request to get JSON object from the omdb api
		var queryUrl = 'http://www.omdbapi.com/?t=' + titleJoined +'&y=&plot=short&tomatoes=true&r=json';
		request(queryUrl, function (error, response, body) {
	// If there is no error, it gets the movie details listed below
		if (!error && response.statusCode == 200) {
		console.log("Title: " + JSON.parse(body)["Title"]);
		console.log("Year: " + JSON.parse(body)["Year"]);
		console.log("imdbRating: " + JSON.parse(body)["imdbRating"]);
		console.log("Country: " + JSON.parse(body)["Country"]);
		console.log("Language: " + JSON.parse(body)["Language"]);
		console.log("Plot: " + JSON.parse(body)["Plot"]);
		console.log("Actors: " + JSON.parse(body)["Actors"]);
		console.log("tomatoUserRating: " + JSON.parse(body)["tomatoUserRating"]);
		console.log("tomatoURL: " + JSON.parse(body)["tomatoURL"]);
	}
	});
	}
	else if(command =="do-what-it-says"){
	// Uses fs to read random.txt
		fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
		return console.log(error);
		}else{
	// Gets contents of random.txt and splits it into an array
			dataArray = data.split(',');	
	// Makes the first item of array the command and second one the song title
			process.argv[2] = dataArray[0];
			process.argv[3] = dataArray[1];
	// Plugs in process.argv[3] to query variable if process.argv[2] is == to spotify-this-song
			if(process.argv[2] == 'spotify-this-song'){
				spotify.search({ type: 'track', query: process.argv[3] }, function(err, data){
    			if(err){
        		console.log('Error occurred: ' + err);
        		return;
    			}else{
    			console.log("Artist:" + JSON.stringify(data.tracks.items[0].artists[0].name,null,3));
    			console.log("Song Name:" + JSON.stringify(data.tracks.items[0].name,null,3));
    			console.log("Preview Link:" + JSON.stringify(data.tracks.items[0].preview_url,null,3));
    			console.log("Album Name:" + JSON.stringify(data.tracks.items[0].album.name,null,3));
    			}
			});				
			}
		}
		});
	}
// To store toAppend in log.txt (Bonus)
	fs.appendFile("log.txt", toAppend, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Content Added!");
		}
	});  