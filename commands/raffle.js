exports.name = ['raffle']
exports.permission = config.permissions.manager
exports.enabled = true
exports.handler = function(data) {
	raffle.start();
}