var client = require('./keys.js');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var argvArray = process.argv;
var command = process.argv[2];
var title = argvArray.slice(3);
var titleJoined = title.join(" ");
var toAppend = command +" " + titleJoined + ",";

	if(command == 'my-tweets'){
			//DO DIS TOMORROW 
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
    	console.log(JSON.stringify(data.tracks.items[0].artists[0].name,null,3));
    	console.log(JSON.stringify(data.tracks.items[0].name,null,3));
    	console.log(JSON.stringify(data.tracks.items[0].preview_url,null,3));
    	console.log(JSON.stringify(data.tracks.items[0].album.name,null,3));
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
			titleJoined = data;
			spotify.search({ type: 'track', query: titleJoined }, function(err, data){
    		if(err){
       		 console.log('Error occurred: ' + err);
        	return;
    		}else{
    		console.log(JSON.stringify(data.tracks.items[0].artists[0].name,null,3));
    		console.log(JSON.stringify(data.tracks.items[0].name,null,3));
    		console.log(JSON.stringify(data.tracks.items[0].preview_url,null,3));
    		console.log(JSON.stringify(data.tracks.items[0].album.name,null,3));
    		}
			});	
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