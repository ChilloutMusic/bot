exports.name = ['scramble']
exports.permission = config.permissions.manager
exports.enabled = true
exports.handler = function(data) {
	scramble.start();
}