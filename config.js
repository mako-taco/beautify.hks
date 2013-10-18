var hksConfig = require("hooks-config");
hksConfig.hookModule = "beautify.hks";

var read = require("read");

var baseConfig = require("./beautify_defaults.json");

hksConfig.view(function(err, userConfig){

	if(err){
		console.log(err);
	}
	else{
		var keys = Object.keys(baseConfig);
		var config = {};

		var keyToPhrase = function(key){
			return key.split("_").map(function(word){
				word[0] = word[0].toUpperCase();
				return word;
			}).join(" ");
		}

		var ask = function(i){
			if(i==keys.length){
				done();
			}
			else{
				var opts = {
					prompt: keyToPhrase(keys[i])+":",
					default: (userConfig[keys[i]] || baseConfig[keys[i]])+""
				}
				read(opts, function(err, value){
					if(err){
						console.log("User forced exit");
						process.exit(0);
					}
					else{
						config[keys[i]] = value;
						ask(i+1);
					}
				});
			}
		}

		var done = function(){
			console.log(config);
		}

		ask(0);
	}

});