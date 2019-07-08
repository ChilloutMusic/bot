exports.name = 'eta'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var pos = bot.getWaitListPosition(data.from.id);
	var average = 320; // 5m20s average
	var seconds = 0;
	bot.getHistory(function(songs) {
		var total = 0;
		songs.forEach(function(song) {
			total += song.media.duration;
		})
		average = total / songs.length;
	});
	if (pos == 0) bot.sendChat("You're already the dj!");
	if (pos > 0) {
		seconds = bot.getTimeRemaining() + (average*(bot.getWaitList().length - pos));
		var minutes = Math.floor(seconds / 60);
		bot.sendChat("@" + data.from.username + ", You have about " + minutes + " minutes and " + Math.round(seconds-(minutes*60)) + " seconds until you're dj");
	} else {
		seconds = bot.getTimeRemaining() + (average*bot.getWaitList().length);
		var minutes = Math.floor(seconds / 60);
		bot.sendChat("@" + data.from.username + ", You have about " + minutes + " minutes and " + Math.round(seconds-(minutes*60)) + " seconds until you're dj if you join now!");
	}
}