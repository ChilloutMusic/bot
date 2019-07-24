exports.name = ['swap']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	if (data.mentions.length > 0) {
		swap.request(data);
	} else if (data.message.split(' ')[1] == 'accept') {
		swap.accept(data);
	} else if (data.message.split(' ')[1] == 'deny') {
		swap.deny(data);
	}
}