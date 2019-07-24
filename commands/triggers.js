exports.name = ['triggers']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var latest = triggers.triggers[triggers.total-1];
	bot.sendChat('We have ' + triggers.total + ' triggers. The latest trigger added was !' + latest.keyword + '\n'+formatTriggers(data, latest.content));
}