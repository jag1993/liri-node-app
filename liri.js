var client = require('./keys');
var twitter = require('twitter');
var twitterClient = new twitter(client);
var params = {q: 'inClassProject', count:20};
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var argvArray = process.argv;
var command = process.argv[2];
var title = argvArray.slice(3);
var titleJoined = title.join(" ");
var toAppend = command +" " + titleJoined + ","; 

	if(command == 'my-tweets'){
		twitterClient.get('search/tweets', params, function(error, data, response){
    var tweets = data.statuses;
    for (var i = 0; i<20; i++) {
        console.log("Date:" + tweets[0].created_at+ "  " + "Tweet:" + tweets[i].text);
    }
	});
	}
	else if(command =='spotify-this-song'){
		if(titleJoined === ''){
			titleJoined = 'The Sign Ace of Base';
		}
		spotify.search({ type: 'track', query: titleJoined }, function(err, data){
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
	else if(command =='movie-this'){
		if(titleJoined === ''){
		   titleJoined = 'Mr Nobody';
		}
		var queryUrl = 'http://www.omdbapi.com/?t=' + titleJoined +'&y=&plot=short&tomatoes=true&r=json';
		request(queryUrl, function (error, response, body) {
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
		fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
		return console.log(error);
		}else{
			dataArray = data.split(',');	
			process.argv[2] = dataArray[0];
			process.argv[3] = dataArray[1];
			if(process.argv[2] == 'spotify-this-song'){
				// Make this a function with the value of query being a parameter
				spotify.search({ type: 'track', query: process.argv[3] }, function(err, data){
    			if(err){
        		console.log('Error occurred: ' + err);
        		return;
    			}else{
    				// Make this a function
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
// To store toAppend in log.txt
	fs.appendFile("log.txt", toAppend, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Content Added!");
		}
	});  