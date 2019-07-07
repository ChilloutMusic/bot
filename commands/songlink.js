exports.name = 'songlink'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var media = bot.getMedia();
	if (media.format == 1) {
		bot.sendChat("Current song: https://youtu.be/" + media.cid);
	} else if (media.format == 2) {
		request('https://api.soundcloud.com/tracks/' + media.cid + '?client_id=75044336cf671f542d8deb339b87a57f', function(err, res) {
			if (!err && res) {
				bot.sendChat("Current song: " + JSON.parse(res.body).permalink_url);
			}
		})
	}
}