module.exports = function(bot) {
	bot.on('vote', function(data) {
		if (bot.getRoomScore().negative > 4) bot.moderateForceSkip();
	});
}