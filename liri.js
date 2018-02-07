require("dotenv").config();

var file = require("./keys.js");
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require('request');
var Twitter = require('twitter');
var client = new Twitter({
consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET});
var fs = require('fs');

var choice = process.argv[2];

var nodeArgs = process.argv;


var Name = [];
var movie = [];
var nobodytext = "If you haven't watched 'Mr. Nobody', then you should:"+ "\n" + "http://www.imdb.com/title/tt0485947/" + "\n" +"It's on Netflix!";
var flag = 0;
function mtsd(choice,flag, Name){
for (var i = 3; i < nodeArgs.length; i++) {



 if (i > 2 && i < nodeArgs.length) {

    Name = Name + "+" + nodeArgs[i];
    movie = movie + "+" + nodeArgs[i]; 
  }
  else {

    Name += nodeArgs[i];
    movie += nodeArgs[i];



  }
}
for (var x = 3; x == nodeArgs.length; x++){
	if (flag != 1){
	Name = "Ace of Base";
	movie = "Mr. Nobody";
	}else{
	
	}

}

if (choice === "spotify-this-song"){

var spotify = new Spotify({
 id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: Name}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  // console.log(data.tracks);
 console.log("*************************");
 console.log("Artist: " + data.tracks.items[0].artists[0].name);
 console.log("");
 console.log("Song Name: " + data.tracks.items[0].name);
 console.log("");
 console.log("URL: " + data.tracks.items[0].external_urls.spotify);
 console.log("");
 console.log("Album: " + data.tracks.items[0].album.name);
 console.log("*************************");
// console.log(data.tracks.items);
// console.log(data.tracks.items[0].name)
// console.log(data.tracks.items[0].album.name);

});
} else if (choice === "movie-this")

	{	   
		   var omdbURL = 'http://www.omdbapi.com/?apikey=f36bea46&t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
  	
    if(!error && response.statusCode == 200){
   		var body = JSON.parse(body)
      
   	  console.log("****************************");	
      console.log("Title: " + body.Title);
      console.log("");
      console.log("Release Year: " + body.Year);
      console.log("");
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("");
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
	  console.log("");
	  console.log("Country: " + body.Country);
	  console.log("");
      console.log("Language: " + body.Language);
      console.log("");
      console.log("Plot: " + body.Plot);
      console.log("");
      console.log("Actors: " + body.Actors);
      console.log("");
      if (body.Title === "Mr. Nobody"){
      	console.log (nobodytext);
      }	
      console.log("****************************");


}
});
} else if (choice === "my-tweets"){
	 var screenName = {screen_name: 'BrandonJMichaux'};
  client.get('statuses/user_timeline', screenName, function(error, tweets, response){
    if(!error){
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@BrandonJMichaux: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        console.log("-----------------------");
        
      }
    }else{
      console.log('Error occurred');
    }
  });


}else if (choice === "do-what-it-says"){
	
  fs.readFile("random.txt", "utf8", function(error, data) {
    
   
    var dataArr = data.split(',')
  

   
    

    mtsd(dataArr[0],1,dataArr[1]);
    
    
  });
}
}
mtsd(process.argv[2],0, Name);




	








