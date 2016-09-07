var keyObj = require('./keys.js');

var args = process.argv;
args.splice(0, 2);

/* * This will show your last 20 tweets and when they were created at in your terminal/bash window. */
if (args[0] === 'my-tweets') {
    var Twitter = require('twitter');

    var client = new Twitter(keyObj.twitterKeys);

    // client.get('favorites/list', function(error, tweets, response) {
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log(tweets);  // The favorites. 
        for (var i = 0; i < tweets.length && i < 20; i++) {
            console.log('Time:   ' + tweets[i].created_at);
            console.log('Tweet:  ' + tweets[i].text);
        }
        // console.log(response);  // Raw response object. 
    });

}

/* * This will show the following information about the song in your terminal/bash window
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

* if no song is provided then your program will default to
    * "The Sign" by Ace of Base */
if (args[0] === 'spotify-this-song') {

    var songName = '';
    if (args.length === 1) {
        songName = 'the sign';
    } else {
        for (var i = 1; i < args.length; i++) {
            if (i === args.length - 1) {
                songName += args[i].toLowerCase();
            } else {
                songName += args[i].toLowerCase() + " ";
            }
        }

    }
    var spotify = require('spotify');
    spotify.search({type: 'track', query: songName}, function(err, data) {
        if ( err ) {
                console.log('Error occurred: ' + err);
                return;
        }

        if (songName === 'the sign') {
            for (var i = 0; i < data.tracks.items.length; i++) {
                if (data.tracks.items[i].artists[0].name === 'Ace of Base') {
                    console.log('artists:       ' + data.tracks.items[i].artists[0].name);
                    console.log('song name:     ' + data.tracks.items[i].name);
                    console.log('preview link:  ' + data.tracks.items[i].preview_url);
                    console.log('album name:    ' + data.tracks.items[i].album.name);
                    console.log('');
                }
            }
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log('artists:       ' + data.tracks.items[i].artists[0].name);
                console.log('song name:     ' + data.tracks.items[i].name);
                console.log('preview link:  ' + data.tracks.items[i].preview_url);
                console.log('album name:    ' + data.tracks.items[i].album.name);
                console.log('');
            }
        }

    });

}


/* * This will output the following information to your terminal/bash window:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    * If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
    * It's on Netflix! */
if (args[0] === 'movie-this') {

    var movieTitle = '';
    var request = require('request');
    if (args.length === 1) {
        movieTitle = 'mr nobody';
    } else {
        for (var i = 1; i < args.length; i++) {
            if (i === args.length - 1) {
                movieTitle += args[i].toLowerCase();
            } else {
                movieTitle += args[i].toLowerCase() + " ";
            }
        }
    }
    var queryUrl = "https://www.omdbapi.com/?t=" + movieTitle + "&y=2016&plot=short&r=json";

    request(queryUrl, function(error, response, body) {

        if (error) {
            console.log('Error Generated: ' + error)
        } else if (!error && response.statusCode == 200) {
            // console.log(JSON.parse(body));
            console.log('Title:           ' + JSON.parse(body).Title);
            console.log('Year:            ' + JSON.parse(body).Year);
            console.log('IMDB Rating:     ' + JSON.parse(body).imdbRating);
            console.log('Country Origin:  ' + JSON.parse(body).Country);
            console.log('Language:        ' + JSON.parse(body).Language);
            console.log('Plot:            ' + JSON.parse(body).Plot);
            console.log('Actors:          ' + JSON.parse(body).Actors);
            console.log('');
            // console.log('Rotten Tomato Rating: ' + JSON.parse(body).Title);
            // console.log('Rotten Tomato URL: ' + JSON.parse(body).Title);
        }

    });

}


/* Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    Feel free to change the text in that document to test out the feature for other commands.
*/
if (args[0] === 'do-what-it-says') {

    var fs = require('fs');
    fs.readFile('random.txt', 'utf8', function(error, data) {
        var songList = data.split(',');
        var command = songList[0].replace(/[* ']/g, '');
        var song = songList[1].replace(/["]+/g, '');

        var spotify = require('spotify');
        spotify.search({type: 'track', query: song}, function(err, data) {
            if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
            }

            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log('artists:       ' + data.tracks.items[i].artists[0].name);
                console.log('song name:     ' + data.tracks.items[i].name);
                console.log('preview link:  ' + data.tracks.items[i].preview_url);
                console.log('album name:    ' + data.tracks.items[i].album.name);
                console.log('');
            }

        });

    });

}
