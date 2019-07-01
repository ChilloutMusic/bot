exports.name = 'trigger'
exports.permission = config.permissions.manager
exports.enabled = true
exports.handler = function(data) {
	var args = data.message.split(' ');
	if (args[2]) {
		var trigger = args[2].replace('!', '');
		var content = data.message.replace('trigger add !'+trigger+' ', '');
		if (args[1] == 'add' && trigger && content) {
			addTriggers(data, trigger, content);
		} else if ((args[1] == 'remove' || args[1] == 'del') && trigger) {
			removeTriggers(data, trigger);
		}
	}
}