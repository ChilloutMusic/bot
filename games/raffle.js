module.exports = function() {
	raffle = {
		timelimit: 20,
		intervalmin: 45,
		running: false,
		locked: false,
		joined: [],
		timeout: setTimeout(function() {}, 100),
		interval: setInterval(function() {}, 10000),
		start: function() {
			if (!raffle.running) {
				clearInterval(raffle.interval);
				raffle.locked = false;
				raffle.joined = [];
				bot.sendChat("@djs Raffle is starting for " + raffle.timelimit + "s! Type !join to get a chance at #1 spot! :arrow_up: :arrow_up: :arrow_up:");
				raffle.running = true;
				raffle.timeout = setTimeout(function() {
					raffle.running = false;
					raffle.end();
				}, raffle.timelimit*1000);
			} else {
				bot.sendChat("Raffle already running!");
			}
		},
		add: function(data) {
			if (!raffle.joined.includes(data.from)) {
				if (data.from.id == bot.getDJ().id) {
					bot.sendChat("@" + data.from.username + " you are DJing now, noob!");
				} else if (bot.getWaitListPosition(data.from.id) == -1) {
					bot.sendChat("@" + data.from.username + " you are not in queue, noob!");
				} else if (bot.getWaitListPosition(data.from.id) == 1) {
					bot.sendChat("@" + data.from.username + " has locked their spot!");
					raffle.locked = true;
				} else {
					bot.sendChat("@" + data.from.username + " has joined the raffle, hold on to your panties!");
					raffle.joined.push(data.from);
				}
			}
			bot.moderateDeleteChat(data.id)
		},
		end: function() {
			if (raffle.joined.length > 0) {
				var winner = raffle.joined[Math.floor(Math.random() * raffle.joined.length)];
				bot.sendChat("@" + winner.username + " won the raffle! Suck it! :beers: :beers: :beers:");
				bot.moderateMoveDJ(winner.id, raffle.locked ? 2 : 1);
			} else {
				bot.sendChat("Nobody joined the raffle.");
			}
			bot.sendChat("Raffle has now ended, the next one will be in " + raffle.intervalmin + " minutes. :stopwatch:");
			raffle.interval = setInterval(function() {
	        	raffle.start();
	        }, raffle.intervalmin * 60000);
		}
	}
	raffle.interval = setInterval(function() {
    	raffle.start();
    }, raffle.intervalmin * 60000);
}