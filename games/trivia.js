module.exports = function() {
	trivia = {
		questions: require('../trivia.json'),
		timelimit: 30,
		running: false,
		questionIndex: 0,
		checked: "",
		question: {},
		timeout: setTimeout(function() {}, 100),
		start: function() {
			if (!trivia.running) {
				trivia.checked = "";
				trivia.questionIndex = Math.floor(Math.random()*trivia.questions.length);
				trivia.question = trivia.questions[trivia.questionIndex];
				bot.sendChat(":question: Trivia has started! You have " + trivia.timelimit + " seconds to answer this...");
				bot.sendChat("The category is " + trivia.question.category);
				bot.sendChat(he.decode(trivia.question.question));
				trivia.running = true;
				trivia.timeout = setTimeout(function() {
					trivia.running = false;
					trivia.log(false);
					bot.sendChat("Trivia ended! Thanks for playing.");
				}, trivia.timelimit*1000);
			} else {
				bot.sendChat("Trivia already running!");
			}
		},
		checkAnswer: function(data) {
			if (data.from.id !== 14034606 && data.from.id !== 26349274) trivia.checked += data.message+"\n";
			if (data.message.toLowerCase() == he.decode(trivia.question.answer.toLowerCase())) {
				trivia.running = false;
				trivia.log(true);
				clearTimeout(trivia.timeout);
				bot.sendChat(":baloon: Correct! Congratulations " + "@" + data.from.username + "! :baloon:");
				bot.sendChat("Trivia ended! Thanks for playing.");
			}
		},
		log: function(answered) {
			request.post(process.env.WEBHOOK_TRIVIA || '', {
				json: {
					"username": "Trivia log",
					"embeds": [
					    {
					      	"color": 5416176,
					      	"fields": [
					        	{
					          		"name": "Index",
					          		"value": trivia.questionIndex,
					          		"inline": true
					        	},
					        	{
						          	"name": "Answered",
						          	"value": answered,
						          	"inline": true
						        },
							{
						          	"name": "Url",
						          	"value": "https://mitchdev.net/cm/trivia?index=" + trivia.questionIndex
						        },
						        {
						          	"name": "Category",
						          	"value": trivia.question.category
						        },
						        {
						          	"name": "Question",
						          	"value": trivia.question.question
						        },
						        {
						          	"name": "Answer",
						          	"value": trivia.question.answer
						        },
						        {
						          	"name": "Checked Answers",
						          	"value": trivia.checked
						        }
						    ]
					    }
					]
				}
			}, function(err, res, body) {
				if (err) console.log(err);
			});
		}
	}
}
