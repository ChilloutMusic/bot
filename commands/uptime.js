exports.name = ['uptime']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	bot.sendChat("The bot has been up for " + Math.round(process.uptime()/3600) + " hours. The system has been up for " + Math.round(require('os').uptime()/86400) + " days.");
}