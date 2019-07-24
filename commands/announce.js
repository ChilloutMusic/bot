exports.name = ['announce']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	announceSong();
}