exports.name = 'eta'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var pos = bot.getWaitListPosition(data.from.id);
	var average = 168;
	var time = 0;
	if (pos == 0) bot.sendChat("You're already the dj!");
	if (pos > 0) {
		time = bot.getTimeRemaining() + (average*(bot.getWaitList().length - pos));
		bot.sendChat("@" + data.from.username + ", You have about " + Math.floor(time / 60) + " minutes until you're dj")
	} else {
		time = bot.getTimeRemaining() + (average*bot.getWaitList().length);
		bot.sendChat("@" + data.from.username + ", You have about " + Math.floor(time / 60) + " minutes until you're dj if you join now!")
	}
}