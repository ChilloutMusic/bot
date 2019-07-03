module.exports = function() {
	trivia = {
		timelimit: 15,
		running: false,
		q: {},
		timeout: setTimeout(function() {}, 100),
		start: function() {
			if (!trivia.running) {
				request('https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple', function(err, res) {
					if (!err && res) {
						trivia.q = JSON.parse(res.body).results[0];
						if (!trivia.q.question.startsWith("Which one of these") || !trivia.q.question.startsWith("Which of these")) { // Can't answer these questions unless you give sendChat incorrect_answers & correct_answer
							bot.sendChat(":question: Trivia has started! You have " + trivia.timelimit + " seconds to answer this...");
							if (trivia.q.type == "boolean") bot.sendChat("True or False?");
							bot.sendChat(he.decode(trivia.q.question));
							trivia.running = true;
							trivia.timeout = setTimeout(function() {
								trivia.running = false;
								bot.sendChat("Trivia ended! Thanks for playing.");
							}, trivia.timelimit*1000);
						} else {
							trivia.start();
						}
					}
				})
			} else {
				bot.sendChat("Trivia already running!");
			}
		},
		checkAnswer: function(data) {
			if (data.message.toLowerCase() == he.decode(trivia.q.correct_answer.toLowerCase())) {
				trivia.running = false;
				clearTimeout(trivia.timeout);
				bot.sendChat(":baloon: Correct! Congratulations " + "@" + data.from.username + "! :baloon:");
				bot.sendChat("Trivia ended! Thanks for playing.");
			}
		}
	}
}