module.exports = function(bot) {
	getLang = function(type) {
		var lang = config.lang[type];
		if (lang) {
			if (Array.isArray(config.lang[type])) {
				return lang[Math.floor(Math.random()*lang.length)];
			} else {
				return lang;
			}
		} else {
			return '';
		}
	}
}