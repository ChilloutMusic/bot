module.exports = function(bot) {
	bot.on('modBan', function(data) {
		request.post(process.env.WEBHOOK_BANS || '', {
			json: {
				"username": "Bans",
				"embeds": [{
	      	"color": 0xed0b00,
	      	"fields": [
	        	{
          		"name": "User",
          		"value": data.raw.t,
          		"inline": true
	        	},
		        {
	          	"name": "Mod",
	          	"value": data.raw.m,
	          	"inline": true
		        },
		        {
	          	"name": "Time",
	          	"value": data.duration,
	          	"inline": true
		        }
		    	]
				}]
			}
		});
	});
}