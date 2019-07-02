exports.name = 'getbadge'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var arg = data.message.split(' ')[1];
	if (arg && arg.startsWith('http')) {
		request.post('https://discordapp.com/api/webhooks/595429169123426315/9ftJEiSA5JRnA79hcf6Tzyi1945xjbjtiIOSy71fznhkuPv1dbp4A23X6QhApqRa8SY0', {
			json: {
				"username": "Badge Request",
				"embeds": [
				    {
				      	"color": 5416176,
				      	"fields": [
				        	{
				          		"name": "Username",
				          		"value": data.from.username,
				          		"inline": true
				        	},
					        {
					          	"name": "Id",
					          	"value": data.from.id,
					          	"inline": true
					        },
					        {
					        	"name": "Image",
					        	"value": arg
					        }
					    ],
				      	"image": {
				        	"url": arg
				      	}
				    }
				]
			}
		}, function(err, res, body) {
			if (err) console.log(err);
			bot.sendChat("@" + data.from.username + ", I've put in the request for you");
		});
	}
}