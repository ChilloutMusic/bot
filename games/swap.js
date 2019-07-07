module.exports = function() {
	swap = {
		timelimit: 15,
		swaps: [],
		timeouts: {},
		request: function(data) {
			if (data.from.id !== data.mentions[0].id) {
				if (!swap.swaps.includes(data.from.id)) {
					if (!swap.swaps.includes(data.mentions[0].id)) {
						if (bot.getWaitListPosition(data.from.id) > 0) {
							if (bot.getWaitListPosition(data.mentions[0].id) > 0) {
								bot.sendChat("@" + data.mentions[0].username + ", " + data.from.username + " wants to swap positions in queue, You have " + swap.timelimit + " seconds to !swap accept or !swap deny");
								swap.swaps.push({'a': data.from.id, 'd': data.mentions[0].id});
								swap.timeouts[data.mentions[0].id] = setTimeout(function() {
									swap.swaps.splice(swap.swaps.length-1, 1);
									delete swap.timeouts[data.mentions[0].id];
								}, swap.timelimit*1000);
							} else {
								bot.sendChat("@" + data.from.username + ", " + data.mentions[0].username + " is not in the waitlist.");
							}
						} else {
							bot.sendChat("@" + data.from.username + ", You're not in the waitlist.");
						}
					} else {
						bot.sendChat("@" + data.from.username + ", " + data.mentions[0].username + " is currently in a swap request.");
					}
				} else {
					bot.sendChat("@" + data.from.username + ", You're already in a swap request.");
				}
			} else {
				bot.sendChat("@" + data.from.username + ", You can't swap with yourself.");
			}
		},
		accept: function(data) {
			swap.swaps.forEach(function(s) {
				if (s.d == data.from.id) {
					var posA = bot.getWaitListPosition(s.a);
					var posD = bot.getWaitListPosition(s.d);
					if (posA > 0 && posD > 0) {
						bot.moderateMoveDJ(s.d, posA);
						bot.moderateMoveDJ(s.a, posD);
						clearTimeout(swap.timeouts[s.d]);
						swap.swaps.splice(swap.swaps.indexOf(s), 1);
						delete swap.timeouts[s.d];
					} else {
						bot.sendChat("@" + s.d + ", failed to execute swap.")
					}
				}
			});
		},
		deny: function(data) {
			swap.swaps.forEach(function(s) {
				if (s.d == data.from.id) {
					bot.sendChat("@" + s.a + ", " + s.d + " denied to swap.");
					clearTimeout(swap.timeouts[s.d]);
					swap.swaps.splice(swap.swaps.indexOf(s), 1);
					delete swap.timeouts[s.d];
				}
			});
		}
	}
}