module.exports = function(bot) {
	announceSong = function(data) {
		var media = bot.getMedia();
		var historyID = '';
		if (media.format == 1) {
			historyID = 'yt' + media.cid;
		} else {
			historyID = 'sc' + media.cid;
		}
		if (history.all[historyID]) {
			bot.sendChat("Now playing '" + media.author + " - " + media.title + "'. It has been played " + history.all.historyID.total.plays + " times");
		} else {
			bot.sendChat("Now playing '" + media.author + " - " + media.title + "'. It has never been played here before!");
		}
	}
}