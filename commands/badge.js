exports.name = ['getbadge']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var arg = data.message.split(' ')[1];
	if (arg && arg.startsWith('http')) {
		request.post(process.env.WEBHOOK_BADGE || '', {
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