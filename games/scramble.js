module.exports = function() {
	scramble = {
		words: require('../scramble.json'),
		timelimit: 30,
		running: false,
		answer: '',
		timeout: setTimeout(function() {}, 100),
		start: function() {
			if (!scramble.running) {
				scramble.answer = scramble.words[Math.floor(Math.random() * scramble.words.length)];
				bot.sendChat(":books: Scramble has started, You have " + scramble.timelimit + " seconds.");
				bot.sendChat("Unscramble the word: " + scramble.shuffle(scramble.answer));
				scramble.running = true;
				scramble.timeout = setTimeout(function() {
					scramble.running = false;
					bot.sendChat("Scramble ended! The word was: "+scramble.answer);
				}, scramble.timelimit*1000);
			} else {
				bot.sendChat("Scramble already running!");
			}
		},
		shuffle: function(word) {
			var shuffled = word.split("");
		    for(var i = shuffled.length - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var tmp = shuffled[i];
		        shuffled[i] = shuffled[j];
		        shuffled[j] = tmp;
		    }
		    return shuffled.join("");
		},
		checkAnswer: function(data) {
			if (data.message.toLowerCase() == scramble.answer) {
				trivia.running = false;
				clearTimeout(scramble.timeout);
				bot.sendChat("@" + data.from.username + " correct! The word was "+scramble.answer);
				bot.sendChat("Scramble ended! Thanks for playing.");
			}
		}
	}
}