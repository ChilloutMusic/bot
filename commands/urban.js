exports.name = 'urban'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	request('http://api.urbandictionary.com/v0/define?term=' + data.message.replace('!urban ', ''), function(err, res) {
		if (!err && res) {
			var d = JSON.parse(res.body).list
			if (d.length > 0) {
				bot.sendChat('"' + d[0].definition.substring(0, (247 - d[0].permalink.length)) + '" ' + d[0].permalink);
			}
		}
	})
}